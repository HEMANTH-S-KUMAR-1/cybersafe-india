interface VoiceNarrationOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
}

class VoiceNarrationService {
  private synthesis: SpeechSynthesis;
  private isEnabled: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private options: VoiceNarrationOptions = {
    rate: 1,
    pitch: 1,
    volume: 0.8,
    voice: null
  };

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeVoice();
  }

  private initializeVoice() {
    // Wait for voices to be loaded
    if (this.synthesis.getVoices().length === 0) {
      this.synthesis.addEventListener('voiceschanged', () => {
        this.setDefaultVoice();
      });
    } else {
      this.setDefaultVoice();
    }
  }

  private setDefaultVoice() {
    const voices = this.synthesis.getVoices();
    // Prefer English voices, then Indian English if available
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en-IN') || 
      (voice.lang.startsWith('en') && voice.name.includes('Indian'))
    ) || voices.find(voice => voice.lang.startsWith('en'));

    if (preferredVoice) {
      this.options.voice = preferredVoice;
    }
  }

  enable() {
    this.isEnabled = true;
    this.speak("Voice narration enabled. I will read webpage content aloud.");
  }

  disable() {
    this.isEnabled = false;
    this.stop();
    // Use a brief message before stopping
    const utterance = new SpeechSynthesisUtterance("Voice narration disabled.");
    utterance.rate = this.options.rate || 1;
    utterance.pitch = this.options.pitch || 1;
    utterance.volume = this.options.volume || 0.8;
    if (this.options.voice) {
      utterance.voice = this.options.voice;
    }
    this.synthesis.speak(utterance);
  }

  toggle(): boolean {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.isEnabled;
  }

  speak(text: string) {
    if (!this.isEnabled || !text.trim()) return;

    // Stop any current speech
    this.stop();

    // Clean the text for better speech
    const cleanText = this.cleanTextForSpeech(text);
    
    this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance.rate = this.options.rate || 1;
    this.currentUtterance.pitch = this.options.pitch || 1;
    this.currentUtterance.volume = this.options.volume || 0.8;
    
    if (this.options.voice) {
      this.currentUtterance.voice = this.options.voice;
    }

    // Add event listeners
    this.currentUtterance.onend = () => {
      this.currentUtterance = null;
    };

    this.currentUtterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.currentUtterance = null;
    };

    this.synthesis.speak(this.currentUtterance);
  }

  stop() {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }
    this.currentUtterance = null;
  }

  pause() {
    if (this.synthesis.speaking) {
      this.synthesis.pause();
    }
  }

  resume() {
    if (this.synthesis.paused) {
      this.synthesis.resume();
    }
  }

  isActive(): boolean {
    return this.isEnabled;
  }

  isSpeaking(): boolean {
    return this.synthesis.speaking;
  }

  private cleanTextForSpeech(text: string): string {
    return text
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      // Remove common web elements that don't need to be read
      .replace(/\b(click here|read more|learn more)\b/gi, '')
      // Add pauses for better readability
      .replace(/\./g, '. ')
      .replace(/!/g, '! ')
      .replace(/\?/g, '? ')
      // Handle acronyms for better pronunciation
      .replace(/\bUPI\b/g, 'U P I')
      .replace(/\bKYC\b/g, 'K Y C')
      .replace(/\bOTP\b/g, 'O T P')
      .replace(/\bATM\b/g, 'A T M')
      .replace(/\bSMS\b/g, 'S M S')
      .replace(/\bCVE\b/g, 'C V E')
      .replace(/\bAPI\b/g, 'A P I')
      .trim();
  }

  // Method to read page content automatically
  readPageContent() {
    if (!this.isEnabled) return;

    // Find main content areas to read
    const contentSelectors = [
      'h1', 'h2', 'h3', // Headers
      'p', // Paragraphs
      '.threat-card .font-semibold', // Threat titles
      '.safety-tip', // Safety tips
      '.alert-content' // Alert content
    ];

    let contentToRead = '';
    
    contentSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const text = element.textContent?.trim();
        if (text && text.length > 10) { // Only read substantial content
          contentToRead += text + '. ';
        }
      });
    });

    if (contentToRead) {
      // Limit content length to avoid very long speeches
      const maxLength = 1000;
      if (contentToRead.length > maxLength) {
        contentToRead = contentToRead.substring(0, maxLength) + '... and more content available on this page.';
      }
      
      this.speak(contentToRead);
    }
  }

  // Method to read specific element content
  readElement(element: HTMLElement) {
    if (!this.isEnabled) return;
    
    const text = element.textContent?.trim();
    if (text) {
      this.speak(text);
    }
  }

  // Update voice settings
  updateSettings(newOptions: Partial<VoiceNarrationOptions>) {
    this.options = { ...this.options, ...newOptions };
  }

  // Get available voices
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synthesis.getVoices();
  }

  // Check if speech synthesis is supported
  static isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}

// Create a singleton instance
export const voiceNarrationService = new VoiceNarrationService();

// Export types
export type { VoiceNarrationOptions };