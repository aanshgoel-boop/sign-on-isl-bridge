import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 animate-sign-flow">
          <div className="w-full h-full bg-white rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 animate-sign-flow delay-700">
          <div className="w-full h-full bg-white rounded-full animate-pulse" />
        </div>
      </div>

      <div className="text-center z-10">
        {/* Main Logo Animation */}
        <div className={`transition-all duration-1000 ${animate ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div className="relative mb-8">
            {/* Hand Icon with Animation */}
            <div className="text-8xl mb-4 animate-hand-wave">
              <span className="text-white drop-shadow-lg">👋</span>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 -m-4 bg-white/20 rounded-full blur-xl animate-pulse-glow" />
          </div>

          {/* App Name */}
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-xl">
            Sign On
          </h1>
          
          {/* Tagline */}
          <p className="text-xl text-white/90 font-medium tracking-wide">
            Bridging Voices with Signs
          </p>
          
          {/* Loading Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-0" />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150" />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300" />
          </div>
        </div>

        {/* ISL Message */}
        <div className={`mt-12 transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/80 text-sm">
            Empowering communication through Indian Sign Language
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;