import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  Play, 
  Heart, 
  Star, 
  Trophy,
  Target,
  Clock,
  Users,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

const LearnISL = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: "📚" },
    { id: "greetings", name: "Greetings", icon: "👋" },
    { id: "food", name: "Food", icon: "🍽️" },
    { id: "numbers", name: "Numbers", icon: "🔢" },
    { id: "emotions", name: "Emotions", icon: "😊" },
    { id: "daily", name: "Daily Use", icon: "🏠" },
    { id: "family", name: "Family", icon: "👨‍👩‍👧‍👦" }
  ];

  const dictionaryWords = [
    { word: "Hello", category: "greetings", difficulty: "Beginner", isFavorite: false },
    { word: "Thank you", category: "greetings", difficulty: "Beginner", isFavorite: true },
    { word: "Please", category: "greetings", difficulty: "Beginner", isFavorite: false },
    { word: "Water", category: "food", difficulty: "Beginner", isFavorite: false },
    { word: "Mother", category: "family", difficulty: "Beginner", isFavorite: true },
    { word: "Happy", category: "emotions", difficulty: "Intermediate", isFavorite: false },
    { word: "One", category: "numbers", difficulty: "Beginner", isFavorite: false },
    { word: "House", category: "daily", difficulty: "Intermediate", isFavorite: false }
  ];

  const lessons = [
    {
      id: 1,
      title: "Basic Greetings",
      description: "Learn essential greeting signs in ISL",
      level: "Beginner",
      duration: "15 min",
      progress: 0,
      locked: false
    },
    {
      id: 2,
      title: "Numbers 1-10",
      description: "Master counting from 1 to 10",
      level: "Beginner", 
      duration: "20 min",
      progress: 0,
      locked: false
    },
    {
      id: 3,
      title: "Family Members",
      description: "Signs for family relationships",
      level: "Beginner",
      duration: "25 min",
      progress: 0,
      locked: true
    },
    {
      id: 4,
      title: "Food & Drinks",
      description: "Common food and drink signs",
      level: "Intermediate",
      duration: "30 min",
      progress: 0,
      locked: true
    }
  ];

  const filteredWords = dictionaryWords.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || word.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleWordPlay = (word: string) => {
    toast({
      title: `Playing ISL sign for "${word}"`,
      description: "Video demonstration starting..."
    });
  };

  const toggleFavorite = (word: string) => {
    toast({
      title: "Added to favorites",
      description: `"${word}" saved to your favorites`
    });
  };

  const startLesson = (lessonId: number, locked: boolean) => {
    if (locked) {
      toast({
        title: "Lesson locked",
        description: "Complete previous lessons to unlock",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Lesson starting",
      description: "Get ready to learn ISL!"
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-success via-accent to-primary p-4 text-white">
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
            <BookOpen className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Learn ISL</h1>
          </div>
        </div>
        
        {/* Learning Stats */}
        <div className="mt-4 flex gap-4">
          <div className="text-center">
            <div className="text-xl font-bold">0</div>
            <div className="text-xs opacity-90">Words Learned</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">0</div>
            <div className="text-xs opacity-90">Lessons Complete</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">0</div>
            <div className="text-xs opacity-90">Day Streak</div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="dictionary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dictionary" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Dictionary
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Lessons
            </TabsTrigger>
          </TabsList>

          {/* Dictionary Tab */}
          <TabsContent value="dictionary" className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ISL words..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  size="sm"
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="min-w-fit whitespace-nowrap"
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Dictionary Words */}
            <div className="grid gap-3">
              {filteredWords.map((item, index) => (
                <Card key={index} className="card-elevated hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{item.word}</h3>
                          <Badge 
                            variant={item.difficulty === "Beginner" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {item.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Category: {categories.find(c => c.id === item.category)?.name}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => toggleFavorite(item.word)}
                          className={item.isFavorite ? "text-red-500" : ""}
                        >
                          <Heart className={`w-4 h-4 ${item.isFavorite ? "fill-current" : ""}`} />
                        </Button>
                        
                        <Button
                          size="icon"
                          onClick={() => handleWordPlay(item.word)}
                          className="btn-isl"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* ISL Demo Area */}
                    <div className="mt-3 isl-video-container h-24 flex items-center justify-center text-xs text-muted-foreground">
                      🤟 ISL sign for "{item.word}" would be demonstrated here
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWords.length === 0 && (
              <Card className="card-elevated">
                <CardContent className="p-8 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No words found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or category filter
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            {/* Progress Overview */}
            <Card className="card-elevated bg-gradient-to-r from-success/10 to-accent/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Learning Progress</h3>
                    <p className="text-sm text-muted-foreground">Keep up the great work!</p>
                  </div>
                  <Trophy className="w-8 h-8 text-success" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Zap className="w-6 h-6 text-accent mx-auto mb-1" />
                    <div className="text-sm font-medium">0 Streak</div>
                  </div>
                  <div className="text-center">
                    <Star className="w-6 h-6 text-warning mx-auto mb-1" />
                    <div className="text-sm font-medium">0 Stars</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 text-primary mx-auto mb-1" />
                    <div className="text-sm font-medium">Beginner</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lessons List */}
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <Card 
                  key={lesson.id} 
                  className={`card-elevated cursor-pointer transition-all ${
                    lesson.locked ? 'opacity-60' : 'hover:scale-105'
                  }`}
                  onClick={() => startLesson(lesson.id, lesson.locked)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{lesson.title}</h3>
                          {lesson.locked && (
                            <Badge variant="outline" className="text-xs">
                              🔒 Locked
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{lesson.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {lesson.level}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          lesson.locked 
                            ? 'bg-muted' 
                            : lesson.progress > 0 
                              ? 'bg-success/20 text-success' 
                              : 'bg-primary/20 text-primary'
                        }`}>
                          {lesson.locked ? (
                            "🔒"
                          ) : lesson.progress > 0 ? (
                            <span className="text-2xl">✓</span>
                          ) : (
                            <Play className="w-6 h-6" />
                          )}
                        </div>
                        
                        {lesson.progress > 0 && (
                          <div className="text-xs font-medium mt-1">
                            {lesson.progress}%
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Coming Soon */}
            <Card className="border-dashed border-2 border-muted-foreground/20">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">More lessons coming soon!</h3>
                <p className="text-sm text-muted-foreground">
                  Complete current lessons to unlock advanced topics
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default LearnISL;