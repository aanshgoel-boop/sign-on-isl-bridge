import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, History, Heart, User, BookOpen } from "lucide-react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/history", icon: History, label: "History" },
    { path: "/favorites", icon: Heart, label: "Favorites" },
    { path: "/learn", icon: BookOpen, label: "Learn" },
    { path: "/profile", icon: User, label: "Profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 px-2 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex-col h-14 px-3 py-1 hover:bg-primary/10 transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground'
              }`}
              onClick={() => navigate(item.path)}
            >
              <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'animate-scale-in' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;