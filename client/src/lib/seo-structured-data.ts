// SEO Structured Data for siwaht.com services

export interface Service {
  name: string;
  description: string;
  price?: string;
  url: string;
  image?: string;
}

export interface Organization {
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
  sameAs: string[];
  services: Service[];
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Siwaht",
  "url": "https://siwaht.com",
  "logo": "https://siwaht.com/logo.png",
  "description": "Professional AI agency specializing in AI Podcast Production, AI-Enhanced Video Editing, AI Avatar Creation, AI Video Ad Creation, and AI Voice ads.",
  "email": "hello@siwahtai.com",
  "telephone": "+1-555-123-4567",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.instagram.com/siwahtofficial/",
    "https://www.linkedin.com/company/13273833",
    "https://github.com/siwahtai"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "availableLanguage": ["English"],
    "areaServed": "Worldwide"
  }
};

export const servicesStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Video Ad Creation",
    "provider": {
      "@type": "Organization",
      "name": "Siwaht"
    },
    "name": "AI Video Ad Creation",
    "description": "Professional AI video advertisement services that convert. Our expert team transforms your vision into compelling video content.",
    "url": "https://siwaht.com#video-ads",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Video Ad Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom AI Video Production",
            "description": "Our team creates compelling video ads tailored to your brand using advanced AI and creative expertise."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Targeted Messaging",
            "description": "We craft personalized ad content that resonates with your specific demographics and customer segments."
          }
        }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Avatar Creation",
    "provider": {
      "@type": "Organization",
      "name": "Siwaht"
    },
    "name": "Realistic AI Avatars",
    "description": "Create photorealistic digital humans with AI-powered avatar generation. Perfect for any virtual environment.",
    "url": "https://siwaht.com#avatars",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Avatar Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Photorealistic Generation",
            "description": "We create incredibly lifelike avatars using advanced AI that captures authentic human expressions and characteristics."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Personalities",
            "description": "Our team designs unique character traits, emotions, and speaking styles that perfectly match your brand or vision."
          }
        }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Voice Synthesis",
    "provider": {
      "@type": "Organization",
      "name": "Siwaht"
    },
    "name": "AI Voice Ads",
    "description": "Don't let language be a barrier to your growth. We craft compelling, professionally translated voice ads that resonate with customers worldwide.",
    "url": "https://siwaht.com#voice-synthesis",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Voice Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Natural AI Voices",
            "description": "Generate incredibly realistic speech that's indistinguishable from human voice recordings."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Multi-Language Support",
            "description": "Create voice content in over 50 languages with native pronunciation and cultural nuances."
          }
        }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Video Editing",
    "provider": {
      "@type": "Organization",
      "name": "Siwaht"
    },
    "name": "AI-Enhanced Video Editing",
    "description": "Transform raw footage into polished videos with AI-powered editing. Cut, enhance, and produce professional content automatically.",
    "url": "https://siwaht.com#editing",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Video Editing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Intelligent Editing",
            "description": "AI automatically cuts, trims, and arranges your footage for optimal flow and engagement."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Auto Enhancement",
            "description": "AI automatically enhances color, audio, and lighting for professional-quality results."
          }
        }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Podcast Production",
    "provider": {
      "@type": "Organization",
      "name": "Siwaht"
    },
    "name": "AI Podcast Production",
    "description": "Create professional podcasts with AI hosts, automated editing, and intelligent content optimization. From concept to publishing.",
    "url": "https://siwaht.com#podcast",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Podcast Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Host Generation",
            "description": "Create engaging AI podcast hosts with unique personalities and natural conversation flow."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Optimization",
            "description": "AI analyzes and optimizes content structure for maximum listener engagement and retention."
          }
        }
      ]
    }
  }
];

export const breadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What AI services does Siwaht offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Siwaht offers professional AI services including AI Video Ad Creation, AI Avatar Creation, AI Voice Ads in 50+ languages, AI-Enhanced Video Editing, and AI Podcast Production."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to create AI video content?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our typical turnaround time is 72 hours for most projects. Fast turnaround options are available for urgent projects."
        }
      },
      {
        "@type": "Question",
        "name": "What languages are supported for AI voice ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support over 80 languages with native pronunciation and cultural nuances, ensuring your message resonates globally."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize AI avatars for my brand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer advanced customization for AI avatars including facial features, clothing, expressions, and personality traits to match your brand perfectly."
        }
      },
      {
        "@type": "Question",
        "name": "What video formats do you deliver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We deliver videos in multiple formats including MP4, WebM, and MOV, optimized for various platforms. All videos are available in up to 4K resolution."
        }
      }
    ]
  }
];

// Function to inject structured data into the page
export function injectStructuredData(data: any, id: string = 'structured-data') {
  // Remove existing script if it exists
  const existingScript = document.getElementById(id);
  if (existingScript) {
    existingScript.remove();
  }

  // Create and inject new script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Function to generate all structured data for the homepage
export function generateHomepageStructuredData() {
  const allData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationStructuredData,
      ...servicesStructuredData,
      ...faqStructuredData
    ]
  };
  
  return allData;
}