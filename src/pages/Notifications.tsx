import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bell, Check, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Notifications</h1>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Card className="card-elevated">
          <CardContent className="p-12 text-center">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
            <p className="text-muted-foreground">You have no new notifications</p>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Notifications;