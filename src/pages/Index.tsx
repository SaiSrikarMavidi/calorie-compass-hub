
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Upload, BookOpen, BarChart3, ArrowRight } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Calculator,
      title: "Calorie Calculator",
      description: "Calculate calories and nutrients for your meals instantly",
      href: "/calculator",
    },
    {
      icon: Upload,
      title: "Image Recognition",
      description: "Upload food photos to get instant nutritional analysis",
      href: "/upload",
    },
    {
      icon: BookOpen,
      title: "Recipe Library",
      description: "Discover healthy recipes with detailed nutritional information",
      href: "/recipes",
    },
    {
      icon: BarChart3,
      title: "Nutrition Insights",
      description: "Track your progress with detailed analytics and reports",
      href: "/insights",
    },
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Smart Nutrition
                <span className="text-primary"> Tracking</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Discover the nutritional value of your meals with AI-powered image recognition, 
                comprehensive calorie tracking, and personalized insights to help you achieve your health goals.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link to="/calculator" className="flex items-center gap-2">
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/upload">Try Image Upload</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to track nutrition
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Comprehensive tools to help you understand and improve your nutritional habits
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
                {features.map((feature) => (
                  <Link
                    key={feature.title}
                    to={feature.href}
                    className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon 
                        className="h-5 w-5 flex-none text-primary group-hover:scale-110 transition-transform duration-200" 
                        aria-hidden="true" 
                      />
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                      <p className="mt-6">
                        <span className="text-sm font-semibold text-primary group-hover:underline">
                          Learn more <span aria-hidden="true">→</span>
                        </span>
                      </p>
                    </dd>
                  </Link>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
