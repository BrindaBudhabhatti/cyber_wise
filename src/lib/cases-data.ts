
import type { SolvedCase } from './data-service';

export const cases: SolvedCase[] = [
  {
    id: 'case-1',
    titleKey: 'case_gallery.solved_cases.case1.title',
    year: 2023,
    summaryKey: 'case_gallery.solved_cases.case1.summary',
    toolsUsed: ['IP Tracking', 'CDR Analysis', 'Email Header Tracing'],
    outcomeKey: 'case_gallery.solved_cases.case1.outcome',
    tags: ['Phishing', 'BusinessScam', 'FinancialFraud'],
  },
  {
    id: 'case-2',
    titleKey: 'case_gallery.solved_cases.case2.title',
    year: 2024,
    summaryKey: 'case_gallery.solved_cases.case2.summary',
    toolsUsed: ['IP Tracking', 'Social Media Analysis', 'Digital Forensics'],
    outcomeKey: 'case_gallery.solved_cases.case2.outcome',
    tags: ['Cyberstalking', 'Harassment', 'SocialMedia'],
  },
  {
    id: 'case-3',
    titleKey: 'case_gallery.solved_cases.case3.title',
    year: 2023,
    summaryKey: 'case_gallery.solved_cases.case3.summary',
    toolsUsed: ['CDR Analysis', 'SIM Triangulation', 'Bank-led Investigation'],
    outcomeKey: 'case_gallery.solved_cases.case3.outcome',
    tags: ['OTPFraud', 'SIMSwap', 'FinancialFraud'],
  },
];
