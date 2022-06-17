import ProductCard from "../../components/product-card/product-card.component";
import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, CategoryTitle } from "./category.styles";

import LoadingSpinner from "../../components/loading-spinner/loading-spiner.component";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  const [products, setProducs] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducs(categoriesMap[category.toLowerCase()]);
  }, [categoriesMap, category]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products ? (
          products.items.map((product) => (
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
