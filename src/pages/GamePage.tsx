import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { historicalScenes } from '@/data/scenes';
import { SceneType, PlayerCharacter, Message, Character, TimelineEvent } from '@/types/game';
import { Send, Menu, AlignJustify, Clock, Scroll, User, Shield, Sword, Crown, MessageSquare } from 'lucide-react';
import { mockMessages } from '@/data/mockMessages';
import { mockTimelineEvents } from '@/data/mockEvents';

// API URLs - adjust these based on your backend configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const CHAT_ENDPOINT = `${API_URL}/chat`;

// Available scenarios
const AVAILABLE_SCENARIOS = [
  { id: "caesar_assassination", name: "Caesar's Final Days" },
  { id: "civil_war", name: "Roman Civil War" },
  { id: "senate_politics", name: "Senate Intrigue" }
  // Add more scenarios as needed
];

const GamePage = () => {
  const { sceneId } = useParams<{ sceneId: string }>();
  const navigate = useNavigate();
  const [scene, setScene] = useState<SceneType | null>(null);
  const [player, setPlayer] = useState<PlayerCharacter | null>({
    name: "Parikshit",
    title: "Emperor",
  });
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>("caesar_assassination");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  
  useEffect(() => {
    if (sceneId) {
      const selectedScene = historicalScenes.find(s => s.id === sceneId);
      if (selectedScene) {
        setScene(selectedScene);
        
        // Initialize with system message providing historical context
        const initialMessages: Message[] = [
          {
            id: `system-intro-${Date.now()}`,
            senderId: 'system',
            senderName: 'System',
            senderImageUrl: '',
            content: `Welcome to ${selectedScene.location}, ${selectedScene.year}. You are ${player?.name}, ${player?.title}.`,
            timestamp: new Date(),
            type: 'system'
          }
        ];
        
        setMessages(initialMessages);
        
        // Initialize chat history with system message only
        setChatHistory([]);
        
        setTimelineEvents(mockTimelineEvents);
        
        // Request initial situation explanation from backend
        if (player) {
          requestInitialSituation(selectedScene, player, selectedScenario);
        }
      } else {
        navigate('/scenes');
      }
    }
  }, [sceneId, navigate, player?.name, player?.title]);


useEffect(() => {
  if (scene && player) {
    // Add scenario changed message
    setMessages(prev => [
      ...prev.filter(msg => msg.type === 'system' && msg.id.includes('system-intro')), // Keep only the intro message
      {
        id: `scenario-change-${Date.now()}`,
        senderId: 'system',
        senderName: 'System',
        senderImageUrl: '',
        content: `Scenario changed to: ${AVAILABLE_SCENARIOS.find(s => s.id === selectedScenario)?.name || selectedScenario}`,
        timestamp: new Date(),
        type: 'system'
      }
    ]);
    
    // Clear chat history when scenario changes
    setChatHistory([]);
    
    // Request initial situation for the new scenario
    requestInitialSituation(scene, player, selectedScenario);
  }
}, [selectedScenario, scene, player]);
  
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleScenarioChange = (value: string) => {
    setSelectedScenario(value);
  };

  const requestInitialSituation = async (scene: SceneType, player: PlayerCharacter, scenario: string) => {
    setIsLoading(true);
    
    try {
      // Create placeholder for AI response
      const responsePlaceholderId = `msg-${Date.now()}`;
      const advisor = scene.keyCharacters.find(c => c.relation === 'advisor');
      
      const responsePlaceholder: Message = {
        id: responsePlaceholderId,
        senderId: advisor?.id || 'advisor',
        senderName: advisor?.name || 'Advisor',
        senderImageUrl: advisor?.imageUrl || '/placeholder.svg',
        content: '',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, responsePlaceholder]);
      
      // Prepare the initial request
      const initialPrompt = `Please explain the current situation in ${scene.location}, ${scene.year} and me as ${player.name} and my position as general assigned by the game system`;
      
      // Update chat history for API
      const updatedHistory = [
        ...chatHistory,
        { role: 'user', content: initialPrompt }
      ];
      setChatHistory(updatedHistory);
      
      // Create new abort controller
      controller.current = new AbortController();
      
      // Make streaming request
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: updatedHistory,
          scenario: scenario
        }),
        signal: controller.current.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Process the stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Response body is null");
      
      let responseText = '';
      let decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        responseText += chunk;
        
        // Update the message content with the streaming response
        setMessages(prev => 
          prev.map(msg => 
            msg.id === responsePlaceholderId
              ? { ...msg, content: responseText }
              : msg
          )
        );
      }
      
      // Add the assistant's response to the chat history
      setChatHistory(prev => [...prev, { role: 'assistant', content: responseText }]);
      
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error requesting initial situation:', error);
        
        // Add error message
        setMessages(prev => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            senderId: 'system',
            senderName: 'System',
            senderImageUrl: '',
            content: 'An error occurred while communicating with your advisor. Please refresh the page or try again.',
            timestamp: new Date(),
            type: 'system'
          }
        ]);
      }
    } finally {
      setIsLoading(false);
      controller.current = null;
    }
  };
  
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !player || isLoading) return;
    
    // Create new message object
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'player',
      senderName: player.name,
      senderImageUrl: '/placeholder.svg', // Placeholder for player
      content: inputMessage,
      timestamp: new Date(),
      type: 'text'
    };
    
    // Update local messages
    setMessages(prev => [...prev, newMessage]);
    
    // Update chat history for API
    const updatedHistory = [
      ...chatHistory,
      { role: 'user', content: inputMessage }
    ];
    setChatHistory(updatedHistory);
    
    // Clear input
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Create placeholder for AI response
      const responsePlaceholderId = `msg-${Date.now() + 1}`;
      const advisor = scene?.keyCharacters.find(c => c.relation === 'advisor');
      
      const responsePlaceholder: Message = {
        id: responsePlaceholderId,
        senderId: advisor?.id || 'advisor',
        senderName: advisor?.name || 'Advisor',
        senderImageUrl: advisor?.imageUrl || '/placeholder.svg',
        content: '',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, responsePlaceholder]);
      
      // Abort previous request if exists
      if (controller.current) {
        controller.current.abort();
      }
      
      // Create new abort controller
      controller.current = new AbortController();
      
      // Make streaming request
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: updatedHistory,
          scenario: selectedScenario
        }),
        signal: controller.current.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Process the stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Response body is null");
      
      let responseText = '';
      let decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        responseText += chunk;
        
        // Update the message content with the streaming response
        setMessages(prev => 
          prev.map(msg => 
            msg.id === responsePlaceholderId
              ? { ...msg, content: responseText }
              : msg
          )
        );
      }
      
      // Add the assistant's response to the chat history
      setChatHistory(prev => [...prev, { role: 'assistant', content: responseText }]);
      
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sending message:', error);
        
        // Add error message
        setMessages(prev => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            senderId: 'system',
            senderName: 'System',
            senderImageUrl: '',
            content: 'An error occurred while communicating with your advisor. Please try again.',
            timestamp: new Date(),
            type: 'system'
          }
        ]);
      }
    } finally {
      setIsLoading(false);
      controller.current = null;
    }
  };
  
  if (!scene || !player) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col h-screen bg-chrono-parchment/30 dark:bg-chrono-navy/30">
      {/* Top Banner */}
      <header className="bg-chrono-royal dark:bg-chrono-navy text-white p-4 border-b-2 border-chrono-gold/50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="hidden md:flex items-center divide-x divide-chrono-gold/30">
              <div className="pr-4">
                <p className="text-sm text-chrono-parchment/80">LOCATION</p>
                <p className="font-medieval">{scene.location}</p>
              </div>
              <div className="px-4">
                <p className="text-sm text-chrono-parchment/80">YEAR</p>
                <p className="font-medieval">{scene.year}</p>
              </div>
              <div className="pl-4">
                <p className="text-sm text-chrono-parchment/80">ERA</p>
                <p className="font-medieval">{scene.era}</p>
              </div>
            </div>
            <div className="md:hidden">
              <p className="font-medieval truncate">{scene.location}, {scene.year}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-chrono-parchment/80">PLAYING AS</p>
            <p className="font-medieval">{player.name}, {player.title}</p>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Scenario Selector */}
          <div className="p-4 bg-chrono-parchment/50 dark:bg-chrono-navy/50 border-b border-chrono-gold/30">
            <div className="flex items-center">
              <span className="mr-3 text-sm font-medieval text-chrono-royal dark:text-chrono-gold">SCENARIO:</span>
              <Select 
                value={selectedScenario} 
                onValueChange={handleScenarioChange}
              >
                <SelectTrigger className="w-[180px] bg-white/80 dark:bg-chrono-navy/80 text-sm">
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_SCENARIOS.map(scenario => (
                    <SelectItem key={scenario.id} value={scenario.id}>
                      {scenario.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} isPlayer={message.senderId === 'player'} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="p-4 border-t border-chrono-gold/30 bg-white/80 dark:bg-chrono-navy/80">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Enter your command or message..."
                className="flex-1 border-chrono-gold/50 focus:border-chrono-gold"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                className="bg-chrono-royal hover:bg-chrono-navy dark:bg-chrono-gold dark:text-chrono-royal dark:hover:bg-chrono-bronze"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        {/* Right Panel: Character Info and Other Tabs */}
        <div className="hidden lg:block w-80 border-l border-chrono-gold/30 bg-chrono-parchment/50 dark:bg-chrono-navy/50">
          <Tabs defaultValue="characters">
            <TabsList className="w-full">
              <TabsTrigger value="characters" className="flex-1">
                <User className="h-4 w-4 mr-2" />
                Characters
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1">
                <Clock className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="comic" className="flex-1">
                <Scroll className="h-4 w-4 mr-2" />
                Story
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="characters" className="m-0">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="p-4 space-y-4">
                  {scene.keyCharacters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="timeline" className="m-0">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="p-4">
                  <h3 className="font-medieval text-lg mb-4 text-chrono-royal dark:text-chrono-gold">
                    Conquest Timeline
                  </h3>
                  <Timeline events={timelineEvents} />
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="comic" className="m-0">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="p-4 text-center">
                  <h3 className="font-medieval text-lg mb-4 text-chrono-royal dark:text-chrono-gold">
                    Your Story
                  </h3>
                  <div className="rounded-md bg-chrono-slate/20 dark:bg-chrono-navy/40 p-12 flex items-center justify-center">
                    <p className="text-chrono-slate dark:text-chrono-parchment/60">
                      Comic panels will be generated as your story unfolds
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Mobile Drawer for Character Info and Other Tabs */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              variant="outline" 
              className="lg:hidden fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg bg-chrono-gold text-chrono-royal"
            >
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <div className="mt-4 px-4">
              {/* Mobile Scenario Selector */}
              <div className="mb-4 flex items-center">
                <span className="mr-3 text-sm font-medieval text-chrono-royal dark:text-chrono-gold">SCENARIO:</span>
                <Select 
                  value={selectedScenario} 
                  onValueChange={handleScenarioChange}
                >
                  <SelectTrigger className="w-full bg-white/80 dark:bg-chrono-navy/80 text-sm">
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_SCENARIOS.map(scenario => (
                      <SelectItem key={scenario.id} value={scenario.id}>
                        {scenario.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="characters">
                <TabsList className="w-full">
                  <TabsTrigger value="characters" className="flex-1">
                    <User className="h-4 w-4 mr-2" />
                    Characters
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="comic" className="flex-1">
                    <Scroll className="h-4 w-4 mr-2" />
                    Story
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="characters" className="m-0">
                  <ScrollArea className="h-[calc(80vh-12rem)]">
                    <div className="space-y-4 py-4">
                      {scene.keyCharacters.map((character) => (
                        <CharacterCard key={character.id} character={character} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="timeline" className="m-0">
                  <ScrollArea className="h-[calc(80vh-12rem)]">
                    <div className="py-4">
                    <h3 className="font-medieval text-lg mb-4 text-chrono-royal dark:text-chrono-gold">
                        Conquest Timeline
                      </h3>
                      <Timeline events={timelineEvents} />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="comic" className="m-0">
                  <ScrollArea className="h-[calc(80vh-12rem)]">
                    <div className="py-4 text-center">
                      <h3 className="font-medieval text-lg mb-4 text-chrono-royal dark:text-chrono-gold">
                        Your Story
                      </h3>
                      <div className="rounded-md bg-chrono-slate/20 dark:bg-chrono-navy/40 p-12 flex items-center justify-center">
                        <p className="text-chrono-slate dark:text-chrono-parchment/60">
                          Comic panels will be generated as your story unfolds
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

// Keep the component definitions for MessageBubble, CharacterCard, and Timeline the same
const MessageBubble = ({ message, isPlayer }: { message: Message, isPlayer: boolean }) => {
  if (message.type === 'event' || message.type === 'system') {
    return (
      <div className="flex justify-center my-6">
        <div className="bg-chrono-slate/10 dark:bg-chrono-navy/40 rounded-md px-4 py-2 max-w-[80%] text-center">
          <p className="italic text-chrono-slate dark:text-chrono-parchment/80">{message.content}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex ${isPlayer ? 'justify-end' : 'justify-start'} gap-3`}>
      {!isPlayer && (
        <div 
          className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url(${message.senderImageUrl})` }}
        />
      )}
      <div className={`max-w-[70%] ${isPlayer ? 'bg-chrono-royal/90 text-white' : 'bg-white dark:bg-chrono-navy/80 dark:text-chrono-parchment'} rounded-lg p-3 shadow`}>
        {!isPlayer && (
          <p className="font-medieval text-xs mb-1 text-chrono-gold">{message.senderName}</p>
        )}
        <p className="whitespace-pre-line">{message.content}</p>
        <p className="text-right text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isPlayer && (
        <div 
          className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url(${message.senderImageUrl})` }}
        />
      )}
    </div>
  );
};

const CharacterCard = ({ character }: { character: Character }) => {
  // Get the right icon based on relation
  const getRelationIcon = () => {
    switch (character.relation) {
      case 'ally': return <Shield className="h-4 w-4 text-chrono-forest" />;
      case 'enemy': return <Sword className="h-4 w-4 text-chrono-crimson" />;
      case 'advisor': return <Crown className="h-4 w-4 text-chrono-gold" />;
      default: return <MessageSquare className="h-4 w-4 text-chrono-slate" />;
    }
  };
  
  // Get color class based on relation
  const getRelationClass = () => {
    switch (character.relation) {
      case 'ally': return 'border-chrono-forest/50 bg-chrono-forest/10';
      case 'enemy': return 'border-chrono-crimson/50 bg-chrono-crimson/10';
      case 'advisor': return 'border-chrono-gold/50 bg-chrono-gold/10';
      default: return 'border-chrono-slate/50 bg-chrono-slate/10';
    }
  };
  
  return (
    <div className={`rounded-lg border p-3 ${getRelationClass()}`}>
      <div className="flex gap-3">
        <div 
          className="w-12 h-12 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${character.imageUrl})` }}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-medieval text-chrono-royal dark:text-chrono-gold">{character.name}</h4>
            {getRelationIcon()}
          </div>
          <p className="text-xs text-chrono-slate dark:text-chrono-parchment/70">{character.title}</p>
          
          <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
            <div>
              <span className="text-chrono-slate dark:text-chrono-parchment/60">Influence:</span>
              <div className="w-full bg-chrono-slate/20 rounded-full h-1.5 mt-1">
                <div className="bg-chrono-royal dark:bg-chrono-gold h-1.5 rounded-full" style={{ width: `${character.influence}%` }}></div>
              </div>
            </div>
            <div>
              <span className="text-chrono-slate dark:text-chrono-parchment/60">Loyalty:</span>
              <div className="w-full bg-chrono-slate/20 rounded-full h-1.5 mt-1">
                <div className="bg-chrono-crimson h-1.5 rounded-full" style={{ width: `${character.loyalty}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs mt-2 text-chrono-slate dark:text-chrono-parchment/80">{character.description}</p>
    </div>
  );
};

const Timeline = ({ events }: { events: TimelineEvent[] }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-chrono-forest';
      case 'negative': return 'text-chrono-crimson';
      default: return 'text-chrono-slate';
    }
  };
  
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-chrono-gold/30"></div>
      
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative ml-6">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-chrono-gold border-4 border-chrono-parchment dark:border-chrono-navy"></div>
            <div className={`text-xs mb-1 ${getImpactColor(event.impact)}`}>
              {new Date(event.timestamp).toLocaleDateString()} • {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <h4 className="font-medieval text-chrono-royal dark:text-chrono-gold">{event.title}</h4>
            <p className="text-sm text-chrono-slate dark:text-chrono-parchment/80 mt-1">{event.description}</p>
            <div className="flex gap-1 mt-2">
              {event.affectedAreas.map((area, i) => (
                <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-chrono-slate/10 dark:bg-chrono-navy/40">
                  {area}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;