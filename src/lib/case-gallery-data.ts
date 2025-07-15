
export type SolvedCase = {
  id: number;
  titleKey: string;
  year: number;
  summaryKey: string;
  toolsUsed: string[];
  outcomeKey: string;
  tags: string[];
};

export type VictimTestimonial = {
  id: number;
  aliasKey: string;
  storyKey: string;
  helpKey: string;
  messageKey: string;
};

export const solvedCases: SolvedCase[] = [
  {
    id: 1,
    titleKey: "case_gallery.solved_cases.case1.title",
    year: 2024,
    summaryKey: "case_gallery.solved_cases.case1.summary",
    toolsUsed: ["IP Tracking", "CDR", "Email Header Tracing"],
    outcomeKey: "case_gallery.solved_cases.case1.outcome",
    tags: ["Phishing", "BusinessScam"],
  },
  {
    id: 2,
    titleKey: "case_gallery.solved_cases.case2.title",
    year: 2023,
    summaryKey: "case_gallery.solved_cases.case2.summary",
    toolsUsed: ["Social Media Monitoring", "Decoy Profile", "IMSI Catcher"],
    outcomeKey: "case_gallery.solved_cases.case2.outcome",
    tags: ["Cyberstalking", "Harassment"],
  },
  {
    id: 3,
    titleKey: "case_gallery.solved_cases.case3.title",
    year: 2024,
    summaryKey: "case_gallery.solved_cases.case3.summary",
    toolsUsed: ["Bank Statement Analysis", "CDR", "SIM Triangulation"],
    outcomeKey: "case_gallery.solved_cases.case3.outcome",
    tags: ["OTPFraud", "FinancialFraud"],
  },
];

export const victimTestimonials: VictimTestimonial[] = [
  {
    id: 1,
    aliasKey: "case_gallery.victim_voices.voice1.alias",
    storyKey: "case_gallery.victim_voices.voice1.story",
    helpKey: "case_gallery.victim_voices.voice1.help",
    messageKey: "case_gallery.victim_voices.voice1.message",
  },
  {
    id: 2,
    aliasKey: "case_gallery.victim_voices.voice2.alias",
    storyKey: "case_gallery.victim_voices.voice2.story",
    helpKey: "case_gallery.victim_voices.voice2.help",
    messageKey: "case_gallery.victim_voices.voice2.message",
  },
];
