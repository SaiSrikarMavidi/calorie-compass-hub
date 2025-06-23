
import { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, Loader, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DetectedIngredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  caloriesPer100g: number;
  totalCalories: number;
  confidence: number;
}

const UploadImage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [weight, setWeight] = useState("250");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState<DetectedIngredient[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock ingredient detection - replace with actual AI service
  const mockDetectIngredients = async (): Promise<DetectedIngredient[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    return [
      {
        id: 1,
        name: "Grilled chicken breast",
        quantity: 150,
        unit: "g",
        caloriesPer100g: 165,
        totalCalories: 248,
        confidence: 0.92
      },
      {
        id: 2,
        name: "Brown rice",
        quantity: 80,
        unit: "g",
        caloriesPer100g: 111,
        totalCalories: 89,
        confidence: 0.88
      },
      {
        id: 3,
        name: "Broccoli",
        quantity: 100,
        unit: "g",
        caloriesPer100g: 34,
        totalCalories: 34,
        confidence: 0.95
      },
      {
        id: 4,
        name: "Olive oil",
        quantity: 10,
        unit: "g",
        caloriesPer100g: 884,
        totalCalories: 88,
        confidence: 0.75
      }
    ];
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedImage(file);
      setDetectedIngredients([]);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded",
        description: "Ready to detect ingredients!",
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload an image file.",
        variant: "destructive",
      });
    }
  };

  const handleDetectIngredients = async () => {
    if (!selectedImage) return;

    setIsDetecting(true);
    try {
      const ingredients = await mockDetectIngredients();
      setDetectedIngredients(ingredients);
      toast({
        title: "Ingredients detected!",
        description: `Found ${ingredients.length} ingredients in your meal.`,
      });
    } catch (error) {
      toast({
        title: "Detection failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleAddToCalculator = () => {
    if (detectedIngredients.length === 0) return;

    // Store detected ingredients in sessionStorage to pass to calculator
    sessionStorage.setItem('detectedIngredients', JSON.stringify(detectedIngredients));
    
    toast({
      title: "Added to calculator",
      description: "Redirecting to calorie calculator...",
    });

    // Navigate to calculator page
    setTimeout(() => {
      navigate('/calculator');
    }, 1000);
  };

  const totalDetectedCalories = detectedIngredients.reduce((sum, ingredient) => sum + ingredient.totalCalories, 0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Upload Food Image</h1>
          </div>
          <p className="text-lg text-gray-600">
            Take a photo of your meal and let AI detect the ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Drag and Drop Area */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Food preview"
                        className="max-w-full max-h-64 mx-auto rounded-lg object-cover"
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                          setDetectedIngredients([]);
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Drop your food image here
                        </p>
                        <p className="text-sm text-gray-500">
                          or click to browse files
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" className="cursor-pointer">
                          Browse Files
                        </Button>
                      </label>
                    </div>
                  )}
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <Label htmlFor="weight">Estimated Total Weight (optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="250"
                      className="flex-1"
                    />
                    <span className="flex items-center text-sm text-gray-600 px-3">g</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    This helps improve ingredient quantity detection
                  </p>
                </div>

                {/* Detect Button */}
                <Button
                  onClick={handleDetectIngredients}
                  disabled={!selectedImage || isDetecting}
                  className="w-full"
                  size="lg"
                >
                  {isDetecting ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Detecting Ingredients...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Detect Ingredients
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Detected Ingredients</span>
                  {detectedIngredients.length > 0 && (
                    <Button onClick={handleAddToCalculator} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Add to Calculator
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {detectedIngredients.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Camera className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p>No ingredients detected yet</p>
                    <p className="text-sm">Upload an image and click "Detect Ingredients"</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {detectedIngredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{ingredient.name}</div>
                          <div className="text-sm text-gray-600">
                            {ingredient.quantity}{ingredient.unit} • {Math.round(ingredient.confidence * 100)}% confidence
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{Math.round(ingredient.totalCalories)} cal</div>
                          <div className="text-xs text-gray-500">
                            {ingredient.caloriesPer100g} cal/100g
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total Calories:</span>
                        <span className="text-primary">{Math.round(totalDetectedCalories)} cal</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle>Tips for Better Detection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• Take photos in good lighting</p>
                <p>• Keep ingredients visible and separated</p>
                <p>• Avoid overlapping or hidden foods</p>
                <p>• Include a reference object for scale</p>
                <p>• Multiple angles can improve accuracy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadImage;
