import { Fish, KeyRound, UserX, ShieldAlert, DollarSign, type LucideIcon } from "lucide-react";

export type Topic = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  description: string;
  law: string;
  penalty: string;
  tips: string[];
};

export const topics: Topic[] = [
  {
    slug: "phishing",
    title: "Phishing",
    summary: "Tricking individuals into revealing sensitive information through deceptive emails, messages, or websites.",
    icon: Fish,
    description: "Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in an electronic communication.",
    law: "Section 43 of the Information Technology Act, 2000 & Section 66 of IT Act. Indian Penal Code Section 419 (Cheating by Personation) & 420 (Cheating).",
    penalty: "Imprisonment up to three years, or a fine up to five lakh rupees, or both.",
    tips: [
      "Verify the sender's email address.",
      "Look for spelling and grammar mistakes.",
      "Hover over links to see the actual URL before clicking.",
      "Never provide personal information in response to an unsolicited request.",
    ],
  },
  {
    slug: "otp-fraud",
    title: "OTP Fraud",
    summary: "Scammers tricking victims into sharing One-Time Passwords (OTPs) to authorize fraudulent transactions.",
    icon: KeyRound,
    description: "OTP fraud involves tricking users into sharing the One-Time Password (OTP) they receive on their mobile for transactions. Scammers often pose as bank employees, tech support, or service providers.",
    law: "Sections 43, 66, 66C, 66D of IT Act, 2000. IPC Sections 419, 420, 468, 471.",
    penalty: "Can lead to imprisonment and significant financial fines depending on the scale of fraud.",
    tips: [
      "Never share your OTP with anyone, including bank officials.",
      "Banks or any legitimate company will never ask for your OTP.",
      "Be suspicious of urgent requests for OTPs.",
      "If you receive an OTP for a transaction you did not initiate, report it immediately.",
    ],
  },
  {
    slug: "cyber-bullying",
    title: "Cyber Bullying",
    summary: "Using digital technology to harass, threaten, or humiliate someone, often repeatedly.",
    icon: ShieldAlert,
    description: "Cyberbullying is bullying that takes place over digital devices like cell phones, computers, and tablets. It can occur through SMS, Text, and apps, or online in social media, forums, or gaming where people can view, participate in, or share content.",
    law: "Section 67 of IT Act (publishing or transmitting obscene material), Section 66E (violation of privacy), IPC Sections 507 (criminal intimidation by anonymous communication) & 509 (insulting the modesty of a woman).",
    penalty: "Imprisonment which may extend to five years and with fine which may extend to ten lakh rupees.",
    tips: [
      "Do not respond to the bully.",
      "Block the person and report them on the platform.",
      "Save the evidence (screenshots, messages).",
      "Talk to a trusted adult, like a parent or teacher.",
      "Report the incident to the cybercrime portal.",
    ],
  },
  {
    slug: "identity-theft",
    title: "Identity Theft",
    summary: "Stealing someone's personal information to commit fraud or other crimes in their name.",
    icon: UserX,
    description: "Identity theft happens when someone steals your personal information (like your Aadhaar number, PAN, or bank account details) and uses it without your permission. This can damage your credit status and cost you time and money to restore your good name.",
    law: "Section 66C of the Information Technology Act, 2000.",
    penalty: "Imprisonment for a term which may extend to three years and shall also be liable to fine which may extend to rupees one lakh.",
    tips: [
      "Shred financial documents before discarding them.",
      "Use strong, unique passwords for online accounts.",
      "Be cautious about sharing personal information online.",
      "Regularly check your bank and credit card statements.",
    ],
  },
   {
    slug: "online-scams",
    title: "Online Scams",
    summary: "Various fraudulent schemes conducted via the internet, from fake job offers to lottery scams.",
    icon: DollarSign,
    description: "Online scams come in many forms, including fake job offers, lottery notifications, tech support scams, and romance scams. The goal is always to trick the victim into sending money or sensitive information.",
    law: "Section 66D of the IT Act (Cheating by personation using computer resource) & IPC Section 420 (Cheating).",
    penalty: "Imprisonment of up to three years and a fine of up to one lakh rupees.",
    tips: [
      "If it sounds too good to be true, it probably is.",
      "Never pay an upfront fee for a job, prize, or loan.",
      "Do independent research on any company or person before dealing with them.",
      "Be wary of high-pressure sales tactics or urgent requests for money.",
    ],
  },
];
