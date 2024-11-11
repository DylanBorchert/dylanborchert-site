import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "#/components/ui/toaster";
import { ContactProvider } from "#/context/ContactSheet.context";
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
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-image?theme=dark"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-image?theme=light"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-image"
        />
      </head>
      <body className={SpaceGrotesk.className}>
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          disableTransitionOnChange={false}
          defaultTheme="system"
        >
          <ContactProvider>
            {children}
          </ContactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
