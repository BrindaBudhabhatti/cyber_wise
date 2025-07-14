
import { Fish, KeyRound, UserX, ShieldAlert, IndianRupee, Lock, Users, Bug, type LucideIcon, FileText, GitCommit, Gamepad2, UserRoundX } from "lucide-react";

export type Topic = {
  slug: string;
  titleKey: string;
  summaryKey: string;
  icon: LucideIcon;
  descriptionKey: string;
  lawKey: string;
  penaltyKey: string;
  tipsKeys: string[];
};

export const topics: Topic[] = [
  {
    slug: "phishing",
    titleKey: "learn.phishing.title",
    summaryKey: "learn.phishing.summary",
    icon: Fish,
    descriptionKey: "learn.phishing.description",
    lawKey: "learn.phishing.law",
    penaltyKey: "learn.phishing.penalty",
    tipsKeys: [
      "learn.phishing.tip1",
      "learn.phishing.tip2",
      "learn.phishing.tip3",
      "learn.phishing.tip4",
    ],
  },
  {
    slug: "otp-fraud",
    titleKey: "learn.otp_fraud.title",
    summaryKey: "learn.otp_fraud.summary",
    icon: KeyRound,
    descriptionKey: "learn.otp_fraud.description",
    lawKey: "learn.otp_fraud.law",
    penaltyKey: "learn.otp_fraud.penalty",
    tipsKeys: [
      "learn.otp_fraud.tip1",
      "learn.otp_fraud.tip2",
      "learn.otp_fraud.tip3",
      "learn.otp_fraud.tip4",
    ],
  },
  {
    slug: "cyber-bullying",
    titleKey: "learn.cyber_bullying.title",
    summaryKey: "learn.cyber_bullying.summary",
    icon: ShieldAlert,
    descriptionKey: "learn.cyber_bullying.description",
    lawKey: "learn.cyber_bullying.law",
    penaltyKey: "learn.cyber_bullying.penalty",
    tipsKeys: [
      "learn.cyber_bullying.tip1",
      "learn.cyber_bullying.tip2",
      "learn.cyber_bullying.tip3",
      "learn.cyber_bullying.tip4",
      "learn.cyber_bullying.tip5",
    ],
  },
   {
    slug: "cyberstalking",
    titleKey: "learn.cyberstalking.title",
    summaryKey: "learn.cyberstalking.summary",
    icon: UserX,
    descriptionKey: "learn.cyberstalking.description",
    lawKey: "learn.cyberstalking.law",
    penaltyKey: "learn.cyberstalking.penalty",
    tipsKeys: [
      "learn.cyberstalking.tip1",
      "learn.cyberstalking.tip2",
      "learn.cyberstalking.tip3",
      "learn.cyberstalking.tip4",
    ],
  },
  {
    slug: "photo-morphing",
    titleKey: "learn.photo_morphing.title",
    summaryKey: "learn.photo_morphing.summary",
    icon: GitCommit,
    descriptionKey: "learn.photo_morphing.description",
    lawKey: "learn.photo_morphing.law",
    penaltyKey: "learn.photo_morphing.penalty",
    tipsKeys: [
      "learn.photo_morphing.tip1",
      "learn.photo_morphing.tip2",
      "learn.photo_morphing.tip3",
      "learn.photo_morphing.tip4",
    ],
  },
   {
    slug: "doxxing",
    titleKey: "learn.doxxing.title",
    summaryKey: "learn.doxxing.summary",
    icon: FileText,
    descriptionKey: "learn.doxxing.description",
    lawKey: "learn.doxxing.law",
    penaltyKey: "learn.doxxing.penalty",
    tipsKeys: [
      "learn.doxxing.tip1",
      "learn.doxxing.tip2",
      "learn.doxxing.tip3",
      "learn.doxxing.tip4",
    ],
  },
  {
    slug: "identity-theft",
    titleKey: "learn.identity_theft.title",
    summaryKey: "learn.identity_theft.summary",
    icon: UserX,
    descriptionKey: "learn.identity_theft.description",
    lawKey: "learn.identity_theft.law",
    penaltyKey: "learn.identity_theft.penalty",
    tipsKeys: [
      "learn.identity_theft.tip1",
      "learn.identity_theft.tip2",
      "learn.identity_theft.tip3",
      "learn.identity_theft.tip4",
    ],
  },
   {
    slug: "online-scams",
    titleKey: "learn.online_scams.title",
    summaryKey: "learn.online_scams.summary",
    icon: IndianRupee,
    descriptionKey: "learn.online_scams.description",
    lawKey: "learn.online_scams.law",
    penaltyKey: "learn.online_scams.penalty",
    tipsKeys: [
        "learn.online_scams.tip1",
        "learn.online_scams.tip2",
        "learn.online_scams.tip3",
        "learn.online_scams.tip4",
    ],
  },
  {
    slug: "online-predators",
    titleKey: "learn.online_predators.title",
    summaryKey: "learn.online_predators.summary",
    icon: UserRoundX,
    descriptionKey: "learn.online_predators.description",
    lawKey: "learn.online_predators.law",
    penaltyKey: "learn.online_predators.penalty",
    tipsKeys: [
      "learn.online_predators.tip1",
      "learn.online_predators.tip2",
      "learn.online_predators.tip3",
      "learn.online_predators.tip4",
    ],
  },
  {
    slug: "gaming-scams",
    titleKey: "learn.gaming_scams.title",
    summaryKey: "learn.gaming_scams.summary",
    icon: Gamepad2,
    descriptionKey: "learn.gaming_scams.description",
    lawKey: "learn.gaming_scams.law",
    penaltyKey: "learn.gaming_scams.penalty",
    tipsKeys: [
      "learn.gaming_scams.tip1",
      "learn.gaming_scams.tip2",
      "learn.gaming_scams.tip3",
      "learn.gaming_scams.tip4",
    ],
  },
  {
    slug: "ransomware",
    titleKey: "learn.ransomware.title",
    summaryKey: "learn.ransomware.summary",
    icon: Lock,
    descriptionKey: "learn.ransomware.description",
    lawKey: "learn.ransomware.law",
    penaltyKey: "learn.ransomware.penalty",
    tipsKeys: [
        "learn.ransomware.tip1",
        "learn.ransomware.tip2",
        "learn.ransomware.tip3",
        "learn.ransomware.tip4",
    ],
  },
  {
    slug: "social-engineering",
    titleKey: "learn.social_engineering.title",
    summaryKey: "learn.social_engineering.summary",
    icon: Users,
    descriptionKey: "learn.social_engineering.description",
    lawKey: "learn.social_engineering.law",
    penaltyKey: "learn.social_engineering.penalty",
    tipsKeys: [
      "learn.social_engineering.tip1",
      "learn.social_engineering.tip2",
      "learn.social_engineering.tip3",
      "learn.social_engineering.tip4",
    ],
  },
  {
    slug: "malware",
    titleKey: "learn.malware.title",
    summaryKey: "learn.malware.summary",
    icon: Bug,
    descriptionKey: "learn.malware.description",
    lawKey: "learn.malware.law",
    penaltyKey: "learn.malware.penalty",
    tipsKeys: [
        "learn.malware.tip1",
        "learn.malware.tip2",
        "learn.malware.tip3",
        "learn.malware.tip4",
    ],
  },
];
