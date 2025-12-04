export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Indicador Profissional",
  url: "https://indicadorprofissional.com.br",
  logo: "https://indicadorprofissional.com.br/logo.png",
  description: "Plataforma para conectar pessoas aos melhores profissionais qualificados em todo o Brasil",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR"
  },
  sameAs: [
    "https://facebook.com/indicadorprofissional",
    "https://instagram.com/indicadorprofissional",
    "https://linkedin.com/company/indicadorprofissional"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Indicador Profissional",
  url: "https://indicadorprofissional.com.br",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://indicadorprofissional.com.br/localizador?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
