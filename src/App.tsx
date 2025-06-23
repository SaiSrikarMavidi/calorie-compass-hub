
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CalorieCalculator from "./pages/CalorieCalculator";
import RecipesLibrary from "./pages/RecipesLibrary";
import UploadImage from "./pages/UploadImage";
import SearchIngredients from "./pages/SearchIngredients";
import SavedMeals from "./pages/SavedMeals";
import NutritionalInsights from "./pages/NutritionalInsights";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<CalorieCalculator />} />
          <Route path="/recipes" element={<RecipesLibrary />} />
          <Route path="/upload" element={<UploadImage />} />
          <Route path="/search" element={<SearchIngredients />} />
          <Route path="/saved-meals" element={<SavedMeals />} />
          <Route path="/insights" element={<NutritionalInsights />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
