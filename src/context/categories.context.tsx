import { createContext, useState } from "react";
import { getCategories } from "../connections/categories.connection";
import { Category } from "../types/category.type";

type CategoriesContextType = {
  categories: Category[],
  getAllCategories: () => void,
  openCategoryModal: boolean,
  setOpenCategoryModal: (open: boolean) => void,
}

type CategoriesProviderParams = {
  children: JSX.Element
}

const INITIAL_CATEGORIES = {
  categories: [],
  getAllCategories: () => {},
  openCategoryModal: false,
  setOpenCategoryModal: () => {},
}

const CategoriesContext = createContext<CategoriesContextType>(INITIAL_CATEGORIES);

function CategoriesProvider({children}: CategoriesProviderParams) {
  const [categories, setCategories] = useState<Category[]>([])
  const [openCategoryModal, setOpenCategoryModal] = useState(false)

  async function getAllCategories() {
    const { data, error } = await getCategories()

    if(!error && data) setCategories(data)
  }

  const data = {categories, getAllCategories, openCategoryModal, setOpenCategoryModal};

  return(
    <CategoriesContext.Provider value={data}>
      {children}
    </CategoriesContext.Provider>
  )
}

export {CategoriesProvider};
export default CategoriesContext;