"use client";

import { Client } from "appwrite";

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("6aaa3b4a00230790a440");

export { client };
