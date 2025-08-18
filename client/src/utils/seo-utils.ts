/**
 * SEO utility functions for generating structured data and meta tags
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate FAQ structured data for better search visibility
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate breadcrumb structured data for navigation
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generate video structured data for rich snippets
 */
export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "contentUrl": contentUrl,
    "embedUrl": contentUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Siwaht",
      "logo": {
        "@type": "ImageObject",
        "url": "https://siwaht.com/logo.png"
      }
    }
  };
}

/**
 * Generate service structured data
 */
export function generateServiceSchema({
  name,
  description,
  provider = "Siwaht",
  serviceType,
  areaServed = "Worldwide"
}: {
  name: string;
  description: string;
  provider?: string;
  serviceType: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider
    },
    "serviceType": serviceType,
    "areaServed": areaServed,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": name
    }
  };
}

/**
 * Common FAQ data for Siwaht services
 */
export const siwhatFAQs: FAQItem[] = [
  {
    question: "What is Siwaht?",
    answer: "Siwaht is a professional AI agency specializing in custom video ads, realistic avatars, multilingual voice ads, video editing, and podcast production services for businesses worldwide."
  },
  {
    question: "How long does it take to create an AI video ad?",
    answer: "Our AI video ads are typically delivered within 3-5 business days, depending on the complexity and requirements of your project."
  },
  {
    question: "Can you create content in multiple languages?",
    answer: "Yes, we offer voice ads and video content in over 50 languages with native pronunciation and cultural nuances."
  },
  {
    question: "What makes Siwaht different from other AI content creators?",
    answer: "We provide custom, hands-on service rather than self-service tools. Our team works directly with you to create professional, tailored content that meets your specific brand needs."
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes, all our packages include revisions to ensure the final product meets your expectations and brand standards."
  }
];

/**
 * Generate meta tags for dynamic pages
 */
export function generateMetaTags({
  title,
  description,
  keywords,
  ogImage = "https://siwaht.com/logo.png",
  canonicalUrl
}: {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}) {
  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:url", content: canonicalUrl },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage }
    ],
    link: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : []
  };
}