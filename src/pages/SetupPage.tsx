
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { historicalScenes } from '@/data/scenes';
import { SceneType, PlayerCharacter } from '@/types/game';
import { User, Crown, ScrollText, ArrowRight } from 'lucide-react';

const SetupPage = () => {
  const { sceneId } = useParams<{ sceneId: string }>();
  const navigate = useNavigate();
  const [scene, setScene] = useState<SceneType | null>(null);
  
  const [playerInfo, setPlayerInfo] = useState<PlayerCharacter>({
    name: '',
    title: '',
    backstory: ''
  });
  
  useEffect(() => {
    if (sceneId) {
      const selectedScene = historicalScenes.find(s => s.id === sceneId);
      if (selectedScene) {
        setScene(selectedScene);
      } else {
        // Handle scene not found
        navigate('/scenes');
      }
    }
  }, [sceneId, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlayerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleBeginAdventure = () => {
    if (!playerInfo.name || !playerInfo.title) return;
    
    // In a real app, we'd save this to context/state management
    localStorage.setItem('player', JSON.stringify(playerInfo));
    localStorage.setItem('currentScene', JSON.stringify(scene));
    
    navigate(`/game/${sceneId}`);
  };
  
  if (!scene) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-medieval text-4xl md:text-5xl text-center mb-2 text-chrono-royal dark:text-chrono-gold">
        Prepare for Your Journey
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Scene Information */}
        <Card className="overflow-hidden border-2 border-chrono-gold/20 bg-chrono-parchment/90 dark:bg-chrono-navy/90">
          <div 
            className="h-64 bg-cover bg-center" 
            style={{ backgroundImage: `url(${scene.imageUrl})` }}
          >
            <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <p className="text-chrono-parchment/80 text-sm font-medieval uppercase">
                {scene.era} • {scene.year} • {scene.location}
              </p>
              <h2 className="text-3xl font-medieval text-white mt-1">{scene.title}</h2>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-medieval mb-2 text-chrono-royal dark:text-chrono-gold">
                <ScrollText className="h-5 w-5 inline-block mr-2 text-chrono-crimson dark:text-chrono-gold" />
                Situation Brief
              </h3>
              <p className="text-chrono-slate dark:text-chrono-parchment/90 whitespace-pre-line">
                {scene.situationBrief}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medieval mb-2 text-chrono-royal dark:text-chrono-gold">
                <User className="h-5 w-5 inline-block mr-2 text-chrono-crimson dark:text-chrono-gold" />
                Key Characters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scene.keyCharacters.slice(0, 4).map((character) => (
                  <div key={character.id} className="flex items-center space-x-3 p-2 rounded-md bg-chrono-parchment/50 dark:bg-chrono-navy/50">
                    <div 
                      className="w-10 h-10 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${character.imageUrl})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medieval text-sm text-chrono-royal dark:text-chrono-gold truncate">{character.name}</p>
                      <p className="text-xs text-chrono-slate dark:text-chrono-parchment/60 truncate">{character.title}</p>
                    </div>
                  </div>
                ))}
                {scene.keyCharacters.length > 4 && (
                  <p className="text-sm text-chrono-slate dark:text-chrono-parchment/60 col-span-full">
                    + {scene.keyCharacters.length - 4} more characters
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Character Setup */}
        <Card className="border-2 border-chrono-gold/20 bg-chrono-parchment/90 dark:bg-chrono-navy/90 p-6">
          <h2 className="text-2xl font-medieval mb-6 text-chrono-royal dark:text-chrono-gold">
            Create Your Character
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="flex items-center text-chrono-royal dark:text-chrono-gold">
                <User className="h-4 w-4 mr-2 text-chrono-crimson dark:text-chrono-gold" />
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                value={playerInfo.name}
                onChange={handleInputChange}
                placeholder="Enter your character's name"
                className="mt-1 border-chrono-gold/30 bg-white/50 dark:bg-chrono-navy/50"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="title" className="flex items-center text-chrono-royal dark:text-chrono-gold">
                <Crown className="h-4 w-4 mr-2 text-chrono-crimson dark:text-chrono-gold" />
                Your Title
              </Label>
              <Input
                id="title"
                name="title"
                value={playerInfo.title}
                onChange={handleInputChange}
                placeholder="e.g. General, Ambassador, Duke, Merchant"
                className="mt-1 border-chrono-gold/30 bg-white/50 dark:bg-chrono-navy/50"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="backstory" className="flex items-center text-chrono-royal dark:text-chrono-gold">
                <ScrollText className="h-4 w-4 mr-2 text-chrono-crimson dark:text-chrono-gold" />
                Your Backstory (Optional)
              </Label>
              <Textarea
                id="backstory"
                name="backstory"
                value={playerInfo.backstory}
                onChange={handleInputChange}
                placeholder="Tell us about your character's history and motivations..."
                className="mt-1 min-h-32 border-chrono-gold/30 bg-white/50 dark:bg-chrono-navy/50"
              />
            </div>
            
            <Button 
              onClick={handleBeginAdventure}
              disabled={!playerInfo.name || !playerInfo.title}
              className="w-full mt-6 bg-chrono-crimson hover:bg-chrono-mahogany text-white font-medieval text-lg py-6"
            >
              Begin Your Adventure 
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SetupPage;
