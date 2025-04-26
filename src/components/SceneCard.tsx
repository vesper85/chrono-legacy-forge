
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Clock, Users, MapPin, Shield } from 'lucide-react';
import { SceneType } from '@/types/game';

interface SceneCardProps {
  scene: SceneType;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene }) => {
  const navigate = useNavigate();
  
  const handleSelectScene = () => {
    navigate(`/setup/${scene.id}`);
  };
  
  return (
    <Card className="overflow-hidden border-2 border-chrono-gold/20 hover:border-chrono-gold/50 transition-all duration-300 hover:shadow-md bg-chrono-parchment/90 dark:bg-chrono-navy/90">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${scene.imageUrl})` }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="text-white">
            <p className="text-xs font-medieval uppercase tracking-wider mb-1 opacity-80">
              {scene.era}
            </p>
            <h3 className="text-2xl font-medieval">{scene.title}</h3>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <p className="text-sm text-chrono-slate dark:text-chrono-parchment/80 line-clamp-3">
          {scene.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center text-xs">
            <Clock className="h-3.5 w-3.5 mr-1 text-chrono-crimson dark:text-chrono-gold" />
            <span>{scene.year}</span>
          </div>
          <div className="flex items-center text-xs">
            <MapPin className="h-3.5 w-3.5 mr-1 text-chrono-crimson dark:text-chrono-gold" />
            <span>{scene.location}</span>
          </div>
          <div className="flex items-center text-xs">
            <Users className="h-3.5 w-3.5 mr-1 text-chrono-crimson dark:text-chrono-gold" />
            <span>{scene.keyCharacters.length} Characters</span>
          </div>
          <div className="flex items-center text-xs">
            <Shield className="h-3.5 w-3.5 mr-1 text-chrono-crimson dark:text-chrono-gold" />
            <span>{scene.difficulty}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSelectScene} 
          className="w-full bg-chrono-royal hover:bg-chrono-navy text-white dark:bg-chrono-gold dark:text-chrono-royal dark:hover:bg-chrono-bronze"
        >
          Choose Scenario
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SceneCard;
