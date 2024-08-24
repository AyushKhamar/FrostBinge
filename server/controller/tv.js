import { fetchFromMovieDB } from "../services/tmdb.service.js";
export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromMovieDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    console.log("data from get trending tv ", data.results);
    const movie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    console.log(movie);
    res.status(200).json({ success: true, content: movie });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching the tvs" });
  }
};

export const getTvTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.status === 404) return res.status(404).send(null);
    res.status(500).json({
      success: false,
      message: "Error in fetching trailers for the tv",
    });
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.log(error);
    if (error.status === 404) return res.status(404).send(null);
    res.status(500).json({
      success: false,
      message: "Error in fetching details for the tv",
    });
  }
};
export const getSimilarTvs = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `
https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log(error);
    if (error.status === 404) return res.status(404).send(null);
    res.status(500).json({
      success: false,
      message: "Error in fetching similar tv ",
    });
  }
};
export const getTvsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `
https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log(error);
    if (error.status === 404) return res.status(404).send(null);
    res.status(500).json({
      success: false,
      message: "Error in fetching category tv ",
    });
  }
};
