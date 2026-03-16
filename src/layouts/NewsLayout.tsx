import Header from "../components/Header"
import Footer from "../components/Footer"

function NewsLayout({ children }: { children: React.ReactNode }) {

  return (
    <div>

      <Header/>

      <main className="overflow-x-hidden">
        {children}
      </main>

      <Footer/>

    </div>
  )
}

export default NewsLayout