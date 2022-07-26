import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchDirectoriesAsync,
  setDirectories,
} from "../../store/directories/directories.action";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionsAndDocuments } from "../../utils/firebase/firebase.utils";
import DirectoryItem from "../directory-item/directory-item.component";
import LoadingSpinner from "../loading-spinner/loading-spiner.component";

import { DirectoriesCotntainer } from "./directories.styles";
import {
  selectDirectories,
  selectDirectoriesIsLoading,
} from "../../store/directories/directories.selector";

const Directories = () => {
  const navigate = useNavigate();
  const handleNavigate = (to) => () => navigate(`/shop/${to.toLowerCase()}`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDirectoriesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const directories = useSelector(selectDirectories);
  const isLoading = useSelector(selectDirectoriesIsLoading);
  console.log(directories, isLoading);

  return (
    <DirectoriesCotntainer fullHeight={!directories.length}>
      {!isLoading ? (
        directories.map((directory) => (
          <DirectoryItem
            key={directory.id}
            title={directory.title}
            imageUrl={directory.imageUrl}
            handleNavigate={handleNavigate}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </DirectoriesCotntainer>
  );
};

export default Directories;
