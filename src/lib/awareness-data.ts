
export type AwarenessPoster = {
  id: number;
  title: string;
  message: string;
  imageUrl: string;
  dataAiHint: string;
};

export const awarenessPosters: AwarenessPoster[] = [
  {
    id: 1,
    title: "Mogambo... khush nahi hua!",
    message: "Mogambo is not happy when you use weak passwords. Create strong, unique passwords to keep your accounts secure!",
    imageUrl: "https://placehold.co/600x800",
    dataAiHint: "angry villain",
  },
  {
    id: 2,
    title: "Mere Paas 2FA Hai!",
    message: "For your online accounts, mere paas Two-Factor Authentication hai. What do you have? Enable it now for an extra layer of security.",
    imageUrl: "https://placehold.co/600x800",
    dataAiHint: "secure shield",
  },
  {
    id: 3,
    title: "Don't be a hero, don't share your OTP.",
    message: "No matter who asks or how urgent it seems, never share your OTP. True heroes protect their secrets.",
    imageUrl: "https://placehold.co/600x800",
    dataAiHint: "secret code",
  },
  {
    id: 4,
    title: "Rishte mein toh hum tumhare Phisher lagte hain.",
    message: "Beware of deceptive emails and messages. They may look like they're from someone you trust, but they're phishing for your data.",
    imageUrl: "https://placehold.co/600x800",
    dataAiHint: "hacker fishing",
  },
  {
    id: 5,
    title: "All is well... if you update your software.",
    message: "Keep calm and update on. Regular software updates patch security holes and protect you from the latest threats.",
    imageUrl: "https://placehold.co/600x800",
    dataAiHint: "software update",
  },
  {
    id: 6,
    title: "Kaun hai yeh, jisne dobara mudke public Wi-Fi use kiya?",
    message: "Who is this that turned back to use public Wi-Fi for banking? Avoid sensitive transactions on unsecured networks.",
    imageUrl: "https://placehold.co/600x800",
    dataAiHint: "public wifi",
  },
];
