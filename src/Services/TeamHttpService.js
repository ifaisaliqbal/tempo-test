import config from "../config/config.json";

const getAllTeams = () => {
  return fetch(config.apiUrlTeams);
};

const getTeamById = (id) => {
  return fetch(`${config.apiUrlTeams}/${id}`);
};

export const TeamHttpService = {
  getAllTeams,
  getTeamById,
};
