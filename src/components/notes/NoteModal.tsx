import { useState } from "react";
import { patchNote } from "../../connections/notes.connection";
import { Note } from "../../types/note.type";
import { Button, Input } from "../base";
import { ColorPicker } from "../base/ColorPicker";

type NoteModalProps = {
  note?: Note,
  onClose: () => void,
  onSave: (note: Partial<Note>) => Promise<{ error: any }>
}

export function NoteModal({note, onClose, onSave}: NoteModalProps) {

  const [title, setTitle] = useState(note?.title || "")
  const [content, setContent] = useState(note?.content || "")
  const [favorite, setFavorite] = useState(note?.isFavorite)
  const [selectingColor, setSelectingColor] = useState(false)
  const [error, setError] = useState("")  

  async function handleSaveNote() {
    const { error } = await onSave({id: note?.id, title, content, isFavorite:favorite})

    if (error) setError("Ocurrió un error al guardar la nota")
    else onClose()
  }

  async function handleDeletedNote() {
    const { error } = await onSave({id: note?.id, isDeleted:true})

    if (error) setError("Ocurrió un error al eliminar la nota")
    else onClose()
  }

  return (
    <div className="full-screen bg-primary absolute flex flex-center" onClick={onClose} style={{top: 0, left: 0, backgroundColor: "#0008"}}>
      <div className="bg-white pa-md column" onClick={(event) => event.stopPropagation()} style={{ width: "280px", height: "200px", backgroundColor: note?.color || "#FFF"}}>
      {!selectingColor?
        <>
          <div className="bb-primary pa-md row justify-between items-center">
            <Input value={title} flat={true} onChange={setTitle} className="text-body1"/>
            <Button flat={true} onClick={onClose} className="bg-transparent">X</Button>
          </div>
          <div className="pa-md grow-1">
            <Input value={content} flat={true} onChange={setContent} className="text-body1"/>
          </div>
          <div className="row flex-center">
            <Button className="ma-md" flat={true} onClick={handleDeletedNote} >🗑</Button>
            <Button className="ma-md" flat={true} onClick={() => setSelectingColor(!selectingColor)}>🎨</Button>
            <Button className="ma-md" flat={true} onClick={() => setFavorite(!favorite)} >{favorite? "★":"☆"}</Button>
            <Button className="ma-md" onClick={handleSaveNote} style={{width: "150px"}}>Guardar</Button>
          </div>
        </> :
        <ColorPicker/>
      }
      { error && <div className="text-red">{error}</div>}
      </div>
    </div>
  )  
}