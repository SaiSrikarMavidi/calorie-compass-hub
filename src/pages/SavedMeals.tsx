
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

const SavedMeals = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Saved Meals</h1>
          </div>
          <p className="text-lg text-gray-600">
            Your favorite meals and their nutritional information
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meal History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No saved meals yet</h3>
              <p className="text-gray-600">
                Start tracking your meals to see them here. You can save meals from the calculator or image upload features.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SavedMeals;
