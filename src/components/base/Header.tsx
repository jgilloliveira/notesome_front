import { useState } from "react";
import { HeaderParams } from "../../types";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../connections/session.connection";


type HeaderProps = HeaderParams
& {
  openSidebar: boolean,
  setOpenSidebar: (value: boolean) => void
}

export function Header(props: HeaderProps) {

  const [openUserMenu, setOpenUserMenu] = useState(false)
  const navigate = useNavigate()

  function onClickToggleSidebar() {
    props.setOpenSidebar(!props.openSidebar)
  }

  function onClickUser(){
    setOpenUserMenu(!openUserMenu)
  }

  function onClickLogout(){
    logout()
    navigate('/session/login')
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
              <Button flat={true} onClick={onClickLogout}>Salir sesión</Button>
          </div>
        }
      </div>
    </header>
  )
}