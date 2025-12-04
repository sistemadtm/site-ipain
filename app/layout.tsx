import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://indicadorprofissional.com.br'),
  title: {
    default: "Indicador Profissional | Encontre Especialistas Qualificados",
    template: "%s | Indicador Profissional"
  },
  description: "Conectamos você aos melhores profissionais qualificados e verificados em todo o Brasil. Encontre especialistas por localização de forma rápida e segura.",
  keywords: ["profissionais", "especialistas", "localizador", "serviços profissionais", "Brasil", "qualificados", "verificados"],
  authors: [{ name: "Indicador Profissional" }],
  creator: "Indicador Profissional",
  publisher: "Indicador Profissional",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://indicadorprofissional.com.br",
    siteName: "Indicador Profissional",
    title: "Indicador Profissional | Encontre Especialistas Qualificados",
    description: "Conectamos você aos melhores profissionais qualificados e verificados em todo o Brasil.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Indicador Profissional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indicador Profissional | Encontre Especialistas Qualificados",
    description: "Conectamos você aos melhores profissionais qualificados e verificados em todo o Brasil.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "seu-codigo-google-search-console",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
