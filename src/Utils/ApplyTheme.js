export const applyTheme = (theme) => {
  if (!theme) return;

  Object.entries(theme).forEach(([key, value]) => {
    console.log(key , value);
    
    document.documentElement.style.setProperty(`--${key}`, value);
  });
};