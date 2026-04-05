import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Regular and Bold requested
});

export const viewport = {
  themeColor: "#3E2723",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Impede zoom irritante em formulários no iOS
};

export const metadata: Metadata = {
  title: {
    template: "%s | FisioHub Elite",
    default: "FisioHub Elite | Dr. Pablo Andrade",
  },
  description: "A ponte entre o protocolo e a cura através do raciocínio clínico. Inteligência Artificial avançada em fisioterapia baseada em evidências.",
  keywords: ["fisioterapia", "raciocínio clínico", "mentoria", "inteligência artificial", "pablo andrade", "diagnóstico ortopédico"],
  openGraph: {
    title: "FisioHub Elite | Mentoria e Simulação Clínica",
    description: "A ponte entre o protocolo e a cura através do raciocínio clínico.",
    url: "https://fisiohub.com.br", // Place holder
    siteName: "FisioHub Elite",
    images: [
      {
        url: "/pablo.jpg.png", // Usa a imagem do pablo para cartões
        width: 800,
        height: 600,
        alt: "Dr. Pablo Andrade - FisioHub",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FisioHub Elite",
    description: "Treine diagnósticos com IA de ponta em Fisioterapia.",
    images: ["/pablo.jpg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-brown-900">{children}</body>
    </html>
  );
}
