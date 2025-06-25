// src/components/LicenseRegister.tsx
"use client";
import { registerLicense } from "@syncfusion/ej2-base";
console.log(String(process.env.NEXT_PUBLIC_SYNCFUSION_KEY));
registerLicense(String(process.env.NEXT_PUBLIC_SYNCFUSION_KEY));

export default function LicenseRegister() {
  return null; // Just run license registration
}
