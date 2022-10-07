import { useNavigate } from 'react-router-dom'
import { Note } from '../../types/note.type'
import { Button } from '../base'

type NoteParams = {
  note: Partial<Note>
}

export function NoteItem({note}: NoteParams) {

  const navigate = useNavigate()

  return (
    <Button flat={true} onClick={() => navigate(`/notes/${note.id}`)} className='bo-primary rounded-border-md pa-lg ma-sm' style={{minWidth: "140px"}}>
      {note.title}
    </Button>
  )
}