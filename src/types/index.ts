export interface MainSectionValues {
  heading: string;
  backgroundImage: string;
}

export interface VisionSectionValues {
  heading: string;
  description: string;
  image: string;
}

interface WelfareCard {
  heading: string;
  descriptions: string[];
  image: string;
}

export interface WelfareValues {
  heading: string;
  children: WelfareCard[];
}

export interface BuilderValues {
  main: MainSectionValues;
  vision: VisionSectionValues;
}
