
import { SceneType } from '@/types/game';

export const historicalScenes: SceneType[] = [
  {
    id: 'caesar-assassination',
    title: "The Ides of March",
    description: "You are a close ally of Julius Caesar on the day before his assassination. The conspirators are whispering in the shadows, and the fate of Rome hangs in the balance.",
    era: "Ancient Rome",
    year: "44 BCE",
    location: "Rome, Roman Republic",
    imageUrl: "https://i.imgur.com/f2RD3kZ.jpg",
    difficulty: "Medium",
    keyCharacters: [
      {
        id: 'julius-caesar',
        name: "Julius Caesar",
        title: "Dictator of Rome",
        description: "The ambitious ruler who has conquered Gaul and defeated Pompey. Many fear his growing power threatens the Republic.",
        imageUrl: "https://i.imgur.com/3PpW6g0.jpg",
        relation: 'ally',
        influence: 95,
        loyalty: 80,
        specialty: ['Leadership', 'Military']
      },
      {
        id: 'brutus',
        name: "Marcus Brutus",
        title: "Senator and Praetor",
        description: "A respected Roman noble believed to be a descendant of the founder of the Republic. Caesar trusts him completely.",
        imageUrl: "https://i.imgur.com/EwzS9Sc.jpg",
        relation: 'neutral',
        influence: 70,
        loyalty: 30,
        specialty: ['Politics', 'Philosophy']
      },
      {
        id: 'cassius',
        name: "Gaius Cassius",
        title: "Senator and Conspirator",
        description: "A skilled military commander with a sharp mind and deep resentment of Caesar's power.",
        imageUrl: "https://i.imgur.com/pUDncA1.jpg",
        relation: 'enemy',
        influence: 65,
        loyalty: 10,
        specialty: ['Military', 'Intrigue']
      },
      {
        id: 'calpurnia',
        name: "Calpurnia",
        title: "Caesar's Wife",
        description: "Intelligent and devoted to her husband, she has been troubled by prophetic nightmares of his death.",
        imageUrl: "https://i.imgur.com/nF9ueOG.jpg",
        relation: 'ally',
        influence: 50,
        loyalty: 100,
        specialty: ['Insight', 'Nobility']
      },
      {
        id: 'mark-antony',
        name: "Mark Antony",
        title: "Consul and Commander",
        description: "Caesar's loyal right hand and fellow consul. A skilled orator and military commander.",
        imageUrl: "https://i.imgur.com/LTXL7zB.jpg",
        relation: 'ally',
        influence: 85,
        loyalty: 90,
        specialty: ['Military', 'Oratory']
      },
      {
        id: 'cicero',
        name: "Cicero",
        title: "Senator and Orator",
        description: "The greatest orator in Rome and a defender of the Republic's traditional values.",
        imageUrl: "https://i.imgur.com/bOJuNll.jpg",
        relation: 'neutral',
        influence: 75,
        loyalty: 40,
        specialty: ['Oratory', 'Philosophy']
      },
      {
        id: 'servilia',
        name: "Servilia",
        title: "Roman Noblewoman",
        description: "Mother of Brutus and former lover of Caesar. She wields significant behind-the-scenes influence.",
        imageUrl: "https://i.imgur.com/sL0Vb5H.jpg",
        relation: 'advisor',
        influence: 60,
        loyalty: 50,
        specialty: ['Intrigue', 'Politics']
      }
    ],
    situationBrief: "Rome, March 14th, 44 BCE. The Republic is in turmoil. Julius Caesar has been named dictator for life, and many senators fear he intends to crown himself king. A conspiracy led by Cassius and Brutus has formed to assassinate Caesar during tomorrow's Senate meeting.\n\nYou are a trusted ally of Caesar with knowledge of brewing discontent. Caesar trusts your counsel, but the conspirators see you as a threat. Tonight, you've noticed unusual meetings and whispers. You must navigate this political minefield carefully - your decisions will impact not just Caesar's fate but the future of Rome itself.",
    initialEvents: [
      "Conspirators have been meeting secretly at Cassius's home",
      "The Senate will convene tomorrow at the Theatre of Pompey",
      "Caesar has dismissed his personal guard at Mark Antony's request",
      "Calpurnia has been having nightmares about Caesar's death"
    ]
  },
  {
    id: 'constantinople-fall',
    title: "The Fall of Constantinople",
    description: "As a close advisor to the Byzantine Emperor Constantine XI, you must navigate the final days of Constantinople as Ottoman forces close in on the city.",
    era: "Byzantine Empire",
    year: "1453 CE",
    location: "Constantinople",
    imageUrl: "https://i.imgur.com/9aKP5XJ.jpg",
    difficulty: "Hard",
    keyCharacters: [
      {
        id: 'constantine-xi',
        name: "Constantine XI",
        title: "Byzantine Emperor",
        description: "The last Emperor of Byzantium, known for his courage and determination to save his empire against overwhelming odds.",
        imageUrl: "https://i.imgur.com/DnIAZ8x.jpg",
        relation: 'ally',
        influence: 90,
        loyalty: 100,
        specialty: ['Leadership', 'Diplomacy']
      },
      {
        id: 'mehmed-ii',
        name: "Mehmed II",
        title: "Ottoman Sultan",
        description: "The young, ambitious Sultan determined to capture Constantinople and make it the capital of his expanding empire.",
        imageUrl: "https://i.imgur.com/XBM07wG.jpg",
        relation: 'enemy',
        influence: 95,
        loyalty: 0,
        specialty: ['Military', 'Strategy']
      },
      {
        id: 'giustiniani',
        name: "Giovanni Giustiniani",
        title: "Genoese Commander",
        description: "A skilled military commander from Genoa who arrived with 700 men to help defend the city.",
        imageUrl: "https://i.imgur.com/zk9GBDM.jpg",
        relation: 'ally',
        influence: 75,
        loyalty: 80,
        specialty: ['Military', 'Tactics']
      },
      {
        id: 'loukas-notaras',
        name: "Loukas Notaras",
        title: "Megas Doux (Grand Duke)",
        description: "The highest-ranking Byzantine official after the Emperor, known for his controversial statement: 'Better the Sultan's turban than the Cardinal's hat.'",
        imageUrl: "https://i.imgur.com/vDZTuwp.jpg",
        relation: 'neutral',
        influence: 65,
        loyalty: 60,
        specialty: ['Politics', 'Administration']
      },
      {
        id: 'urban-hungarian',
        name: "Urban the Hungarian",
        title: "Master Cannon Founder",
        description: "A talented artillery engineer who offered his services to Constantinople first but, after being declined, went to the Ottoman Sultan.",
        imageUrl: "https://i.imgur.com/XRsXKwF.jpg",
        relation: 'enemy',
        influence: 50,
        loyalty: 0,
        specialty: ['Engineering', 'Artillery']
      },
      {
        id: 'cardinal-isidore',
        name: "Cardinal Isidore",
        title: "Papal Legate",
        description: "Sent by the Pope to enforce the Union of the Churches, his presence is divisive among the Orthodox population.",
        imageUrl: "https://i.imgur.com/UpxL3dz.jpg",
        relation: 'advisor',
        influence: 60,
        loyalty: 70,
        specialty: ['Diplomacy', 'Religion']
      }
    ],
    situationBrief: "Constantinople, April 1453. The once-mighty Byzantine Empire has been reduced to little more than the city of Constantinople itself. Ottoman Sultan Mehmed II has surrounded the city with a massive army of over 80,000 men and a navy that controls the sea. Inside the walls, Emperor Constantine XI commands a force of just 7,000 defenders.\n\nThe Sultan has positioned massive cannons, designed by Urban the Hungarian, capable of breaching the city's legendary walls. Food supplies are dwindling, and religious tensions between Orthodox and Catholic Christians undermine unity. Western promises of aid seem increasingly unlikely to materialize.\n\nAs a trusted advisor to the Emperor, your counsel will shape the final days of the thousand-year Byzantine Empire. Will you advise surrender to save lives? Seek a diplomatic solution? Or help orchestrate a desperate last stand that might inspire future generations?",
    initialEvents: [
      "Ottoman cannons have begun bombarding the Theodosian Walls",
      "A mysterious light phenomenon over Hagia Sophia has been interpreted as a bad omen",
      "Genoese ships managed to break through the Ottoman blockade",
      "Religious tensions rise as Catholic and Orthodox Christians debate church union"
    ]
  },
  {
    id: 'cuban-missile',
    title: "Cuban Missile Crisis",
    description: "As a key advisor to President Kennedy, navigate the most dangerous nuclear standoff in history as the world stands on the brink of apocalypse.",
    era: "Cold War",
    year: "1962 CE",
    location: "Washington D.C., United States",
    imageUrl: "https://i.imgur.com/zb48N8r.jpg",
    difficulty: "Expert",
    keyCharacters: [
      {
        id: 'kennedy',
        name: "John F. Kennedy",
        title: "President of the United States",
        description: "The young, charismatic leader faced with the most dangerous crisis of the nuclear age.",
        imageUrl: "https://i.imgur.com/jgOPV4I.jpg",
        relation: 'ally',
        influence: 100,
        loyalty: 90,
        specialty: ['Leadership', 'Diplomacy']
      },
      {
        id: 'khrushchev',
        name: "Nikita Khrushchev",
        title: "Soviet Premier",
        description: "The sometimes unpredictable Soviet leader who authorized placing nuclear missiles in Cuba.",
        imageUrl: "https://i.imgur.com/nz0mwLC.jpg",
        relation: 'enemy',
        influence: 95,
        loyalty: 0,
        specialty: ['Strategy', 'Politics']
      },
      {
        id: 'castro',
        name: "Fidel Castro",
        title: "Cuban Revolutionary Leader",
        description: "The fiery Cuban revolutionary who welcomed Soviet missiles to protect his island from American invasion.",
        imageUrl: "https://i.imgur.com/8zUGOQT.jpg",
        relation: 'enemy',
        influence: 60,
        loyalty: 10,
        specialty: ['Revolution', 'Rhetoric']
      },
      {
        id: 'mcnamara',
        name: "Robert McNamara",
        title: "Secretary of Defense",
        description: "The brilliant, analytical Secretary of Defense who favors a naval blockade over military strikes.",
        imageUrl: "https://i.imgur.com/M4x8a3H.jpg",
        relation: 'advisor',
        influence: 85,
        loyalty: 80,
        specialty: ['Analysis', 'Strategy']
      },
      {
        id: 'lemay',
        name: "Curtis LeMay",
        title: "Air Force Chief of Staff",
        description: "The hawkish general who strongly advocates for immediate air strikes against Cuban missile sites.",
        imageUrl: "https://i.imgur.com/vy5gNq6.jpg",
        relation: 'neutral',
        influence: 70,
        loyalty: 65,
        specialty: ['Military', 'Air Power']
      },
      {
        id: 'bobby-kennedy',
        name: "Robert F. Kennedy",
        title: "Attorney General",
        description: "The President's brother and closest confidant, who emerges as a voice of restraint during the crisis.",
        imageUrl: "https://i.imgur.com/9TqCLnZ.jpg",
        relation: 'ally',
        influence: 90,
        loyalty: 100,
        specialty: ['Diplomacy', 'Politics']
      },
      {
        id: 'dobrynin',
        name: "Anatoly Dobrynin",
        title: "Soviet Ambassador",
        description: "The skilled Soviet diplomat who serves as a crucial backchannel between Kennedy and Khrushchev.",
        imageUrl: "https://i.imgur.com/XBvHDMh.jpg",
        relation: 'neutral',
        influence: 60,
        loyalty: 30,
        specialty: ['Diplomacy', 'Negotiation']
      }
    ],
    situationBrief: "Washington D.C., October 16, 1962. U.S. spy planes have discovered Soviet nuclear missile installations under construction in Cuba, just 90 miles from American shores. These missiles could reach most major U.S. cities within minutes, fundamentally altering the nuclear balance of power.\n\nPresident Kennedy has formed an Executive Committee (ExComm) of his most trusted advisors to handle this crisis. Military leaders are pushing for air strikes followed by an invasion of Cuba. Diplomats argue for a more measured approach, warning of potential escalation to nuclear war.\n\nAs a key member of ExComm, your advice will help shape Kennedy's response to this existential threat. Every option carries tremendous risk. The wrong move could trigger nuclear war, while appearing weak could encourage Soviet aggression elsewhere. The fate of millions, perhaps humanity itself, hangs in the balance.",
    initialEvents: [
      "U-2 spy planes have photographed Soviet SS-4 missile sites under construction in Cuba",
      "Military advisors are split between advocating for a naval blockade versus air strikes",
      "The Soviet Union publicly denies placing offensive weapons in Cuba",
      "Intelligence suggests some missiles may already be operational"
    ]
  }
];
