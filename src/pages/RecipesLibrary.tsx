
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const RecipesLibrary = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Recipe Collection Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Browse through our curated collection of healthy recipes, each with complete nutritional breakdowns.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Recipe Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Detailed ingredient lists</li>
                  <li>Step-by-step instructions</li>
                  <li>Complete nutritional analysis</li>
                  <li>Dietary restriction filters</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Categories:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Low-carb & Keto</li>
                  <li>Vegetarian & Vegan</li>
                  <li>High-protein meals</li>
                  <li>Quick & easy recipes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RecipesLibrary;
