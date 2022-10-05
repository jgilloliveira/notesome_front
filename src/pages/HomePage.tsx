import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../components/base";
import { FolderList } from "../components/foldels/FolderList";
import { getFolders } from "../connections/folders.connection";
import { MainLayout } from "../layouts/MainLayout";
import { Folder } from "../types/folder.type";

export function HomePage() {
  const [folders, setFolders] = useState<Folder[]>([])

  const { parentFolder } = useParams()

  useEffect(() => {
    (async () => {
      const { data, error } = await getFolders(parentFolder)
      if (!error) setFolders(data!)

    })()
  }, [parentFolder])
  


  return (
    <MainLayout>
      <Page>
        <div>
          parentFolder: {parentFolder}
        </div>
        <div>
          <FolderList list={folders} />
        </div>
      </Page>
    </MainLayout> 
  )
}