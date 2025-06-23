import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryPage = () => {
  const { categoryName } = useParams();
  return (
    <div>CategoryPage</div>
  )
}

export default CategoryPage