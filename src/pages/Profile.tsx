import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  User, 
  Settings, 
  Shield, 
  Bell, 
  HelpCircle, 
  LogOut, 
  Edit,
  Crown,
  MapPin,
  Calendar,
  Briefcase,
  Mail,
  Phone,
  Star,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('signOnUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('signOnUser');
    localStorage.removeItem('signOnHistory');
    localStorage.removeItem('signOnFavorites');
    localStorage.removeItem('signOnOnboarding');
    
    toast({
      title: "Logged out successfully",
      description: "See you soon!"
    });
    
    // Refresh the page to restart the app flow
    window.location.reload();
  };

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      toast({
        title: "Admin access granted",
        description: "Welcome to the admin panel"
      });
      navigate("/admin");
    } else {
      toast({
        title: "Access denied",
        description: "Invalid admin credentials",
        variant: "destructive"
      });
    }
    setAdminPassword("");
    setShowAdminLogin(false);
  };

  const profileStats = [
    { label: "Translations", value: "47", icon: Zap, color: "text-primary" },
    { label: "Words Learned", value: "23", icon: Star, color: "text-accent" },
    { label: "Streak Days", value: "5", icon: Crown, color: "text-warning" }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <User className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user.islName || user.name}</h2>
            <p className="text-white/80">{user.email}</p>
            {user.location && (
              <div className="flex items-center gap-1 mt-1 text-white/70">
                <MapPin className="w-3 h-3" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {profileStats.map((stat, index) => (
            <Card key={index} className="card-elevated">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Details */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
              )}
              
              {user.age && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Age</p>
                    <p className="text-sm text-muted-foreground">{user.age} years old</p>
                  </div>
                </div>
              )}
              
              {user.occupation && (
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Occupation</p>
                    <p className="text-sm text-muted-foreground">{user.occupation}</p>
                  </div>
                </div>
              )}
            </div>
            
            {user.islLevel && (
              <div>
                <p className="text-sm font-medium mb-2">ISL Proficiency</p>
                <Badge variant="secondary" className="capitalize">
                  {user.islLevel.replace('-', ' ')}
                </Badge>
              </div>
            )}
            
            {user.bio && (
              <div>
                <p className="text-sm font-medium mb-2">About</p>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="notifications">Push Notifications</Label>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="privacy">High Contrast Mode</Label>
              </div>
              <Switch id="privacy" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="isl-help">Always Show ISL Help</Label>
              </div>
              <Switch id="isl-help" />
            </div>
          </CardContent>
        </Card>

        {/* Admin Access */}
        <Card className="card-elevated border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showAdminLogin ? (
              <Button 
                onClick={() => setShowAdminLogin(true)}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
              >
                <Crown className="w-4 h-4 mr-2" />
                Access Admin Panel
              </Button>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="admin-password">Admin Password</Label>
                  <input
                    id="admin-password"
                    type="password"
                    placeholder="Enter admin password"
                    className="w-full px-3 py-2 border border-input rounded-md mt-1"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAdminLogin} className="flex-1 btn-hero">
                    Login as Admin
                  </Button>
                  <Button 
                    onClick={() => setShowAdminLogin(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-elevated">
          <CardContent className="p-4 space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/help")}
            >
              <HelpCircle className="w-4 h-4 mr-3" />
              Help & Support
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="w-4 h-4 mr-3" />
              Notifications
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;