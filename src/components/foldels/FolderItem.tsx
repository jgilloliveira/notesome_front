import { Folder } from '../../types/folder.type'

type FolderParams = {
  folder: Partial<Folder>
}

export function FolderItem({folder}: FolderParams) {
  return (
    <div className='bo-primary rounded-border-md pa-lg ma-sm' style={{minWidth: "140px"}}>
      {folder.name}
    </div>
  )
}