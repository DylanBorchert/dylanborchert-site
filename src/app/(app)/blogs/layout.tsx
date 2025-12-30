import { ContactProvider } from "#/context/ContactSheet.context";
import {
  LiquidGlassConfig,
  LiquidGlassProvider,
} from "@gracefullight/liquid-glass";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dylanborchert.ca",
};

export const dynamic = "auto";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config: LiquidGlassConfig = {
    tintOpacity: 0.3,
    tintColor: "var(--palette-textBackground)",
    frostBlur: "10px",
  };

  return (
    <ContactProvider>
      <LiquidGlassProvider value={config}>{children}</LiquidGlassProvider>
    </ContactProvider>
  );
}
