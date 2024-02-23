export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Candy = 'candy',
  Stripes = 'stripes',
}

export type ThemeStyles = {
  [key in Theme]: string;
};
