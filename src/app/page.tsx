'use client';
import { useState } from 'react';

export default function Home() {
  const [genre, setGenre] = useState('');
  const [customWord, setCustomWord] = useState('');
  const [bandNames, setBandNames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNames = () => {
    if (!genre) {
      alert('Please select a genre first!');
      return;
    }

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
  };

  const copyToClipboard = async (name: string, index: number) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-100 via-purple-50 to-gray-50 opacity-70 -z-10"></div>
      
      <div className="relative flex flex-col items-center px-4 py-16 md:py-24">
        <div className="mb-16 max-w-3xl text-center">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Band Name Generator
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Create unique band names for your music project. Choose a genre and get inspired!
          </p>
        </div>
        
        <div className="w-full max-w-md backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl p-8 mb-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="customWord" className="block text-sm font-medium text-gray-700">
                Custom Word (Optional)
              </label>
              <input
                type="text"
                id="customWord"
                value={customWord}
                onChange={(e) => setCustomWord(e.target.value)}
                placeholder="Enter your word..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="style" className="block text-sm font-medium text-gray-700">
                Select Genre
              </label>
              <select 
                id="style" 
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              >
                <option value="">Choose a genre</option>
                {/* Rock Variants */}
                <option value="rock">Rock</option>
                <option value="classic-rock">Classic Rock</option>
                <option value="hard-rock">Hard Rock</option>
                <option value="alternative-rock">Alternative Rock</option>
                <option value="progressive-rock">Progressive Rock</option>
                <option value="psychedelic-rock">Psychedelic Rock</option>
                
                {/* Metal Variants */}
                <option value="metal">Metal</option>
                <option value="heavy-metal">Heavy Metal</option>
                <option value="death-metal">Death Metal</option>
                <option value="black-metal">Black Metal</option>
                <option value="doom-metal">Doom Metal</option>
                <option value="thrash-metal">Thrash Metal</option>
                <option value="power-metal">Power Metal</option>
                
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
            className="w-full mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Generate 10 Names
          </button>
        </div>

        {bandNames.length > 0 && (
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Generated Names</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {bandNames.map((name, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-xl bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between p-4">
                    <span className="font-medium text-gray-800">{name}</span>
                    <button
                      onClick={() => copyToClipboard(name, index)}
                      className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
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

        <div className="mt-20 max-w-4xl backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            About This Generator
          </h2>
          
          <div className="space-y-10 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">How It Works</h3>
              <p className="mb-4">
                Our band name generator combines creative elements to craft unique and memorable names 
                for your musical project. Select your preferred genre to influence the style of 
                generated names, or add your own custom word to make it more personal.
              </p>
              <p>
                Whether you're starting a new band, working on a solo project, or just brainstorming 
                ideas, our generator helps spark creativity by combining powerful words, mythological 
                references, and genre-specific elements to create names that resonate with your musical style.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Genre-Specific Suggestions</h3>
              <p className="mb-4">
                Different music genres often have distinct naming conventions. For example:
              </p>
              <ul className="text-left pl-6 space-y-2 mb-4">
                <li><span className="font-semibold">Metal Bands</span> often use powerful, dark, or mythological terms</li>
                <li><span className="font-semibold">Indie Bands</span> might prefer quirky, abstract, or literary references</li>
                <li><span className="font-semibold">Electronic Artists</span> often use futuristic or technical terms</li>
                <li><span className="font-semibold">Rock Bands</span> might go for bold, classic, or rebellious names</li>
                <li><span className="font-semibold">Jazz Groups</span> often use sophisticated or smooth-sounding names</li>
              </ul>
              <p>
                Our generator takes these conventions into account when creating suggestions for your chosen genre.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Features & Tools</h3>
              <ul className="list-disc text-left pl-6 space-y-2">
                <li>Generate multiple band names at once to compare options</li>
                <li>Genre-specific name suggestions that match your style</li>
                <li>Custom word integration for personal touch</li>
                <li>Easy one-click copy function for saving favorites</li>
                <li>Instant generation with no sign-up required</li>
                <li>Mobile-friendly interface for on-the-go inspiration</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Creative Tips</h3>
              <div className="text-left space-y-4">
                <p>
                  <span className="font-semibold">Mix and Match:</span> Try generating names with different 
                  genres to find unexpected combinations. A name generated for metal might work perfectly 
                  for your indie project!
                </p>
                <p>
                  <span className="font-semibold">Custom Words:</span> Use words that have personal meaning 
                  or reflect your music's themes. This could be anything from your hometown to a favorite 
                  book character.
                </p>
                <p>
                  <span className="font-semibold">Multiple Sessions:</span> Don't feel pressured to choose 
                  immediately. Generate names across multiple sessions to find the perfect fit. Sometimes 
                  the best names come when you least expect them.
                </p>
                <p>
                  <span className="font-semibold">Get Feedback:</span> Save your favorite generated names 
                  and share them with friends, potential bandmates, or your social media followers to get 
                  their input.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Common Use Cases</h3>
              <ul className="text-left pl-6 space-y-2">
                <li>Starting a new band or musical project</li>
                <li>Creating a stage name for solo performances</li>
                <li>Naming a music festival or concert series</li>
                <li>Brainstorming ideas for album or EP titles</li>
                <li>Creating alternate personas for different musical styles</li>
                <li>Finding inspiration for music-related branding</li>
              </ul>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Important Notes</h3>
              <div className="text-sm text-gray-500 space-y-2">
                <p>
                  All generated names are for creative inspiration. We recommend:
                </p>
                <ul className="list-disc text-left pl-6 space-y-1">
                  <li>Checking social media platforms for existing uses of the name</li>
                  <li>Searching trademark databases before commercial use</li>
                  <li>Verifying domain name availability if you plan to have a website</li>
                  <li>Considering how the name might be perceived in different cultures</li>
                </ul>
                <p className="mt-4">
                  Remember that the best band name is one that you connect with and that represents your 
                  musical vision. Use this generator as a starting point for your creative journey!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
 