export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Candy = 'candy',
  Stripes = 'stripes',
}

export type ThemeType = Theme.Light | Theme.Dark | Theme.Candy | Theme.Stripes;

export type ThemeStyles = {
  [key in Theme]: string;
};
