export enum DIRECTORIES_ACTION_TYPES {
  FETCH_DIRECTORIES_START = "directories/FETCH_DIRECTORIES_START",
  FETCH_DIRECTORIES_SUCCESS = "directories/FETCH_DIRECTORIES_SUCCESS",
  FETCH_DIRECTORIES_FAILED = "directories/FETCH_DIRECTORIES_FAILED",
}

export type DirectoryItem = {
  id: number;
  title: string;
  imageUrl: string;
};

export type Directories = DirectoryItem[];
