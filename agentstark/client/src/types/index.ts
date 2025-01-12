// Existing types...

export interface AgentCharacter {
  name: string;
  bio: string;
  traits: string[];
  expertise: string[];
  style: {
    language: string[];
    communication: string[];
  };
  lore: string[];
}

export interface CharacterTemplate {
  id: string;
  name: string;
  description: string;
  bio: string;
  traits: string[];
  expertise: string[];
  icon: string;
}