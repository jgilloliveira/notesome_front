import { useContext, useState } from "react";
import { patchNote } from "../../connections/notes.connection";
import CategoriesContext from "../../context/categories.context";
import { Category } from "../../types/category.type";
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
  const [categories, setCategories] = useState(note?.categories || [])
  const {categories: allCategories, getAllCategories} = useContext(CategoriesContext);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false)
  const [favorite, setFavorite] = useState(note?.isFavorite)
  const [selectingColor, setSelectingColor] = useState(false)
  const [color, setColor] = useState(note?.color)
  const [error, setError] = useState("")  

  async function handleSaveNote() {
    const { error } = await onSave({id: note?.id, title, content, color, isFavorite:favorite})

    if (error) setError("Ocurrió un error al guardar la nota")
    else onClose()
  }

  async function handleDeletedNote() {
    const { error } = await onSave({id: note?.id, isDeleted:true})

    if (error) setError("Ocurrió un error al eliminar la nota")
    else onClose()
  }

  async function save(updates: Partial<Note>) {

    const { error } = await onSave({id: note?.id, ...updates})

    if (error) setError("Ocurrió un error al guardar la nota")
  }

  async function handleAddCategory(category: Category) {
    if(!note?.id) return { error: true }
    const { data, error } = await patchNote(note?.id, {categories: [...categories, category]})

    if(!error && data) setCategories(data?.categories)
    else if (error) setError("Ocurrió un error al agregar una categoría")

    setOpenCategoryMenu(false)
  }

  return (
    <div className="full-screen bg-primary absolute flex flex-center" onClick={onClose} style={{top: 0, left: 0, backgroundColor: "#0008"}}>
      <div className="bg-white pa-md column" onClick={(event) => event.stopPropagation()} style={{ width: "340px", height: "280px", backgroundColor: color || "#FFF"}}>
      {!selectingColor?
        <>
          <div className="bb-primary pa-md row justify-between items-center">
            <Input value={title} flat={true} onChange={setTitle} className="text-body1"/>
            <Button flat={true} onClick={onClose} className="bg-transparent">X</Button>
          </div>
          <div className="pa-md row items-center gap-sm">
            {categories.map(category => <div className="pa-sm bo-primary rounded-border-sm" key={category.id}>{category.name}</div>)} 
            <div className="relative">
              <Button className="ml-md" flat={true} onClick={()=>{setOpenCategoryMenu(!openCategoryMenu)}}>+</Button>
              { 
                openCategoryMenu &&
                <div className="bg-white absolute bo-primary"
                  style={{
                    width: "100px",
                    left: "0px",
                    top:"100%"
                  }}>
                    {allCategories.filter(category => !categories.some(c => category.id===c.id)).map(category => <Button key={category.id} flat={true} onClick={() => handleAddCategory(category)}>{category.name}</Button>)}
                    
                </div>
              }
            </div>
          </div>
          <div className="pa-md grow-1">
            <Input value={content} flat={true} onChange={setContent} className="text-body1"/>
          </div>
          <div className="row flex-center">
            <Button className="ma-md" flat={true} onClick={handleDeletedNote} >🗑</Button>
            <Button className="ma-md" flat={true} onClick={() => setSelectingColor(!selectingColor)}>🎨</Button>
            <Button
              className="ma-md"
              flat={true}
              onClick={() => {
                setFavorite(!favorite)
                if(note) save({isFavorite:!favorite})
              }}
            >
              {favorite? "★":"☆"}
            </Button>
            <Button className="ma-md" onClick={handleSaveNote} style={{width: "150px"}}>Guardar</Button>
          </div>
        </> :
        <ColorPicker onClick={(newColor) => {
          setSelectingColor(false)
          setColor(newColor)
          if(note) save({color:newColor})
        }}/>
      }
      { error && <div className="text-red">{error}</div>}
      </div>
    </div>
  )  
}