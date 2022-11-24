import { useContext, useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { Button, Page } from "../components/base";
import { CategoryModal } from "../components/categories/CategoryModal";
import { FolderList } from "../components/foldels/FolderList";
import { FolderModal } from "../components/foldels/FolderModal";
import { NoteList } from "../components/notes/NoteList";
import { NoteModal } from "../components/notes/NoteModal";
import { deleteCategory, getCategoryById, patchCategory, postCategory } from "../connections/categories.connection";
import { getFolderById, getFolders, patchFolder, postFolder } from "../connections/folders.connection";
import { getNotes, getNotesByCategory, patchNote, postNote } from "../connections/notes.connection";
import { MainLayout } from "../layouts/MainLayout";
import { Category } from "../types/category.type";
import { Folder } from "../types/folder.type";
import { Note, SerializedNote } from "../types/note.type";
import CategoriesContext from "../context/categories.context";

export function HomePage() {
  // Parámetros
  const { parentFolder, categoryId } = useParams()

  // Estados de carpetas
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentFolder, setCurrentFolder] = useState<Folder | undefined>(undefined)
  const [selectedFolder, setSelectedFolder] = useState(false)
  const [creatingFolder, setCreatingFolder] = useState(false)

  // Estados de notas
  const [notes, setNotes] = useState<Note[]>([])  
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [creatingNote, setCreatingNote] = useState(false)
  
  // Estados de categorias
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(undefined)
  const [editigCategory, setEditigCategory] = useState(false)
  const {categories, getAllCategories, openCategoryModal, setOpenCategoryModal} = useContext(CategoriesContext);

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data: foldersData, error: foldersError } = await getFolders(parentFolder)
      const { data: notesData, error: notesError } = categoryId? await getNotesByCategory(categoryId): await getNotes(parentFolder)
      
      if (!foldersError) setFolders(foldersData!)
      if (!notesError) setNotes(notesData!)

      if (parentFolder) {
        const { data: folderData, error: folderError } = await getFolderById(parentFolder)
        if(!folderError && folderData) setCurrentFolder(folderData)
      } else {
        setCurrentFolder(undefined)
      }

      if (categoryId) {
        const { data: categoryData, error: categoryError } = await getCategoryById(categoryId)
        if(!categoryError && categoryData) setCurrentCategory(categoryData)
      } else {
        setCurrentCategory(undefined)
      }
    })()
  }, [parentFolder, categoryId])
  
  async function onCreateFolder( folder: Partial<Folder>) {

    const {data, error} = await postFolder({...folder, parentFolder })

    if(!error && data) setFolders([...folders, data])
    return { error }
  }

  async function onUpdateFolder( folder: Partial<Folder>) {
    if(!currentFolder) return { error: true }
    const {data, error} = await patchFolder(currentFolder.id, folder)

    if(!error && data) setCurrentFolder(data)
    return { error }
  }


  async function onUpdateNote( note: Partial<Note>) {
    if(!note.id) return { error: true }

    const {data, error} = await patchNote(note.id, note)

    if(!error && data) {
      if(data.isDeleted) setNotes(notes.filter((element) => element.id!==data.id))
      else setNotes(notes.map((element) => element.id===data.id? data: element))
    }
    return { error }
  }

  async function onCreateNote( note: Partial<Note>) {
    
    const {data, error} = await postNote({...note, folder: parentFolder })

    if(!error && data) setNotes([...notes, data])
    return { error }
  }

  async function onUpdateCategory( category: Partial<Category>) {
    if(!category.id) return { error: true }

    const {data, error} = await patchCategory(category.id, category)
    

    if(!error && data){
      getAllCategories()
      setEditigCategory(false)
      setCurrentCategory(data)
    } 
    return { error }
  }

  async function onCreateCategory( category: Partial<Category>) {

    const {data, error} = await postCategory(category)
    

    if(!error && data){
      getAllCategories()
      setOpenCategoryModal(false)
    } 
    return { error }
  }

  async function onDeleteCategory() {

    if(!currentCategory?.id) return { error: true }
    const {error} = await deleteCategory(currentCategory?.id)
    

    if(!error){
      getAllCategories()
      navigate('/')
    } 
    return { error }
  }

  return (
    <MainLayout>
      <Page className="ma-lg">
        <div className="row items-center">
          {categoryId? 
            <>
              <div className="ma-sm text-grey text-h3">{currentCategory?.name} </div>
              { currentCategory && 
                <>
                  <Button onClick={() => {setEditigCategory(true)}}>Editar</Button>
                  <Button flat={true} className="bg-red text-white ml-sm" onClick={onDeleteCategory}>Eliminar</Button>
                </>
              }
            </>:
            <>
              <div className="ma-sm text-grey text-h3">{currentFolder?.name || "Main Folder"} </div>
              { currentFolder && <Button onClick={() => {setSelectedFolder(true)}}>Editar</Button> }
            </>
          }  
        </div>
        <div>
        { currentFolder && <div>
          <Button flat={true} onClick={() => navigate("/")}>home</Button>
          { currentFolder.url?.map(elemnt => <Button flat={true} onClick={() => navigate(`/folders/${elemnt.id}`)}>/ {elemnt.name}</Button>) }
        </div>}
        </div>
        {!categoryId && 
          <div>
            <div  className="row items-center">
              <div className="ma-sm text-grey">Carpetas </div>
              <Button onClick={() => {setCreatingFolder(true)}}>Agregar</Button>
            </div>
            <FolderList list={folders}/>
          </div>
        }
        <div className="mt-lg">
          <div  className="row items-center">
            <div className="ma-sm text-grey">Notas </div>
            {!categoryId && <Button onClick={() => {setCreatingNote(true)}}>Agregar</Button>}
          </div>
          <NoteList list={notes} onSelect={setSelectedNote}/>
        </div>
        { selectedFolder && <FolderModal folder={currentFolder} onClose={() => setSelectedFolder(false)} onSave={onUpdateFolder} /> }
        { creatingFolder && <FolderModal onClose={() => setCreatingFolder(false)} onSave={onCreateFolder} /> }
        { creatingNote && <NoteModal onClose={() => setCreatingNote(false)} onSave={onCreateNote} /> }
        { selectedNote && <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} onSave={onUpdateNote} /> }
        { editigCategory && <CategoryModal category={currentCategory} onClose={() => setEditigCategory(false)} onSave={onUpdateCategory} /> }
        { openCategoryModal && <CategoryModal onClose={() => setOpenCategoryModal(false)} onSave={onCreateCategory} /> }
      </Page>
    </MainLayout> 
  )
}