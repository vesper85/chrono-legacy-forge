
export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  relation: 'ally' | 'enemy' | 'neutral' | 'advisor';
  influence: number; // 0-100
  loyalty: number; // 0-100
  specialty: string[];
}

export interface SceneType {
  id: string;
  title: string;
  description: string;
  era: string;
  year: string;
  location: string;
  imageUrl: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  keyCharacters: Character[];
  situationBrief: string;
  initialEvents: string[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderImageUrl: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'event' | 'decision' | 'system';
}

export interface PlayerCharacter {
  name: string;
  title: string;
  backstory?: string;
}

export interface GameState {
  player: PlayerCharacter;
  currentScene: SceneType;
  messages: Message[];
  characters: Character[];
  events: string[];
  resources: Record<string, number>;
  turnsElapsed: number;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  impact: 'positive' | 'negative' | 'neutral';
  affectedAreas: string[];
}
