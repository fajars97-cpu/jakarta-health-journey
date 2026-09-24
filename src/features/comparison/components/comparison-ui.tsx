"use client";

import Link from "next/link";
import { CircleAlert, Scale, Trash2 } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { organizations } from "@/data/demo/mock-data";
import { getPackageComparisonData } from "@/features/comparison/data/package-comparison";
import { CurrencyPrice } from "@/features/currency/currency-context";
import { useLanguage } from "@/features/i18n/language-context";
import { PartnerType } from "@/types/domain";

type ComparisonGroup = "fasyankes" | "hotel" | "travel" | "translator";
type ComparisonItem = {
  organizationId: string;
  service: string;
  group?: ComparisonGroup;
};
type ResolvedComparisonItem = ComparisonItem & { group: ComparisonGroup };

const comparisonGroups: { id: ComparisonGroup; label: string; labelEn: string; emptyTitle: string; emptyTitleEn: string; emptyCopy: string; emptyCopyEn: string; href: string }[] = [
  { id: "fasyankes", label: "Fasyankes", labelEn: "Healthcare", emptyTitle: "Belum ada paket fasyankes.", emptyTitleEn: "No healthcare packages yet.", emptyCopy: "Tandai paket dari rumah sakit atau klinik untuk melihat harga dan cakupannya berdampingan.", emptyCopyEn: "Mark a hospital or clinic package to compare prices and inclusions side by side.", href: "/explore" },
  { id: "hotel", label: "Hotel", labelEn: "Hotels", emptyTitle: "Belum ada pilihan kamar hotel.", emptyTitleEn: "No hotel rooms yet.", emptyCopy: "Tandai kamar hotel untuk membandingkan tarif, fasilitas, dan ketentuan menginap.", emptyCopyEn: "Mark hotel rooms to compare rates, facilities, and stay terms.", href: "/support" },
  { id: "travel", label: "Travel agent", labelEn: "Travel agents", emptyTitle: "Belum ada layanan travel agent.", emptyTitleEn: "No travel services yet.", emptyCopy: "Tandai layanan perjalanan untuk membandingkan pilihan dukungan transportasi non-medis.", emptyCopyEn: "Mark travel services to compare non-medical transport support.", href: "/support" },
  { id: "translator", label: "Penerjemah", labelEn: "Interpreters", emptyTitle: "Belum ada layanan penerjemah.", emptyTitleEn: "No interpreter services yet.", emptyCopy: "Tandai layanan penerjemah untuk membandingkan bahasa, tarif, dan dukungan pendampingan.", emptyCopyEn: "Mark interpreter services to compare languages, rates, and companion support.", href: "/support" },
];

const storageKey = "jhj-service-comparison";
const eventName = "jhj-comparison-updated";

function groupOf(type: PartnerType): ComparisonGroup {
  if (type === PartnerType.Hospital || type === PartnerType.Clinic) return "fasyankes";
  if (type === PartnerType.Hotel) return "hotel";
  if (type === PartnerType.Travel) return "travel";
  return "translator";
}

function groupLabel(group: ComparisonGroup, isEnglish = false) {
  const item = comparisonGroups.find((candidate) => candidate.id === group);
  return (isEnglish ? item?.labelEn : item?.label) ?? group;
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
  const { isEnglish } = useLanguage();
  const [notice, setNotice] = useState("");
  const selected = items.some((item) => keyOf(item) === `${organizationId}:${service}`);

  function toggle() {
    const organization = organizations.find((candidate) => candidate.id === organizationId);
    if (!organization) return;

    const group = groupOf(organization.type);
    const entry: ResolvedComparisonItem = { organizationId, service, group };

    if (!selected && items.filter((item) => item.group === group).length >= 5) {
      setNotice(isEnglish ? `You can compare up to five ${groupLabel(group, true)} options.` : `Maksimal lima pilihan ${groupLabel(group)} dapat dibandingkan.`);
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
        {selected ? (isEnglish ? "Marked for comparison" : "Ditandai untuk dibandingkan") : (isEnglish ? "Compare package" : "Bandingkan paket")}
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
  const { isEnglish } = useLanguage();

  return (
    <Link
      href="/compare"
      className="btn btn-outline btn-sm hide-mobile"
      aria-label={isEnglish ? `Compare services, ${count} selected` : `Bandingkan layanan, ${count} dipilih`}
    >
      <Scale size={16} />
      {isEnglish ? "Compare" : "Bandingkan"}
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
  const { isEnglish } = useLanguage();
  const items = useComparisonItems();
  const [activeGroup, setActiveGroup] = useState<ComparisonGroup>("fasyankes");
  const activeTab = comparisonGroups.find((group) => group.id === activeGroup) ?? comparisonGroups[0];
  const activeLabel = isEnglish ? activeTab.labelEn : activeTab.label;
  const details = useMemo(
    () =>
      items.filter((item) => item.group === activeGroup).flatMap((item) => {
        const organization = organizations.find((candidate) => candidate.id === item.organizationId);
        return organization ? [{ item, organization }] : [];
      }),
    [items, activeGroup],
  );
  const distinctOrganizations = new Set(details.map((detail) => detail.organization.id)).size;

  function remove(item: ComparisonItem) {
    persist(items.filter((entry) => keyOf(entry) !== keyOf(item)));
  }

  function clear() {
    persist(items.filter((item) => item.group !== activeGroup));
  }

  return (
    <main className="compare-page">
      <section className="container compare-intro">
        <p className="eyebrow">
          <Scale size={14} /> {isEnglish ? "PACKAGE COMPARISON" : "PERBANDINGAN PAKET"}
        </p>
        <h1 className="section-title">{isEnglish ? "Compare your options with greater clarity." : "Bandingkan pilihan Anda, dengan lebih jernih."}</h1>
        <p>{isEnglish ? "Prices, inclusions, and package terms are shown side by side to help you prepare an inquiry. This MVP information is illustrative and is not medical advice." : "Harga, cakupan, dan ketentuan paket ditampilkan berdampingan agar Anda dapat menyiapkan inquiry dengan lebih baik. Informasi ini adalah ilustrasi MVP dan bukan rekomendasi medis."}</p>
      </section>

      <section className="container compare-tabs" aria-label="Kategori perbandingan">
        {comparisonGroups.map((group) => {
          const count = items.filter((item) => item.group === group.id).length;
          return <button type="button" key={group.id} onClick={() => setActiveGroup(group.id)} className={activeGroup === group.id ? "compare-tab-active" : ""}>{isEnglish ? group.labelEn : group.label}<span>{count}</span></button>;
        })}
      </section>

      {details.length === 0 ? (
        <section className="container compare-empty">
          <Scale size={32} />
          <h2>{isEnglish ? activeTab.emptyTitleEn : activeTab.emptyTitle}</h2>
          <p>Buka halaman mitra dan pilih “Bandingkan paket” pada kartu paket yang ingin Anda lihat berdampingan.</p>
          <Link href={activeTab.href} className="btn btn-primary">
            {isEnglish ? "Explore" : "Jelajahi"} {activeLabel}
          </Link>
        </section>
      ) : (
        <section className="container">
          <div className="compare-toolbar">
            <span>
              <b>
                {details.length}/5 pilihan · {activeTab.label}
              </b>
              {distinctOrganizations < 2 && " · Tambahkan paket dari mitra lain untuk membandingkan."}
            </span>
            <button type="button" className="btn btn-outline btn-sm" onClick={clear}>
              <Trash2 size={15} /> {isEnglish ? "Clear" : "Kosongkan"}
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
                      <span>{isEnglish ? "Starting price" : "Harga mulai"}</span>
                      <strong><CurrencyPrice value={packageInfo.priceFrom} /></strong>
                      {packageInfo.estimatedRange && (
                        <small><CurrencyPrice value={`Estimasi total: ${packageInfo.estimatedRange}`} /></small>
                      )}
                    </div>

                    <dl>
                      <div>
                        <dt>{isEnglish ? "Package type" : "Jenis paket"}</dt>
                        <dd>{packageInfo.category}</dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? "Included" : "Termasuk"}</dt>
                        <dd><ListValue values={packageInfo.included} /></dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? "Not included" : "Tidak termasuk"}</dt>
                        <dd><ListValue values={packageInfo.excluded} /></dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? "Duration" : "Durasi"}</dt>
                        <dd>{packageInfo.duration}</dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? "Stay / room" : "Rawat inap / kamar"}</dt>
                        <dd>{packageInfo.stay}</dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? "Team" : "Tim terkait"}</dt>
                        <dd>{packageInfo.team}</dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? "Requirements" : "Syarat awal"}</dt>
                        <dd>{packageInfo.requirements}</dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? "Availability" : "Ketersediaan"}</dt>
                        <dd>{packageInfo.availability}</dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? "Changes / cancellation" : "Perubahan / pembatalan"}</dt>
                        <dd>{packageInfo.cancellation}</dd>
                      </div>
                      <div className="compare-secondary">
                        <dt>{isEnglish ? "Area & languages" : "Area & bahasa"}</dt>
                        <dd>{organization.area} · {organization.languages.join(" · ")}</dd>
                      </div>
                    </dl>
                    <Link href={`/facility/${organization.slug}`} className="btn btn-outline btn-sm">
                      {isEnglish ? "View partner" : "Lihat mitra"}
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
