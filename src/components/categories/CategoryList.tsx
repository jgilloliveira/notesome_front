import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../connections/categories.connection"
import { Category } from "../../types/category.type"
import { Button } from "../base"

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data, error } = await getCategories()

      if(!error && data) setCategories(data)
    })()

  }, [])

  return (
    <div className="column">
      { categories.map(category => 
        <Button
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