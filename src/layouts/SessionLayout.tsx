import { Layout } from "../components/base/Layout";
import { DivParams } from "../types";

export function SesionLayout(props: DivParams) {
  return (
    <Layout className='bg-primary flex-center flex'>
      <div {...props} className={`bg-white rounded-border-sm column pa-lg gap-lg ${props.className}`}>
        {props.children}
      </div>
    </Layout>
  )
}