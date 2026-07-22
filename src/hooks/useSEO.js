import { useEffect } from 'react';

// Custom hook to dynamically manage page SEO metadata and title tags.
function useSEO({ title, description }) {
  useEffect(() => {
    // 1. Update tab title
    const baseTitle = 'Jawla - Explore Egypt';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // 2. Update meta description dynamically
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    const fallbackDesc = 'Plan your personalized Egypt itinerary with our AI Trip Planner, book certified Egyptologist tour guides, and discover ancient temples.';
    metaDescription.setAttribute('content', description || fallbackDesc);

    // 3. Update OG title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title || baseTitle);

    // 4. Update OG description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description || fallbackDesc);

  }, [title, description]);
}

export default useSEO;
