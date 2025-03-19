const checkFields = (fields) => {
  if (
    !name ||
    !description ||
    !condition ||
    !district ||
    !category ||
    !seller
  ) {
    return console.log("All fields except image are required");
  } else {
    return true;
  }
};
