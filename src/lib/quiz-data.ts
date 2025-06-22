export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const quizQuestions: Question[] = [
  {
    question: "What is 'phishing'?",
    options: [
      "A type of fishing sport",
      "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity",
      "A software that protects your computer",
      "A secure way to browse the internet",
    ],
    correctAnswer: "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity",
    explanation: "Phishing emails or websites trick you into giving up personal info like passwords or credit card numbers. Always be skeptical of unsolicited requests for data.",
  },
  {
    question: "What should you do if you receive an OTP for a transaction you did not make?",
    options: [
      "Share it with the customer service agent who calls you",
      "Ignore it",
      "Immediately report it to your bank and do not share it with anyone",
      "Use it for your next transaction",
    ],
    correctAnswer: "Immediately report it to your bank and do not share it with anyone",
    explanation: "An unsolicited OTP likely means a fraudster is trying to access your account. Never share OTPs and report such incidents immediately.",
  },
  {
    question: "Which of the following is the strongest password?",
    options: ["password123", "MyDogFido", "12345678", "Xy#7!zPq2$"],
    correctAnswer: "Xy#7!zPq2$",
    explanation: "A strong password is long and complex, using a mix of uppercase letters, lowercase letters, numbers, and symbols. Avoid using personal info or common words.",
  },
  {
    question: "What does Two-Factor Authentication (2FA) do?",
    options: [
      "It makes your computer run twice as fast",
      "It doubles your internet security budget",
      "It adds an extra layer of security to your accounts",
      "It sends all your passwords to a friend",
    ],
    correctAnswer: "It adds an extra layer of security to your accounts",
    explanation: "2FA requires a second piece of information (like a code from your phone) in addition to your password, making it much harder for unauthorized users to log in.",
  },
  {
    question: "Under which section of the IT Act is publishing obscene information punishable in India?",
    options: ["Section 43", "Section 67", "Section 66F", "Section 72"],
    correctAnswer: "Section 67",
    explanation: "Section 67 of the Information Technology Act, 2000, deals with punishment for publishing or transmitting obscene material in electronic form.",
  },
];
