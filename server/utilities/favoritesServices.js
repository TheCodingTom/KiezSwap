const updateOperatorSelection = (favourites, listingId) => {
  const isFav = favourites.includes(listingId) ? true : false;
  const operatorToUse = isFav ? "$pull" : "$push";
  return operatorToUse;
};

export { updateOperatorSelection };
