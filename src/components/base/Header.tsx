import { HeaderParams } from "../../types";
import { Button } from "./Button";

type HeaderProps = HeaderParams
& {
  openSidebar: boolean,
  setOpenSidebar: (value: boolean) => void
}

export function Header(props: HeaderProps) {

  function onClickToggleSidebar() {
    props.setOpenSidebar(!props.openSidebar)
  }

  return (
    <header {...props} className={`row justify-between bg-primary ${props.className}`}>
      <Button onClick={onClickToggleSidebar}>Toggle sidebar</Button>
      <Button>User</Button>
    </header>
  )
}