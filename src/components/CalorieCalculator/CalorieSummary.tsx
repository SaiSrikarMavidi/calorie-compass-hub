
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface CalorieSummaryProps {
  totalCalories: number;
  ingredientCount: number;
  onSaveMeal: () => void;
}

export function CalorieSummary({ totalCalories, ingredientCount, onSaveMeal }: CalorieSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Nutrition Summary</span>
          <Button
            onClick={onSaveMeal}
            disabled={ingredientCount === 0}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Save Meal
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {Math.round(totalCalories)}
            </div>
            <div className="text-sm text-gray-600">Total Calories</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {ingredientCount}
            </div>
            <div className="text-sm text-gray-600">Ingredients</div>
          </div>
        </div>
        
        {totalCalories > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Quick Facts:</strong> This meal provides approximately{" "}
              {Math.round((totalCalories / 2000) * 100)}% of a 2000-calorie daily diet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
