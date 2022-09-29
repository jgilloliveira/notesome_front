import { useState } from "react";
import { Header } from "../components/base/Header";
import { Layout } from "../components/base/Layout";
import { Sidebar } from "../components/base/Sidebar";
import { DivParams } from "../types";

export function MainLayout(props: DivParams) {

  const [openSidebar, setOpenSidebar] = useState(true)

  return (
    <Layout className='bg-white column'>
      {/* Row de encabezado de página */}
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      <div className="row grow-1">
        { openSidebar && <Sidebar/> }
        {props.children}
      </div>
    </Layout>
  )
}