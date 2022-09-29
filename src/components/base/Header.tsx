import { useState } from "react";
import { HeaderParams } from "../../types";
import { Button } from "./Button";

type HeaderProps = HeaderParams
& {
  openSidebar: boolean,
  setOpenSidebar: (value: boolean) => void
}

export function Header(props: HeaderProps) {

  const [openUserMenu, setOpenUserMenu] = useState(false)
  

  function onClickToggleSidebar() {
    props.setOpenSidebar(!props.openSidebar)
  }

  function onClickUser(){
    setOpenUserMenu(!openUserMenu)
  }

  return (
    <header {...props} className={`row justify-between bg-primary ${props.className}`}>
      <Button onClick={onClickToggleSidebar}>Toggle sidebar</Button>
      <div className="column relative">
        <Button onClick={onClickUser}>User</Button>
        { 
          openUserMenu &&
          <div className="bg-white absolute bo-primary"
            style={{
              width: "100px",
              right: "0px",
              top:"100%"
            }}>
              <Button flat={true}>Salir sesión</Button>
          </div>
        }
      </div>
    </header>
  )
}