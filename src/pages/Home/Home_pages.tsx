import Banner from "./widgets/Banner";
import Footer from "../../components/Footer";
import Header from "../../components/Header"; 
import MainPage from "./widgets/MainPage";
import ActivityNew from "./widgets/ActivityNew";
import Slider from "./widgets/Slider";
import SliderTask from "./widgets/SliderTask";
import LitigationNoticeSection from "./widgets/LitigationNoticeSection";
import  TrialNew from "./widgets/TrialNew";
import ImageNew from "./widgets/ImageNew";
import VideosNew from "./widgets/VideosNew";
import DocManagement from "./widgets/DocManagement";

function HomePage() {
  return (
    <div className=" bg-gray-100 overflow-x-hidden"> 
      <Header />
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
      <Footer />
    </div>
    
  );
}

export default HomePage;