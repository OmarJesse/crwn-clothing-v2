import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCollectionsAndDocuments } from "../../utils/firebase/firebase.utils";
import DirectoryItem from "../directory-item/directory-item.component";
import LoadingSpinner from "../loading-spinner/loading-spiner.component";

import { DirectoriesCotntainer } from "./directories.styles";

const Directories = () => {
  const navigate = useNavigate();
  const handleNavigate = (to) => () => navigate(`/shop/${to.toLowerCase()}`);

  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    const getDirectoriesMap = async () => {
      const directoryMap = await getCollectionsAndDocuments("directories");
      const sortedDirectoryMap = Object.values(directoryMap).sort(
        (a, b) => a.id - b.id
      );
      setDirectories(sortedDirectoryMap);
    };

    getDirectoriesMap();
  }, []);

  return (
    <DirectoriesCotntainer fullHeight={!directories.length}>
      {directories.length ? (
        directories.map((directory) => (
          <DirectoryItem
            key={directory.id}
            title={directory.title}
            imageUrl={directory.imageUrl}
            handleNavigate={handleNavigate}
          />
        ))
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </DirectoriesCotntainer>
  );
};

export default Directories;
