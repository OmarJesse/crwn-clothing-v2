import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchCategoriesAsync } from "../../store/categories/categories.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
