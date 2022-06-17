// Separating staging data getCollectionPath from prod data
export const getCollectionPath = () => {
  let path = "currentActiveUsersStaging";
  if (process.env.NODE_ENV === "production") {
    path = "currentActiveUsers";
  }

  return path;
};
