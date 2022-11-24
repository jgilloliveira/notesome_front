import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../../context/categories.context";
import { DivParams } from "../../types";
import { CategoryList } from "../categories/CategoryList";
import { Button } from "./Button";

export function Sidebar(props: DivParams) {
  const navigate = useNavigate()
  const {openCategoryModal, setOpenCategoryModal} = useContext(CategoriesContext)

  return (
    <div {...props} style={{minWidth: "200px"}} className={`bg-gray br-grey column justify-start ${props.className}`}>
      <Button flat={true} className="bg-transparent text-left" onClick={() => navigate('/')}>Home</Button>
      <Button flat={true} className="bg-transparent text-left" onClick={() => navigate('/favorites')}>Favoritos</Button>
      <Button flat={true} className="bg-transparent text-left" onClick={() => navigate('/deleteds')}>Eliminados</Button>
      <div>
        Categorias
        <Button className="bg-transparent bo-primary ml-sm" onClick={() => setOpenCategoryModal(true)}>+</Button>
      </div>
      <CategoryList/>
    </div>
  )
}