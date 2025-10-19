import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, ArrowRight, X } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const t = useTranslations();
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    navigateToResult,
    clearSearch,
    hasResults
  } = useSearch();

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case 'Enter':
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            navigateToResult(searchResults[selectedIndex]);
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, navigateToResult, onClose]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      clearSearch();
    }
  }, [isOpen, clearSearch]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'product':
        return '🥬';
      case 'farm':
        return '🚜';
      case 'experience':
        return '🌾';
      case 'page':
        return '📄';
      default:
        return '🔍';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'product':
        return t('products');
      case 'farm':
        return t('farms');
      case 'experience':
        return t('experiences');
      case 'page':
        return t('pages');
      default:
        return category;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              {t('search_platform')}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_products_farms_experiences')}
              className="pl-10 pr-4 h-12 text-lg"
              autoFocus
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {isSearching && (
            <div className="px-6 py-8 text-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-muted-foreground">{t('searching')}</p>
            </div>
          )}

          {!isSearching && hasResults && (
            <div className="py-2">
              {searchResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    navigateToResult(result);
                    onClose();
                  }}
                  className={cn(
                    "w-full px-6 py-3 text-left hover:bg-accent transition-colors flex items-center gap-4",
                    selectedIndex === index && "bg-accent"
                  )}
                >
                  <div className="text-2xl">{getCategoryIcon(result.category)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{result.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(result.category)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {result.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      {result.price && (
                        <span className="text-sm font-medium text-primary">
                          ₹{result.price}
                        </span>
                      )}
                      {result.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">
                            {result.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}

          {!isSearching && searchQuery && !hasResults && (
            <div className="px-6 py-8 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-medium mb-2">{t('no_results_found')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('try_different_keywords')}
              </p>
            </div>
          )}

          {!searchQuery && (
            <div className="px-6 py-8">
              <h3 className="font-medium mb-4">{t('popular_searches')}</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  t('organic_vegetables'),
                  t('fresh_fruits'),
                  t('farm_tours'),
                  t('cooking_classes'),
                  t('seasonal_produce'),
                  t('local_farms')
                ].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            {t('search_navigation_hint')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
