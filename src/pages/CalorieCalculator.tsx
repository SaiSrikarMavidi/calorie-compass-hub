import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, AlertTriangle } from "lucide-react";
import { IngredientSearch } from "@/components/CalorieCalculator/IngredientSearch";
import { IngredientsList } from "@/components/CalorieCalculator/IngredientsList";
import { CalorieSummary } from "@/components/CalorieCalculator/CalorieSummary";
import { useToast } from "@/hooks/use-toast";

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  caloriesPer100g: number;
  totalCalories: number;
}

const CalorieCalculator = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { toast } = useToast();

  // Check for detected ingredients from upload page
  useEffect(() => {
    const detectedIngredientsData = sessionStorage.getItem('detectedIngredients');
    if (detectedIngredientsData) {
      try {
        const detectedIngredients = JSON.parse(detectedIngredientsData);
        setIngredients(detectedIngredients);
        sessionStorage.removeItem('detectedIngredients'); // Clear after using
        toast({
          title: "Ingredients imported!",
          description: `Added ${detectedIngredients.length} detected ingredients to your meal.`,
        });
      } catch (error) {
        console.error('Error parsing detected ingredients:', error);
      }
    }
  }, [toast]);

  const handleAddIngredient = (ingredient: Ingredient) => {
    setIngredients(prev => [...prev, ingredient]);
    toast({
      title: "Ingredient Added",
      description: `${ingredient.name} has been added to your meal.`,
    });
  };

  const handleRemoveIngredient = (id: number) => {
    setIngredients(prev => prev.filter(ingredient => ingredient.id !== id));
    toast({
      title: "Ingredient Removed",
      description: "Ingredient has been removed from your meal.",
    });
  };

  const handleSaveMeal = () => {
    if (ingredients.length === 0) return;
    
    // In a real app, this would save to backend/localStorage
    const meal = {
      id: Date.now(),
      name: `Meal ${new Date().toLocaleDateString()}`,
      ingredients,
      totalCalories: totalCalories,
      createdAt: new Date().toISOString(),
    };

    // For demo, just save to localStorage
    const savedMeals = JSON.parse(localStorage.getItem('savedMeals') || '[]');
    savedMeals.push(meal);
    localStorage.setItem('savedMeals', JSON.stringify(savedMeals));

    toast({
      title: "Meal Saved!",
      description: `Your meal with ${totalCalories} calories has been saved.`,
    });

    // Clear the current meal
    setIngredients([]);
  };

  const totalCalories = ingredients.reduce((sum, ingredient) => sum + ingredient.totalCalories, 0);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Calorie Calculator</h1>
          </div>
          <p className="text-lg text-gray-600">
            Add ingredients to calculate the total calories in your meal
          </p>
        </div>

        {/* API Key Notice */}
        <div className="mb-6">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 mb-1">USDA API Key Required</p>
                  <p className="text-yellow-700">
                    To use live food data, replace "DEMO_KEY" in IngredientSearch.tsx with your free USDA API key from{" "}
                    <a 
                      href="https://fdc.nal.usda.gov/api-guide.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      https://fdc.nal.usda.gov/api-guide.html
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Add Ingredients */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <IngredientSearch onAddIngredient={handleAddIngredient} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Meal</CardTitle>
              </CardHeader>
              <CardContent>
                <IngredientsList
                  ingredients={ingredients}
                  onRemoveIngredient={handleRemoveIngredient}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <CalorieSummary
              totalCalories={totalCalories}
              ingredientCount={ingredients.length}
              onSaveMeal={handleSaveMeal}
            />

            <Card>
              <CardHeader>
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">💡 Pro Tips:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Use a kitchen scale for accurate measurements</li>
                    <li>• Include cooking oils and seasonings</li>
                    <li>• Raw vs cooked weights can vary significantly</li>
                    <li>• Save frequent meals for quick access</li>
                    <li>• Search works best with 2+ characters</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalorieCalculator;