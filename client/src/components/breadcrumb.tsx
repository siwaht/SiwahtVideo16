import { ChevronRight, Home } from "lucide-react";
import { breadcrumbStructuredData, injectStructuredData } from "@/lib/seo-structured-data";
import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  // Default breadcrumb for homepage
  const defaultItems: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "AI Services", isActive: true }
  ];

  const breadcrumbItems = items || defaultItems;

  useEffect(() => {
    // Generate structured data for breadcrumbs
    const structuredItems = breadcrumbItems
      .filter(item => item.url)
      .map(item => ({
        name: item.name,
        url: `https://siwaht.com${item.url}`
      }));

    if (structuredItems.length > 0) {
      const data = breadcrumbStructuredData(structuredItems);
      injectStructuredData(data, 'breadcrumb-structured-data');
    }
  }, [breadcrumbItems]);

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`bg-white/80 backdrop-blur-sm border-b border-slate-200/50 ${className}`}
    >
      <div className="container-custom py-2">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === 0 && (
                <Home className="h-4 w-4 text-slate-500 mr-1" aria-hidden="true" />
              )}
              {item.url && !item.isActive ? (
                <a 
                  href={item.url}
                  className="text-slate-600 hover:text-primary transition-colors touch-manipulation min-h-[44px] flex items-center"
                  aria-label={`Navigate to ${item.name}`}
                >
                  {item.name}
                </a>
              ) : (
                <span 
                  className={`${item.isActive ? 'text-slate-900 font-medium' : 'text-slate-600'}`}
                  aria-current={item.isActive ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight className="h-4 w-4 text-slate-400 mx-2" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}