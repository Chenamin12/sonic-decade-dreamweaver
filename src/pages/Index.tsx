import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Music, Headphones, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import SongGenerator from "@/components/SongGenerator";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState("");
  const [genre, setGenre] = useState("");
  const [decade, setDecade] = useState("");
  const [generatedSong, setGeneratedSong] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const genres = [
    "Pop", "Rock", "Hip-Hop", "R&B", "Country", "Jazz", "Blues", 
    "Folk", "Electronic", "Reggae", "Punk", "Metal", "Disco", "Funk"
  ];

  const decades = [
    "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"
  ];

  const extractKeywords = (text: string) => {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'was', 'are', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    const words = text.toLowerCase().split(/\s+/).filter(word => 
      word.length > 2 && !commonWords.includes(word) && /^[a-zA-Z]+$/.test(word)
    );
    return [...new Set(words)].slice(0, 8).join(", ");
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    if (value.trim()) {
      const extractedKeywords = extractKeywords(value);
      setKeywords(extractedKeywords);
    } else {
      setKeywords("");
    }
  };

  const generateSong = async () => {
    if (!prompt || !genre || !decade) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before generating a song.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const song = generateSongContent(keywords || prompt, genre, decade);
      setGeneratedSong(song);
      setIsGenerating(false);
      toast({
        title: "Song Generated!",
        description: `Created a ${genre} song in ${decade} style.`,
      });
    }, 2000);
  };

  const generateSongContent = (keywordText: string, selectedGenre: string, selectedDecade: string) => {
    const keywordList = keywordText.split(",").map(k => k.trim()).filter(k => k);
    
    const genreStyles = {
      "Pop": {
        "1950s": { structure: "verse-chorus-verse-chorus-bridge-chorus", vibe: "innocent, catchy, simple" },
        "1960s": { structure: "verse-chorus-verse-chorus-middle8-chorus", vibe: "upbeat, harmonious, British invasion" },
        "1970s": { structure: "verse-chorus-verse-chorus-bridge-chorus-outro", vibe: "disco-influenced, danceable, glamorous" },
        "1980s": { structure: "intro-verse-prechorus-chorus-verse-prechorus-chorus-bridge-chorus-outro", vibe: "synth-heavy, energetic, larger-than-life" },
        "1990s": { structure: "verse-chorus-verse-chorus-bridge-chorus-chorus-outro", vibe: "emotional, diverse, experimental" },
        "2000s": { structure: "intro-verse-prechorus-chorus-verse-prechorus-chorus-bridge-chorus-outro", vibe: "polished, hip-hop influenced, auto-tuned" },
        "2010s": { structure: "verse-prechorus-chorus-verse-prechorus-chorus-bridge-chorus-outro", vibe: "electronic, drop-heavy, social media aware" },
        "2020s": { structure: "verse-prechorus-chorus-post-chorus-verse-prechorus-chorus-bridge-outro", vibe: "genre-blending, vulnerable, authentic" }
      },
      "Rock": {
        "1950s": { structure: "verse-chorus-verse-chorus-solo-chorus", vibe: "rebellious, simple, rhythm-focused" },
        "1960s": { structure: "verse-chorus-verse-chorus-bridge-solo-chorus", vibe: "experimental, psychedelic, revolutionary" },
        "1970s": { structure: "intro-verse-chorus-verse-chorus-solo-bridge-chorus-outro", vibe: "heavy, progressive, arena-ready" },
        "1980s": { structure: "intro-verse-chorus-verse-chorus-solo-bridge-chorus-outro", vibe: "anthemic, hair metal, powerful" },
        "1990s": { structure: "verse-chorus-verse-chorus-bridge-solo-chorus-outro", vibe: "grunge, alternative, raw emotion" },
        "2000s": { structure: "intro-verse-chorus-verse-chorus-bridge-solo-chorus-outro", vibe: "nu-metal, emo, commercial" },
        "2010s": { structure: "verse-chorus-verse-chorus-bridge-breakdown-chorus", vibe: "indie, revival, atmospheric" },
        "2020s": { structure: "verse-prechorus-chorus-verse-prechorus-chorus-bridge-outro", vibe: "genre-fusion, nostalgic, diverse" }
      }
    };

    const style = genreStyles[selectedGenre]?.[selectedDecade] || genreStyles["Pop"]["2020s"];
    
    const verses = [
      `In the world of ${keywordList[0] || "dreams"}, where ${keywordList[1] || "hope"} shines bright`,
      `${keywordList[2] || "Time"} keeps moving, ${keywordList[3] || "love"} takes flight`,
      `Through the ${selectedDecade} we remember, ${keywordList[4] || "music"} in our souls`,
      `${selectedGenre} rhythms calling, making us whole`
    ];

    const chorus = [
      `We are the ${keywordList[0] || "dreamers"}, living in ${selectedDecade}`,
      `${selectedGenre} in our hearts, never to fade`,
      `${keywordList[1] || "Dancing"} through the ${keywordList[2] || "night"}, feeling so ${keywordList[3] || "alive"}`,
      `This is our ${keywordList[4] || "moment"}, this is our time to thrive`
    ];

    const bridge = [
      `When the ${keywordList[5] || "world"} gets heavy, and the ${keywordList[6] || "road"} seems long`,
      `We remember this ${keywordList[7] || "feeling"}, we remember this song`
    ];

    return `Title: "${keywordList[0] || "Untitled"} (${selectedDecade} ${selectedGenre})"

Style: ${style.vibe}
Structure: ${style.structure}

[Verse 1]
${verses[0]}
${verses[1]}

[Chorus]
${chorus[0]}
${chorus[1]}
${chorus[2]}
${chorus[3]}

[Verse 2]
${verses[2]}
${verses[3]}

[Chorus]
${chorus[0]}
${chorus[1]}
${chorus[2]}
${chorus[3]}

[Bridge]
${bridge[0]}
${bridge[1]}

[Final Chorus]
${chorus[0]}
${chorus[1]}
${chorus[2]}
${chorus[3]}

---
Generated with keywords: ${keywordText}
Genre: ${selectedGenre} | Era: ${selectedDecade}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-red-50/40">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-blue-100/20"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-200/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
              <Music className="h-6 w-6 text-purple-600" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Song Generator
              </h1>
              <Headphones className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Create unique songs with AI-powered generation based on your prompts, keywords, genre, and era
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Input Card */}
            <div className="glass-card group">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Song Input</h2>
                    <p className="text-sm text-gray-600">Describe your song concept and preferences</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="prompt" className="text-sm font-medium text-gray-700">Song Prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe your song concept, story, or theme..."
                      value={prompt}
                      onChange={(e) => handlePromptChange(e.target.value)}
                      rows={3}
                      className="glass-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords" className="text-sm font-medium text-gray-700">Extracted Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="Keywords will be extracted automatically..."
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="glass-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Genre</Label>
                      <Select value={genre} onValueChange={setGenre}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent className="glass-dropdown">
                          {genres.map((g) => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Decade</Label>
                      <Select value={decade} onValueChange={setDecade}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select decade" />
                        </SelectTrigger>
                        <SelectContent className="glass-dropdown">
                          {decades.map((d) => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={generateSong} 
                    disabled={isGenerating} 
                    className="w-full glass-button"
                    size="lg"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Generating Song...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Music className="h-4 w-4" />
                        Generate Song
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Output Card */}
            <div className="glass-card group">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                    <Music className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Generated Song</h2>
                    <p className="text-sm text-gray-600">Your AI-generated song will appear here</p>
                  </div>
                </div>

                {generatedSong ? (
                  <div className="space-y-4">
                    <div className="glass-content">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                        {generatedSong}
                      </pre>
                    </div>
                    <Button variant="outline" className="w-full glass-button-secondary">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Share Song
                      </div>
                    </Button>
                  </div>
                ) : (
                  <div className="glass-content text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                      <Music className="h-8 w-8 text-purple-400" />
                    </div>
                    <p className="text-gray-500">Your generated song will appear here...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
