
import { TimelineEvent } from '@/types/game';

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    title: 'Arrived in Rome',
    description: 'You have arrived in Rome and established yourself as a trusted advisor to Caesar.',
    timestamp: new Date(new Date().getTime() - 5400000),
    impact: 'neutral',
    affectedAreas: ['Personal']
  },
  {
    id: 'event-2',
    title: 'Meeting with Servilia',
    description: 'Servilia has provided intelligence about the political climate in Rome.',
    timestamp: new Date(new Date().getTime() - 3500000),
    impact: 'positive',
    affectedAreas: ['Intelligence', 'Politics']
  },
  {
    id: 'event-3',
    title: 'Dinner at Brutus\' Villa',
    description: 'Attended dinner at Brutus\' villa where senators discussed Caesar\'s power with concern.',
    timestamp: new Date(new Date().getTime() - 2700000),
    impact: 'negative',
    affectedAreas: ['Politics', 'Security']
  },
  {
    id: 'event-4',
    title: 'Warning from Mark Antony',
    description: 'Mark Antony expressed concern about Cassius\' influence on Brutus.',
    timestamp: new Date(new Date().getTime() - 1900000),
    impact: 'positive',
    affectedAreas: ['Intelligence', 'Security']
  },
  {
    id: 'event-5',
    title: 'Meeting with Caesar',
    description: 'Caesar revealed that Calpurnia has had dreams warning of danger at the Senate meeting.',
    timestamp: new Date(new Date().getTime() - 1700000),
    impact: 'neutral',
    affectedAreas: ['Politics', 'Personal']
  }
];
