export interface PageProps {
  num: number;
}

export interface ImageData {
  image: string;
  ssim: number;
  prompt: string;
}

export interface Word {
  [key: string]: {
    noun: {
      word: string;
      count: number;
    }[];
    conjunction: string[];
  };
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
