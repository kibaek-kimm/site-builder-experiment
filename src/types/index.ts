export interface CommonSectionValues {
  enable: boolean;
}

export interface MainSectionValues extends CommonSectionValues {
  heading: string;
  backgroundImage: string;
}

export interface IntroductionSectionValues extends CommonSectionValues {
  heading: string;
  description: string;
  image: string;
}

export interface VideoContentsSectionValues extends CommonSectionValues {
  heading: string;
  description: string;
  youtubeId: string;
}

export interface WelfareCard extends CommonSectionValues {
  heading: string;
  descriptions: string[];
  image: string;
}

export interface WelfareValues extends CommonSectionValues {
  heading: string;
  children: WelfareCard[];
}

export interface BuilderValues extends CommonSectionValues {
  main: MainSectionValues;
}
