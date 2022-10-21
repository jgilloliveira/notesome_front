import { useState } from "react";
import { Folder } from "../../types/folder.type";
import { Button, Input } from "../base";

type FolderModalProps = {
  folder?: Folder,
  onClose: () => void,
  onSave: (folder: Partial<Folder>) => Promise<{ error: any }>
}

export function FolderModal({folder, onClose, onSave}: FolderModalProps) {

  const [name, setName] = useState(folder?.name || "")
  const [error, setError] = useState("")  

  async function handleSaveFolder() {

    const { error } = await onSave({id: folder?.id, name})

    if (error) setError("Ocurrió un error al guardar la nota")
    else onClose()
    
  }

  return (
    <div className="full-screen bg-primary absolute flex flex-center" onClick={onClose} style={{top: 0, left: 0, backgroundColor: "#0008"}}>
      <div className="bg-white pa-md column" onClick={(event) => event.stopPropagation()} style={{ height: "100px", backgroundColor:"#FFF"}}>
        <div className="bb-primary pa-md row justify-between items-center">
          <Input value={name} flat={true} onChange={setName} className="text-body1"/>
          <Button flat={true} onClick={onClose} className="bg-transparent">X</Button>
        </div>
        <div className="column flex-center">
          <Button className="ma-md" onClick={handleSaveFolder} style={{width: "150px"}}>Guardar</Button>
        </div> 
        { error && <div className="text-red">{error}</div>}
      </div>
    </div>
  )  
}