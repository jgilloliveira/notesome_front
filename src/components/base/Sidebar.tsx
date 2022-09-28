import { DivParams } from "../../types";

export function Sidebar(props: DivParams) {
  return (
    <div {...props} className={`bg-red br-grey  ${props.className}`}>
      Sidebar!
    </div>
  )
}