import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../components/base";
import { FolderList } from "../components/foldels/FolderList";
import { NoteList } from "../components/notes/NoteList";
import { NoteModal } from "../components/notes/NoteModal";
import { getFolders } from "../connections/folders.connection";
import { getNotes } from "../connections/notes.connection";
import { MainLayout } from "../layouts/MainLayout";
import { Folder } from "../types/folder.type";
import { Note } from "../types/note.type";

export function HomePage() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const { parentFolder } = useParams()
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    (async () => {
      const { data: foldersData, error: foldersError } = await getFolders(parentFolder)
      const { data: notesData, error: notesError } = await getNotes(parentFolder)
      if (!foldersError) setFolders(foldersData!)
      if (!notesError) setNotes(notesData!)
    })()
  }, [parentFolder])

  return (
    <MainLayout>
      <Page className="ma-lg">
        <div>
          <div className="ma-sm text-grey">Carpetas </div>
          <FolderList list={folders}/>
        </div>
        <div className="mt-lg">
          <div className="ma-sm text-grey">Notas </div>
          <NoteList list={notes} onSelect={setSelectedNote}/>
        </div>
        { selectedNote && <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} /> }
      </Page>
    </MainLayout> 
  )
}