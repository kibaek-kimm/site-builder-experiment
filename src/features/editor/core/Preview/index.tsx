import { BuilderStore } from "@/store";
import Header from "../../contents/Header";
import MainTitleView from "../../contents/MainTitle/MainTitleView";
import IndroductionView from "../../contents/Introduction/IndroductionView";
import HighlightCardView from "../../contents/HighlightCard/HighlightCardView";
import ImageGallery1View from "../../contents/ImageGallery1/ImageGallery1View";
import InterviewSlideView from "../../contents/InterviewSlide/InterviewSlideView";
import VideoContentsView from "../../contents/VideoContents/VideoContentsView";
import ImageGallery2View from "../../contents/ImageGallery2/ImageGallery2View";
import FaqView from "../../contents/Faq/FaqView";
import Footer from "../../contents/Footer";

interface PreviewProps
  extends Omit<BuilderStore, "setBuilderMetadata" | "setBuilderContents"> {}

export default function Preview({
  logo,
  companyWebsite,
  enableCompanyWebsite,
  contents,
}: PreviewProps) {
  return (
    <>
      <Header
        logo={logo}
        enableCompanyWebsite={enableCompanyWebsite}
        companyWebsite={companyWebsite}
      />
      {contents?.mainTitle?.enable && (
        <MainTitleView
          heading={contents?.mainTitle?.heading}
          backgroundImage={contents?.mainTitle?.backgroundImage}
        />
      )}
      {contents?.introduction?.enable && (
        <IndroductionView
          heading={contents?.introduction?.heading}
          description={contents?.introduction?.description}
          image={contents?.introduction?.image}
        />
      )}
      {contents?.highlightCard?.enable && (
        <HighlightCardView
          heading={contents?.highlightCard.heading}
          cardList={contents?.highlightCard.cardList}
        />
      )}

      {contents?.imageGallery1?.enable && (
        <ImageGallery1View
          heading={contents?.imageGallery1.heading}
          description={contents?.imageGallery1.description}
          imageList={contents?.imageGallery1.imageList}
        />
      )}

      {contents?.interviewSlide?.enable && (
        <InterviewSlideView cardList={contents?.interviewSlide.cardList} />
      )}

      {contents?.videoContents?.enable && (
        <VideoContentsView
          heading={contents?.videoContents.heading}
          description={contents?.videoContents.description}
          youtubeId={contents?.videoContents.youtubeId}
        />
      )}

      {contents?.imageGallery2?.enable && (
        <ImageGallery2View
          heading={contents?.imageGallery2.heading}
          cardList={contents?.imageGallery2.cardList}
        />
      )}

      {contents?.faq?.enable && <FaqView faqList={contents?.faq.faqList} />}
      <Footer
        companyName="(주)원티드랩"
        companyInfo="사업자 등록번호 : 000-00-00000 | 대표 : 김티드<br/>06236 서울특별시 강남구 테헤란로 142, 12층 (역삼동, 아크플레이스)"
      />
    </>
  );
}
