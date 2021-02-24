const baseurl = "https://flipcartbackend.herokuapp.com/";

export const generatePublicUrl = (fileName) => {
  return `${baseurl}/public/${fileName}`;
};
