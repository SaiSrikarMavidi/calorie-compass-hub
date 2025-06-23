
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

const UploadImage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Upload className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Upload Food Image</h1>
          </div>
          <p className="text-lg text-gray-600">
            Upload photos of your meals for instant nutritional analysis
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Image Recognition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Food Photo</h3>
              <p className="text-gray-600 mb-6">
                Drag and drop your food image here, or click to browse files
              </p>
              <Button>Choose File</Button>
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-blue-900">How it works:</h3>
              <ol className="list-decimal list-inside space-y-1 text-blue-800">
                <li>Upload a clear photo of your meal</li>
                <li>Our AI identifies the food items</li>
                <li>Get instant nutritional breakdown</li>
                <li>Save to your meal history</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UploadImage;
