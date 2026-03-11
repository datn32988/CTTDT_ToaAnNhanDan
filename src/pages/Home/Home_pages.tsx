import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Header from "../../components/Header"; 
import MainPage from "../../components/MainPage";
import ActivityNew from "../../components/ActivityNew";
import Slider from "../../components/Slider";
import SliderTask from "../../components/SliderTask";
import LitigationNoticeSection from "../../components/LitigationNoticeSection";

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
      <Footer />
    </div>
    
  );
}

export default HomePage;