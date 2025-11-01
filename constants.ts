
import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What primarily triggers your urges?",
    subtext: "Relevant to recent researches and the social media landscape.",
    options: [
      { id: '1A', text: "Highly curated or suggestive content on social media (e.g., Instagram, TikTok)." },
      { id: '1B', text: "Targeted advertising or explicit content encountered unexpectedly online." },
      { id: '1C', text: "Loneliness, boredom, or emotional stress leading me to seek digital gratification." },
      { id: '1D', text: "Specific visual or auditory cues from media (e.g., movies, music videos)." },
      { id: '1E', text: "Imagining scenarios after reading or hearing about certain topics." },
    ],
  },
  {
    id: 2,
    text: "How often do you masturbate?",
    options: [
      { id: '2A', text: "Multiple times a day" },
      { id: '2B', text: "Once a day" },
      { id: '2C', text: "A few times a week" },
      { id: '2D', text: "Once a week" },
      { id: '2E', text: "A few times a month" },
      { id: '2F', text: "Rarely or never" },
    ],
  },
  {
    id: 3,
    text: "Do you feel guilt after ejaculating? If so, why?",
    options: [
      { id: '3A', text: "Yes, it detracts from my productivity or personal goals." },
      { id: '3B', text: "Yes, it conflicts with my personal values or moral beliefs." },
      { id: '3C', text: "Yes, it makes me less present or connected in my relationships." },
      { id: '3D', text: "Yes, it's a sign of a lack of self-control." },
      { id: '3E', text: "No, I do not typically feel guilt." },
      { id: '3F', text: "Sometimes, depending on the circumstances." },
    ],
  },
  {
    id: 4,
    text: "What kind of environment typically leads to arousal?",
    options: [
      { id: '4A', text: "Private and solitary settings, especially at home." },
      { id: '4B', text: "When using a smartphone or computer in bed." },
      { id: '4C', text: "While browsing social media or specific websites online." },
      { id: '4D', text: "When feeling relaxed and stress-free." },
      { id: '4E', text: "When feeling stressed, anxious, or bored, seeking an escape." },
    ],
  },
  {
    id: 5,
    text: "How many times have you tried to build self-discipline in this area and failed?",
    options: [
      { id: '5A', text: "This is my first serious attempt." },
      { id: '5B', text: "1-2 times" },
      { id: '5C', text: "3-5 times" },
      { id: '5D', text: "More than 5 times" },
      { id: '5E', text: "I haven't tried to stop, but I've noticed a pattern." },
    ],
  },
  {
    id: 6,
    text: "What are your typical thoughts right before giving into an urge?",
    options: [
      { id: '6A', text: `"Just one quick look won't hurt."` },
      { id: '6B', text: `"I'm stressed/bored/lonely, and this will make me feel better."` },
      { id: '6C', text: `"I deserve this; I've been good all day/week."` },
      { id: '6D', text: `"It's too difficult to resist; I might as well give in."` },
      { id: '6E', text: `"I'll start fresh tomorrow/next week."` },
      { id: '6F', text: `"I'm just curious about this content."` },
    ],
  },
  {
    id: 7,
    text: "What age group do you belong to?",
    options: [
      { id: '7A', text: "Under 18" },
      { id: '7B', text: "18-24" },
      { id: '7C', text: "25-34" },
      { id: '7D', text: "35-44" },
      { id: '7E', text: "45-54" },
      { id: '7F', text: "55+" },
    ],
  },
  {
    id: 8,
    text: "What is your average daily screen time?",
    options: [
      { id: '8A', text: "Less than 2 hours" },
      { id: '8B', text: "2-4 hours" },
      { id: '8C', text: "4-6 hours" },
      { id: '8D', text: "6-8 hours" },
      { id: '8E', text: "More than 8 hours" },
    ],
  },
  {
    id: 9,
    text: "What is your relationship status?",
    options: [
      { id: '9A', text: "Single" },
      { id: '9B', text: "In a relationship / Partnered" },
      { id: '9C', text: "Married" },
      { id: '9D', text: "Prefer not to say" },
    ],
  },
  {
    id: 10,
    text: "How often do you encounter explicit content on social media?",
    options: [
      { id: '10A', text: "Multiple times a day" },
      { id: '10B', text: "Once a day" },
      { id: '10C', text: "A few times a week" },
      { id: '10D', text: "Once a week or less" },
      { id: '10E', text: "Rarely or never" },
      { id: '10F', text: "Only when actively searching for it" },
    ],
  },
];
