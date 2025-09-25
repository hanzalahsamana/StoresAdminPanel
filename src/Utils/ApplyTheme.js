import { colorPalettes } from '@/Structure/DefaultStructures';
import { Assistant, Inter, Roboto, Poppins } from 'next/font/google';

// Pre-instantiate fonts at module scope
export const assistant = Assistant({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
export const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
export const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

const fontsMap = {
  Assistant: assistant,
  Inter: inter,
  Roboto: roboto,
  Poppins: poppins,
};

export const applyTheme = (themeName = 'Light') => {
  const theme = colorPalettes?.[themeName] || colorPalettes?.Light;
  console.log(theme, 'ojwdojno');

  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--tmp-${key}`, value);
  });
};

export const getFontClass = (fontName) => {
  return fontsMap[fontName]?.className || assistant.className;
};

export const applyLocalTheme = (themeName = 'Light') => {
  const theme = colorPalettes[themeName] || colorPalettes.Light;
  const wrapper = document.querySelector('.page-theme-wrapper');
  if (!wrapper) return;

  Object.entries(theme).forEach(([key, value]) => {
    wrapper.style.setProperty(`--tmp-${key}`, value);
  });
};
