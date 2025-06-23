
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  caloriesPer100g: number;
  totalCalories: number;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  onRemoveIngredient: (id: number) => void;
}

export function IngredientsList({ ingredients, onRemoveIngredient }: IngredientsListProps) {
  if (ingredients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No ingredients added yet</p>
        <p className="text-sm">Search and add ingredients to start calculating calories</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Cal/100g</TableHead>
            <TableHead>Total Calories</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell className="font-medium">{ingredient.name}</TableCell>
              <TableCell>{ingredient.quantity}{ingredient.unit}</TableCell>
              <TableCell>{ingredient.caloriesPer100g}</TableCell>
              <TableCell className="font-semibold">
                {Math.round(ingredient.totalCalories)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveIngredient(ingredient.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
