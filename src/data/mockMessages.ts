
import { Message } from '@/types/game';

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'system',
    senderName: 'System',
    senderImageUrl: '',
    content: 'Welcome to your historical scenario. Your choices will change the course of history.',
    timestamp: new Date(new Date().getTime() - 3600000),
    type: 'system'
  },
  {
    id: 'msg-2',
    senderId: 'servilia',
    senderName: 'Servilia',
    senderImageUrl: 'https://i.imgur.com/sL0Vb5H.jpg',
    content: 'My lord, welcome to Rome. As you can see, the political situation is tense. Caesar\'s power grows daily, and not everyone is pleased with this development.',
    timestamp: new Date(new Date().getTime() - 3500000),
    type: 'text'
  },
  {
    id: 'msg-3',
    senderId: 'event',
    senderName: 'Event',
    senderImageUrl: '',
    content: 'A messenger arrives with an invitation to dine with Brutus this evening.',
    timestamp: new Date(new Date().getTime() - 3400000),
    type: 'event'
  },
  {
    id: 'msg-4',
    senderId: 'player',
    senderName: 'Player',
    senderImageUrl: '/placeholder.svg',
    content: 'I will accept Brutus\' invitation. Perhaps I can learn more about the mood among the senators.',
    timestamp: new Date(new Date().getTime() - 3300000),
    type: 'text'
  },
  {
    id: 'msg-5',
    senderId: 'servilia',
    senderName: 'Servilia',
    senderImageUrl: 'https://i.imgur.com/sL0Vb5H.jpg',
    content: 'A wise choice. My son respects you, and may speak more freely in your presence. Be wary though - not all who dine at his table are friends of Caesar.',
    timestamp: new Date(new Date().getTime() - 3200000),
    type: 'text'
  },
  {
    id: 'msg-6',
    senderId: 'event',
    senderName: 'Event',
    senderImageUrl: '',
    content: 'Later that evening, at Brutus\' villa...',
    timestamp: new Date(new Date().getTime() - 3100000),
    type: 'event'
  },
  {
    id: 'msg-7',
    senderId: 'brutus',
    senderName: 'Marcus Brutus',
    senderImageUrl: 'https://i.imgur.com/EwzS9Sc.jpg',
    content: 'Welcome, my friend! I\'m pleased you could join us tonight. We were just discussing tomorrow\'s Senate meeting. Caesar plans to announce his campaign against Parthia before he leaves Rome.',
    timestamp: new Date(new Date().getTime() - 3000000),
    type: 'text'
  },
  {
    id: 'msg-8',
    senderId: 'cassius',
    senderName: 'Gaius Cassius',
    senderImageUrl: 'https://i.imgur.com/pUDncA1.jpg',
    content: 'Yes, always another war, another conquest. And each victory only adds to his already swollen power. Tell me, as his ally, do you not fear what Caesar might become? What Rome might become under a king?',
    timestamp: new Date(new Date().getTime() - 2900000),
    type: 'text'
  },
  {
    id: 'msg-9',
    senderId: 'player',
    senderName: 'Player',
    senderImageUrl: '/placeholder.svg',
    content: 'Caesar has no desire to be king, Cassius. He seeks to strengthen Rome, not destroy our traditions.',
    timestamp: new Date(new Date().getTime() - 2800000),
    type: 'text'
  },
  {
    id: 'msg-10',
    senderId: 'cassius',
    senderName: 'Gaius Cassius',
    senderImageUrl: 'https://i.imgur.com/pUDncA1.jpg',
    content: 'Yet he accepts dictatorial powers willingly enough. The Senate becomes more irrelevant by the day. Look around you - even men like Brutus, descendant of the man who drove out the last king of Rome, can see the danger.',
    timestamp: new Date(new Date().getTime() - 2700000),
    type: 'text'
  },
  {
    id: 'msg-11',
    senderId: 'brutus',
    senderName: 'Marcus Brutus',
    senderImageUrl: 'https://i.imgur.com/EwzS9Sc.jpg',
    content: 'Come now, Cassius, we are having dinner. Let us not bore our guest with politics all evening. More wine?',
    timestamp: new Date(new Date().getTime() - 2600000),
    type: 'text'
  },
  {
    id: 'msg-12',
    senderId: 'event',
    senderName: 'Event',
    senderImageUrl: '',
    content: 'You notice a subtle exchange of glances between several senators at the table.',
    timestamp: new Date(new Date().getTime() - 2500000),
    type: 'event'
  },
  {
    id: 'msg-13',
    senderId: 'player',
    senderName: 'Player',
    senderImageUrl: '/placeholder.svg',
    content: 'I appreciate your hospitality, Brutus, but I should return to Caesar. He expects my counsel before tomorrow\'s Senate meeting.',
    timestamp: new Date(new Date().getTime() - 2400000),
    type: 'text'
  },
  {
    id: 'msg-14',
    senderId: 'brutus',
    senderName: 'Marcus Brutus',
    senderImageUrl: 'https://i.imgur.com/EwzS9Sc.jpg',
    content: 'Of course. Duty calls us all. Give Caesar my regards.',
    timestamp: new Date(new Date().getTime() - 2300000),
    type: 'text'
  },
  {
    id: 'msg-15',
    senderId: 'event',
    senderName: 'Event',
    senderImageUrl: '',
    content: 'Later that night, returning to your villa...',
    timestamp: new Date(new Date().getTime() - 2200000),
    type: 'event'
  },
  {
    id: 'msg-16',
    senderId: 'mark-antony',
    senderName: 'Mark Antony',
    senderImageUrl: 'https://i.imgur.com/LTXL7zB.jpg',
    content: 'There you are! I\'ve been looking for you. Caesar wishes to speak with us immediately. Something about tomorrow\'s Senate meeting.',
    timestamp: new Date(new Date().getTime() - 2100000),
    type: 'text'
  },
  {
    id: 'msg-17',
    senderId: 'player',
    senderName: 'Player',
    senderImageUrl: '/placeholder.svg',
    content: 'I just came from Brutus\' villa. Something is amiss, Antony. Cassius was there, along with several other senators, and they spoke of Caesar with barely concealed contempt.',
    timestamp: new Date(new Date().getTime() - 2000000),
    type: 'text'
  },
  {
    id: 'msg-18',
    senderId: 'mark-antony',
    senderName: 'Mark Antony',
    senderImageUrl: 'https://i.imgur.com/LTXL7zB.jpg',
    content: 'Cassius has always been jealous of Caesar\'s success. But Brutus... that is concerning. We should inform Caesar immediately.',
    timestamp: new Date(new Date().getTime() - 1900000),
    type: 'text'
  },
  {
    id: 'msg-19',
    senderId: 'event',
    senderName: 'Event',
    senderImageUrl: '',
    content: 'At Caesar\'s residence...',
    timestamp: new Date(new Date().getTime() - 1800000),
    type: 'event'
  },
  {
    id: 'msg-20',
    senderId: 'julius-caesar',
    senderName: 'Julius Caesar',
    senderImageUrl: 'https://i.imgur.com/3PpW6g0.jpg',
    content: 'Welcome, my friends. I trust your evening was illuminating? The Senate awaits me tomorrow, and Calpurnia has had troubling dreams. She begs me not to attend the meeting.',
    timestamp: new Date(new Date().getTime() - 1700000),
    type: 'text'
  }
];
