
import type { LucideIcon } from "lucide-react";
import { 
  ShieldOff, 
  ShieldCheck, 
  MessageCircleWarning, 
  Fish, 
  ArrowUpToLine, 
  WifiOff, 
  DatabaseBackup, 
  Bug, 
  Lock
} from "lucide-react";

export type AwarenessPoster = {
  id: number;
  title: string;
  message: string;
  icon: LucideIcon;
};

export const awarenessPosters: AwarenessPoster[] = [
  {
    id: 1,
    title: "Mogambo... khush nahi hua!",
    message: "Mogambo is not happy when you use weak passwords. Create strong, unique passwords to keep your accounts secure!",
    icon: ShieldOff,
  },
  {
    id: 2,
    title: "Mere Paas 2FA Hai!",
    message: "For your online accounts, mere paas Two-Factor Authentication hai. What do you have? Enable it now for an extra layer of security.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Don't be a hero, don't share your OTP.",
    message: "No matter who asks or how urgent it seems, never share your OTP. True heroes protect their secrets.",
    icon: MessageCircleWarning,
  },
  {
    id: 4,
    title: "Rishte mein toh hum tumhare Phisher lagte hain.",
    message: "Beware of deceptive emails and messages. They may look like they're from someone you trust, but they're phishing for your data.",
    icon: Fish,
  },
  {
    id: 5,
    title: "All is well... if you update your software.",
    message: "Keep calm and update on. Regular software updates patch security holes and protect you from the latest threats.",
    icon: ArrowUpToLine,
  },
  {
    id: 6,
    title: "Kaun hai yeh, jisne dobara mudke public Wi-Fi use kiya?",
    message: "Who is this that turned back to use public Wi-Fi for banking? Avoid sensitive transactions on unsecured networks.",
    icon: WifiOff,
  },
  {
    id: 7,
    title: "Kitne Aadmi The?",
    message: "Doesn't matter how many hackers there were. What matters is if you've backed up your data. Back up regularly!",
    icon: DatabaseBackup,
  },
  {
    id: 8,
    title: "Pushpa, I hate tears... and malware.",
    message: "Protect your devices from tears and malware. Install a reliable antivirus and keep it updated.",
    icon: Bug,
  },
  {
    id: 9,
    title: "Ek baar jo maine commitment kar di...",
    message: "...toh main apne privacy settings ki bhi nahi sunta. Just kidding! Regularly review your social media privacy settings.",
    icon: Lock,
  },
];
