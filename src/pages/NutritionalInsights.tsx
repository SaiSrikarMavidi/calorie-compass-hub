
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const NutritionalInsights = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Nutritional Insights</h1>
          </div>
          <p className="text-lg text-gray-600">
            Track your progress with detailed analytics and reports
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Daily Calories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 / 2000</div>
              <p className="text-sm text-gray-600">kcal</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Protein</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 / 150</div>
              <p className="text-sm text-gray-600">grams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Water Intake</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 / 8</div>
              <p className="text-sm text-gray-600">glasses</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start tracking to see insights</h3>
              <p className="text-gray-600">
                Your nutritional data and progress charts will appear here once you start logging meals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NutritionalInsights;
