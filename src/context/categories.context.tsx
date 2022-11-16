import { createContext, useState } from "react";
import { getCategories } from "../connections/categories.connection";
import { Category } from "../types/category.type";

type CategoriesContextType = {
  categories: Category[],
  getAllCategories: () => void 
}

type CategoriesProviderParams = {
  children: JSX.Element
}

const INITIAL_CATEGORIES = {
  categories: [],
  getAllCategories: () => {}
}

const CategoriesContext = createContext<CategoriesContextType>(INITIAL_CATEGORIES);

function CategoriesProvider({children}: CategoriesProviderParams) {
  const [categories, setCategories] = useState<Category[]>([])

  async function getAllCategories() {
    const { data, error } = await getCategories()

    if(!error && data) setCategories(data)
  }

  const data = {categories, getAllCategories};

  return(
    <CategoriesContext.Provider value={data}>
      {children}
    </CategoriesContext.Provider>
  )
}

export {CategoriesProvider};
export default CategoriesContext;