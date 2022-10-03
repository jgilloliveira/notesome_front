import { Folder } from "../../types/folder.type"
import { FolderItem } from "./FolderItem"

type FolderListParams = {
  list: Partial<Folder>[]
}

export function FolderList({list}: FolderListParams) {
  return (
    <div className="row wrap">
      {
        list.map(element => (
          <FolderItem key={element.id} folder={element}/>
        ))
      }
    </div>
  )
}