import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Page } from "../components/base";
import { FolderList } from "../components/foldels/FolderList";
import { FolderModal } from "../components/foldels/FolderModal";
import { NoteList } from "../components/notes/NoteList";
import { NoteModal } from "../components/notes/NoteModal";
import { getFolders, patchFolder, postFolder } from "../connections/folders.connection";
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

  useEffect(() => {
    (async () => {
      const { data: foldersData, error: foldersError } = await getFolders(parentFolder)
      const { data: notesData, error: notesError } = await getNotes(parentFolder)
      if (!foldersError) setFolders(foldersData!)
      if (!notesError) setNotes(notesData!)
    })()
  }, [parentFolder])
  parentFolder
  async function onCreateFolder( folder: Partial<Folder>) {

    const {data, error} = await postFolder({...folder, parentFolder })

    if(!error && data) setFolders([...folders, data])
    return { error }
  }

  async function onUpdateFolder( folder: Partial<Folder>) {
    if(!currentFolder) return { error: true }
    const {data, error} = await patchFolder(currentFolder.id, folder )

    if(!error && data) setFolders([...folders, data])
    return { error }
  }


  async function onUpdateNote( note: Partial<Note>) {
    if(!note.id) return { error: true }

    const {data, error} = await patchNote(note.id, note)

    if(!error && data) setNotes(notes.map((element) => element.id===note.id? data: element))
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
        <div>
          <div className="ma-sm text-grey">Carpetas </div>
          <Button onClick={() => {setSelectedFolder(true)}}>Editar</Button>
        </div>
        <div>
          <div className="ma-sm text-grey">Carpetas </div>
          <Button onClick={() => {setCreatingFolder(true)}}>Agregar</Button>
          <FolderList list={folders}/>
        </div>
        <div className="mt-lg">
          <div className="ma-sm text-grey">Notas </div>
          <Button onClick={() => {setCreatingNote(true)}}>Agregar</Button>
          <NoteList list={notes} onSelect={setSelectedNote}/>
        </div>
        { selectedFolder && <FolderModal folder={currentFolder} onClose={() => setSelectedFolder(false)} onSave={onCreateFolder} /> }
        { creatingFolder && <FolderModal onClose={() => setCreatingFolder(false)} onSave={onCreateFolder} /> }
        { creatingNote && <NoteModal onClose={() => setCreatingNote(false)} onSave={onCreateNote} /> }
        { selectedNote && <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} onSave={onUpdateNote} /> }
      </Page>
    </MainLayout> 
  )
}