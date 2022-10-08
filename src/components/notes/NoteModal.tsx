import { Note } from "../../types/note.type";

type NoteModalProps = {
  note: Note
}
export function NoteModal({note}: NoteModalProps) {
  return (
    <div>
      <div className="text-body1">{note.title}</div>
      <div className="">{note.content}</div>
    </div>
  )  
}