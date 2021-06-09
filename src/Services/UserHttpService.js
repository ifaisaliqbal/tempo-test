import config from "../config/config.json";

const getAllUsers = () => {
  const api = fetch(config.apiUrlUsers);
  return api;
};

const getUserById = (id) => {
  const api = fetch(`${config.apiUrlUsers}/${id}`);
  return api;
};

export const UserHttpService = {
  getAllUsers,
  getUserById,
};
