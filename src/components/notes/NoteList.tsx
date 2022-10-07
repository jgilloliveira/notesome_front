import { Note } from "../../types/note.type"
import { NoteItem } from "./NoteItem"

type NoteListParams = {
  list: Partial<Note>[]
}

export function NoteList({list}: NoteListParams) {
  return (
    <div className="row wrap">
      {
        list.map(element => (
          <NoteItem key={element.id} note={element}/>
        ))
      }
    </div>
  )
}