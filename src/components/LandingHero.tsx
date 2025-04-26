
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import MainLogo from './MainLogo';
import { Scroll, Clock, Crown, MessageSquare } from 'lucide-react';

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 text-center medieval-bg">
      <div className="animate-fade-in">
        <MainLogo />

        <div className="mt-10 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl font-serif text-white dark:text-chrono-ivory mb-6">
            Step into pivotal moments in history, interact with AI-powered historical figures, 
            and make decisions that forever alter the course of time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <FeatureCard 
              icon={<MessageSquare className="h-8 w-8 text-chrono-crimson dark:text-chrono-gold" />}
              title="Dynamic Conversations"
              description="Engage with AI-powered historical figures who respond to your decisions"
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-chrono-crimson dark:text-chrono-gold" />}
              title="Historical Accuracy"
              description="Experience authentic scenarios with accurate details and characters"
            />
            <FeatureCard 
              icon={<Scroll className="h-8 w-8 text-chrono-crimson dark:text-chrono-gold" />}
              title="Branching Narratives"
              description="Every choice matters, creating unique alternate histories"
            />
            <FeatureCard 
              icon={<Crown className="h-8 w-8 text-chrono-crimson dark:text-chrono-gold" />}
              title="Legacy Building"
              description="Forge your reputation and see your impact across time"
            />
          </div>

          <div className="mt-8 space-y-4">
            <Button 
              onClick={() => navigate('/scenes')}
              className="bg-chrono-crimson hover:bg-chrono-mahogany text-white font-medieval text-xl px-8 py-6"
            >
              Begin Your Conquest
            </Button>
            <p className="text-sm font-serif dark:text-chrono-parchment">
              No account required to start your journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="bg-chrono-parchment/80 dark:bg-chrono-navy/80 rounded-lg p-5 border border-chrono-gold/30 hover:border-chrono-gold transition-all">
      <div className="flex flex-col items-center">
        {icon}
        <h3 className="text-lg font-medieval mt-3 mb-2 text-chrono-royal dark:text-chrono-parchment">{title}</h3>
        <p className="text-sm text-chrono-slate dark:text-chrono-parchment/80">{description}</p>
      </div>
    </div>
  );
};

export default LandingHero;
