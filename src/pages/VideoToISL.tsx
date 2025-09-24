import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Video, Upload, Play, Pause, Heart, Download, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

const VideoToISL = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [extractedText, setExtractedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setExtractedText("");
        setProcessingProgress(0);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive"
        });
      }
    }
  };

  const processVideo = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate video processing with progress
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate extracted speech
          const sampleTexts = [
            "Welcome to our presentation about climate change and sustainability.",
            "Today we will discuss the importance of renewable energy sources.",
            "Education is the key to building a better future for everyone.",
            "Technology has revolutionized the way we communicate and learn.",
            "Healthcare innovations are improving lives around the world."
          ];
          
          const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
          setExtractedText(randomText);
          setIsProcessing(false);
          
          // Save to history
          const history = JSON.parse(localStorage.getItem('signOnHistory') || '[]');
          history.unshift({
            id: Date.now(),
            type: 'video',
            input: selectedFile.name,
            output: randomText,
            timestamp: new Date().toISOString()
          });
          localStorage.setItem('signOnHistory', JSON.stringify(history));
          
          toast({
            title: "Video processed!",
            description: "Audio extracted and converted to ISL"
          });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  const handleSaveToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('signOnFavorites') || '[]');
    favorites.unshift({
      id: Date.now(),
      type: 'video',
      content: selectedFile?.name || 'Video file',
      translation: extractedText,
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
      <header className="bg-gradient-to-r from-secondary to-accent p-4 text-white">
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
            <Video className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Video to ISL</h1>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Video Upload Section */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-secondary" />
              Upload Video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedFile ? (
              <div 
                className="border-2 border-dashed border-secondary/30 rounded-lg p-8 text-center hover:bg-secondary/5 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Video className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select Video File</h3>
                <p className="text-muted-foreground mb-4">
                  Upload lectures, conversations, or any video with speech
                </p>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Video className="w-8 h-8 text-secondary" />
                  <div className="flex-1">
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setExtractedText("");
                      setProcessingProgress(0);
                    }}
                  >
                    Remove
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={processVideo}
                    disabled={isProcessing}
                    className="btn-isl flex-1"
                  >
                    {isProcessing ? "Processing..." : "Extract Audio & Convert"}
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </CardContent>
        </Card>

        {/* Processing Progress */}
        {isProcessing && (
          <Card className="card-elevated animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-secondary" />
                Processing Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={processingProgress} className="h-2" />
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">{processingProgress}%</p>
                <p className="text-sm text-muted-foreground">
                  {processingProgress < 30 && "Extracting audio from video..."}
                  {processingProgress >= 30 && processingProgress < 70 && "Converting speech to text..."}
                  {processingProgress >= 70 && "Generating ISL translation..."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Extracted Text */}
        {extractedText && (
          <Card className="card-elevated animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">📝</span>
                Extracted Speech
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-lg leading-relaxed">{extractedText}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ISL Translation Output */}
        {extractedText && (
          <Card className="card-elevated animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🤟</span>
                ISL Translation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ISL Video Container */}
              <div className="isl-video-container h-64 flex items-center justify-center bg-gradient-to-br from-secondary/5 to-accent/5">
                <div className="text-center">
                  <div className="animate-sign-flow text-6xl mb-4">🤟</div>
                  <p className="text-lg font-medium text-secondary mb-2">
                    ISL Video Segments Ready
                  </p>
                  <p className="text-sm text-muted-foreground px-4">
                    Converted from: {selectedFile?.name}
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
                      Play Segments
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
                    toast({ title: "Download started", description: "ISL video segments downloading..." });
                  }}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Segment Navigation */}
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">Video Segments:</p>
                <div className="flex gap-1 overflow-x-auto">
                  {Array.from({length: 5}).map((_, i) => (
                    <Button key={i} size="sm" variant="outline" className="min-w-fit">
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card className="border-secondary/30">
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-2 text-secondary">💡 Video Upload Tips</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Best results with clear audio (minimal background noise)</li>
              <li>• Supports MP4, MOV, AVI formats</li>
              <li>• Longer videos are processed in segments</li>
              <li>• Maximum file size: 100MB</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default VideoToISL;