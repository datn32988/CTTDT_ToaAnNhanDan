

import FooterManagementDoc from "../components/FooterManagementDoc"
import HeaderManagementDoc from "../components/HeaderManagementDoc"
import Notification from "../components/Notification";

function ManagemanetDocLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="overflow-x-hidden">

      <HeaderManagementDoc/>
        <Notification/>
      <main className="">
        {children}
      </main>

      <FooterManagementDoc/>

    </div>
  )
}

export default ManagemanetDocLayout;