import { brand, product, videoAssets } from "@/lib/content";

const baseUrl = "https://agentic-bdf352a7.vercel.app";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  image: [
    `${baseUrl}/images/hero_lunawave_2400x1600.jpg`,
    `${baseUrl}/images/hero_lunawave_lifestyle_2400x1600.jpg`,
  ],
  description:
    "LunaWave Smart Sleep Mask delivers adaptive light therapy, AI-driven soundscapes, and biometric insights to help high achievers sleep deeper.",
  brand: {
    "@type": "Brand",
    name: brand.name,
  },
  sku: "LW-2025",
  offers: {
    "@type": "Offer",
    url: product.url,
    priceCurrency: "USD",
    price: "289",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2025-12-31",
  },
  review: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1284",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: baseUrl,
  logo: `${baseUrl}/images/hero_lunawave_2400x1600.jpg`,
  sameAs: [brand.social.instagram, brand.social.youtube],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: brand.social.supportEmail,
    telephone: brand.social.supportPhone,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${brand.name} | ${product.name}`,
  url: baseUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/?s={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "LunaWave Smart Sleep Mask",
      item: `${baseUrl}#offer`,
    },
  ],
};

const videoSchemas = videoAssets.map((video) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: video.title,
  description:
    "LunaWave promotional video demonstrating adaptive light therapy, soundscapes, and sleep insights.",
  thumbnailUrl: `${baseUrl}${video.poster}`,
  uploadDate: "2024-10-30",
  duration: video.duration,
  contentUrl: `${baseUrl}${video.file}`,
  embedUrl: `${baseUrl}${video.file}`,
  publisher: {
    "@type": "Organization",
    name: brand.name,
  },
}));

export function StructuredData() {
  const schemas = [
    productSchema,
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
    ...videoSchemas,
  ];

  return schemas.map((schema, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ));
}
