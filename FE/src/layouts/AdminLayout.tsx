import Category from "../components/Category"
import Footer from "../components/Footer"
import Header from "../components/Header"

function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="overflow-x-hidden">
    <Header/>
      <div className="grid grid-cols-4 max-w-7xl mx-auto gap-4">
        <div className="col-span-1">
          <Category name={"Chức năng chính "} items={[
            {id:1,name:"Đăng tin mới",},
            {id:2,name:"Đăng tin xét sử mới"},
            {id:3,name:"Đăng tin ảnh mới"},
            {id:3,name:"Đăng tin video mới"},
          ]}/>
        </div>
          <div className="col-span-3">
          <main className="">
          
          {children}

        </main>
        </div>
      </div>

    
    <Footer/>
    </div>
  )
}

export default AdminLayout