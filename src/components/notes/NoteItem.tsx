import { useNavigate } from 'react-router-dom'
import { Note } from '../../types/note.type'
import { Button } from '../base'

type NoteParams = {
  note: Partial<Note>
}

export function NoteItem({note}: NoteParams) {

  const navigate = useNavigate()

  return (
    <Button flat={true} onClick={() => navigate(`/notes/${note.id}`)} className='bo-primary rounded-border-md pa-lg ma-sm column justify-start' style={{minWidth: "140px"}}>
      <div className='row justify-start text-body1'>
       <strong>{note.title}</strong> 
      </div>
      <div className='row justify-start'>{note.content}</div>
    </Button>
  )
}