//Traemos los users
export const getUser = async () => {
  const pagination = 10;
  try {
    let url = `https://randomuser.me/api/?results=${pagination}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {}
};
