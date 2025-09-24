import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  History as HistoryIcon, 
  Search, 
  Mic, 
  Video, 
  Type, 
  Play, 
  Trash2,
  Heart,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

interface HistoryItem {
  id: number;
  type: 'audio' | 'video' | 'text';
  input: string;
  output: string;
  timestamp: string;
}

const History = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'audio' | 'video' | 'text'>('all');

  useEffect(() => {
    const savedHistory = localStorage.getItem('signOnHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio': return <Mic className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <Type className="w-4 h-4" />;
      default: return <HistoryIcon className="w-4 h-4" />;
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
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.input.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.output.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleReplay = (item: HistoryItem) => {
    toast({
      title: "Replaying translation",
      description: "ISL video starting..."
    });
  };

  const handleDelete = (id: number) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('signOnHistory', JSON.stringify(updatedHistory));
    
    toast({
      title: "Deleted",
      description: "Translation removed from history"
    });
  };

  const handleAddToFavorites = (item: HistoryItem) => {
    const favorites = JSON.parse(localStorage.getItem('signOnFavorites') || '[]');
    favorites.unshift({
      id: Date.now(),
      type: item.type,
      content: item.input,
      translation: item.output,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('signOnFavorites', JSON.stringify(favorites));
    
    toast({
      title: "Added to Favorites",
      description: "Translation saved to your favorites"
    });
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.setItem('signOnHistory', JSON.stringify([]));
    
    toast({
      title: "History cleared",
      description: "All translations have been removed"
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent p-4 text-white">
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
              <HistoryIcon className="w-6 h-6" />
              <h1 className="text-xl font-semibold">Translation History</h1>
            </div>
          </div>
          
          {history.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={clearAllHistory}
            >
              Clear All
            </Button>
          )}
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Search & Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search translations..."
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

        {/* History Stats */}
        {history.length > 0 && (
          <Card className="card-elevated bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{history.length}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">
                    {history.filter(h => h.type === 'audio').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Audio</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {history.filter(h => h.type === 'text').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Text</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* History Items */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <Card className="card-elevated">
              <CardContent className="p-12 text-center">
                <HistoryIcon className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-2">
                  {history.length === 0 ? "No translations yet" : "No matches found"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {history.length === 0 
                    ? "Start translating to see your history here" 
                    : "Try adjusting your search or filter"}
                </p>
                {history.length === 0 && (
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => navigate("/text-to-isl")} variant="outline">
                      <Type className="w-4 h-4 mr-2" />
                      Start with Text
                    </Button>
                    <Button onClick={() => navigate("/audio-to-isl")} className="btn-isl">
                      <Mic className="w-4 h-4 mr-2" />
                      Try Audio
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredHistory.map((item) => (
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
                        <span className="text-sm text-muted-foreground">
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Input:</p>
                          <p className="text-sm truncate">{item.input}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Translation:</p>
                          <p className="text-sm text-primary truncate">{item.output}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleReplay(item)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleAddToFavorites(item)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:bg-destructive/10"
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
      </div>

      <BottomNavigation />
    </div>
  );
};

export default History;