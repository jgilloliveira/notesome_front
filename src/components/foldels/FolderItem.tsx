import { useNavigate } from 'react-router-dom'
import { Folder } from '../../types/folder.type'
import { Button } from '../base'

type FolderParams = {
  folder: Partial<Folder>
}

export function FolderItem({folder}: FolderParams) {

  const navigate = useNavigate()

  return (
    <Button flat={true} onClick={() => navigate(`/folders/${folder.id}`)} className='bo-primary rounded-border-md pa-lg ma-sm' style={{minWidth: "140px"}}>
      {folder.name}
    </Button>
  )
}