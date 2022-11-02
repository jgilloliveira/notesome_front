import { useNavigate } from "react-router-dom";
import { DivParams } from "../../types";
import { Button } from "./Button";

export function Sidebar(props: DivParams) {
  const navigate = useNavigate()
  return (
    <div {...props} style={{minWidth: "200px"}} className={`bg-gray br-grey column justify-start ${props.className}`}>
      <Button flat={true} className="bg-transparent text-left" onClick={() => navigate('/')}>Home</Button>
      <Button flat={true} className="bg-transparent text-left" onClick={() => navigate('/favorites')}>Favoritos</Button>
      <Button flat={true} className="bg-transparent text-left" onClick={() => navigate('/deleteds')}>Eliminados</Button>
      <Button>Categorias</Button>
    </div>
  )
}