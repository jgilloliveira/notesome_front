import { useEffect, useState } from "react";
import {  Page } from "../components/base";
import { DeletedOptionsModal } from "../components/notes/DeletedOptionsModal";
import { NoteList } from "../components/notes/NoteList";
import { deleteNote, getDeletedNotes, patchNote } from "../connections/notes.connection";
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

  async function onUpdateNote( note: Partial<Note>, options?: {isRestore?: boolean, isPermanentDelete?: boolean}) {
    if(!note.id) return { error: true }

    const {data, error} = options?.isPermanentDelete? await deleteNote(note.id): await patchNote(note.id, note)

    if(!error) {
      if(options?.isRestore || options?.isPermanentDelete) setNotes(notes.filter((element) => element.id!==note.id))
    }
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
        { selectedNote && <DeletedOptionsModal note={selectedNote} onClose={() => setSelectedNote(null)} onSave={onUpdateNote} /> }
      </Page>
    </MainLayout> 
  )
}
