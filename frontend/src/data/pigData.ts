import KingPiggy from "../assets/PiggyBank.jpeg";
import Baconator from "../assets/ApolloCarrot.jpeg";
import BoxerPig from "../assets/BoxerPig.jpeg";
import Podcast from "../assets/Podcast.jpeg";
import Politician from "../assets/Politician.jpeg";

interface Pig {
  name: string;
  imageUrl: string;
  description: string;
  height: string;
  weight: string;
  longestJump: string;
}

export const Pigs: Pig[] = [
  {
    name: "King Oinksalot",
    imageUrl: KingPiggy,
    description:
      "The undisputed monarch of the mud pit!, His rules are simple: all pigs must bow down and offer snacks. His favorite pastime is rolling in the mud while plotting world domination.",
    height: "25 cm",
    weight: "15 kg",
    longestJump: "0.5 m",
  },
  {
    name: "Baconator",
    imageUrl: Baconator,
    description:
      "Professor Percival Piggerton, Ph.D., FRS, is the preeminent swine scholar of wallowing dynamics and porcine thermodynamics.",
    height: "80 cm",
    weight: "200 kg",
    longestJump: "1.8 m",
  },
  {
    name: "Logan Pork",
    imageUrl: BoxerPig,
    description:
      "He started life as the runt of the litter, often overlooked.But with every playful tussle, a hidden strength emerged.Now, he aims to prove that even the smallest can achieve greatness in the ring.",
    height: "75 cm",
    weight: "180 kg",
    longestJump: "1.5 m",
  },
  {
    name: "Pepper lee",
    imageUrl: Podcast,
    description:
      "He found his voice not in squeals, but in stories. tune in to www.pigpodcast.com for the latest episodes. where he discusses the pig Mafia and best mud baths.",
    height: "60 cm",
    weight: "100 kg",
    longestJump: "2.3 m",
  },
  {
    name: "Marco Porkio",
    imageUrl: Politician,
    description:
      "The charismatic politician who promises to bring home the bacon for all pigs. His campaign slogan? 'Make Mud Great Again!",
    height: "110 cm",
    weight: "350 kg",
    longestJump: "0.7 m",
  },
];
