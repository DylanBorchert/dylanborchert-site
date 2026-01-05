import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner"
import { ContactProvider } from "#/context/ContactSheet.context";
import { ColorPaletteProvider } from "#/context/ColorPalette.context";
const SpaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dylanborchert.ca",
};

export const dynamic = 'auto';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={SpaceGrotesk.className}>
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          disableTransitionOnChange={true}
          defaultTheme="system"
        >
          <ColorPaletteProvider>
            <ContactProvider>{children}</ContactProvider>
          </ColorPaletteProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
