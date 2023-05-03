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

export interface InterviewSlideSectionValues extends CommonSectionValues {
  cardList: {
    image: string;
    content: string;
    interviewee: string;
  }[];
}

export interface HighlightCardSectionValues extends CommonSectionValues {
  heading: string;
  cardList: {
    title: string;
    description: string;
  }[];
}

export interface VideoContentsSectionValues extends CommonSectionValues {
  heading: string;
  description: string;
  youtubeId: string;
}

export interface ImageGallery1Values extends CommonSectionValues {
  heading: string;
  description: string;
  imageList: string[];
}

export interface ImageGallery2Card {
  heading: string;
  descriptions: string[];
  image: string;
}

export interface ImageGallery2Values extends CommonSectionValues {
  heading: string;
  children: ImageGallery2Card[];
}

export interface BuilderValues extends CommonSectionValues {
  main: MainSectionValues;
}

export interface FAQdSectionValues extends CommonSectionValues {
  faqList: {
    question: string;
    answer: string[];
  }[];
}

export interface FooterValues {
  companyName: string;
  companyInfo: string;
}
