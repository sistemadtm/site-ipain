import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://indicadorprofissional.com.br'),
  title: {
    default: "Instituto Indicador | Rede de Excelência em DTM",
    template: "%s | Instituto Indicador"
  },
  description: "Conectando pacientes a especialistas certificados em Dor Orofacial. Excelência clínica validada.",
  keywords: ["DTM", "dor orofacial", "especialistas", "odontologia", "Brasil", "certificados"],
  authors: [{ name: "Instituto Indicador" }],
  creator: "Instituto Indicador",
  publisher: "Instituto Indicador",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://indicadorprofissional.com.br",
    siteName: "Instituto Indicador",
    title: "Instituto Indicador | Rede de Excelência em DTM",
    description: "Conectando pacientes a especialistas certificados em Dor Orofacial.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Instituto Indicador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instituto Indicador | Rede de Excelência em DTM",
    description: "Conectando pacientes a especialistas certificados em Dor Orofacial.",
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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
