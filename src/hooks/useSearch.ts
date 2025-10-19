import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Search data interfaces
interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'product' | 'farm' | 'experience' | 'page';
  url: string;
  image?: string;
  price?: number;
  rating?: number;
}

// Helper function to get translations
const useTranslations = () => {
  const [t, setT] = useState<(key: string) => string>(() => (key: string) => key);

  useEffect(() => {
    const updateT = () => {
      setT(() => (window as any).__i18n?.t || ((key: string) => key));
    };
    
    updateT();
    window.addEventListener('langchange', updateT);
    return () => window.removeEventListener('langchange', updateT);
  }, []);

  return t;
};

// Mock search data - in a real app this would come from API
const getSearchData = (t: (key: string) => string): SearchResult[] => [
  // Products
  {
    id: 'product-1',
    title: t('product.1.name'),
    description: 'Fresh organic strawberries from local farms',
    category: 'product',
    url: '/product/1',
    image: '/assets/strawberries.jpg',
    price: 200,
    rating: 4.8
  },
  {
    id: 'product-2',
    title: t('product.2.name'),
    description: 'Fresh tomatoes from organic farms',
    category: 'product',
    url: '/product/2',
    image: '/assets/indian-vegetables.jpg',
    price: 60,
    rating: 4.5
  },
  {
    id: 'product-3',
    title: t('product.3.name'),
    description: 'Fresh green vegetables bundle',
    category: 'product',
    url: '/product/3',
    image: '/assets/vegetables-market.jpg',
    price: 80,
    rating: 4.6
  },
  {
    id: 'product-4',
    title: t('product.4.name'),
    description: 'Premium Alphonso mangoes',
    category: 'product',
    url: '/product/4',
    image: '/assets/indian-mangoes.jpg',
    price: 300,
    rating: 4.9
  },

  // Farms
  {
    id: 'farm-1',
    title: t('farm.1.name'),
    description: 'Organic farming with sustainable practices',
    category: 'farm',
    url: '/farm/1',
    image: '/assets/indian-farmer.jpg',
    rating: 4.8
  },
  {
    id: 'farm-2',
    title: t('farm.2.name'),
    description: 'Traditional farming methods with modern techniques',
    category: 'farm',
    url: '/farm/2',
    image: '/assets/indian-farm-tour.jpg',
    rating: 4.7
  },

  // Experiences
  {
    id: 'experience-1',
    title: t('experience.1.title'),
    description: 'Learn organic farming and cooking',
    category: 'experience',
    url: '/experience/1',
    image: '/assets/farm-experience.jpg',
    price: 500,
    rating: 4.9
  },
  {
    id: 'experience-2',
    title: t('experience.2.title'),
    description: 'Harvest vegetables and cook traditional meals',
    category: 'experience',
    url: '/experience/2',
    image: '/assets/indian-farm-tour.jpg',
    price: 750,
    rating: 4.8
  },

  // Pages
  {
    id: 'page-about',
    title: t('about.title'),
    description: 'Learn about our mission and values',
    category: 'page',
    url: '/about'
  },
  {
    id: 'page-sustainability',
    title: t('sustainability.title'),
    description: 'Our commitment to environmental sustainability',
    category: 'page',
    url: '/sustainability'
  },
  {
    id: 'page-how-it-works',
    title: t('how_it_works.title'),
    description: 'How our farm-to-table platform works',
    category: 'page',
    url: '/how-it-works'
  },
  {
    id: 'page-careers',
    title: t('careers.title'),
    description: 'Join our team and make a difference',
    category: 'page',
    url: '/careers'
  },
  {
    id: 'page-contact',
    title: t('contact.title'),
    description: 'Get in touch with us',
    category: 'page',
    url: '/contact'
  },
  {
    id: 'page-faq',
    title: t('faq.title'),
    description: 'Frequently asked questions and answers',
    category: 'page',
    url: '/faq'
  }
];

export function useSearch() {
  const t = useTranslations();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, t]);

  const performSearch = (query: string) => {
    setIsSearching(true);
    const searchData = getSearchData(t);
    
    const filteredResults = searchData.filter(item => {
      const searchText = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        (item.category === 'product' && (
          searchText.includes('organic') ||
          searchText.includes('fresh') ||
          searchText.includes('vegetable') ||
          searchText.includes('fruit')
        )) ||
        (item.category === 'farm' && (
          searchText.includes('farm') ||
          searchText.includes('organic') ||
          searchText.includes('sustainable')
        )) ||
        (item.category === 'experience' && (
          searchText.includes('experience') ||
          searchText.includes('tour') ||
          searchText.includes('cooking') ||
          searchText.includes('harvest')
        ))
      );
    });

    // Sort results by relevance
    const sortedResults = filteredResults.sort((a, b) => {
      const aScore = getRelevanceScore(a, query);
      const bScore = getRelevanceScore(b, query);
      return bScore - aScore;
    });

    setSearchResults(sortedResults.slice(0, 8)); // Limit to 8 results
    setIsSearching(false);
  };

  const getRelevanceScore = (item: SearchResult, query: string): number => {
    let score = 0;
    const searchText = query.toLowerCase();
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();

    // Exact title match gets highest score
    if (title === searchText) score += 100;
    
    // Title contains query gets high score
    if (title.includes(searchText)) score += 50;
    
    // Description contains query gets medium score
    if (description.includes(searchText)) score += 25;
    
    // Category bonus
    if (item.category === 'product') score += 10;
    if (item.category === 'experience') score += 8;
    if (item.category === 'farm') score += 6;
    
    // Rating bonus
    if (item.rating) score += item.rating;

    return score;
  };

  const navigateToResult = (result: SearchResult) => {
    navigate(result.url);
    setSearchQuery('');
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    navigateToResult,
    clearSearch,
    hasResults: searchResults.length > 0
  };
}
