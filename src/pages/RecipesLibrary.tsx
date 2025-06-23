import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Clock, Users, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Recipe {
  id: number;
  name: string;
  image: string;
  totalCalories: number;
  servings: number;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  ingredients: Array<{
    id: number;
    name: string;
    quantity: number;
    unit: string;
    caloriesPer100g: number;
    totalCalories: number;
  }>;
  instructions: string[];
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: "Grilled Chicken & Quinoa Bowl",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    totalCalories: 485,
    servings: 2,
    cookTime: "25 min",
    difficulty: "Easy",
    tags: ["High Protein", "Gluten Free", "Healthy"],
    ingredients: [
      { id: 1, name: "Chicken breast", quantity: 200, unit: "g", caloriesPer100g: 165, totalCalories: 330 },
      { id: 2, name: "Quinoa (cooked)", quantity: 150, unit: "g", caloriesPer100g: 120, totalCalories: 180 },
      { id: 3, name: "Broccoli", quantity: 100, unit: "g", caloriesPer100g: 34, totalCalories: 34 },
      { id: 4, name: "Olive oil", quantity: 10, unit: "ml", caloriesPer100g: 884, totalCalories: 88 },
    ],
    instructions: [
      "Season chicken breast with salt, pepper, and herbs",
      "Grill chicken for 6-7 minutes per side until cooked through",
      "Cook quinoa according to package instructions",
      "Steam broccoli until tender-crisp",
      "Slice chicken and serve over quinoa with broccoli",
      "Drizzle with olive oil and enjoy!"
    ],
    macros: { protein: 45, carbs: 32, fat: 12, fiber: 8 }
  },
  {
    id: 2,
    name: "Salmon Avocado Salad",
    image: "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400",
    totalCalories: 420,
    servings: 1,
    cookTime: "15 min",
    difficulty: "Easy",
    tags: ["Omega-3", "Low Carb", "Keto Friendly"],
    ingredients: [
      { id: 1, name: "Salmon fillet", quantity: 150, unit: "g", caloriesPer100g: 208, totalCalories: 312 },
      { id: 2, name: "Avocado", quantity: 80, unit: "g", caloriesPer100g: 160, totalCalories: 128 },
      { id: 3, name: "Mixed greens", quantity: 50, unit: "g", caloriesPer100g: 20, totalCalories: 10 },
      { id: 4, name: "Lemon juice", quantity: 15, unit: "ml", caloriesPer100g: 22, totalCalories: 3 },
    ],
    instructions: [
      "Season salmon with salt, pepper, and lemon",
      "Pan-sear salmon for 4-5 minutes per side",
      "Slice avocado and arrange on mixed greens",
      "Flake cooked salmon over salad",
      "Drizzle with lemon juice and serve"
    ],
    macros: { protein: 35, carbs: 8, fat: 28, fiber: 7 }
  },
  {
    id: 3,
    name: "Vegetarian Buddha Bowl",
    image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
    totalCalories: 380,
    servings: 1,
    cookTime: "30 min",
    difficulty: "Medium",
    tags: ["Vegetarian", "High Fiber", "Colorful"],
    ingredients: [
      { id: 1, name: "Sweet potato", quantity: 120, unit: "g", caloriesPer100g: 86, totalCalories: 103 },
      { id: 2, name: "Chickpeas", quantity: 80, unit: "g", caloriesPer100g: 164, totalCalories: 131 },
      { id: 3, name: "Spinach", quantity: 60, unit: "g", caloriesPer100g: 23, totalCalories: 14 },
      { id: 4, name: "Tahini", quantity: 20, unit: "g", caloriesPer100g: 595, totalCalories: 119 },
    ],
    instructions: [
      "Roast cubed sweet potato at 400°F for 25 minutes",
      "Sauté chickpeas with spices until crispy",
      "Massage spinach with a pinch of salt",
      "Arrange all ingredients in a bowl",
      "Drizzle with tahini dressing"
    ],
    macros: { protein: 15, carbs: 45, fat: 14, fiber: 12 }
  },
  {
    id: 4,
    name: "Greek Yogurt Parfait",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400",
    totalCalories: 285,
    servings: 1,
    cookTime: "5 min",
    difficulty: "Easy",
    tags: ["Breakfast", "High Protein", "Quick"],
    ingredients: [
      { id: 1, name: "Greek yogurt", quantity: 150, unit: "g", caloriesPer100g: 59, totalCalories: 89 },
      { id: 2, name: "Mixed berries", quantity: 80, unit: "g", caloriesPer100g: 57, totalCalories: 46 },
      { id: 3, name: "Granola", quantity: 30, unit: "g", caloriesPer100g: 471, totalCalories: 141 },
      { id: 4, name: "Honey", quantity: 15, unit: "g", caloriesPer100g: 304, totalCalories: 46 },
    ],
    instructions: [
      "Layer half the yogurt in a glass or bowl",
      "Add half the berries and granola",
      "Repeat layers",
      "Drizzle with honey",
      "Serve immediately"
    ],
    macros: { protein: 18, carbs: 42, fat: 6, fiber: 5 }
  },
  {
    id: 5,
    name: "Turkey & Sweet Potato Hash",
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400",
    totalCalories: 445,
    servings: 2,
    cookTime: "35 min",
    difficulty: "Medium",
    tags: ["High Protein", "Comfort Food", "Filling"],
    ingredients: [
      { id: 1, name: "Ground turkey", quantity: 150, unit: "g", caloriesPer100g: 189, totalCalories: 284 },
      { id: 2, name: "Sweet potato", quantity: 200, unit: "g", caloriesPer100g: 86, totalCalories: 172 },
      { id: 3, name: "Bell pepper", quantity: 80, unit: "g", caloriesPer100g: 31, totalCalories: 25 },
      { id: 4, name: "Onion", quantity: 60, unit: "g", caloriesPer100g: 40, totalCalories: 24 },
    ],
    instructions: [
      "Dice sweet potatoes and roast until tender",
      "Brown ground turkey in a large skillet",
      "Add diced peppers and onions",
      "Combine with roasted sweet potatoes",
      "Season with herbs and spices",
      "Cook until everything is heated through"
    ],
    macros: { protein: 28, carbs: 35, fat: 8, fiber: 6 }
  },
  {
    id: 6,
    name: "Protein Smoothie Bowl",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400",
    totalCalories: 320,
    servings: 1,
    cookTime: "10 min",
    difficulty: "Easy",
    tags: ["Post-Workout", "High Protein", "Refreshing"],
    ingredients: [
      { id: 1, name: "Protein powder", quantity: 30, unit: "g", caloriesPer100g: 400, totalCalories: 120 },
      { id: 2, name: "Banana", quantity: 100, unit: "g", caloriesPer100g: 89, totalCalories: 89 },
      { id: 3, name: "Almond milk", quantity: 200, unit: "ml", caloriesPer100g: 17, totalCalories: 34 },
      { id: 4, name: "Chia seeds", quantity: 15, unit: "g", caloriesPer100g: 486, totalCalories: 73 },
    ],
    instructions: [
      "Blend protein powder, banana, and almond milk",
      "Pour into a bowl",
      "Top with chia seeds and fresh fruit",
      "Add any additional toppings",
      "Enjoy immediately"
    ],
    macros: { protein: 25, carbs: 28, fat: 8, fiber: 9 }
  }
];

const RecipesLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredRecipes(mockRecipes);
    } else {
      const filtered = mockRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(term.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredRecipes(filtered);
    }
  };

  const handleCopyToCalculator = (recipe: Recipe) => {
    // Store recipe ingredients in sessionStorage to pass to calculator
    sessionStorage.setItem('detectedIngredients', JSON.stringify(recipe.ingredients));
    
    toast({
      title: "Recipe added to calculator!",
      description: `${recipe.name} ingredients have been added to your meal calculator.`,
    });

    // Navigate to calculator page
    setTimeout(() => {
      navigate('/calculator');
    }, 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (selectedRecipe) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Button 
            variant="outline" 
            onClick={() => setSelectedRecipe(null)}
            className="mb-6"
          >
            ← Back to Recipes
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Facts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Calories:</span> {selectedRecipe.totalCalories}
                    </div>
                    <div>
                      <span className="font-medium">Servings:</span> {selectedRecipe.servings}
                    </div>
                    <div>
                      <span className="font-medium">Protein:</span> {selectedRecipe.macros.protein}g
                    </div>
                    <div>
                      <span className="font-medium">Carbs:</span> {selectedRecipe.macros.carbs}g
                    </div>
                    <div>
                      <span className="font-medium">Fat:</span> {selectedRecipe.macros.fat}g
                    </div>
                    <div>
                      <span className="font-medium">Fiber:</span> {selectedRecipe.macros.fiber}g
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">{selectedRecipe.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{selectedRecipe.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{selectedRecipe.servings} servings</span>
                  </div>
                  <Badge className={getDifficultyColor(selectedRecipe.difficulty)}>
                    {selectedRecipe.difficulty}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedRecipe.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <Button 
                  onClick={() => handleCopyToCalculator(selectedRecipe)}
                  className="w-full mb-6"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Add to Calorie Calculator
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient) => (
                      <li key={ingredient.id} className="flex justify-between">
                        <span>{ingredient.quantity}{ingredient.unit} {ingredient.name}</span>
                        <span className="text-sm text-gray-600">{ingredient.totalCalories} cal</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Recipe Library</h1>
          </div>
          <p className="text-lg text-gray-600">
            Discover healthy recipes with detailed nutritional information
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search recipes or tags..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${getDifficultyColor(recipe.difficulty)}`}
                >
                  {recipe.difficulty}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{recipe.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {recipe.cookTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {recipe.servings} servings
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-primary">{recipe.totalCalories}</span>
                  <span className="text-sm text-gray-600">calories</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">P:</span> {recipe.macros.protein}g
                  </div>
                  <div>
                    <span className="font-medium">C:</span> {recipe.macros.carbs}g
                  </div>
                  <div>
                    <span className="font-medium">F:</span> {recipe.macros.fat}g
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {recipe.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{recipe.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all recipes.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecipesLibrary;