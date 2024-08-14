export const formatIdentificationNumber = (number) => {
  return number.replace(/(\d{3})(\d{7})(\d{1})/, "$1-$2-$3");
};

export const formatPhoneNumber = (number) => {
  return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};

export const formatToShortDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
