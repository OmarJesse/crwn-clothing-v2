import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import LoadingSpinner from "../../components/loading-spinner/loading-spiner.component";

import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {!isLoading ? (
        Object.keys(categories).map((title) => (
          <CategoryPreview
            key={title}
            title={title}
            products={categories[title]}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
};
export default CategoriesPreview;
