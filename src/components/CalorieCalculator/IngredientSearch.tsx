
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock food database - in real app this would come from API
const FOOD_DATABASE = [
  { id: 1, name: "Apple", calories: 52, unit: "100g" },
  { id: 2, name: "Banana", calories: 89, unit: "100g" },
  { id: 3, name: "Chicken Breast", calories: 165, unit: "100g" },
  { id: 4, name: "Rice (cooked)", calories: 130, unit: "100g" },
  { id: 5, name: "Broccoli", calories: 34, unit: "100g" },
  { id: 6, name: "Salmon", calories: 208, unit: "100g" },
  { id: 7, name: "Eggs", calories: 155, unit: "100g" },
  { id: 8, name: "Oats", calories: 389, unit: "100g" },
  { id: 9, name: "Almonds", calories: 579, unit: "100g" },
  { id: 10, name: "Greek Yogurt", calories: 59, unit: "100g" },
];

interface IngredientSearchProps {
  onAddIngredient: (ingredient: any) => void;
}

export function IngredientSearch({ onAddIngredient }: IngredientSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [quantity, setQuantity] = useState("100");

  const filteredFoods = FOOD_DATABASE.filter(food =>
    food.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAddIngredient = () => {
    if (selectedFood && quantity) {
      const quantityNum = parseFloat(quantity);
      const calculatedCalories = (selectedFood.calories * quantityNum) / 100;
      
      onAddIngredient({
        id: Date.now(), // Simple ID for demo
        name: selectedFood.name,
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
    }
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
              {selectedFood ? selectedFood.name : "Search for food..."}
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search food..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandEmpty>No food found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {filteredFoods.map((food) => (
                    <CommandItem
                      key={food.id}
                      value={food.name}
                      onSelect={() => {
                        setSelectedFood(food);
                        setSearchValue(food.name);
                        setOpen(false);
                      }}
                    >
                      <div className="flex justify-between w-full">
                        <span>{food.name}</span>
                        <span className="text-sm text-gray-500">
                          {food.calories} cal/100g
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
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
          />
          <span className="text-sm text-gray-600">g</span>
        </div>

        <Button onClick={handleAddIngredient} disabled={!selectedFood || !quantity}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
