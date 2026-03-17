import Header from "../components/Header"
import Footer from "../components/Footer"

function NewsLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="overflow-x-hidden">

      <Header/>

      <main className="">
        {children}
      </main>

      <Footer/>

    </div>
  )
}

export default NewsLayout