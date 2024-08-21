import axios from "axios";
export const fetchFromMovieDB = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ` + process.env.API_ACCESS_TOKEN,
    },
  };

  const response = await axios.get(url, options);
  if (response.status !== 200)
    throw new Error("Failed to fetch the data from the movie db");
  return response.data;
};
