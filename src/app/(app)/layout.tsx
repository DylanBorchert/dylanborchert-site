import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "#/components/ui/toaster";
import { HeroImageProvider } from "#/providers/HeroImage.provider";
const SpaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dylanborchert.ca",
};

export default function RootLayout({
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
          disableTransitionOnChange={false}
          defaultTheme="system"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
