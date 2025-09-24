import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mic, 
  Video, 
  Type, 
  BookOpen, 
  History, 
  Heart, 
  User, 
  Bell,
  HelpCircle,
  Zap
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('signOnUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const quickActions = [
    {
      title: "Audio to ISL",
      description: "Speak and get ISL translation",
      icon: Mic,
      color: "from-primary to-primary-glow",
      route: "/audio-to-isl"
    },
    {
      title: "Video to ISL", 
      description: "Upload video for ISL conversion",
      icon: Video,
      color: "from-secondary to-accent",
      route: "/video-to-isl"
    },
    {
      title: "Text to ISL",
      description: "Type text and see ISL signs",
      icon: Type,
      color: "from-accent to-primary",
      route: "/text-to-isl"
    },
    {
      title: "Learn ISL",
      description: "Dictionary, lessons & practice",
      icon: BookOpen,
      color: "from-success to-accent",
      route: "/learn"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/80 text-sm">
              {greeting} 👋
            </p>
            <h1 className="text-2xl font-bold">
              {user?.islName || user?.name || "Welcome"}
            </h1>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate("/profile")}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-white/90 text-sm">
            Ready to bridge voices with signs today?
          </p>
        </div>
      </header>

      <div className="p-6">
        {/* Quick Access */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-accent" />
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="card-feature cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate(action.route)}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">
                    {action.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/history")}
            >
              View All
            </Button>
          </div>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Your translations will appear here
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate("/text-to-isl")}
                >
                  Start Your First Translation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Progress */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">ISL Dictionary</h3>
                  <p className="text-sm text-muted-foreground">
                    0 words learned
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div className="bg-gradient-to-r from-accent to-primary h-2 rounded-full w-0" />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/learn")}
              >
                Start Learning ISL
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-24 right-6 rounded-full w-16 h-16 btn-hero shadow-2xl"
        onClick={() => navigate("/audio-to-isl")}
      >
        <Mic className="w-6 h-6" />
      </Button>

      <BottomNavigation />
    </div>
  );
};

export default Home;