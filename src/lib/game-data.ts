
export type GameMessage = {
  id: number;
  content: string;
  isPhishing: boolean;
  explanationKey: string;
};

export const phishingGameMessages: GameMessage[] = [
  {
    id: 1,
    content: "URGENT: Your bank account has been compromised. Click here to verify your details immediately: http://yourbank-security-update.com",
    isPhishing: true,
    explanationKey: "game.explanation.suspicious_link",
  },
  {
    id: 2,
    content: "Hi, it's Sarah. I lost my phone, can you send me your mom's number? Need to call her.",
    isPhishing: false,
    explanationKey: "game.explanation.personal_request",
  },
  {
    id: 3,
    content: "From: Netflix <support@netflix-billing.info>\nSubject: Action Required: Your payment has been declined.\n\nPlease update your payment information by logging in here: [link]",
    isPhishing: true,
    explanationKey: "game.explanation.fake_sender",
  },
  {
    id: 4,
    content: "Hey, just a reminder our team meeting is at 2 PM today. The agenda is in the shared drive. Let me know if you have any questions.",
    isPhishing: false,
    explanationKey: "game.explanation.normal_work_email",
  },
  {
    id: 5,
    content: "CONGRATULATIONS! You've been selected to receive a FREE smartphone. To claim your prize, simply provide your shipping address and a small processing fee of Rs. 100 here: [link]",
    isPhishing: true,
    explanationKey: "game.explanation.too_good_to_be_true",
  },
  {
    id: 6,
    content: "Dear Valued Customer, We have detected unusual activity on your account. To secure your account, please login using the link below. http://secure-login-portal.net/auth",
    isPhishing: true,
    explanationKey: "game.explanation.generic_greeting",
  },
  {
    id: 7,
    content: "Lunch today at 1? The usual spot.",
    isPhishing: false,
    explanationKey: "game.explanation.casual_message",
  }
];
