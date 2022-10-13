import { useState } from "react";
import { Note } from "../../types/note.type";
import { Button, Input } from "../base";

type NoteModalProps = {
  note: Note,
  onClose: () => void
}

export function NoteModal({note, onClose}: NoteModalProps) {

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  function handleSaveNote() {
    
  }

  return (
    <div className="full-screen bg-primary absolute flex flex-center" onClick={onClose} style={{top: 0, left: 0, backgroundColor: "#0008"}}>
      <div className="bg-white pa-md column" onClick={(event) => event.stopPropagation()} style={{ height: "200px", backgroundColor: note.color}}>
        <div className="bb-primary pa-md row justify-between item-center">
          <Input value={title} flat={true} onChange={setTitle} className="text-body1"/>
          <Button flat={true} onClick={onClose} className="bg-transparent">X</Button>
        </div>
        <div className="pa-md grow-1">
        <Input value={content} flat={true} onChange={setContent} className="text-body1"/>
        </div>
        <div className="column flex-center">
          <Button className="ma-md" onClick={handleSaveNote} style={{width: "150px"}}>Guardar</Button>
        </div> 
      </div>
    </div>
  )  
}