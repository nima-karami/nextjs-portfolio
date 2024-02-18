export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Candy = 'candy',
}

export type ThemeStyles = {
  [key in Theme]: string;
};
