import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, HelpCircle, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-r from-accent to-primary p-4 text-white">
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
            <HelpCircle className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Help & Support</h1>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">How accurate are the ISL translations?</h4>
              <p className="text-sm text-muted-foreground">Our AI-powered translations are continuously improving and cover most common phrases and words in Indian Sign Language.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Can I use the app offline?</h4>
              <p className="text-sm text-muted-foreground">Basic dictionary features work offline, but real-time translation requires an internet connection.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Mail className="w-4 h-4 mr-3" />
              support@signon.app
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Phone className="w-4 h-4 mr-3" />
              +91 98765 43210
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Help;