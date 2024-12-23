import { ContactProvider } from "#/context/ContactSheet.context";
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
  return <ContactProvider>{children}</ContactProvider>;
}
