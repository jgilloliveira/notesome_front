import { Note } from "../../types/note.type";

type NoteModalProps = {
  note: Note
}
export function NoteModal({note}: NoteModalProps) {
  return (
    <div>
      <div>{note.title}</div>
      <div>{note.content}</div>
    </div>
  )  
}