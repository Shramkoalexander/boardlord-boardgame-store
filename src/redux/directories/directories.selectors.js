import { createSelector } from "reselect";
import { selectCollection } from "../shop/shop.selectors";
import {
  mapDirectoryItemsArrayToObject,
  mapProductsArrayToObject,
} from "./directories.utils";

export const selectDirectories = (state) => state.directories;

export const selectCategoriesDirectory = createSelector(
  [selectDirectories],
  (directories) => directories.categories
);

export const selectMainMenuDirectory = createSelector(
  [selectDirectories],
  (directories) => directories.mainMenu
);

export const selectDirectoriesForBreadcrumbs = createSelector(
  [selectDirectories, selectCollection],
  (directories, collection) => {
    const mappedCollectionItems = mapProductsArrayToObject(collection);

    const mappedDirectoryItems = mapDirectoryItemsArrayToObject([
      ...directories.mainMenu,
      ...directories.categories,
      ...directories.selections,
      ...directories.other,
    ]);

    return {
      ...mappedDirectoryItems,
      ...mappedCollectionItems,
    };
  }
);

export const selectDirectoriesForSectionTitle = createSelector(
  [selectDirectories],
  (directories) => {
    const mappedDirectoryItems = mapDirectoryItemsArrayToObject([
      ...directories.mainMenu,
      ...directories.categories,
      ...directories.selections,
      ...directories.other,
    ]);

    return mappedDirectoryItems;
  }
);
