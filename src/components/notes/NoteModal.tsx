import { Note } from "../../types/note.type";
import { Button, Input } from "../base";

type NoteModalProps = {
  note: Note,
  onClose: () => void
}

export function NoteModal({note, onClose}: NoteModalProps) {
  return (
    <div className="full-screen bg-primary opacity-80 absolute flex flex-center" onClick={onClose} style={{top: 0, left: 0}}>
      <div className="bg-white pa-md column" onClick={(event) => event.stopPropagation()} style={{ height: "200px"}}>
        <div className="text-body1 bb-primary pa-md row justify-between item-center">
          <Input value={note.title} flat={true} onChange={()=>{}}/>
          <Button flat={true} onClick={onClose}>X</Button>
        </div>
        <div className="pa-md grow-1">{note.content}</div>
        <div className="column flex-center">
          <Button className="ma-md" style={{width: "150px"}}>Guardar</Button>
        </div> 
      </div>
    </div>
  )  
}