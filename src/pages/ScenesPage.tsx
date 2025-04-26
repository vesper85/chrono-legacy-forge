
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import SceneCard from '@/components/SceneCard';
import { historicalScenes } from '@/data/scenes';
import { SceneType } from '@/types/game';
import { Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ScenesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eraFilter, setEraFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  
  const filteredScenes = historicalScenes.filter(scene => {
    const matchesSearch = scene.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scene.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEra = eraFilter === 'all' || scene.era === eraFilter;
    const matchesDifficulty = difficultyFilter === 'all' || scene.difficulty === difficultyFilter;
    
    return matchesSearch && matchesEra && matchesDifficulty;
  });
  
  const uniqueEras = Array.from(new Set(historicalScenes.map(scene => scene.era)));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-medieval text-4xl md:text-5xl text-center mb-2 text-chrono-royal dark:text-chrono-gold">
        Choose Your Historical Moment
      </h1>
      <p className="text-center font-serif text-lg mb-8 text-chrono-slate dark:text-chrono-parchment/80">
        Select a pivotal moment in history to alter its course
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chrono-slate dark:text-chrono-parchment/60 h-4 w-4" />
          <Input
            placeholder="Search scenarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-chrono-gold/30 bg-chrono-parchment/80 dark:bg-chrono-navy/80"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={eraFilter} onValueChange={setEraFilter}>
            <SelectTrigger className="w-[180px] border-chrono-gold/30 bg-chrono-parchment/80 dark:bg-chrono-navy/80">
              <Filter className="h-4 w-4 mr-2 text-chrono-slate dark:text-chrono-parchment/60" />
              <SelectValue placeholder="Filter by Era" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Eras</SelectItem>
              {uniqueEras.map((era) => (
                <SelectItem key={era} value={era}>{era}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[180px] border-chrono-gold/30 bg-chrono-parchment/80 dark:bg-chrono-navy/80">
              <Filter className="h-4 w-4 mr-2 text-chrono-slate dark:text-chrono-parchment/60" />
              <SelectValue placeholder="Filter by Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredScenes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenes.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg font-serif text-chrono-slate dark:text-chrono-parchment/80">
            No historical scenarios match your search. Try different criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScenesPage;
