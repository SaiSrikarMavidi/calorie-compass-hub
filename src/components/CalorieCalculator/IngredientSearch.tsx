import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Loader } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// USDA API configuration
const USDA_API_KEY = "BhT8P3xpq5W9ouInr2dgls7CRljufEaSEFKjSYI4";
const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

interface USDAFood {
  fdcId: number;
  description: string;
  foodNutrients: Array<{
    nutrientId: number;
    nutrientName: string;
    value: number;
    unitName: string;
  }>;
  foodCategory?: string;
  dataType: string;
}

interface SearchResult {
  fdcId: number;
  description: string;
  calories: number;
  category?: string;
}

interface IngredientSearchProps {
  onAddIngredient: (ingredient: any) => void;
}

export function IngredientSearch({ onAddIngredient }: IngredientSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFood, setSelectedFood] = useState<SearchResult | null>(null);
  const [quantity, setQuantity] = useState("100");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search function
  const debounceSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (query.trim() && query.length >= 2) {
            searchFoods(query);
          } else {
            setSearchResults([]);
          }
        }, 300);
      };
    })(),
    []
  );

  const searchFoods = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${USDA_BASE_URL}?query=${encodeURIComponent(query)}&api_key=${USDA_API_KEY}&pageSize=20&dataType=Foundation,SR%20Legacy`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const foods: USDAFood[] = data.foods || [];

      const processedResults: SearchResult[] = foods.map((food) => {
        // Find calories nutrient (Energy, nutrient ID 208)
        const calorieNutrient = food.foodNutrients.find(
          (nutrient) => nutrient.nutrientId === 208 || nutrient.nutrientName.toLowerCase().includes('energy')
        );

        const calories = calorieNutrient ? Math.round(calorieNutrient.value) : 0;

        return {
          fdcId: food.fdcId,
          description: food.description,
          calories,
          category: food.foodCategory || food.dataType,
        };
      });

      setSearchResults(processedResults);
    } catch (err) {
      console.error("USDA API Error:", err);
      setError("Failed to search foods. Please try again.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    debounceSearch(searchValue);
  }, [searchValue, debounceSearch]);

  const handleAddIngredient = () => {
    if (selectedFood && quantity) {
      const quantityNum = parseFloat(quantity);
      const calculatedCalories = (selectedFood.calories * quantityNum) / 100;
      
      onAddIngredient({
        id: Date.now(),
        name: selectedFood.description,
        quantity: quantityNum,
        unit: "g",
        caloriesPer100g: selectedFood.calories,
        totalCalories: calculatedCalories,
      });

      // Reset form
      setSelectedFood(null);
      setSearchValue("");
      setQuantity("100");
      setOpen(false);
      setSearchResults([]);
    }
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return "text-gray-500";
    
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('vegetable') || lowerCategory.includes('fruit')) return "text-green-600";
    if (lowerCategory.includes('meat') || lowerCategory.includes('poultry')) return "text-red-600";
    if (lowerCategory.includes('dairy')) return "text-blue-600";
    if (lowerCategory.includes('grain') || lowerCategory.includes('cereal')) return "text-yellow-600";
    return "text-gray-500";
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex-1 justify-between"
            >
              {selectedFood ? selectedFood.description.slice(0, 50) + (selectedFood.description.length > 50 ? '...' : '') : "Search for food..."}
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" style={{ width: 'var(--radix-popover-trigger-width)' }}>
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Type to search foods..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                {isLoading && (
                  <div className="flex items-center justify-center py-6">
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm text-gray-500">Searching foods...</span>
                  </div>
                )}

                {error && (
                  <div className="p-4 text-center">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {!isLoading && !error && searchResults.length === 0 && searchValue.length >= 2 && (
                  <CommandEmpty>
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">No foods found.</p>
                      <p className="text-xs text-gray-400">Try a different search term.</p>
                    </div>
                  </CommandEmpty>
                )}

                {!isLoading && searchResults.length > 0 && (
                  <CommandGroup>
                    {searchResults.map((food) => (
                      <CommandItem
                        key={food.fdcId}
                        value={food.description}
                        onSelect={() => {
                          setSelectedFood(food);
                          setSearchValue(food.description);
                          setOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex justify-between items-start w-full">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {food.description}
                            </div>
                            {food.category && (
                              <div className={`text-xs ${getCategoryColor(food.category)}`}>
                                {food.category}
                              </div>
                            )}
                          </div>
                          <div className="text-right ml-2 flex-shrink-0">
                            <div className="text-sm font-semibold">
                              {food.calories} cal
                            </div>
                            <div className="text-xs text-gray-500">per 100g</div>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-20"
            min="1"
          />
          <span className="text-sm text-gray-600">g</span>
        </div>

        <Button 
          onClick={handleAddIngredient} 
          disabled={!selectedFood || !quantity || parseFloat(quantity) <= 0}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {selectedFood && (
        <div className="p-3 bg-blue-50 rounded-lg border">
          <div className="text-sm">
            <strong>Selected:</strong> {selectedFood.description}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {selectedFood.calories} calories per 100g
            {selectedFood.category && ` • ${selectedFood.category}`}
          </div>
        </div>
      )}
    </div>
  );
}