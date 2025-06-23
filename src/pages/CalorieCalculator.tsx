
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const CalorieCalculator = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Calorie Calculator</h1>
          </div>
          <p className="text-lg text-gray-600">
            Calculate calories and nutrients for your meals
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculator Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Our advanced calorie calculator will help you track the nutritional content of your meals with precision.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Comprehensive food database</li>
                  <li>Macro and micronutrient tracking</li>
                  <li>Portion size calculations</li>
                  <li>Custom recipe analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CalorieCalculator;
