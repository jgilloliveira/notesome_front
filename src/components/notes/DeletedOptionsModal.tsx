import { useState } from "react";
import { patchNote } from "../../connections/notes.connection";
import { Note } from "../../types/note.type";
import { Button, Input } from "../base";

type NoteModalProps = {
  note?: Note,
  onClose: () => void,
  onSave: (note: Partial<Note>, options?: {isRestore?: boolean, isPermanentDelete?: boolean}) => Promise<{ error: any }>
}

export function DeletedOptionsModal({note, onClose, onSave}: NoteModalProps) {

  const [error, setError] = useState("")  

  async function handleDeleteNote() {
    const { error } = await onSave({id: note?.id}, {isPermanentDelete: true})

    if (error) setError("Ocurrió un error al eliminar la nota")
    else onClose()
  }

  async function handleRestore() {
    const { error } = await onSave({id: note?.id, isDeleted:false}, {isRestore: true})

    if (error) setError("Ocurrió un error al restaurar la nota")
    else onClose()
  }

  return (
    <div className="full-screen bg-primary absolute flex flex-center" onClick={onClose} style={{top: 0, left: 0, backgroundColor: "#0008"}}>
      <div className="bg-white pa-md column" onClick={(event) => event.stopPropagation()} style={{ height: "200px", backgroundColor: note?.color || "#FFF"}}>
        <div className="bb-primary pa-md row justify-between items-center">
          <div className="text-body1">{note?.title}</div>
          <Button flat={true} onClick={onClose} className="bg-transparent">X</Button>
        </div>
        <div className="pa-md grow-1">
          <div className="text-body1">{note?.content}</div>
        </div>
        <div className="row flex-center">
          <Button className="ma-md" flat={true} onClick={handleRestore} >Restaurar</Button>
          <Button className="ma-md" onClick={handleDeleteNote} style={{width: "150px"}}>Eliminar</Button>
        </div> 
        { error && <div className="text-red">{error}</div>}
      </div>
    </div>
  )  
}