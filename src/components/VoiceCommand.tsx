import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, MessageCircle, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function VoiceCommand() {
  const { language, setActiveTab, addNotification } = useStore();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [confidence, setConfidence] = useState(0);

  // Enhanced voice commands with more variations
  const voiceCommands = {
    en: {
      // Navigation
      'show dashboard': 'dashboard',
      'open dashboard': 'dashboard',
      'go to dashboard': 'dashboard',
      'dashboard': 'dashboard',
      'home': 'dashboard',
      
      // Customers
      'show customers': 'customers',
      'open customers': 'customers',
      'customer list': 'customers',
      'customers': 'customers',
      'view customers': 'customers',
      'manage customers': 'customers',
      
      // Products
      'show products': 'products',
      'open products': 'products',
      'product list': 'products',
      'products': 'products',
      'inventory': 'products',
      'stock': 'products',
      
      // Billing
      'create bill': 'billing',
      'new bill': 'billing',
      'billing': 'billing',
      'invoice': 'billing',
      'create invoice': 'billing',
      'new invoice': 'billing',
      
      // Payments
      'show payments': 'payments',
      'payments': 'payments',
      'payment history': 'payments',
      'transactions': 'payments',
      
      // Marketing
      'marketing': 'marketing',
      'campaigns': 'marketing',
      'send campaign': 'marketing',
      'whatsapp marketing': 'marketing',
      
      // Messaging
      'send message': 'messaging',
      'messaging': 'messaging',
      'whatsapp': 'messaging',
      'chat': 'messaging',
      
      // Reports
      'show reports': 'reports',
      'reports': 'reports',
      'analytics': 'reports',
      'sales report': 'reports',
      
      // Settings
      'open settings': 'settings',
      'settings': 'settings',
      'preferences': 'settings',
      
      // Others
      'notifications': 'notifications',
      'profile': 'profile',
      'delivery': 'delivery',
      'orders': 'delivery',
      'leads': 'leads',
      'requirements': 'requirements'
    },
    hi: {
      // Navigation
      'डैशबोर्ड दिखाओ': 'dashboard',
      'डैशबोर्ड खोलो': 'dashboard',
      'डैशबोर्ड': 'dashboard',
      'होम': 'dashboard',
      'मुख्य पृष्ठ': 'dashboard',
      
      // Customers
      'ग्राहक दिखाओ': 'customers',
      'ग्राहक खोलो': 'customers',
      'ग्राहक सूची': 'customers',
      'ग्राहक': 'customers',
      'कस्टमर': 'customers',
      
      // Products
      'उत्पाद दिखाओ': 'products',
      'उत्पाद खोलो': 'products',
      'उत्पाद सूची': 'products',
      'उत्पाद': 'products',
      'प्रोडक्ट': 'products',
      'स्टॉक': 'products',
      
      // Billing
      'बिल बनाओ': 'billing',
      'नया बिल': 'billing',
      'बिलिंग': 'billing',
      'चालान': 'billing',
      'नया चालान': 'billing',
      
      // Payments
      'भुगतान दिखाओ': 'payments',
      'भुगतान': 'payments',
      'पेमेंट': 'payments',
      'लेनदेन': 'payments',
      
      // Marketing
      'मार्केटिंग': 'marketing',
      'अभियान': 'marketing',
      'व्हाट्सएप मार्केटिंग': 'marketing',
      
      // Messaging
      'संदेश भेजो': 'messaging',
      'संदेश': 'messaging',
      'व्हाट्सएप': 'messaging',
      'चैट': 'messaging',
      
      // Reports
      'रिपोर्ट दिखाओ': 'reports',
      'रिपोर्ट': 'reports',
      'विश्लेषण': 'reports',
      
      // Settings
      'सेटिंग्स खोलो': 'settings',
      'सेटिंग्स': 'settings',
      'सेटिंग': 'settings',
      
      // Others
      'सूचनाएं': 'notifications',
      'प्रोफ़ाइल': 'profile',
      'डिलीवरी': 'delivery',
      'ऑर्डर': 'delivery',
      'लीड्स': 'leads',
      'आवश्यकताएं': 'requirements'
    }
  };

  const commandExamples = {
    en: [
      '"Show dashboard"',
      '"Show customers"',
      '"Create bill"',
      '"Send message"',
      '"Show payments"',
      '"Open settings"',
      '"Marketing campaigns"',
      '"View reports"'
    ],
    hi: [
      '"डैशबोर्ड दिखाओ"',
      '"ग्राहक दिखाओ"',
      '"बिल बनाओ"',
      '"संदेश भेजो"',
      '"भुगतान दिखाओ"',
      '"सेटिंग्स खोलो"',
      '"मार्केटिंग अभियान"',
      '"रिपोर्ट देखें"'
    ]
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setIsExpanded(true);
        setConfidence(0);
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setConfidence(confidence);
          } else {
            interimTranscript += transcript;
          }
        }
        
        const fullTranscript = (finalTranscript || interimTranscript).toLowerCase().trim();
        setTranscript(fullTranscript);
        
        if (finalTranscript) {
          processCommand(fullTranscript);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        console.error('Speech recognition error:', event.error);
        
        let errorMessage = '';
        switch (event.error) {
          case 'no-speech':
            errorMessage = language === 'en' ? 'No speech detected. Please try again.' : 'कोई आवाज़ नहीं सुनाई दी। कृपया फिर से कोशिश करें।';
            break;
          case 'audio-capture':
            errorMessage = language === 'en' ? 'Microphone not accessible. Please check permissions.' : 'माइक्रोफोन उपलब्ध नहीं है। कृपया अनुमतियां जांचें।';
            break;
          case 'not-allowed':
            errorMessage = language === 'en' ? 'Microphone permission denied.' : 'माइक्रोफोन की अनुमति नहीं दी गई।';
            break;
          default:
            errorMessage = language === 'en' ? 'Voice recognition error. Please try again.' : 'आवाज़ पहचान में त्रुटि। कृपया फिर से कोशिश करें।';
        }
        
        speak(errorMessage);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert(language === 'en' 
        ? 'Voice recognition not supported in this browser' 
        : 'इस ब्राउज़र में आवाज़ पहचान समर्थित नहीं है'
      );
    }
  };

  const processCommand = (transcript: string) => {
    const commands = voiceCommands[language];
    
    // Find exact match first
    let matchedCommand = Object.keys(commands).find(cmd => 
      transcript === cmd.toLowerCase()
    );
    
    // If no exact match, find partial match
    if (!matchedCommand) {
      matchedCommand = Object.keys(commands).find(cmd => 
        transcript.includes(cmd.toLowerCase()) || cmd.toLowerCase().includes(transcript)
      );
    }
    
    // Try fuzzy matching for better recognition
    if (!matchedCommand) {
      matchedCommand = Object.keys(commands).find(cmd => {
        const words = cmd.toLowerCase().split(' ');
        const transcriptWords = transcript.split(' ');
        return words.some(word => transcriptWords.some(tWord => 
          tWord.includes(word) || word.includes(tWord)
        ));
      });
    }
    
    if (matchedCommand) {
      const targetTab = commands[matchedCommand];
      setActiveTab(targetTab);
      
      const successMessage = language === 'en' 
        ? `Navigating to ${matchedCommand}` 
        : `${matchedCommand} पर जा रहे हैं`;
      
      speak(language === 'en' ? 'Command executed successfully' : 'कमांड सफलतापूर्वक निष्पादित');
      
      addNotification({
        title: language === 'en' ? 'Voice Command' : 'आवाज़ कमांड',
        message: successMessage,
        type: 'success',
        read: false
      });
    } else {
      const suggestions = getSuggestions(transcript);
      const errorMessage = language === 'en' 
        ? `Command not recognized. Did you mean: ${suggestions.join(' or ')}?` 
        : `कमांड समझ नहीं आया। क्या आपका मतलब था: ${suggestions.join(' या ')}?`;
      
      speak(errorMessage);
    }
  };

  const getSuggestions = (transcript: string) => {
    const commands = voiceCommands[language];
    const commandKeys = Object.keys(commands);
    
    // Find similar commands based on word similarity
    const suggestions = commandKeys
      .map(cmd => ({
        cmd,
        similarity: calculateSimilarity(transcript, cmd)
      }))
      .filter(item => item.similarity > 0.3)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 2)
      .map(item => item.cmd);
    
    return suggestions.length > 0 ? suggestions : [commandKeys[0], commandKeys[1]];
  };

  const calculateSimilarity = (str1: string, str2: string) => {
    const words1 = str1.toLowerCase().split(' ');
    const words2 = str2.toLowerCase().split(' ');
    
    let matches = 0;
    words1.forEach(word1 => {
      words2.forEach(word2 => {
        if (word1.includes(word2) || word2.includes(word1)) {
          matches++;
        }
      });
    });
    
    return matches / Math.max(words1.length, words2.length);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      speechSynthesis.cancel(); // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Enhanced Voice Interface */}
      {isExpanded && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-96 max-w-[calc(100vw-3rem)]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {language === 'en' ? 'AI Voice Assistant' : 'AI आवाज़ सहायक'}
                </h3>
                <p className="text-xs text-gray-600">
                  {language === 'en' ? 'Powered by Advanced Recognition' : 'उन्नत पहचान द्वारा संचालित'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Status Display */}
          <div className="p-4">
            <div className="mb-4">
              <div className={`p-4 rounded-xl border-2 transition-all ${
                isListening 
                  ? 'bg-red-50 border-red-200 animate-pulse' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    {isListening 
                      ? (language === 'en' ? 'Listening...' : 'सुन रहा हूँ...')
                      : (language === 'en' ? 'Status:' : 'स्थिति:')
                    }
                  </p>
                  {confidence > 0 && (
                    <span className="text-xs text-gray-500">
                      {Math.round(confidence * 100)}% {language === 'en' ? 'confident' : 'विश्वास'}
                    </span>
                  )}
                </div>
                <div className="min-h-[2rem] flex items-center">
                  <p className="text-sm text-gray-800 break-words leading-relaxed">
                    {transcript || (isListening 
                      ? (language === 'en' ? 'Speak now...' : 'अब बोलें...')
                      : (language === 'en' ? 'Ready to listen' : 'सुनने के लिए तैयार')
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Voice Controls */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={startListening}
                disabled={isListening}
                className={`p-4 rounded-full transition-all transform hover:scale-105 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                }`}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              <button
                onClick={isSpeaking ? stopSpeaking : () => speak(language === 'en' ? 'Voice assistant ready for commands' : 'आवाज़ सहायक कमांड के लिए तैयार')}
                className={`p-4 rounded-full transition-all transform hover:scale-105 ${
                  isSpeaking 
                    ? 'bg-green-500 text-white animate-pulse' 
                    : 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>

            {/* Command Examples Toggle */}
            <button
              onClick={() => setShowCommands(!showCommands)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {showCommands 
                ? (language === 'en' ? 'Hide Commands' : 'कमांड छुपाएं')
                : (language === 'en' ? 'Show Voice Commands' : 'आवाज़ कमांड दिखाएं')
              }
            </button>

            {/* Command Examples */}
            {showCommands && (
              <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <p className="text-xs font-medium text-blue-800 mb-3 flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {language === 'en' ? 'Try saying:' : 'कहने की कोशिश करें:'}
                </p>
                <div className="text-xs text-blue-700 space-y-2 max-h-40 overflow-y-auto">
                  {commandExamples[language].map((cmd, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="break-words">{cmd}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Floating Action Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 ${
          isExpanded 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {isExpanded ? (
          <X className="w-7 h-7 text-white" />
        ) : isListening ? (
          <MicOff className="w-7 h-7 text-white" />
        ) : (
          <Mic className="w-7 h-7 text-white" />
        )}
      </button>
    </div>
  );
}