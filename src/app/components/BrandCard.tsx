interface BrandCardProps {
  variant: {
    id: string;
    name: string;
    emphasis: string;
    colors: {
      primary: string[];
      accent: string[];
      bg: string;
    };
    fonts: {
      primary: string;
      secondary: string;
      display: string;
    };
    vibe: string;
    personality: string[];
    sample: {
      title: string;
      description: string;
      topics: string[];
      note: string;
    };
  };
}

export function BrandCard({ variant }: BrandCardProps) {
  // Font family mappings
  const getFontFamily = (fontName: string) => {
    const fontMap: Record<string, string> = {
      'DM Sans': "'DM Sans', sans-serif",
      'Inter': "'Inter', sans-serif",
      'JetBrains Mono': "'JetBrains Mono', monospace",
      'Fira Code': "'Fira Code', monospace",
      'Plus Jakarta Sans': "'Plus Jakarta Sans', sans-serif",
      'Source Code Pro': "'Source Code Pro', monospace"
    };
    return fontMap[fontName] || 'sans-serif';
  };

  return (
    <div 
      className="relative overflow-visible rounded-2xl border shadow-lg transition-all hover:shadow-xl"
      style={{ 
        borderColor: variant.colors.primary[0] + '40',
        backgroundColor: variant.colors.bg
      }}
    >
      {/* Clean header */}
      <div 
        className="border-b p-6"
        style={{ borderColor: variant.colors.primary[0] + '20' }}
      >
        <div className="mb-2 flex items-center gap-2">
          <div 
            className="h-1 w-12"
            style={{ backgroundColor: variant.colors.primary[0] }}
          />
          <div 
            className="h-1 w-8"
            style={{ backgroundColor: variant.colors.primary[1] }}
          />
          <div 
            className="h-1 w-6"
            style={{ backgroundColor: variant.colors.primary[2] }}
          />
        </div>
        <h2 
          className="mb-1 text-2xl font-bold" 
          style={{ 
            color: variant.colors.primary[0],
            fontFamily: getFontFamily(variant.fonts.display)
          }}
        >
          {variant.name}
        </h2>
        <p 
          className="text-sm font-medium text-gray-600"
          style={{ fontFamily: getFontFamily(variant.fonts.primary) }}
        >
          {variant.emphasis}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Colors - cleaner presentation */}
        <div>
          <h3 
            className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500"
            style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
          >
            Color Palette
          </h3>
          <div className="space-y-2">
            <div className="flex gap-2">
              {variant.colors.primary.map((color, i) => (
                <div key={i} className="group flex-1">
                  <div
                    className="h-20 rounded-lg transition-transform group-hover:scale-105"
                    style={{ backgroundColor: color }}
                  />
                  <p 
                    className="mt-1.5 text-[10px] font-semibold text-gray-500"
                    style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
                  >
                    {color}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {variant.colors.accent.map((color, i) => (
                <div key={i} className="flex-1">
                  <div
                    className="h-10 rounded-md"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fonts */}
        <div>
          <h3 
            className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500"
            style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
          >
            Typography
          </h3>
          <div className="space-y-3">
            <div>
              <p 
                className="mb-1 text-xs font-semibold text-gray-400"
                style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
              >
                Display
              </p>
              <p 
                className="text-2xl font-bold" 
                style={{ 
                  color: variant.colors.primary[1],
                  fontFamily: getFontFamily(variant.fonts.display)
                }}
              >
                {variant.fonts.display}
              </p>
            </div>
            <div>
              <p 
                className="mb-1 text-xs font-semibold text-gray-400"
                style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
              >
                Primary
              </p>
              <p 
                className="text-lg font-medium text-gray-700"
                style={{ fontFamily: getFontFamily(variant.fonts.primary) }}
              >
                {variant.fonts.primary}
              </p>
            </div>
            <div>
              <p 
                className="mb-1 text-xs font-semibold text-gray-400"
                style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
              >
                Code/Mono
              </p>
              <p 
                className="text-sm font-medium text-gray-600"
                style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
              >
                {variant.fonts.secondary}
              </p>
            </div>
          </div>
        </div>

        {/* Logo - more refined */}
        <div>
          <h3 
            className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500"
            style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
          >
            Logo Concept
          </h3>
          <div 
            className="rounded-xl border p-5 bg-white" 
            style={{ borderColor: variant.colors.primary[0] + '30' }}
          >
            <MiniLogo colors={variant.colors} name={variant.name} id={variant.id} fonts={variant.fonts} getFontFamily={getFontFamily} />
          </div>
        </div>

        {/* Sample Episode - cleaner but with personality */}
        <div>
          <h3 
            className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500"
            style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
          >
            Episode Card Sample
          </h3>
          <div 
            className="rounded-xl border p-5 bg-white"
            style={{ borderColor: variant.colors.primary[1] + '30' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <div 
                className="rounded-md px-2.5 py-1 text-xs font-bold"
                style={{ 
                  backgroundColor: variant.colors.primary[0] + '15',
                  color: variant.colors.primary[0],
                  fontFamily: getFontFamily(variant.fonts.secondary)
                }}
              >
                EP 023
              </div>
              <div 
                className="rounded-md px-2.5 py-1 text-xs font-medium"
                style={{ 
                  backgroundColor: variant.colors.accent[0] + '15',
                  color: variant.colors.accent[0],
                  fontFamily: getFontFamily(variant.fonts.secondary)
                }}
              >
                28:42
              </div>
            </div>

            <h4 
              className="mb-2 text-lg font-bold leading-tight" 
              style={{ 
                color: variant.colors.primary[1],
                fontFamily: getFontFamily(variant.fonts.display)
              }}
            >
              {variant.sample.title}
            </h4>

            <p 
              className="mb-4 text-sm leading-relaxed text-gray-700"
              style={{ fontFamily: getFontFamily(variant.fonts.primary) }}
            >
              {variant.sample.description}
            </p>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {variant.sample.topics.map((topic, i) => (
                <span
                  key={i}
                  className="rounded-md border px-2.5 py-1 text-xs font-semibold"
                  style={{
                    borderColor: variant.colors.primary[i % 3] + '50',
                    color: variant.colors.primary[i % 3],
                    fontFamily: getFontFamily(variant.fonts.secondary)
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>

            <div 
              className="rounded-lg border-l-2 bg-gray-50 px-3 py-2" 
              style={{ borderColor: variant.colors.accent[1] }}
            >
              <p 
                className="text-xs font-medium italic text-gray-600"
                style={{ fontFamily: getFontFamily(variant.fonts.primary) }}
              >
                {variant.sample.note}
              </p>
            </div>
          </div>
        </div>

        {/* Vibe - cleaner layout */}
        <div>
          <h3 
            className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500"
            style={{ fontFamily: getFontFamily(variant.fonts.secondary) }}
          >
            The Vibe
          </h3>
          <p 
            className="mb-3 text-sm leading-relaxed text-gray-700"
            style={{ fontFamily: getFontFamily(variant.fonts.primary) }}
          >
            {variant.vibe}
          </p>
          <div className="flex flex-wrap gap-2">
            {variant.personality.map((trait, i) => (
              <span
                key={i}
                className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
                style={{
                  borderColor: variant.colors.accent[i] + '50',
                  color: variant.colors.accent[i],
                  backgroundColor: variant.colors.accent[i] + '08',
                  fontFamily: getFontFamily(variant.fonts.primary)
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniLogo({ 
  colors, 
  name, 
  id, 
  fonts, 
  getFontFamily 
}: { 
  colors: { primary: string[]; accent: string[] }; 
  name: string; 
  id: string;
  fonts: { primary: string; secondary: string; display: string };
  getFontFamily: (fontName: string) => string;
}) {
  
  if (id === 'diagram') {
    // Textbook diagram style - clean but annotated
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
          {/* Clean neural network */}
          <circle cx="80" cy="50" r="8" fill={colors.primary[0]} opacity="0.2" stroke={colors.primary[0]} strokeWidth="2"/>
          <circle cx="80" cy="50" r="4" fill={colors.primary[0]}/>
          
          {/* Terminal nodes */}
          <circle cx="40" cy="30" r="5" fill={colors.primary[1]} opacity="0.8"/>
          <circle cx="120" cy="30" r="5" fill={colors.primary[2]} opacity="0.8"/>
          <circle cx="40" cy="70" r="5" fill={colors.accent[0]} opacity="0.8"/>
          <circle cx="120" cy="70" r="5" fill={colors.accent[1]} opacity="0.8"/>
          
          {/* Clean connections */}
          <line x1="76" y1="44" x2="44" y2="33" stroke={colors.primary[0]} strokeWidth="1.5" opacity="0.4"/>
          <line x1="84" y1="44" x2="116" y2="33" stroke={colors.primary[0]} strokeWidth="1.5" opacity="0.4"/>
          <line x1="76" y1="56" x2="44" y2="67" stroke={colors.primary[0]} strokeWidth="1.5" opacity="0.4"/>
          <line x1="84" y1="56" x2="116" y2="67" stroke={colors.primary[0]} strokeWidth="1.5" opacity="0.4"/>
          
          {/* Textbook-style annotations */}
          <line x1="100" y1="25" x2="110" y2="20" stroke={colors.primary[2]} strokeWidth="1" opacity="0.5" strokeDasharray="2 2"/>
          <text x="112" y="22" fontSize="7" fontFamily={getFontFamily(fonts.secondary)} fill={colors.primary[2]} opacity="0.7">connection</text>
          
          <line x1="40" y1="75" x2="30" y2="85" stroke={colors.accent[0]} strokeWidth="1" opacity="0.5" strokeDasharray="2 2"/>
          <text x="8" y="90" fontSize="7" fontFamily={getFontFamily(fonts.secondary)} fill={colors.accent[0]} opacity="0.7">node_firing</text>
          
          {/* Clean label box */}
          <rect x="55" y="88" width="50" height="10" rx="2" fill="none" stroke={colors.primary[1]} strokeWidth="1" opacity="0.4" strokeDasharray="3 1"/>
          <text x="58" y="95" fontSize="7" fontFamily={getFontFamily(fonts.secondary)} fill={colors.primary[1]} opacity="0.7">Fig. 1: Neural path</text>
        </svg>
        <div className="text-center">
          <p 
            className="mb-1 text-base font-bold"
            style={{ 
              color: colors.primary[0],
              fontFamily: getFontFamily(fonts.display)
            }}
          >
            Random Neural Firings
          </p>
          <p className="text-[10px] font-medium text-gray-500" style={{ fontFamily: getFontFamily(fonts.secondary) }}>
            A podcast exploring connections
          </p>
        </div>
      </div>
    );
  }
  
  if (id === 'collector') {
    // Organized filing system
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
          {/* Clean organized grid */}
          <rect x="20" y="15" width="28" height="28" rx="2" fill={colors.primary[0]} opacity="0.1" stroke={colors.primary[0]} strokeWidth="1.5"/>
          <rect x="66" y="15" width="28" height="28" rx="2" fill={colors.primary[1]} opacity="0.1" stroke={colors.primary[1]} strokeWidth="1.5"/>
          <rect x="112" y="15" width="28" height="28" rx="2" fill={colors.primary[2]} opacity="0.1" stroke={colors.primary[2]} strokeWidth="1.5"/>
          
          <rect x="20" y="57" width="28" height="28" rx="2" fill={colors.accent[0]} opacity="0.1" stroke={colors.accent[0]} strokeWidth="1.5"/>
          <rect x="66" y="57" width="28" height="28" rx="2" fill={colors.accent[1]} opacity="0.1" stroke={colors.accent[1]} strokeWidth="1.5"/>
          <rect x="112" y="57" width="28" height="28" rx="2" fill={colors.accent[2]} opacity="0.1" stroke={colors.accent[2]} strokeWidth="1.5"/>
          
          {/* Clean labels */}
          <text x="24" y="32" fontSize="8" fontFamily={getFontFamily(fonts.secondary)} fill={colors.primary[0]} fontWeight="600">SCI</text>
          <text x="69" y="32" fontSize="8" fontFamily={getFontFamily(fonts.secondary)} fill={colors.primary[1]} fontWeight="600">LANG</text>
          <text x="115" y="32" fontSize="8" fontFamily={getFontFamily(fonts.secondary)} fill={colors.primary[2]} fontWeight="600">HIST</text>
          <text x="23" y="74" fontSize="8" fontFamily={getFontFamily(fonts.secondary)} fill={colors.accent[0]} fontWeight="600">GAME</text>
          <text x="69" y="74" fontSize="8" fontFamily={getFontFamily(fonts.secondary)} fill={colors.accent[1]} fontWeight="600">TECH</text>
          <text x="118" y="74" fontSize="8" fontFamily={getFontFamily(fonts.secondary)} fill={colors.accent[2]} fontWeight="600">+</text>
          
          {/* Connection lines */}
          <line x1="49" y1="29" x2="65" y2="29" stroke={colors.primary[0]} strokeWidth="1" opacity="0.3" strokeDasharray="2 1"/>
          <line x1="95" y1="29" x2="111" y2="29" stroke={colors.primary[1]} strokeWidth="1" opacity="0.3" strokeDasharray="2 1"/>
        </svg>
        <div className="text-center">
          <p 
            className="mb-1 text-base font-bold"
            style={{ 
              color: colors.primary[0],
              fontFamily: getFontFamily(fonts.display)
            }}
          >
            Random Neural Firings
          </p>
          <p className="text-[10px] font-medium text-gray-500" style={{ fontFamily: getFontFamily(fonts.secondary) }}>
            Cross-referenced curiosities
          </p>
        </div>
      </div>
    );
  }
  
  if (id === 'lightning') {
    // Neural network style - more refined
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
          {/* Neural nodes */}
          <circle cx="30" cy="50" r="6" fill={colors.primary[0]} opacity="0.8">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="80" cy="30" r="6" fill={colors.primary[1]} opacity="0.8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="130" cy="50" r="6" fill={colors.primary[2]} opacity="0.8">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="55" cy="75" r="5" fill={colors.accent[0]} opacity="0.7"/>
          <circle cx="105" cy="70" r="5" fill={colors.accent[1]} opacity="0.7"/>
          
          {/* Connection paths */}
          <path d="M 35 48 L 45 40 L 60 42 L 75 32" stroke={colors.primary[0]} strokeWidth="1.5" opacity="0.3"/>
          <path d="M 85 33 L 95 40 L 110 38 L 125 48" stroke={colors.primary[1]} strokeWidth="1.5" opacity="0.3"/>
          <path d="M 33 55 L 50 70" stroke={colors.accent[0]} strokeWidth="1.5" opacity="0.3"/>
          <path d="M 127 55 L 110 67" stroke={colors.accent[1]} strokeWidth="1.5" opacity="0.3"/>
          
          {/* Active connection indicator */}
          <circle cx="60" cy="42" r="2" fill={colors.accent[2]} opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="95" cy="40" r="2" fill={colors.accent[2]} opacity="0.6">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.3s" repeatCount="indefinite"/>
          </circle>
          
          {/* Clean annotation */}
          <text x="55" y="95" fontSize="7" fontFamily={getFontFamily(fonts.secondary)} fill={colors.primary[0]} opacity="0.6">pathway_active</text>
        </svg>
        <div className="text-center">
          <p 
            className="mb-1 text-base font-bold"
            style={{ 
              color: colors.primary[0],
              fontFamily: getFontFamily(fonts.display)
            }}
          >
            Random Neural Firings
          </p>
          <p className="text-[10px] font-medium text-gray-500" style={{ fontFamily: getFontFamily(fonts.secondary) }}>
            Connections in real-time
          </p>
        </div>
      </div>
    );
  }
  
  // Thoughtful dialogue
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
        {/* Two thought spaces */}
        <circle cx="50" cy="40" r="18" fill="none" stroke={colors.primary[0]} strokeWidth="2" opacity="0.5"/>
        <circle cx="110" cy="50" r="20" fill="none" stroke={colors.primary[1]} strokeWidth="2" opacity="0.5"/>
        
        {/* Inner cores */}
        <circle cx="50" cy="40" r="10" fill={colors.primary[0]} opacity="0.15"/>
        <circle cx="110" cy="50" r="12" fill={colors.primary[1]} opacity="0.15"/>
        
        {/* Connection */}
        <path d="M 67 42 Q 80 40, 92 46" stroke={colors.primary[2]} strokeWidth="2" opacity="0.3" strokeDasharray="4 2"/>
        
        {/* Labels */}
        <text x="43" y="43" fontSize="10" fontFamily={getFontFamily(fonts.display)} fill={colors.primary[0]} fontWeight="600">AJ</text>
        <text x="100" y="53" fontSize="10" fontFamily={getFontFamily(fonts.display)} fill={colors.primary[1]} fontWeight="600">Dan</text>
        
        {/* Conversation flow */}
        <circle cx="45" cy="65" r="2" fill={colors.accent[0]} opacity="0.5"/>
        <circle cx="52" cy="68" r="2" fill={colors.accent[0]} opacity="0.4"/>
        <circle cx="59" cy="67" r="2" fill={colors.accent[0]} opacity="0.3"/>
        
        {/* Annotation */}
        <text x="50" y="90" fontSize="7" fontFamily={getFontFamily(fonts.secondary)} fill={colors.primary[2]} opacity="0.6">collaborative_thinking</text>
      </svg>
      <div className="text-center">
        <p 
          className="mb-1 text-base font-bold"
          style={{ 
            color: colors.primary[0],
            fontFamily: getFontFamily(fonts.display)
          }}
        >
          Random Neural Firings
        </p>
        <p className="text-[10px] font-medium text-gray-500" style={{ fontFamily: getFontFamily(fonts.secondary) }}>
          Two perspectives, one conversation
        </p>
      </div>
    </div>
  );
}
