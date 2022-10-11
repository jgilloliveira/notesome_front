import { Note } from "../../types/note.type";
import { Button } from "../base";

type NoteModalProps = {
  note: Note,
  onClose: () => void
}

export function NoteModal({note, onClose}: NoteModalProps) {
  return (
    <div className="full-screen bg-primary opacity-80 absolute flex flex-center" style={{top: 0, left: 0}}>
      <div className="bg-white pa-md" style={{width: "200px", height: "200px"}}>
        <div className="text-body1 bb-primary pa-md row justify-between item-center">
          <div className="">{note.title}</div>
          <Button flat={true} onClick={onClose}>X</Button>
        </div>
        <div className="pa-md">{note.content}</div>
      </div>
    </div>
  )  
}