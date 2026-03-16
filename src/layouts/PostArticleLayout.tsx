import Header from "../components/Header"
import Footer from "../components/Footer"
import Notification from "../components/Notification";
import Category from "../components/Category";
import VerticalBanner from "../components/VerticalBanner";

function PostArticleLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="overflow-x-hidden">

      <Header/>

      <main className="">
        <Notification/>
        <div className="grid grid-cols-4 bg-white ml-[160px] mr-[127px] mb-10 pt-2 ">
            <div className="col-span-1">
                <Category/>
                <VerticalBanner/>
            </div>
            <div className="col-span-3">
                {children}
            </div>
        </div>
       
      </main>

      <Footer/>

    </div>
  )
}

export default PostArticleLayout;