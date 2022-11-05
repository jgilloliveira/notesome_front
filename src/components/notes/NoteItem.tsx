import { useNavigate } from 'react-router-dom'
import { Note } from '../../types/note.type'
import { Button } from '../base'

type NoteParams = {
  note: Partial<Note>,
  onClick: () => void
}

export function NoteItem({note, onClick}: NoteParams) {

  const navigate = useNavigate()

  return (
    <Button 
      flat={true}
      onClick={onClick}
      className='bo-primary rounded-border-md pa-lg ma-sm column justify-start'
      style={{minWidth: "140px", backgroundColor: note.color}}
    >
      <div className='row justify-between text-body1 full-width '>
        <strong>{note.title}</strong> 
        {note.isFavorite && <div>★</div>}
      </div>
      <div className='row justify-start'>{note.content}</div>
    </Button>
  )
}