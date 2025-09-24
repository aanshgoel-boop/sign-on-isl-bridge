import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Type, Play, Pause, Download, Heart, Copy, Volume2, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

const TextToISL = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) {
      toast({
        title: "No text to translate",
        description: "Please enter some text first",
        variant: "destructive"
      });
      return;
    }

    setIsTranslating(true);
    setTranslatedText(text);
    
    // Simulate API call
    setTimeout(() => {
      setIsTranslating(false);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem('signOnHistory') || '[]');
      history.unshift({
        id: Date.now(),
        type: 'text',
        input: text,
        output: `ISL translation for: "${text}"`,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('signOnHistory', JSON.stringify(history));
      
      toast({
        title: "Translation Complete!",
        description: "Your text has been converted to ISL"
      });
    }, 2000);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Simulate video playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleSaveToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('signOnFavorites') || '[]');
    favorites.unshift({
      id: Date.now(),
      type: 'text',
      content: text,
      translation: translatedText,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('signOnFavorites', JSON.stringify(favorites));
    
    toast({
      title: "Saved to Favorites",
      description: "Translation added to your favorites"
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
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
            <Type className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Text to ISL</h1>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Input Section */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5 text-accent" />
              Enter Text
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type or paste your text here... (English or Hindi)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] text-lg"
            />
            
            <div className="flex gap-2">
              <Button 
                onClick={handleTranslate}
                disabled={!text.trim() || isTranslating}
                className="btn-isl flex-1"
              >
                {isTranslating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Translating...
                  </>
                ) : (
                  "Translate to ISL"
                )}
              </Button>
              
              <Button
                size="icon"
                variant="outline"
                onClick={() => setText("")}
                disabled={!text}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Translation Output */}
        {(translatedText || isTranslating) && (
          <Card className="card-elevated animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🤟</span>
                ISL Translation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ISL Video Container */}
              <div className="isl-video-container h-64 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                {isTranslating ? (
                  <div className="text-center">
                    <div className="animate-pulse-glow w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <Type className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Processing your text...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="animate-hand-wave text-6xl mb-4">🤟</div>
                    <p className="text-lg font-medium text-primary mb-2">
                      ISL Translation Ready
                    </p>
                    <p className="text-sm text-muted-foreground">
                      "{translatedText}"
                    </p>
                  </div>
                )}
              </div>

              {/* Video Controls */}
              {!isTranslating && (
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
                  
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(text);
                      toast({ title: "Copied to clipboard" });
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Phrases */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg">Quick Phrases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Hello, how are you?",
                "Thank you very much",
                "Nice to meet you",
                "Good morning",
                "See you later",
                "Please help me"
              ].map((phrase, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto p-3"
                  onClick={() => setText(phrase)}
                >
                  <span className="text-xs leading-tight">{phrase}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TextToISL;