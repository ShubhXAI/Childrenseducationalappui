import { createContext, useContext, useState, ReactNode } from "react";

export interface Theme {
  id: string;
  name: string;
  icon: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    background: string;
    cardBg: string;
  };
  gradients: {
    main: string;
    button1: string;
    button2: string;
    header: string;
  };
  decorations: {
    floating: string[];
    ground: string[];
  };
  character: {
    accessory: "wave" | "star" | "heart" | "none";
  };
}

export const themes: Record<string, Theme> = {
  cocomelon: {
    id: "cocomelon",
    name: "Cocomelon Fun",
    icon: "🎈",
    colors: {
      primary: "#4A90E2",
      secondary: "#7ED321",
      accent: "#FFD93D",
      success: "#7ED321",
      warning: "#FF6B6B",
      background: "#87CEEB",
      cardBg: "#FFFFFF"
    },
    gradients: {
      main: "linear-gradient(180deg, #87CEEB 0%, #A8E063 50%, #FFE66D 100%)",
      button1: "linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)",
      button2: "linear-gradient(145deg, #7ED321 0%, #5FA019 100%)",
      header: "linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #4A90E2 100%)"
    },
    decorations: {
      floating: ["⭐", "🎈", "✨", "🌈", "🦋"],
      ground: ["🌻", "🌺", "🌼"]
    },
    character: {
      accessory: "wave"
    }
  },
  space: {
    id: "space",
    name: "Space Adventure",
    icon: "🚀",
    colors: {
      primary: "#6B5CE7",
      secondary: "#1E3A8A",
      accent: "#FCD34D",
      success: "#10B981",
      warning: "#F59E0B",
      background: "#0F172A",
      cardBg: "#1E293B"
    },
    gradients: {
      main: "linear-gradient(180deg, #0F172A 0%, #1E3A8A 50%, #312E81 100%)",
      button1: "linear-gradient(145deg, #6B5CE7 0%, #4C1D95 100%)",
      button2: "linear-gradient(145deg, #FCD34D 0%, #F59E0B 100%)",
      header: "linear-gradient(135deg, #6B5CE7 0%, #8B5CF6 50%, #FCD34D 100%)"
    },
    decorations: {
      floating: ["⭐", "🌟", "✨", "🪐", "🛸", "🌙", "☄️"],
      ground: ["🌕", "🌖", "🌗"]
    },
    character: {
      accessory: "star"
    }
  },
  ocean: {
    id: "ocean",
    name: "Ocean Deep",
    icon: "🌊",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4",
      accent: "#F59E0B",
      success: "#10B981",
      warning: "#EF4444",
      background: "#0C4A6E",
      cardBg: "#E0F2FE"
    },
    gradients: {
      main: "linear-gradient(180deg, #0EA5E9 0%, #06B6D4 50%, #0891B2 100%)",
      button1: "linear-gradient(145deg, #0EA5E9 0%, #0369A1 100%)",
      button2: "linear-gradient(145deg, #06B6D4 0%, #0891B2 100%)",
      header: "linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #F59E0B 100%)"
    },
    decorations: {
      floating: ["🐠", "🐟", "🐡", "🦈", "🐙", "⭐", "🫧"],
      ground: ["🐚", "🦀", "🪸"]
    },
    character: {
      accessory: "wave"
    }
  },
  fantasy: {
    id: "fantasy",
    name: "Magic Castle",
    icon: "🏰",
    colors: {
      primary: "#A855F7",
      secondary: "#EC4899",
      accent: "#FCD34D",
      success: "#10B981",
      warning: "#F97316",
      background: "#581C87",
      cardBg: "#FAE8FF"
    },
    gradients: {
      main: "linear-gradient(180deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)",
      button1: "linear-gradient(145deg, #A855F7 0%, #7E22CE 100%)",
      button2: "linear-gradient(145deg, #EC4899 0%, #BE185D 100%)",
      header: "linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #FCD34D 100%)"
    },
    decorations: {
      floating: ["🏰", "🐉", "✨", "🌟", "🦄", "👑", "⚔️"],
      ground: ["🌹", "🍄", "🧚"]
    },
    character: {
      accessory: "star"
    }
  },
  dinosaur: {
    id: "dinosaur",
    name: "Dino World",
    icon: "🦖",
    colors: {
      primary: "#65A30D",
      secondary: "#84CC16",
      accent: "#F59E0B",
      success: "#22C55E",
      warning: "#EF4444",
      background: "#365314",
      cardBg: "#ECFCCB"
    },
    gradients: {
      main: "linear-gradient(180deg, #84CC16 0%, #65A30D 50%, #4D7C0F 100%)",
      button1: "linear-gradient(145deg, #84CC16 0%, #4D7C0F 100%)",
      button2: "linear-gradient(145deg, #F59E0B 0%, #D97706 100%)",
      header: "linear-gradient(135deg, #84CC16 0%, #65A30D 50%, #F59E0B 100%)"
    },
    decorations: {
      floating: ["🦖", "🦕", "🌴", "🥚", "🪨", "🌋", "🦴"],
      ground: ["🌿", "🍃", "🌾"]
    },
    character: {
      accessory: "none"
    }
  },
  carnival: {
    id: "carnival",
    name: "Carnival Fun",
    icon: "🎪",
    colors: {
      primary: "#DC2626",
      secondary: "#FBBF24",
      accent: "#8B5CF6",
      success: "#10B981",
      warning: "#F59E0B",
      background: "#991B1B",
      cardBg: "#FEF3C7"
    },
    gradients: {
      main: "linear-gradient(180deg, #DC2626 0%, #FBBF24 50%, #8B5CF6 100%)",
      button1: "linear-gradient(145deg, #DC2626 0%, #991B1B 100%)",
      button2: "linear-gradient(145deg, #FBBF24 0%, #F59E0B 100%)",
      header: "linear-gradient(135deg, #DC2626 0%, #FBBF24 50%, #8B5CF6 100%)"
    },
    decorations: {
      floating: ["🎪", "🎠", "🎡", "🎈", "🎉", "🍿", "🎭"],
      ground: ["🎪", "🎯", "🎊"]
    },
    character: {
      accessory: "star"
    }
  },
  pastel: {
    id: "pastel",
    name: "Soft Dreams",
    icon: "🌸",
    colors: {
      primary: "#F9A8D4",
      secondary: "#A7F3D0",
      accent: "#FDE68A",
      success: "#86EFAC",
      warning: "#FDBA74",
      background: "#FCE7F3",
      cardBg: "#FFFFFF"
    },
    gradients: {
      main: "linear-gradient(180deg, #FCE7F3 0%, #E0E7FF 50%, #DBEAFE 100%)",
      button1: "linear-gradient(145deg, #F9A8D4 0%, #F472B6 100%)",
      button2: "linear-gradient(145deg, #A7F3D0 0%, #6EE7B7 100%)",
      header: "linear-gradient(135deg, #F9A8D4 0%, #DDD6FE 50%, #A7F3D0 100%)"
    },
    decorations: {
      floating: ["🌸", "🦋", "✨", "💫", "🌺", "🧸", "💝"],
      ground: ["🌷", "🌼", "🌻"]
    },
    character: {
      accessory: "heart"
    }
  }
};

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themeId: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>("cocomelon");

  const setTheme = (id: string) => {
    if (themes[id]) {
      setThemeId(id);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme: themes[themeId], setTheme, themeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
