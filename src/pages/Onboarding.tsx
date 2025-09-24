import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Volume2, BookOpen, Users, Sparkles } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Volume2,
      title: "Breaking Communication Barriers",
      description: "Millions of Indians use ISL daily. Sign On helps translate speech, video, and text into beautiful Indian Sign Language videos.",
      background: "from-primary to-primary-glow"
    },
    {
      icon: Sparkles,
      title: "Instant Audio to ISL",
      description: "Speak naturally and watch as your words transform into clear, professional ISL video translations in real-time.",
      background: "from-secondary to-accent"
    },
    {
      icon: Users,
      title: "Built for Everyone",
      description: "Designed with accessibility at its heart. Whether you're learning ISL, need translation help, or want to connect with the Deaf community.",
      background: "from-accent to-primary"
    },
    {
      icon: BookOpen,
      title: "Learn & Connect",
      description: "Interactive ISL dictionary, gamified lessons, and a supportive community to help you master Indian Sign Language.",
      background: "from-primary via-secondary to-accent"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('signOnOnboarding', 'completed');
    onComplete();
  };

  const skipToEnd = () => {
    handleComplete();
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slides[currentSlide].background} flex items-center justify-center p-4`}>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          {currentSlide < slides.length - 1 && (
            <Button variant="ghost" onClick={skipToEnd} className="text-white hover:bg-white/20">
              Skip
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6 animate-scale-in">
              {(() => {
                const IconComponent = slides[currentSlide].icon;
                return <IconComponent className="w-12 h-12 text-white" />;
              })()}
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-white/90 text-lg leading-relaxed px-4">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <Button
            variant="ghost"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={nextSlide}
            className="bg-white text-primary hover:bg-white/90 px-8"
          >
            {currentSlide === slides.length - 1 ? "Let's Start!" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Hand Animation */}
        <div className="flex justify-center mt-8">
          <div className="text-4xl animate-hand-wave opacity-80">
            🤟
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;