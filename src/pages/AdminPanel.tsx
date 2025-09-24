import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Users, BarChart, Database, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary via-destructive to-secondary p-4 text-white">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>
        </div>
      </header>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Manage user accounts and permissions</p>
            <Button className="w-full">View Users</Button>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">View usage statistics and reports</p>
            <Button className="w-full">View Analytics</Button>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              ISL Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Manage ISL signs and translations</p>
            <Button className="w-full">Manage Database</Button>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Content Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Upload new ISL videos and content</p>
            <Button className="w-full">Upload Content</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;