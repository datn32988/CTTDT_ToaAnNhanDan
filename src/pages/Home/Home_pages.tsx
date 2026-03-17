import Banner from "./widgets/Banner";
import MainPage from "./widgets/MainPage";
import ActivityNew from "./widgets/ActivityNew";
import Slider from "./widgets/Slider";
import SliderTask from "./widgets/SliderTask";
import LitigationNoticeSection from "./widgets/LitigationNoticeSection";
import  TrialNew from "./widgets/TrialNew";
import ImageNew from "./widgets/ImageNew";
import VideosNew from "./widgets/VideosNew";
import DocManagement from "./widgets/DocManagement";
import NewsLayout from "../../layouts/NewsLayout";

function HomePage() {
  return (
    <NewsLayout>
      <div className=" bg-white overflow-x-hidden"> 
        <Slider />
        <SliderTask />
        <Banner />
        <MainPage />  
        <ActivityNew />
        <LitigationNoticeSection />
        <TrialNew />
        <ImageNew />
        <VideosNew />
        <DocManagement />
        </div>
    </NewsLayout>
    
    
    
  );
}

export default HomePage;