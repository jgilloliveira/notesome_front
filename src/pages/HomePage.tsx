import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Page } from "../components/base";
import { FolderList } from "../components/foldels/FolderList";
import { NoteList } from "../components/notes/NoteList";
import { NoteModal } from "../components/notes/NoteModal";
import { getFolders } from "../connections/folders.connection";
import { getNotes, patchNote, postNote } from "../connections/notes.connection";
import { MainLayout } from "../layouts/MainLayout";
import { Folder } from "../types/folder.type";
import { Note } from "../types/note.type";

export function HomePage() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const { parentFolder } = useParams()
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [creatingNote, setCreatingNote] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: foldersData, error: foldersError } = await getFolders(parentFolder)
      const { data: notesData, error: notesError } = await getNotes(parentFolder)
      if (!foldersError) setFolders(foldersData!)
      if (!notesError) setNotes(notesData!)
    })()
  }, [parentFolder])

  async function onUpdate( note: Partial<Note>) {
    if(!note.id) return { error: true }

    const {data, error} = await patchNote(note.id, note)

    if(!error && data) setNotes(notes.map((element) => element.id===note.id? data: element))
    return { error }
  }

  async function onCreate( note: Partial<Note>) {
    const {data, error} = await postNote(note)

    if(!error && data) setNotes([...notes, data])
    return { error }
  }

  return (
    <MainLayout>
      <Page className="ma-lg">
        <div>
          <div className="ma-sm text-grey">Carpetas </div>
          <FolderList list={folders}/>
        </div>
        <div className="mt-lg">
          <div className="ma-sm text-grey">Notas </div>
          <Button onClick={() => {setCreatingNote(true)}}>Agregar</Button>
          <NoteList list={notes} onSelect={setSelectedNote}/>
        </div>
        { creatingNote && <NoteModal onClose={() => setCreatingNote(false)} onSave={onCreate} /> }
        { selectedNote && <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} onSave={onUpdate} /> }
      </Page>
    </MainLayout> 
  )
}