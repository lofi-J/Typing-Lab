export interface IKeyInfo {
  text: string;
  code: string;
}

export const firstRow: IKeyInfo[] = [
  {text: 'q', code: 'KeyQ'}, {text: 'w', code: 'KeyW'}, {text: 'e', code: 'KeyE'},
  {text: 'r', code: 'KeyR'}, {text: 't', code: 'KeyT'}, {text: 'y', code: 'KeyY'},
  {text: 'u', code: 'KeyU'}, {text: 'i', code: 'KeyI'}, {text: 'o', code: 'KeyO'},
  {text: 'p', code: 'KeyP'}, {text: '[', code: 'BracketLeft'}, {text: ']', code: 'BracketRight'},
];

export const secondRow: IKeyInfo[] = [
  {text: 'a', code: 'KeyA'}, {text: 's', code: 'KeyS'}, {text: 'd', code: 'KeyD'},
  {text: 'f', code: 'KeyF'}, {text: 'g', code: 'KeyG'}, {text: 'h', code: 'KeyH'},
  {text: 'j', code: 'KeyJ'}, {text: 'k', code: 'KeyK'}, {text: 'l', code: 'KeyL'},
  {text: ';', code: 'Semicolon'}, {text: "'", code: 'Quote'}
];

export const thirdRow: IKeyInfo[] = [
  {text: 'z', code: 'KeyZ'}, {text: 'x', code: 'KeyX'}, {text: 'c', code: 'KeyC'},
  {text: 'v', code: 'KeyV'}, {text: 'b', code: 'KeyB'}, {text: 'n', code: 'KeyN'},
  {text: 'm', code: 'KeyM'}, {text: ',', code: 'Comma'}, {text: '.', code: 'Period'},
  {text: '/', code: 'Slash'}
];

// any key press 제외 항목
export const excludedKeys = ['F5', 'Meta', 'F12']; // TODO add window