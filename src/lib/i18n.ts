
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "home.title": "Welcome to CyberWise",
      "home.description": "Your friendly guide to navigating the digital world safely.",
      "home.chat.title": "Meet Your CyberBuddy",
      "home.chat.description": "Have questions about cybercrime, online safety, or Indian cyber laws? Our AI-powered chatbot, CyberBuddy, is here to help you with instant and reliable answers.",
      "home.chat.button": "Chat with CyberBuddy",

      "nav.home": "Home",
      "nav.learn": "Learn",
      "nav.quiz": "Quiz",
      "nav.report": "Report",
      "nav.awareness": "Awareness",
      "nav.cyberbuddy": "CyberBuddy",

      "report.title": "How to Report a Cybercrime",
      "report.description": "Follow these steps to report an incident and find emergency contacts.",
      "report.steps_card.title": "Steps to File a Complaint",
      "report.steps_card.step1_trigger": "Step 1: Gather Evidence",
      "report.steps_card.step1_content": "Collect all relevant evidence such as screenshots of messages, URLs of fake websites, transaction details, or any other digital proof. Do not delete or alter the evidence.",
      "report.steps_card.step2_trigger": "Step 2: Visit the National Cyber Crime Reporting Portal",
      "report.steps_card.step2_content_1": "Go to the official government portal at",
      "report.steps_card.step2_content_2": "This is the primary platform for reporting cybercrimes in India.",
      "report.steps_card.step3_trigger": "Step 3: File a Complaint",
      "report.steps_card.step3_content": "On the portal, choose the appropriate category for the crime. Fill in the complaint form with accurate details about the incident and upload the evidence you have collected.",
      "report.steps_card.step4_trigger": "Step 4: Note Down Your Complaint ID",
      "report.steps_card.step4_content": "After submitting the complaint, you will receive a unique complaint ID. Keep this number safe for future reference and for tracking the status of your complaint.",
      "report.steps_card.step5_trigger": "Step 5: Contact Your Local Police (Optional but Recommended)",
      "report.steps_card.step5_content": "For serious crimes, it is also advisable to file a complaint at your nearest police station with a copy of your online complaint.",
      "report.emergency_card.title": "Emergency Contacts",
      "report.emergency_card.helpline_title": "National Cyber Crime Helpline Number",
      "report.emergency_card.portal_title": "Official Reporting Portal",
    },
  },
  hi: {
    translation: {
      "home.title": "साइबरवाइज़ में आपका स्वागत है",
      "home.description": "डिजिटल दुनिया को सुरक्षित रूप से नेविगेट करने के लिए आपका मित्रवत मार्गदर्शक।",
      "home.chat.title": "मिलिए अपने साइबरबडी से",
      "home.chat.description": "साइबर अपराध, ऑनलाइन सुरक्षा, या भारतीय साइबर कानूनों के बारे में प्रश्न हैं? हमारा AI-संचालित चैटबॉट, साइबरबडी, आपको तत्काल और विश्वसनीय उत्तरों के साथ मदद करने के लिए यहाँ है।",
      "home.chat.button": "साइबरबडी के साथ चैट करें",

      "nav.home": "होम",
      "nav.learn": "जानें",
      "nav.quiz": "प्रश्नोत्तरी",
      "nav.report": "रिपोर्ट करें",
      "nav.awareness": "जागरूकता",
      "nav.cyberbuddy": "साइबरबडी",

      "report.title": "साइबर अपराध की रिपोर्ट कैसे करें",
      "report.description": "किसी घटना की रिपोर्ट करने और आपातकालीन संपर्क खोजने के लिए इन चरणों का पालन करें।",
      "report.steps_card.title": "शिकायत दर्ज करने के चरण",
      "report.steps_card.step1_trigger": "चरण 1: सबूत इकट्ठा करें",
      "report.steps_card.step1_content": "सभी प्रासंगिक सबूत जैसे संदेशों के स्क्रीनशॉट, नकली वेबसाइटों के URL, लेनदेन का विवरण, या कोई अन्य डिजिटल प्रमाण एकत्र करें। सबूतों को हटाएं या बदलें नहीं।",
      "report.steps_card.step2_trigger": "चरण 2: राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल पर जाएं",
      "report.steps_card.step2_content_1": "आधिकारिक सरकारी पोर्टल पर जाएं",
      "report.steps_card.step2_content_2": "यह भारत में साइबर अपराधों की रिपोर्ट करने का प्राथमिक मंच है।",
      "report.steps_card.step3_trigger": "चरण 3: शिकायत दर्ज करें",
      "report.steps_card.step3_content": "पोर्टल पर, अपराध के लिए उपयुक्त श्रेणी चुनें। शिकायत फ़ॉर्म को घटना के सटीक विवरण के साथ भरें और आपके द्वारा एकत्र किए गए सबूत अपलोड करें।",
      "report.steps_card.step4_trigger": "चरण 4: अपनी शिकायत आईडी नोट करें",
      "report.steps_card.step4_content": "शिकायत जमा करने के बाद, आपको एक अद्वितीय शिकायत आईडी प्राप्त होगी। भविष्य के संदर्भ और अपनी शिकायत की स्थिति पर नज़र रखने के लिए इस नंबर को सुरक्षित रखें।",
      "report.steps_card.step5_trigger": "चरण 5: अपनी स्थानीय पुलिस से संपर्क करें (वैकल्पिक लेकिन अनुशंसित)",
      "report.steps_card.step5_content": "गंभीर अपराधों के लिए, अपनी ऑनलाइन शिकायत की एक प्रति के साथ अपने नजदीकी पुलिस स्टेशन में भी शिकायत दर्ज करने की सलाह दी जाती है।",
      "report.emergency_card.title": "आपातकालीन संपर्क",
      "report.emergency_card.helpline_title": "राष्ट्रीय साइबर अपराध हेल्पलाइन नंबर",
      "report.emergency_card.portal_title": "आधिकारिक रिपोर्टिंग पोर्टल",
    },
  },
  gu: {
    translation: {
      "home.title": "સાયબરવાઇઝમાં આપનું સ્વાગત છે",
      "home.description": "ડિજિટલ વિશ્વમાં સુરક્ષિત રીતે નેવિગેટ કરવા માટે તમારી મૈત્રીપૂર્ણ માર્ગદર્શિકા.",
      "home.chat.title": "તમારા સાયબરબડીને મળો",
      "home.chat.description": "સાયબર ક્રાઇમ, ઓનલાઈન સુરક્ષા, અથવા ભારતીય સાયબર કાયદાઓ વિશે પ્રશ્નો છે? અમારો AI-સંચાલિત ચેટબોટ, સાયબરબડી, તમને ત્વરિત અને વિશ્વસનીય જવાબો સાથે મદદ કરવા માટે અહીં છે.",
      "home.chat.button": "સાયબરબડી સાથે ચેટ કરો",

      "nav.home": "હોમ",
      "nav.learn": "જાણો",
      "nav.quiz": "ક્વિઝ",
      "nav.report": "રિપોર્ટ કરો",
      "nav.awareness": "જાગૃતિ",
      "nav.cyberbuddy": "સાયબરબડી",

      "report.title": "સાયબર ક્રાઇમની જાણ કેવી રીતે કરવી",
      "report.description": "ઘટનાની જાણ કરવા અને કટોકટીના સંપર્કો શોધવા માટે આ પગલાં અનુસરો.",
      "report.steps_card.title": "ફરિયાદ નોંધાવવાનાં પગલાં",
      "report.steps_card.step1_trigger": "પગલું 1: પુરાવા એકત્રિત કરો",
      "report.steps_card.step1_content": "સંદેશાઓના સ્ક્રીનશોટ, નકલી વેબસાઇટ્સના URL, વ્યવહારની વિગતો અથવા કોઈપણ અન્ય ડિજિટલ પુરાવા જેવા તમામ સંબંધિત પુરાવા એકત્રિત કરો. પુરાવા કાઢી નાખશો નહીં કે તેમાં ફેરફાર કરશો નહીં.",
      "report.steps_card.step2_trigger": "પગલું 2: રાષ્ટ્રીય સાયબર ક્રાઇમ રિપોર્ટિંગ પોર્ટલની મુલાકાત લો",
      "report.steps_card.step2_content_1": "સત્તાવાર સરકારી પોર્ટલ પર જાઓ",
      "report.steps_card.step2_content_2": "આ ભારતમાં સાયબર અપરાધોની જાણ કરવા માટેનું પ્રાથમિક પ્લેટફોર્મ છે.",
      "report.steps_card.step3_trigger": "પગલું 3: ફરિયાદ દાખલ કરો",
      "report.steps_card.step3_content": "પોર્ટલ પર, ગુના માટે યોગ્ય શ્રેણી પસંદ કરો. ઘટનાની સચોટ વિગતો સાથે ફરિયાદ ફોર્મ ભરો અને તમે એકત્રિત કરેલા પુરાવા અપલોડ કરો.",
      "report.steps_card.step4_trigger": "પગલું 4: તમારી ફરિયાદ ID નોંધો",
      "report.steps_card.step4_content": "ફરિયાદ સબમિટ કર્યા પછી, તમને એક અનન્ય ફરિયાદ ID પ્રાપ્ત થશે. ભવિષ્યના સંદર્ભ માટે અને તમારી ફરિયાદની સ્થિતિને ટ્રેક કરવા માટે આ નંબરને સુરક્ષિત રાખો.",
      "report.steps_card.step5_trigger": "પગલું 5: તમારી સ્થાનિક પોલીસનો સંપર્ક કરો (વૈકલ્પિક પરંતુ ભલામણ કરેલ)",
      "report.steps_card.step5_content": "ગંભીર ગુનાઓ માટે, તમારી ઓનલાઈન ફરિયાદની નકલ સાથે તમારા નજીકના પોલીસ સ્ટેશનમાં પણ ફરિયાદ નોંધાવવાની સલાહ આપવામાં આવે છે.",
      "report.emergency_card.title": "ઇમરજન્સી સંપર્કો",
      "report.emergency_card.helpline_title": "રાષ્ટ્રીય સાયબર ક્રાઇમ હેલ્પલાઇન નંબર",
      "report.emergency_card.portal_title": "સત્તાવાર રિપોર્ટિંગ પોર્ટલ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
