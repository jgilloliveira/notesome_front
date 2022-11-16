import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../connections/categories.connection"
import CategoriesContext from "../../context/categories.context"
import { Category } from "../../types/category.type"
import { Button } from "../base"

export function CategoryList() {
  
  //const [categories, setCategories] = useState<Category[]>([])
  const {categories, getAllCategories} = useContext(CategoriesContext);
  const navigate = useNavigate()

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <div className="column">
      { categories.map(category => 
        <Button
          key={category.id}
          flat={true}
          className="bg-transparent text-left"
          onClick={() => navigate(`/categories/${category.id}`)}
        >
          {category.name}
        </Button>)
      }
    </div>
  )
}