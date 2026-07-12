import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: {
    default: "VinylStack - iOS-style React Component",
    template: "%s | VinylStack",
  },
  description: "Open-source React VinylStack component with iOS-like spring physics. Drag, touch, wheel and keyboard ready. Built with Motion and Tailwind CSS. Install via shadcn CLI or npm.",
  applicationName: "VinylStack",
  keywords: "coverflow, cover flow, vinyl stack, vinylstack, react component, iOS cover flow, iTunes cover flow, 3d carousel react, react carousel, shadcn coverflow, shadcn carousel, framer motion carousel, motion carousel, nextjs coverflow, tailwind carousel, album art carousel",
  authors: [{ name: "Prathamesh Naidu" }],
  creator: "Prathamesh Naidu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intrface.in",
    title: "VinylStack - Open Source React Component",
    description: "Open-source React VinylStack component with iOS-like spring physics. Drag, touch, wheel and keyboard ready. Built with Motion and Tailwind CSS.",
    siteName: "VinylStack",
  },
  twitter: {
    card: "summary_large_image",
    title: "VinylStack - iOS-style React Component",
    description: "Open-source React VinylStack component with iOS-like spring physics. Built with Motion and Tailwind CSS.",
    creator: "@intrface2026",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://intrface.in/#website",
      "url": "https://intrface.in",
      "name": "Cover Flow",
      "alternateName": [
        "coverflow",
        "React Cover Flow",
        "Cover Flow for React",
        "React coverflow component"
      ],
      "description": "iOS-style coverflow carousel component for React with real spring physics.",
      "publisher": {
        "@id": "https://intrface.in/#person"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://intrface.in/#software",
      "name": "Cover Flow",
      "alternateName": "coverflow",
      "url": "https://intrface.in",
      "description": "Open-source iOS-style coverflow carousel component for React. Real-time spring physics via Motion (Framer Motion), Tailwind CSS styling, drag, touch, wheel and keyboard interactions, spatial audio feedback, dark mode, and zero layout shift. Installable through the shadcn CLI or as an npm package.",
      "applicationCategory": "DeveloperApplication",
      "applicationSubCategory": "React component",
      "operatingSystem": "Web",
      "softwareVersion": "1.1.2",
      "license": "https://opensource.org/licenses/MIT",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary mx-4`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}