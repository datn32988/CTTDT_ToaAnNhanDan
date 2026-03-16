import Footer from "../components/Footer"
import Header from "../components/Header"

function AdminLayout({ children }: { children: React.ReactNode }) {

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

export default AdminLayout