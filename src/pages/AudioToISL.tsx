import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mic, MicOff, Play, Pause, Volume2, Heart, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

const AudioToISL = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setTranscribedText("");
    
    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone"
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulate audio processing
    setTimeout(() => {
      const sampleTexts = [
        "Hello, how are you doing today?",
        "Thank you for your help",
        "Nice to meet you, my name is...",
        "Can you please help me with this?",
        "Good morning, have a great day!"
      ];
      
      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      setTranscribedText(randomText);
      setIsProcessing(false);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem('signOnHistory') || '[]');
      history.unshift({
        id: Date.now(),
        type: 'audio',
        input: `Audio recording (${recordingTime}s)`,
        output: randomText,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('signOnHistory', JSON.stringify(history));
      
      toast({
        title: "Audio processed!",
        description: "Your speech has been converted to ISL"
      });
    }, 3000);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 4000);
    }
  };

  const handleSaveToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('signOnFavorites') || '[]');
    favorites.unshift({
      id: Date.now(),
      type: 'audio',
      content: `Audio recording (${recordingTime}s)`,
      translation: transcribedText,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('signOnFavorites', JSON.stringify(favorites));
    
    toast({
      title: "Saved to Favorites",
      description: "Translation added to your favorites"
    });
  };

  const resetRecording = () => {
    setIsRecording(false);
    setIsProcessing(false);
    setTranscribedText("");
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
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
            <Mic className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Audio to ISL</h1>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Recording Interface */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Volume2 className="w-5 h-5 text-primary" />
              Voice Recognition
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Microphone Button */}
            <div className="relative">
              <Button
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`w-24 h-24 rounded-full transition-all duration-300 ${
                  isRecording 
                    ? 'bg-destructive hover:bg-destructive/90 animate-pulse-glow' 
                    : 'btn-hero'
                } ${isProcessing ? 'opacity-50' : ''}`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              
              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute -inset-2 border-4 border-destructive/30 rounded-full animate-ping" />
              )}
            </div>

            {/* Status Text */}
            <div>
              {isRecording && (
                <div className="animate-fade-in">
                  <p className="text-lg font-medium text-primary mb-2">
                    🎙️ Listening...
                  </p>
                  <p className="text-2xl font-mono text-destructive">
                    {formatTime(recordingTime)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Tap the microphone again to stop
                  </p>
                </div>
              )}
              
              {isProcessing && (
                <div className="animate-fade-in">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-primary">
                    Processing audio...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Converting speech to ISL
                  </p>
                </div>
              )}
              
              {!isRecording && !isProcessing && !transcribedText && (
                <div>
                  <p className="text-lg font-medium mb-2">
                    Ready to record
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tap the microphone to start recording your voice
                  </p>
                </div>
              )}
            </div>

            {/* Reset Button */}
            {(transcribedText || isRecording || isProcessing) && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetRecording}
                disabled={isRecording || isProcessing}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Transcription Result */}
        {transcribedText && (
          <Card className="card-elevated animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">📝</span>
                Recognized Speech
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-lg">{transcribedText}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ISL Translation Output */}
        {transcribedText && (
          <Card className="card-elevated animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🤟</span>
                ISL Translation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ISL Video Container */}
              <div className="isl-video-container h-64 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-center">
                  <div className="animate-hand-wave text-6xl mb-4">🤟</div>
                  <p className="text-lg font-medium text-primary mb-2">
                    ISL Video Ready
                  </p>
                  <p className="text-sm text-muted-foreground">
                    "{transcribedText}"
                  </p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="flex justify-center gap-2">
                <Button
                  onClick={handlePlayPause}
                  className="btn-isl"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play ISL Video
                    </>
                  )}
                </Button>
                
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleSaveToFavorites}
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card className="border-accent/30">
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-2 text-accent">💡 Recording Tips</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Speak clearly and at normal pace</li>
              <li>• Minimize background noise</li>
              <li>• Hold device 6-8 inches from mouth</li>
              <li>• Pause between sentences for better accuracy</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AudioToISL;