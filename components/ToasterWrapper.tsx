"use client";

import dynamic from "next/dynamic";

// Dynamically import Toaster with SSR disabled
const Toaster = dynamic(() => import("@/components/toaster").then((mod) => mod.Toaster), { ssr: false });

export default function ToasterWrapper() {
  return <Toaster />;
}
