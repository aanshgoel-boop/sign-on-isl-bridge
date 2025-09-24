import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Heart, 
  Search, 
  Mic, 
  Video, 
  Type, 
  Play, 
  Trash2,
  Tag,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

interface FavoriteItem {
  id: number;
  type: 'audio' | 'video' | 'text';
  content: string;
  translation: string;
  timestamp: string;
  tags?: string[];
}

const Favorites = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'audio' | 'video' | 'text'>('all');

  useEffect(() => {
    const savedFavorites = localStorage.getItem('signOnFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio': return <Mic className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <Type className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'audio': return 'from-primary to-primary-glow';
      case 'video': return 'from-secondary to-accent';
      case 'text': return 'from-accent to-primary';
      default: return 'from-muted to-muted';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleReplay = (item: FavoriteItem) => {
    toast({
      title: "Playing favorite",
      description: "ISL video starting..."
    });
  };

  const handleRemoveFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('signOnFavorites', JSON.stringify(updatedFavorites));
    
    toast({
      title: "Removed from favorites",
      description: "Translation removed from your favorites"
    });
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.setItem('signOnFavorites', JSON.stringify([]));
    
    toast({
      title: "Favorites cleared",
      description: "All favorites have been removed"
    });
  };

  const suggestedTags = ['work', 'school', 'greetings', 'family', 'daily', 'emergency'];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 p-4 text-white">
        <div className="flex items-center justify-between">
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
              <Heart className="w-6 h-6 fill-current" />
              <h1 className="text-xl font-semibold">Favorites</h1>
            </div>
          </div>
          
          {favorites.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={clearAllFavorites}
            >
              Clear All
            </Button>
          )}
        </div>
        
        <div className="mt-3 text-white/90 text-sm">
          {favorites.length} saved translation{favorites.length !== 1 ? 's' : ''}
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Search & Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search favorites..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', name: 'All', icon: Filter },
              { id: 'audio', name: 'Audio', icon: Mic },
              { id: 'video', name: 'Video', icon: Video },
              { id: 'text', name: 'Text', icon: Type }
            ].map((filter) => (
              <Button
                key={filter.id}
                size="sm"
                variant={filterType === filter.id ? "default" : "outline"}
                onClick={() => setFilterType(filter.id as any)}
                className="min-w-fit whitespace-nowrap flex items-center gap-2"
              >
                <filter.icon className="w-4 h-4" />
                {filter.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Access Tags */}
        {favorites.length > 0 && (
          <Card className="card-elevated">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Quick Access</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <Button
                    key={tag}
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => setSearchQuery(tag)}
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Favorites List */}
        <div className="space-y-4">
          {filteredFavorites.length === 0 ? (
            <Card className="card-elevated">
              <CardContent className="p-12 text-center">
                <Heart className="w-16 h-16 text-red-300 mx-auto mb-6 fill-current" />
                <h3 className="text-xl font-semibold mb-2">
                  {favorites.length === 0 ? "No favorites yet" : "No matches found"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {favorites.length === 0 
                    ? "Save translations you want to keep by tapping the heart icon" 
                    : "Try adjusting your search or filter"}
                </p>
                {favorites.length === 0 && (
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => navigate("/text-to-isl")} variant="outline">
                      <Type className="w-4 h-4 mr-2" />
                      Create Translation
                    </Button>
                    <Button onClick={() => navigate("/learn")} className="btn-isl">
                      <Heart className="w-4 h-4 mr-2" />
                      Learn ISL
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredFavorites.map((item) => (
              <Card key={item.id} className="card-elevated hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Type Icon */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTypeColor(item.type)} flex items-center justify-center text-white flex-shrink-0`}>
                      {getTypeIcon(item.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.type.toUpperCase()}
                        </Badge>
                        <Heart className="w-3 h-3 text-red-500 fill-current" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Original:</p>
                          <p className="text-sm">{item.content}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">ISL Translation:</p>
                          <p className="text-sm text-primary">{item.translation}</p>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleReplay(item)}
                        className="hover:bg-primary/10"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleRemoveFromFavorites(item.id)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Tips */}
        {favorites.length > 0 && (
          <Card className="border-rose-200 bg-rose-50/50">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-2 text-rose-600">💡 Pro Tip</h3>
              <p className="text-xs text-rose-600/80">
                Use the search function to quickly find specific translations. 
                Try searching for words, phrases, or even the type of translation.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Favorites;