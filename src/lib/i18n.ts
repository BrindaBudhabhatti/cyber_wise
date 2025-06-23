import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "home.title": "Welcome to CyberWise",
      "home.description":
        "Your friendly guide to navigating the digital world safely.",
      "home.chat.title": "Meet Your CyberBuddy",
      "home.chat.description":
        "Have questions about cybercrime, online safety, or Indian cyber laws? Our AI-powered chatbot, CyberBuddy, is here to help you with instant and reliable answers.",
      "home.chat.button": "Chat with CyberBuddy",
    },
  },
  hi: {
    translation: {
      "home.title": "साइबरवाइज़ में आपका स्वागत है",
      "home.description":
        "डिजिटल दुनिया को सुरक्षित रूप से नेविगेट करने के लिए आपका मित्रवत मार्गदर्शक।",
      "home.chat.title": "मिलिए अपने साइबरबडी से",
      "home.chat.description":
        "साइबर अपराध, ऑनलाइन सुरक्षा, या भारतीय साइबर कानूनों के बारे में प्रश्न हैं? हमारा AI-संचालित चैटबॉट, साइबरबडी, आपको तत्काल और विश्वसनीय उत्तरों के साथ मदद करने के लिए यहाँ है।",
      "home.chat.button": "साइबरबडी के साथ चैट करें",
    },
  },
  gu: {
    translation: {
      "home.title": "સાયબરવાઇઝમાં આપનું સ્વાગત છે",
      "home.description":
        "ડિજિટલ વિશ્વમાં સુરક્ષિત રીતે નેવિગેટ કરવા માટે તમારી મૈત્રીપૂર્ણ માર્ગદર્શિકા.",
      "home.chat.title": "તમારા સાયબરબડીને મળો",
      "home.chat.description":
        "સાયબર ક્રાઇમ, ઓનલાઈન સુરક્ષા, અથવા ભારતીય સાયબર કાયદાઓ વિશે પ્રશ્નો છે? અમારો AI-સંચાલિત ચેટબોટ, સાયબરબડી, તમને ત્વરિત અને વિશ્વસનીય જવાબો સાથે મદદ કરવા માટે અહીં છે.",
      "home.chat.button": "સાયબરબડી સાથે ચેટ કરો",
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
