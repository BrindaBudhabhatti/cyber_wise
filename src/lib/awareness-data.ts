
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
  titleKey: string;
  messageKey: string;
  icon: LucideIcon;
};

export const awarenessPosters: AwarenessPoster[] = [
  {
    id: 1,
    titleKey: "awareness.mogambo.title",
    messageKey: "awareness.mogambo.message",
    icon: ShieldOff,
  },
  {
    id: 2,
    titleKey: "awareness.mere_paas.title",
    messageKey: "awareness.mere_paas.message",
    icon: ShieldCheck,
  },
  {
    id: 3,
    titleKey: "awareness.dont_be_hero.title",
    messageKey: "awareness.dont_be_hero.message",
    icon: MessageCircleWarning,
  },
  {
    id: 4,
    titleKey: "awareness.phisher.title",
    messageKey: "awareness.phisher.message",
    icon: Fish,
  },
  {
    id: 5,
    titleKey: "awareness.all_is_well.title",
    messageKey: "awareness.all_is_well.message",
    icon: ArrowUpToLine,
  },
  {
    id: 6,
    titleKey: "awareness.public_wifi.title",
    messageKey: "awareness.public_wifi.message",
    icon: WifiOff,
  },
  {
    id: 7,
    titleKey: "awareness.kitne_aadmi.title",
    messageKey: "awareness.kitne_aadmi.message",
    icon: DatabaseBackup,
  },
  {
    id: 8,
    titleKey: "awareness.pushpa.title",
    messageKey: "awareness.pushpa.message",
    icon: Bug,
  },
  {
    id: 9,
    titleKey: "awareness.commitment.title",
    messageKey: "awareness.commitment.message",
    icon: Lock,
  },
];
