import Header from "../components/Header"
import Footer from "../components/Footer"
import Notification from "../components/Notification";


function PostArticleLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="overflow-x-hidden">

      <Header/>

      <main className="">
        <Notification/>
        
            <div className="col-span-3">
                {children}
            
        </div>
       
      </main>

      <Footer/>

    </div>
  )
}

export default PostArticleLayout;