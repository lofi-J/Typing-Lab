export type TWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface ISettings {
  appearance: 'basic' | 'zen';
  fontSize: number;
  fontWeight: TWeight;
  soundLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export const defaultSettings: ISettings = {
  appearance: 'basic',
  fontSize: 20,
  fontWeight: 300,
  soundLevel: 0,
}