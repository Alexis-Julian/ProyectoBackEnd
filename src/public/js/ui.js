export const HandleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target["title"].value);
};
