
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Calculator, BookOpen, Upload, Search, Heart, BarChart3, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Calculator", href: "/calculator", icon: Calculator },
  { name: "Recipes", href: "/recipes", icon: BookOpen },
  { name: "Upload Image", href: "/upload", icon: Upload },
  { name: "Search", href: "/search", icon: Search },
  { name: "Saved Meals", href: "/saved-meals", icon: Heart },
  { name: "Insights", href: "/insights", icon: BarChart3 },
];

const userItems = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const NavLink = ({ item, onClick }: { item: any; onClick?: () => void }) => {
    const isActive = location.pathname === item.href;
    return (
      <Link
        to={item.href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
          "hover:bg-gray-50 hover:text-gray-900",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        <item.icon size={18} />
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between w-full px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-semibold text-xl text-gray-900">NutriTrack</span>
          </Link>
          
          <div className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {userItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
          <div className="flex items-center gap-2 ml-4">
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between w-full px-4 py-4 bg-white border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="font-semibold text-lg text-gray-900">NutriTrack</span>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-gray-900 mb-2">Navigation</h3>
                {navigationItems.map((item) => (
                  <NavLink key={item.name} item={item} onClick={() => setIsOpen(false)} />
                ))}
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-gray-900 mb-2">Account</h3>
                {userItems.map((item) => (
                  <NavLink key={item.name} item={item} onClick={() => setIsOpen(false)} />
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <Button asChild variant="ghost" onClick={() => setIsOpen(false)}>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}
