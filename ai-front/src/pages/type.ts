export interface PageProps {
  num: number;
}

export interface ImageData {
  image: string;
  ssim: number;
  prompt: string;
}

export interface WordItem {
  word: string;
  count: number;
}
export interface WordObj {
  noun: WordItem[];
  conjunction: WordItem[];
}

export interface Word {
  [key: string]: WordObj;
}

export enum ButtonType {
  Submit = "submit",
  Button = "button",
  Reset = "reset",
}

export interface ClickType {
  e: any;
  type: string;
}
