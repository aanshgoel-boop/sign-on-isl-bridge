import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, User, MapPin, Calendar, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileSetupProps {
  onComplete: () => void;
}

const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const [profileData, setProfileData] = useState({
    profilePicture: null as File | null,
    islName: "",
    age: "",
    location: "",
    occupation: "",
    islLevel: "",
    bio: "",
    preferredLanguage: "english"
  });
  
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData({ ...profileData, profilePicture: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileData.islName) {
      toast({
        title: "Missing Information",
        description: "Please provide your ISL name",
        variant: "destructive"
      });
      return;
    }

    // Update user data
    const existingUser = JSON.parse(localStorage.getItem('signOnUser') || '{}');
    const updatedUser = {
      ...existingUser,
      ...profileData,
      profileComplete: true
    };
    
    localStorage.setItem('signOnUser', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Complete!",
      description: "Welcome to Sign On! Your profile has been set up successfully."
    });
    
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl card-elevated">
        <CardHeader className="text-center">
          <div className="text-4xl mb-4 animate-hand-wave">🤟</div>
          <CardTitle className="text-2xl text-gradient">Complete Your Profile</CardTitle>
          <p className="text-muted-foreground">
            Tell us about yourself to personalize your Sign On experience
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="text-center">
              <Label>Profile Picture</Label>
              <div className="mt-2">
                {profileData.profilePicture ? (
                  <div className="inline-block relative">
                    <img
                      src={URL.createObjectURL(profileData.profilePicture)}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 rounded-full"
                      onClick={() => document.getElementById('profile-pic')?.click()}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-24 h-24 rounded-full border-dashed border-2 border-primary/30 hover:bg-primary/10"
                    onClick={() => document.getElementById('profile-pic')?.click()}
                  >
                    <Upload className="w-8 h-8 text-primary" />
                  </Button>
                )}
                <input
                  id="profile-pic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ISL Name */}
              <div>
                <Label htmlFor="isl-name">ISL Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="isl-name"
                    placeholder="Your name in ISL"
                    className="pl-10"
                    value={profileData.islName}
                    onChange={(e) => setProfileData({ ...profileData, islName: e.target.value })}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This is how others will see your name in ISL
                </p>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age">Age</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    className="pl-10"
                    value={profileData.age}
                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, State"
                    className="pl-10"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
              </div>

              {/* Occupation */}
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="occupation"
                    placeholder="Your profession"
                    className="pl-10"
                    value={profileData.occupation}
                    onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* ISL Level */}
            <div>
              <Label>ISL Proficiency Level</Label>
              <Select 
                value={profileData.islLevel} 
                onValueChange={(value) => setProfileData({ ...profileData, islLevel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your ISL level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - New to ISL</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Basic conversation</SelectItem>
                  <SelectItem value="advanced">Advanced - Fluent communication</SelectItem>
                  <SelectItem value="native">Native - ISL is my primary language</SelectItem>
                  <SelectItem value="interpreter">Professional Interpreter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preferred App Language */}
            <div>
              <Label>Preferred App Language</Label>
              <Select 
                value={profileData.preferredLanguage} 
                onValueChange={(value) => setProfileData({ ...profileData, preferredLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                  <SelectItem value="both">Both English & Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">About You (Optional)</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a bit about yourself, your ISL journey, or what brings you to Sign On..."
                className="min-h-[80px]"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              />
            </div>

            {/* ISL Video Demo */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <Label>Optional: Record ISL Introduction</Label>
              <div className="mt-2 isl-video-container h-32 flex items-center justify-center">
                <Button variant="outline" className="border-dashed border-2">
                  <Camera className="w-4 h-4 mr-2" />
                  Record ISL Video
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Record a short ISL introduction to help others connect with you
              </p>
            </div>

            <Button type="submit" className="w-full btn-hero">
              Complete Profile & Enter Sign On
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;