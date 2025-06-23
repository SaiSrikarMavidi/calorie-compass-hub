
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchIngredients = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Search Ingredients</h1>
          </div>
          <p className="text-lg text-gray-600">
            Find nutritional information for thousands of ingredients
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ingredient Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input 
                placeholder="Search for an ingredient (e.g., chicken breast, broccoli, quinoa)" 
                className="flex-1"
              />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Chicken Breast", "Salmon", "Broccoli", "Quinoa",
                "Sweet Potato", "Avocado", "Greek Yogurt", "Almonds"
              ].map((ingredient) => (
                <Button key={ingredient} variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <div className="font-medium">{ingredient}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SearchIngredients;
