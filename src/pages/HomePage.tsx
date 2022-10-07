import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../components/base";
import { FolderList } from "../components/foldels/FolderList";
import { NoteList } from "../components/notes/NoteList";
import { getFolders, getNotes } from "../connections/folders.connection";
import { MainLayout } from "../layouts/MainLayout";
import { Folder } from "../types/folder.type";
import { Note } from "../types/note.type";

export function HomePage() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [notes, setNotes] = useState<Note[]>([])

  const { parentFolder } = useParams()

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
          <NoteList list={notes}/>
        </div>
      </Page>
    </MainLayout> 
  )
}