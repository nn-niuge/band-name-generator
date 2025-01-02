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
      await navigator.clipboard.writeText(name);
      setCopiedIndex(index);
      setToastMessage('Name copied to clipboard!');
      setShowToast(true);
      
      setTimeout(() => {
        setCopiedIndex(null);
        setShowToast(false);
      }, 2000);
    } catch (err) {
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
    <main className={`min-h-screen bg-gradient-to-b from-gray-50 to-white transition-opacity duration-500 ${
      pageLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-100 via-purple-50 to-gray-50 opacity-70 -z-10"></div>
      
      <div className="relative flex flex-col items-center px-4 py-6 md:py-16">
        <div className="mb-6 md:mb-16 max-w-3xl text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Band Name Generator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Create unique band names for your music project. Choose a genre and get inspired!
          </p>
        </div>
        
        <div className="w-full max-w-lg backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-8 mx-auto">
          <div className="space-y-4 sm:space-y-5">
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
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-base sm:text-lg shadow-sm"
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
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-base sm:text-lg shadow-sm"
                >
                  <option value="" className="text-gray-500">Choose a genre</option>
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
            </div>

            <button 
              onClick={generateNames}
              disabled={isGenerating}
              className={`w-full mt-6 px-6 py-3.5 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg ${
                isGenerating 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate 10 Names'}
            </button>
          </div>
        </div>

        {bandNames.length > 0 && (
          <div className="w-full max-w-3xl px-4 mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              Generated Names
            </h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {bandNames.map((name, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-xl bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between p-3 sm:p-4 gap-3">
                    <span className="font-medium text-gray-800 text-sm sm:text-base truncate">
                      {name}
                    </span>
                    <button
                      onClick={() => copyToClipboard(name, index)}
                      className={`min-w-[70px] sm:min-w-[80px] px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                        copiedIndex === index 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
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

        <div className="mt-8 md:mt-20 max-w-4xl backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl p-4 md:p-12 mx-3 md:mx-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            About This Generator
          </h2>
          
          <div className="space-y-6 md:space-y-10 text-gray-600">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">How It Works</h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Our band name generator combines creative elements to craft unique and memorable names 
                  for your musical project. Select your preferred genre to influence the style of 
                  generated names, or add your own custom word to make it more personal.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Genre-Specific Suggestions</h3>
                <p className="text-sm md:text-base leading-relaxed mb-2">
                  Different music genres often have distinct naming conventions. For example:
                </p>
                <ul className="text-sm md:text-base space-y-2 pl-4 list-disc">
                  <li className="leading-relaxed"><span className="font-medium">Metal Bands</span> often use powerful, dark, or mythological terms</li>
                  <li className="leading-relaxed"><span className="font-medium">Indie Bands</span> might prefer quirky, abstract, or literary references</li>
                  <li className="leading-relaxed"><span className="font-medium">Electronic Artists</span> often use futuristic or technical terms</li>
                  <li className="leading-relaxed"><span className="font-medium">Rock Bands</span> might go for bold, classic, or rebellious names</li>
                  <li className="leading-relaxed"><span className="font-medium">Jazz Groups</span> often use sophisticated or smooth-sounding names</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Features & Tools</h3>
                <ul className="text-sm md:text-base space-y-2 pl-4 list-disc">
                  <li className="leading-relaxed">Generate multiple band names at once to compare options</li>
                  <li className="leading-relaxed">Genre-specific name suggestions that match your style</li>
                  <li className="leading-relaxed">Custom word integration for personal touch</li>
                  <li className="leading-relaxed">Easy one-click copy function for saving favorites</li>
                  <li className="leading-relaxed">Instant generation with no sign-up required</li>
                  <li className="leading-relaxed">Mobile-friendly interface for on-the-go inspiration</li>
                </ul>
              </div>
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
 
