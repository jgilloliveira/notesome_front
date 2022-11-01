import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { Button, Page } from "../components/base";
import { FolderList } from "../components/foldels/FolderList";
import { FolderModal } from "../components/foldels/FolderModal";
import { NoteList } from "../components/notes/NoteList";
import { NoteModal } from "../components/notes/NoteModal";
import { getFolderById, getFolders, patchFolder, postFolder } from "../connections/folders.connection";
import { getFavoriteNotes, getNotes, patchNote, postNote } from "../connections/notes.connection";
import { MainLayout } from "../layouts/MainLayout";
import { Note } from "../types/note.type";

export function FavoritePage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    (async () => {
      const { data: notesData, error: notesError } = await getFavoriteNotes()
      
      if (!notesError) setNotes(notesData!)
    })()
  }, [])

  async function onUpdateNote( note: Partial<Note>) {
    if(!note.id) return { error: true }

    const {data, error} = await patchNote(note.id, note)

    if(!error && data) setNotes(notes.map((element) => element.id===data.id? data: element))
    return { error }
  }

  return (
    <MainLayout>
      <Page className="ma-lg">
        <div className="row items-center">
          <div className="ma-sm text-grey text-h3">{"Favoritos!"} </div>
        </div>
        <div className="mt-lg">
          <div  className="row items-center">
            <div className="ma-sm text-grey">Notas </div>
          </div>
          <NoteList list={notes} onSelect={setSelectedNote}/>
        </div>
        { selectedNote && <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} onSave={onUpdateNote} /> }
      </Page>
    </MainLayout> 
  )
}