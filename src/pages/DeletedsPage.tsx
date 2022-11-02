import { useEffect, useState } from "react";
import {  Page } from "../components/base";
import { NoteList } from "../components/notes/NoteList";
import { NoteModal } from "../components/notes/NoteModal";
import { getDeletedNotes, patchNote } from "../connections/notes.connection";
import { MainLayout } from "../layouts/MainLayout";
import { Note } from "../types/note.type";

export function DeletedsPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    (async () => {
      const { data: notesData, error: notesError } = await getDeletedNotes()
      
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
          <div className="ma-sm text-grey text-h3">{"Deleteds!"} </div>
        </div>
        <div className="mt-lg">
          <div  className="row items-center">
            <div className="ma-sm text-grey">Notas</div>
          </div>
          <NoteList list={notes} onSelect={setSelectedNote}/>
        </div>
        { selectedNote && <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} onSave={onUpdateNote} /> }
      </Page>
    </MainLayout> 
  )
}
