'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [genre, setGenre] = useState('');
  const [customWord, setCustomWord] = useState('');
  const [bandNames, setBandNames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const generateNames = () => {
    if (!genre) {
      setError('Please select a genre first!');
      setToastMessage('Please select a genre first!');
      setShowToast(true);
      setTimeout(() => {
        setError('');
        setShowToast(false);
      }, 3000);
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        const prefixes = ['The', 'Dark', 'Royal', 'Electric', 'Cosmic', 'Midnight', 'Ancient', 'Wild', 'Neon', 'Crystal', 'Silent', 'Savage', 'Mystic'];
        const nouns = ['Dragons', 'Warriors', 'Knights', 'Storm', 'Thunder', 'Legion', 'Wolves', 'Riders', 'Phoenix', 'Giants', 'Shadows', 'Ravens', 'Serpents'];
        
        const newNames = Array.from({ length: 10 }, () => {
          if (customWord) {
            const useAsPrefix = Math.random() > 0.5;
            const randomWord = useAsPrefix ? 
              nouns[Math.floor(Math.random() * nouns.length)] : 
              prefixes[Math.floor(Math.random() * prefixes.length)];
            
            return useAsPrefix ? 
              `${customWord} ${randomWord}` : 
              `${randomWord} ${customWord}`;
          } else {
            const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            return `${randomPrefix} ${randomNoun}`;
          }
        });

        setBandNames(newNames);
        setIsGenerating(false);
      } catch (err) {
        setError('Failed to generate names');
        setToastMessage('Failed to generate names');
        setShowToast(true);
        setIsGenerating(false);
        setTimeout(() => {
          setError('');
          setShowToast(false);
        }, 3000);
      }
    }, 800);
  };

  const copyToClipboard = async (name: string, index: number) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = name;
      document.body.appendChild(textArea);
      
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      
      try {
        await navigator.clipboard.writeText(name);
      } catch {
        document.execCommand('copy');
      }
      
      document.body.removeChild(textArea);
      
      setCopiedIndex(index);
      setToastMessage('Name copied!');
      setShowToast(true);
      
      setTimeout(() => {
        setCopiedIndex(null);
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setToastMessage('Failed to copy name');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const Toast = ({ message }: { message: string }) => (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
      showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}>
      {message}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative flex flex-col items-center px-4 py-8 md:py-16">
        <div className="w-full mb-6 md:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-blue-600">
            Band Name Generator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 mb-2">
            Create unique and memorable names for your music project instantly!
          </p>
          <p className="text-sm sm:text-base text-gray-500 px-2">
            Perfect for rock bands, metal groups, indie artists, electronic musicians, and more.
          </p>
        </div>
        
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="customWord" className="block text-sm sm:text-base font-medium text-gray-700">
                Custom Word (Optional)
              </label>
              <input
                type="text"
                id="customWord"
                value={customWord}
                onChange={(e) => setCustomWord(e.target.value)}
                placeholder="Enter your word..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="style" className="block text-sm sm:text-base font-medium text-gray-700">
                Select Genre
              </label>
              <select 
                id="style" 
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white"
              >
                <option value="">Choose a genre</option>
                <optgroup label="Rock Styles">
                  <option value="rock">Rock</option>
                  <option value="classic-rock">Classic Rock</option>
                  <option value="hard-rock">Hard Rock</option>
                  <option value="alternative-rock">Alternative Rock</option>
                  <option value="progressive-rock">Progressive Rock</option>
                  <option value="psychedelic-rock">Psychedelic Rock</option>
                </optgroup>
                
                <optgroup label="Metal Styles">
                  <option value="metal">Metal</option>
                  <option value="heavy-metal">Heavy Metal</option>
                  <option value="death-metal">Death Metal</option>
                  <option value="black-metal">Black Metal</option>
                  <option value="doom-metal">Doom Metal</option>
                  <option value="thrash-metal">Thrash Metal</option>
                  <option value="power-metal">Power Metal</option>
                </optgroup>
                
                {/* Punk Variants */}
                <option value="punk">Punk</option>
                <option value="pop-punk">Pop Punk</option>
                <option value="hardcore-punk">Hardcore Punk</option>
                <option value="post-punk">Post-Punk</option>
                
                {/* Other Modern Styles */}
                <option value="indie">Indie</option>
                <option value="alternative">Alternative</option>
                <option value="grunge">Grunge</option>
                <option value="electronic">Electronic</option>
                <option value="synthwave">Synthwave</option>
                <option value="industrial">Industrial</option>
                
                {/* Classic Styles */}
                <option value="blues">Blues</option>
                <option value="jazz">Jazz</option>
                <option value="funk">Funk</option>
                <option value="reggae">Reggae</option>
                
                {/* Fusion Styles */}
                <option value="folk-rock">Folk Rock</option>
                <option value="jazz-fusion">Jazz Fusion</option>
                <option value="rap-rock">Rap Rock</option>
                <option value="nu-metal">Nu Metal</option>
              </select>
            </div>

            <button 
              onClick={generateNames}
              disabled={isGenerating}
              className={`w-full mt-6 px-6 py-3.5 rounded-xl text-white font-semibold text-base sm:text-lg ${
                isGenerating 
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate 10 Names'}
            </button>
          </div>
        </div>

        {bandNames.length > 0 && (
          <div className="w-full max-w-2xl px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Generated Names</h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {bandNames.map((name, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md"
                >
                  <div className="flex items-center justify-between p-3 gap-2">
                    <span className="font-medium text-gray-800 text-sm sm:text-base truncate">
                      {name}
                    </span>
                    <button
                      onClick={() => copyToClipboard(name, index)}
                      className={`min-w-[64px] px-3 py-1.5 rounded-lg text-white text-sm ${
                        copiedIndex === index 
                        ? 'bg-green-500' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-500'
                      }`}
                    >
                      {copiedIndex === index ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 mx-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">
            About Our Music Name Creator
          </h2>
          
          <div className="space-y-6 text-gray-600">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">How It Works</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Our band name generator helps musicians create unique and memorable names. 
                Whether you're starting a rock band, metal group, indie project, or electronic 
                music venture, our tool combines creative elements to craft the perfect name 
                that matches your style.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Key Features</h3>
              <ul className="text-sm sm:text-base space-y-2 pl-4 list-disc">
                <li>Free music name creation tool</li>
                <li>Genre-specific name suggestions</li>
                <li>Custom word integration</li>
                <li>Instant name generation</li>
                <li>No registration required</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Tips for Better Results</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Try different genres and custom words to find the perfect name for your music project. 
                Our creative name generator is designed to inspire you with unique and memorable options 
                that resonate with your musical style.
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down">
          {error}
        </div>
      )}

      {showToast && <Toast message={toastMessage} />}
    </main>
  );
}
 
