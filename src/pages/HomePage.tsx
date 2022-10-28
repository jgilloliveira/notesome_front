import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { Button, Page } from "../components/base";
import { FolderList } from "../components/foldels/FolderList";
import { FolderModal } from "../components/foldels/FolderModal";
import { NoteList } from "../components/notes/NoteList";
import { NoteModal } from "../components/notes/NoteModal";
import { getFolderById, getFolders, patchFolder, postFolder } from "../connections/folders.connection";
import { getNotes, patchNote, postNote } from "../connections/notes.connection";
import { MainLayout } from "../layouts/MainLayout";
import { Folder } from "../types/folder.type";
import { Note } from "../types/note.type";

export function HomePage() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const { parentFolder } = useParams()
  const [currentFolder, setCurrentFolder] = useState<Folder | undefined>(undefined)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [selectedFolder, setSelectedFolder] = useState(false)
  const [creatingNote, setCreatingNote] = useState(false)
  const [creatingFolder, setCreatingFolder] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data: foldersData, error: foldersError } = await getFolders(parentFolder)
      const { data: notesData, error: notesError } = await getNotes(parentFolder)
      
      if (!foldersError) setFolders(foldersData!)
      if (!notesError) setNotes(notesData!)
      if (parentFolder) {
        const { data: folderData, error: folderError } = await getFolderById(parentFolder)
        if(!folderError && folderData) setCurrentFolder(folderData)
      } else {
        setCurrentFolder(undefined)
      }
    })()
  }, [parentFolder])
  
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

    if(!error && data) setNotes(notes.map((element) => element.id===data.id? data: element))
    return { error }
  }

  async function onCreateNote( note: Partial<Note>) {
    
    const {data, error} = await postNote({...note, folder: parentFolder })

    if(!error && data) setNotes([...notes, data])
    return { error }
  }

  return (
    <MainLayout>
      <Page className="ma-lg">
        <div className="row items-center">
          <div className="ma-sm text-grey text-h3">{currentFolder?.name || "Main Folder"} </div>
          { currentFolder && <Button onClick={() => {setSelectedFolder(true)}}>Editar</Button> }
        </div>
        <div>
        { currentFolder && <div>
          <Button flat={true} onClick={() => navigate("/")}>home</Button>
          { currentFolder.url.map(elemnt => <Button flat={true} onClick={() => navigate(`/folders/${elemnt.id}`)}>/ {elemnt.name}</Button>) }
        </div>}
        </div>
        <div>
          <div  className="row items-center">
            <div className="ma-sm text-grey">Carpetas </div>
            <Button onClick={() => {setCreatingFolder(true)}}>Agregar</Button>
          </div>
          <FolderList list={folders}/>
        </div>
        <div className="mt-lg">
          <div  className="row items-center">
            <div className="ma-sm text-grey">Notas </div>
            <Button onClick={() => {setCreatingNote(true)}}>Agregar</Button>
          </div>
          <NoteList list={notes} onSelect={setSelectedNote}/>
        </div>
        { selectedFolder && <FolderModal folder={currentFolder} onClose={() => setSelectedFolder(false)} onSave={onUpdateFolder} /> }
        { creatingFolder && <FolderModal onClose={() => setCreatingFolder(false)} onSave={onCreateFolder} /> }
        { creatingNote && <NoteModal onClose={() => setCreatingNote(false)} onSave={onCreateNote} /> }
        { selectedNote && <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} onSave={onUpdateNote} /> }
      </Page>
    </MainLayout> 
  )
}