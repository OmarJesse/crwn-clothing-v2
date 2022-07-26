import ProductCard from "../../components/product-card/product-card.component";
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { CategoryContainer, CategoryTitle } from "./category.styles";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/loading-spinner/loading-spiner.component";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";

const Category = () => {
  const { category } = useParams();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducs] = useState(categories[category]);

  useEffect(() => {
    setProducs(categories[category.toLowerCase()]);
  }, [categories, category]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {!isLoading ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
