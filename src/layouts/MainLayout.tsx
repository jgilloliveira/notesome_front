import { Header } from "../components/base/Header";
import { Layout } from "../components/base/Layout";
import { DivParams } from "../types";

export function MainLayout(props: DivParams) {
  return (
    <Layout className='bg-white column'>
      {/* Row de encabezado de página */}
      <Header/>
      <div className="row">
        {/* <Sidebar/> */}
        {props.children}
      </div>

    </Layout>
  )
}