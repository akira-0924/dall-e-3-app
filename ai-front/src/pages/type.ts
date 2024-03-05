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
