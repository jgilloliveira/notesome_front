import { Note } from "../../types/note.type"
import { NoteItem } from "./NoteItem"

type NoteListParams = {
  list: Partial<Note>[],
  onSelect: (note: Note | null) => void
}

export function NoteList({list, onSelect}: NoteListParams) {
  return (
    <div className="row wrap">
      {
        list.map(element => (
          <NoteItem key={element.id} note={element} onClick={() => onSelect(element)}/>
        ))
      }
    </div>
  )
}