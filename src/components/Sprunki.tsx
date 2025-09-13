import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface SprunkeCharacter {
  id: string;
  name: string;
  color: string;
  sound: string;
  icon: string;
  type: 'normal' | 'horror';
  phase: number;
}

const sprunkeCharacters: SprunkeCharacter[] = [
  // Phase 1 - Normal Characters
  { id: '1', name: 'Oren', color: 'bg-orange-500', sound: 'Doo doo doo', icon: '🎵', type: 'normal', phase: 1 },
  { id: '2', name: 'Raddy', color: 'bg-red-600', sound: 'Bap bap bap', icon: '🥁', type: 'normal', phase: 1 },
  { id: '3', name: 'Clukr', color: 'bg-gray-600', sound: 'Cluk cluk', icon: '🐔', type: 'normal', phase: 1 },
  { id: '4', name: 'Fun Bot', color: 'bg-blue-500', sound: 'Beep beep boop', icon: '🤖', type: 'normal', phase: 1 },
  { id: '5', name: 'Vineria', color: 'bg-green-600', sound: 'La la la', icon: '🌿', type: 'normal', phase: 1 },
  { id: '6', name: 'Gray', color: 'bg-gray-400', sound: 'Hmm hmm', icon: '😐', type: 'normal', phase: 1 },
  { id: '7', name: 'Brud', color: 'bg-amber-600', sound: 'Brud brud', icon: '🎭', type: 'normal', phase: 1 },
  { id: '8', name: 'Garnold', color: 'bg-yellow-500', sound: 'Ding ding', icon: '⚡', type: 'normal', phase: 1 },
  { id: '9', name: 'OWAKCX', color: 'bg-lime-500', sound: 'Owak owak', icon: '👁️', type: 'normal', phase: 1 },
  { id: '10', name: 'Sky', color: 'bg-sky-400', sound: 'Whoosh', icon: '☁️', type: 'normal', phase: 1 },
  
  // Phase 2 - More Characters
  { id: '11', name: 'Mr. Sun', color: 'bg-yellow-400', sound: 'Shine shine', icon: '☀️', type: 'normal', phase: 2 },
  { id: '12', name: 'Durple', color: 'bg-purple-600', sound: 'Durp durp', icon: '💜', type: 'normal', phase: 2 },
  { id: '13', name: 'Mr. Tree', color: 'bg-green-700', sound: 'Rustle rustle', icon: '🌳', type: 'normal', phase: 2 },
  { id: '14', name: 'Simon', color: 'bg-cyan-500', sound: 'Simon says', icon: '🎯', type: 'normal', phase: 2 },
  { id: '15', name: 'Tunner', color: 'bg-orange-700', sound: 'Tun tun tun', icon: '🎺', type: 'normal', phase: 2 },
  { id: '16', name: 'Mr. Fun Computer', color: 'bg-green-400', sound: 'Computing...', icon: '💻', type: 'normal', phase: 2 },
  { id: '17', name: 'Wenda', color: 'bg-pink-400', sound: 'Wen wen da', icon: '🎀', type: 'normal', phase: 2 },
  { id: '18', name: 'Pinki', color: 'bg-pink-500', sound: 'Pink pink', icon: '🌸', type: 'normal', phase: 2 },
  { id: '19', name: 'Jevin', color: 'bg-blue-700', sound: 'Jev jev', icon: '💎', type: 'normal', phase: 2 },
  { id: '20', name: 'Black', color: 'bg-black', sound: 'Dark beats', icon: '🖤', type: 'normal', phase: 2 },
  
  // Horror Phase Characters
  { id: '21', name: 'Horror Oren', color: 'bg-red-900', sound: 'SCREAMING', icon: '💀', type: 'horror', phase: 3 },
  { id: '22', name: 'Bloody Raddy', color: 'bg-red-800', sound: 'Blood drips', icon: '🩸', type: 'horror', phase: 3 },
  { id: '23', name: 'Nightmare Clukr', color: 'bg-gray-900', sound: 'Evil cluck', icon: '👿', type: 'horror', phase: 3 },
  { id: '24', name: 'Broken Fun Bot', color: 'bg-blue-900', sound: 'Error... error...', icon: '⚠️', type: 'horror', phase: 3 },
  { id: '25', name: 'Dead Vineria', color: 'bg-green-900', sound: 'Ghostly wail', icon: '👻', type: 'horror', phase: 3 },
  { id: '26', name: 'Creepy Gray', color: 'bg-gray-800', sound: 'Whispers', icon: '😱', type: 'horror', phase: 3 },
  { id: '27', name: 'Demon Brud', color: 'bg-red-950', sound: 'Demonic laugh', icon: '👹', type: 'horror', phase: 3 },
  { id: '28', name: 'Corrupted Garnold', color: 'bg-yellow-900', sound: 'Static noise', icon: '⚡', type: 'horror', phase: 3 },
  { id: '29', name: 'Evil OWAKCX', color: 'bg-lime-900', sound: 'Evil stare', icon: '👁️‍🗨️', type: 'horror', phase: 3 },
  { id: '30', name: 'Storm Sky', color: 'bg-slate-800', sound: 'Thunder crash', icon: '🌩️', type: 'horror', phase: 3 },
];

export default function Sprunki() {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [currentPhase, setCurrentPhase] = useState<'normal' | 'horror'>('normal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [activeBeats, setActiveBeats] = useState<Set<string>>(new Set());
  const audioContext = useRef<AudioContext | null>(null);
  const [beatPattern, setBeatPattern] = useState<{ [key: string]: boolean[] }>({});

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playSound = (character: SprunkeCharacter) => {
    if (!audioContext.current) return;

    // Create a simple tone based on character
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    // Different frequencies for different characters
    const frequencies: { [key: string]: number } = {
      'Oren': 220,
      'Raddy': 330,
      'Clukr': 440,
      'Fun Bot': 550,
      'Vineria': 660,
      'Gray': 280,
      'Brud': 370,
      'Garnold': 490,
      'OWAKCX': 620,
      'Sky': 740,
    };

    const baseFreq = frequencies[character.name] || 440;
    const freq = character.type === 'horror' ? baseFreq * 0.5 : baseFreq;
    
    oscillator.frequency.setValueAtTime(freq, audioContext.current.currentTime);
    oscillator.type = character.type === 'horror' ? 'sawtooth' : 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
    gainNode.gain.linearRampToValueAtTime((volume[0] / 100) * 0.3, audioContext.current.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.8);

    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + 0.8);

    // Add visual feedback
    setActiveBeats(prev => new Set([...prev, character.id]));
    setTimeout(() => {
      setActiveBeats(prev => {
        const newSet = new Set(prev);
        newSet.delete(character.id);
        return newSet;
      });
    }, 500);
  };

  const handleCharacterClick = (character: SprunkeCharacter) => {
    playSound(character);
    
    if (selectedCharacters.includes(character.id)) {
      setSelectedCharacters(prev => prev.filter(id => id !== character.id));
    } else {
      setSelectedCharacters(prev => [...prev, character.id]);
    }
  };

  const clearAll = () => {
    setSelectedCharacters([]);
    setActiveBeats(new Set());
  };

  const switchPhase = () => {
    setCurrentPhase(prev => prev === 'normal' ? 'horror' : 'normal');
    setSelectedCharacters([]);
    setActiveBeats(new Set());
  };

  const currentCharacters = sprunkeCharacters.filter(char => 
    char.type === currentPhase || (currentPhase === 'normal' && char.phase <= 2)
  );

  const playAllSelected = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      selectedCharacters.forEach((id, index) => {
        setTimeout(() => {
          const character = sprunkeCharacters.find(c => c.id === id);
          if (character) playSound(character);
        }, index * 200);
      });
      setTimeout(() => setIsPlaying(false), selectedCharacters.length * 200 + 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
            🎵 SPRUNKI INCREDIBOX 🎵
          </h1>
          <p className="text-xl text-purple-200 mb-6">
            Создавай крутые биты с персонажами Спрунки!
          </p>
          
          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button
              onClick={switchPhase}
              className={`px-6 py-3 text-lg font-bold rounded-full transition-all duration-300 ${
                currentPhase === 'normal'
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'
                  : 'bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900'
              }`}
            >
              {currentPhase === 'normal' ? '😊 Обычный режим' : '💀 ХОРРОР РЕЖИМ'}
            </Button>
            
            <Button
              onClick={playAllSelected}
              disabled={selectedCharacters.length === 0 || isPlaying}
              className="px-6 py-3 text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-full disabled:opacity-50"
            >
              {isPlaying ? '🎵 Играю...' : '🎶 Сыграть всех'}
            </Button>
            
            <Button
              onClick={clearAll}
              variant="outline"
              className="px-6 py-3 text-lg font-bold rounded-full border-2 border-white text-white hover:bg-white hover:text-black"
            >
              🗑️ Очистить всё
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Icon name="VolumeX" size={20} className="text-white" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-48"
            />
            <Icon name="Volume2" size={20} className="text-white" />
            <span className="text-white font-bold">{volume[0]}%</span>
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          {currentCharacters.map((character) => {
            const isSelected = selectedCharacters.includes(character.id);
            const isActive = activeBeats.has(character.id);
            
            return (
              <Card
                key={character.id}
                className={`
                  relative cursor-pointer p-4 text-center transition-all duration-300 hover:scale-110
                  ${isSelected 
                    ? 'ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400/50' 
                    : 'hover:shadow-xl'
                  }
                  ${isActive 
                    ? 'animate-bounce scale-110' 
                    : ''
                  }
                  ${character.type === 'horror' 
                    ? 'bg-gradient-to-br from-red-900 to-black border-red-500' 
                    : 'bg-gradient-to-br from-white to-gray-100 border-purple-300'
                  }
                `}
                onClick={() => handleCharacterClick(character)}
              >
                {/* Character Icon */}
                <div className={`
                  w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl
                  ${character.color}
                  ${isActive ? 'animate-spin' : ''}
                `}>
                  {character.icon}
                </div>

                {/* Character Name */}
                <h3 className={`font-bold text-sm mb-2 ${
                  character.type === 'horror' ? 'text-red-100' : 'text-gray-800'
                }`}>
                  {character.name}
                </h3>

                {/* Sound Preview */}
                <p className={`text-xs italic ${
                  character.type === 'horror' ? 'text-red-300' : 'text-gray-600'
                }`}>
                  {character.sound}
                </p>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <Icon name="Music" size={16} className="text-yellow-900" />
                  </div>
                )}

                {/* Phase Badge */}
                <Badge 
                  className={`absolute -top-2 -left-2 ${
                    character.type === 'horror' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {character.phase}
                </Badge>
              </Card>
            );
          })}
        </div>

        {/* Selected Characters Display */}
        {selectedCharacters.length > 0 && (
          <Card className="p-6 bg-gradient-to-r from-purple-800 to-blue-800 border-purple-400">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              🎵 Выбранные персонажи ({selectedCharacters.length})
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedCharacters.map(id => {
                const character = sprunkeCharacters.find(c => c.id === id);
                return character ? (
                  <Badge 
                    key={id}
                    className={`px-3 py-1 text-sm ${character.color} text-white`}
                  >
                    {character.icon} {character.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-indigo-800 to-purple-800 border-indigo-400">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            📖 Как играть
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-white">
            <div>
              <h4 className="font-bold mb-2 text-lg">🎯 Основы:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Кликай на персонажей чтобы услышать их звуки</li>
                <li>• Выбирай несколько персонажей для создания музыки</li>
                <li>• Жёлтое кольцо показывает выбранных персонажей</li>
                <li>• Регулируй громкость слайдером</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-lg">💀 Режимы:</h4>
              <ul className="space-y-1 text-sm">
                <li>• 😊 <strong>Обычный режим</strong> - веселые персонажи</li>
                <li>• 💀 <strong>Хоррор режим</strong> - страшные звуки и персонажи</li>
                <li>• Переключайся между режимами для разной атмосферы</li>
                <li>• Каждый режим имеет уникальные звуки!</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}