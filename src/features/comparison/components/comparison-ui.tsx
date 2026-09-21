"use client";

import Link from "next/link";
import { CircleAlert, Scale, Trash2 } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { organizations } from "@/data/demo/mock-data";
import { getPackageComparisonData } from "@/features/comparison/data/package-comparison";
import { PartnerType } from "@/types/domain";

type ComparisonGroup = "fasyankes" | "hotel" | "travel" | "translator";
type ComparisonItem = {
  organizationId: string;
  service: string;
  group?: ComparisonGroup;
};
type ResolvedComparisonItem = ComparisonItem & { group: ComparisonGroup };

const storageKey = "jhj-service-comparison";
const eventName = "jhj-comparison-updated";

function groupOf(type: PartnerType): ComparisonGroup {
  if (type === PartnerType.Hospital || type === PartnerType.Clinic) return "fasyankes";
  if (type === PartnerType.Hotel) return "hotel";
  if (type === PartnerType.Travel) return "travel";
  return "translator";
}

function groupLabel(group: ComparisonGroup) {
  if (group === "fasyankes") return "fasyankes (rumah sakit atau klinik)";
  if (group === "travel") return "travel agent";
  return group;
}

function persist(items: ComparisonItem[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(items));
  window.dispatchEvent(new Event(eventName));
}

function keyOf(item: ComparisonItem) {
  return `${item.organizationId}:${item.service}`;
}

function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
  };
}

function snapshot() {
  return window.localStorage.getItem(storageKey) ?? "[]";
}

function useComparisonItems(): ResolvedComparisonItem[] {
  const serialized = useSyncExternalStore(subscribe, snapshot, () => "[]");

  return useMemo(() => {
    try {
      return (JSON.parse(serialized) as ComparisonItem[]).map((item) => ({
        ...item,
        group:
          item.group ??
          groupOf(
            organizations.find((organization) => organization.id === item.organizationId)?.type ??
              PartnerType.Hospital,
          ),
      }));
    } catch {
      return [];
    }
  }, [serialized]);
}

export function ComparisonPackageButton({
  organizationId,
  service,
}: {
  organizationId: string;
  service: string;
}) {
  const items = useComparisonItems();
  const [notice, setNotice] = useState("");
  const selected = items.some((item) => keyOf(item) === `${organizationId}:${service}`);

  function toggle() {
    const organization = organizations.find((candidate) => candidate.id === organizationId);
    if (!organization) return;

    const group = groupOf(organization.type);
    const entry: ResolvedComparisonItem = { organizationId, service, group };

    if (!selected && items.length > 0 && items[0].group !== group) {
      setNotice(
        `Daftar berisi ${groupLabel(items[0].group)}. Kosongkan daftar untuk membandingkan ${groupLabel(group)}.`,
      );
      return;
    }

    if (!selected && items.length >= 5) {
      setNotice("Maksimal lima paket dapat dibandingkan.");
      return;
    }

    persist(selected ? items.filter((item) => keyOf(item) !== keyOf(entry)) : [...items, entry]);
    setNotice("");
  }

  return (
    <div className="comparison-package-action">
      <button
        type="button"
        onClick={toggle}
        className={selected ? "comparison-package-selected" : ""}
      >
        <Scale size={15} />
        {selected ? "Ditandai untuk dibandingkan" : "Bandingkan paket"}
      </button>
      {notice && (
        <small>
          <CircleAlert size={13} />
          {notice}
        </small>
      )}
    </div>
  );
}

export function ComparisonHeaderLink() {
  const count = useComparisonItems().length;

  return (
    <Link
      href="/compare"
      className="btn btn-outline btn-sm hide-mobile"
      aria-label={`Bandingkan layanan, ${count} dipilih`}
    >
      <Scale size={16} />
      Bandingkan
      {count > 0 && <span className="comparison-count">{count}</span>}
    </Link>
  );
}

function ListValue({ values }: { values: string[] }) {
  return (
    <ul>
      {values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}

export function ComparisonWorkspace() {
  const items = useComparisonItems();
  const details = useMemo(
    () =>
      items.flatMap((item) => {
        const organization = organizations.find((candidate) => candidate.id === item.organizationId);
        return organization ? [{ item, organization }] : [];
      }),
    [items],
  );
  const distinctOrganizations = new Set(details.map((detail) => detail.organization.id)).size;
  const group = details[0]?.item.group;

  function remove(item: ComparisonItem) {
    persist(items.filter((entry) => keyOf(entry) !== keyOf(item)));
  }

  function clear() {
    persist([]);
  }

  return (
    <main className="compare-page">
      <section className="container compare-intro">
        <p className="eyebrow">
          <Scale size={14} /> PERBANDINGAN PAKET
        </p>
        <h1 className="section-title">Bandingkan pilihan Anda, dengan lebih jernih.</h1>
        <p>
          Harga, cakupan, dan ketentuan paket ditampilkan berdampingan agar Anda dapat
          menyiapkan inquiry dengan lebih baik. Informasi ini adalah ilustrasi MVP dan bukan
          rekomendasi medis.
        </p>
      </section>

      {details.length === 0 ? (
        <section className="container compare-empty">
          <Scale size={32} />
          <h2>Belum ada paket yang ditandai.</h2>
          <p>Buka halaman mitra dan pilih “Bandingkan paket” pada kartu paket yang ingin Anda lihat berdampingan.</p>
          <Link href="/explore" className="btn btn-primary">
            Jelajahi mitra
          </Link>
        </section>
      ) : (
        <section className="container">
          <div className="compare-toolbar">
            <span>
              <b>
                {details.length}/5 paket {group && `· ${groupLabel(group)}`}
              </b>
              {distinctOrganizations < 2 && " · Tambahkan paket dari mitra lain untuk membandingkan."}
            </span>
            <button type="button" className="btn btn-outline btn-sm" onClick={clear}>
              <Trash2 size={15} /> Kosongkan
            </button>
          </div>

          <div className="compare-scroll">
            <div
              className="compare-grid"
              style={{ gridTemplateColumns: `repeat(${details.length}, minmax(280px, 1fr))` }}
            >
              {details.map(({ item, organization }) => {
                const packageInfo = getPackageComparisonData(item.organizationId, item.service);

                return (
                  <article className="compare-card" key={keyOf(item)}>
                    <div className="compare-card-top">
                      <span>{organization.type}</span>
                      <button
                        type="button"
                        aria-label={`Hapus ${item.service}`}
                        onClick={() => remove(item)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <h2>{item.service}</h2>
                    <h3>{organization.name}</h3>

                    <div className="compare-price">
                      <span>Harga mulai</span>
                      <strong>{packageInfo.priceFrom}</strong>
                      {packageInfo.estimatedRange && (
                        <small>Estimasi total: {packageInfo.estimatedRange}</small>
                      )}
                    </div>

                    <dl>
                      <div>
                        <dt>Jenis paket</dt>
                        <dd>{packageInfo.category}</dd>
                      </div>
                      <div>
                        <dt>Termasuk</dt>
                        <dd><ListValue values={packageInfo.included} /></dd>
                      </div>
                      <div>
                        <dt>Tidak termasuk</dt>
                        <dd><ListValue values={packageInfo.excluded} /></dd>
                      </div>
                      <div>
                        <dt>Durasi</dt>
                        <dd>{packageInfo.duration}</dd>
                      </div>
                      <div>
                        <dt>Rawat inap / kamar</dt>
                        <dd>{packageInfo.stay}</dd>
                      </div>
                      <div>
                        <dt>Tim terkait</dt>
                        <dd>{packageInfo.team}</dd>
                      </div>
                      <div>
                        <dt>Syarat awal</dt>
                        <dd>{packageInfo.requirements}</dd>
                      </div>
                      <div>
                        <dt>Ketersediaan</dt>
                        <dd>{packageInfo.availability}</dd>
                      </div>
                      <div>
                        <dt>Perubahan / pembatalan</dt>
                        <dd>{packageInfo.cancellation}</dd>
                      </div>
                      <div className="compare-secondary">
                        <dt>Area & bahasa</dt>
                        <dd>{organization.area} · {organization.languages.join(" · ")}</dd>
                      </div>
                    </dl>
                    <Link href={`/facility/${organization.slug}`} className="btn btn-outline btn-sm">
                      Lihat mitra
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
          <p className="compare-note">
            Harga dan estimasi di atas adalah ilustrasi paket MVP. Konfirmasi harga akhir,
            cakupan, ketersediaan, dan ketentuan pembatalan melalui inquiry sebelum membuat keputusan.
          </p>
        </section>
      )}
    </main>
  );
}
