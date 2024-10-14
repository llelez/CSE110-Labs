import React from 'react';

export const themes = {
 light: {
   foreground: '#000000',
   background: '#eeeeee',
   notebackground: "white"
 },
 dark: {
   foreground: '#FFFFFF',
   background: '#222222',
   notebackground: "#D3D3D3"
 },
};

export const ThemeContext = React.createContext(themes.light);