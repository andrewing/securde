export const isMongooseId = id => {
  const regex = /^[a-f\d]{24}$/i;
  return regex.test(id);
};
