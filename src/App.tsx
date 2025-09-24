import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProfileSetup from "./pages/ProfileSetup";
import AudioToISL from "./pages/AudioToISL";
import VideoToISL from "./pages/VideoToISL";
import TextToISL from "./pages/TextToISL";
import LearnISL from "./pages/LearnISL";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);

  useEffect(() => {
    // Check for existing user data
    const userData = localStorage.getItem('signOnUser');
    const onboardingSeen = localStorage.getItem('signOnOnboarding');
    
    if (userData) {
      setIsAuthenticated(true);
      const user = JSON.parse(userData);
      if (user.profileComplete) {
        setHasCompletedProfile(true);
      }
    }
    
    if (onboardingSeen) {
      setHasSeenOnboarding(true);
    }

    // Hide splash after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!hasSeenOnboarding) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Onboarding onComplete={() => setHasSeenOnboarding(true)} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Auth onAuth={() => setIsAuthenticated(true)} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (!hasCompletedProfile) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ProfileSetup onComplete={() => setHasCompletedProfile(true)} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/audio-to-isl" element={<AudioToISL />} />
            <Route path="/video-to-isl" element={<VideoToISL />} />
            <Route path="/text-to-isl" element={<TextToISL />} />
            <Route path="/learn" element={<LearnISL />} />
            <Route path="/history" element={<History />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/help" element={<Help />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;