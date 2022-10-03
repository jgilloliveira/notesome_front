import { useEffect, useState } from "react";
import { Page } from "../components/base";
import { FolderList } from "../components/foldels/FolderList";
import { getFolders } from "../connections/folders.connection";
import { MainLayout } from "../layouts/MainLayout";
import { Folder } from "../types/folder.type";

export function HomePage() {
  const [folders, setFolders] = useState<Folder[]>([])
  useEffect(() => {
    (async () => {
      const { data, error } = await getFolders()
      if (!error) setFolders(data!)

    })()
  }, [])
  


  return (
    <MainLayout>
      <Page>
        <div>
          <FolderList list={folders} />
        </div>
      </Page>
    </MainLayout> 
  )
}