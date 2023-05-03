import {
  FAQdSectionValues,
  HighlightCardSectionValues,
  ImageGallery1Values,
  ImageGallery2Values,
  InterviewSlideSectionValues,
  IntroductionSectionValues,
  MainSectionValues,
  VideoContentsSectionValues,
} from "@/types";
import { create } from "zustand";

interface Metadata {
  domainKey?: string;
  primaryColor?: string;
  logo?: string;
  contents?: Contents;
  enableCompanyWebsite?: boolean;
  companyWebsite?: string;
}

interface Contents {
  main?: MainSectionValues;
  introduction?: IntroductionSectionValues;
  highlightCard?: HighlightCardSectionValues;
  imageGallery1?: ImageGallery1Values;
  interviewSlide?: InterviewSlideSectionValues;
  // TODO 외부링크 컨텐츠 구현
  externalContents?: any;
  videoContents?: VideoContentsSectionValues;
  imageGallery2?: ImageGallery2Values;
  // TODO 채용공고
  jobPosting?: any;
  faq?: FAQdSectionValues;
}

export interface BuilderStore extends Metadata {
  contents?: Contents;
  setBuilderMetadata: (metadata: Metadata) => void;
  setBuilderContents: (contents: Contents) => void;
}

const initialState: Omit<
  BuilderStore,
  "setBuilderMetadata" | "setBuilderContents"
> = {
  domainKey: undefined,
  primaryColor: "#3366FF",
  logo: undefined,
  companyWebsite: undefined,
  enableCompanyWebsite: true,
  contents: {
    main: {
      enable: true,
      backgroundImage: "",
      heading: "",
    },
    introduction: {
      enable: true,
      heading: "",
      description: "",
      image: "",
    },
    highlightCard: {
      enable: true,
      heading: "",
      cardList: [],
    },
    imageGallery1: {
      enable: true,
      heading: "",
      description: "",
      imageList: [],
    },
    interviewSlide: {
      enable: true,
      cardList: [
        {
          image: "",
          content: "",
          interviewee: "",
        },
      ],
    },
    // externalContents
    videoContents: {
      enable: true,
      heading: "",
      description: "",
      youtubeId: "",
    },
    imageGallery2: {
      enable: true,
      heading: "",
      cardList: [],
    },
    // jobPosting
    faq: {
      enable: true,
      faqList: [],
    },
  },
};

const useBuilderStore = create<BuilderStore>((set, get) => ({
  ...initialState,
  setBuilderMetadata: (metadata) => {
    const prevState = get();
    set(() => ({ ...prevState, ...metadata }));
  },
  setBuilderContents: (contents) => {
    const prevState = get();
    set(() => ({
      ...prevState,
      contents: {
        ...prevState.contents,
        ...contents,
      },
    }));
  },
}));

export default useBuilderStore;
