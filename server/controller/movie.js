import { fetchFromMovieDB } from "../services/tmdb.service.js";
export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromMovieDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const movie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    console.log(movie);
    res.status(200).json({ success: true, content: movie });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching the movies" });
  }
};

export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.status === 404) return res.status(404).send(null);
    res.status(500).json({
      success: false,
      message: "Error in fetching trailers for the movie",
    });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.log(error);
    if (error.status === 404) return res.status(404).send(null);
    res.status(500).json({
      success: false,
      message: "Error in fetching details for the movie",
    });
  }
};
export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `
https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log(error);
    if (error.status === 404) return res.status(404).send(null);
    res.status(500).json({
      success: false,
      message: "Error in fetching similar movies ",
    });
  }
};
export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `
https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log(error);
    if (error.status === 404) return res.status(404).send(null);
    res.status(500).json({
      success: false,
      message: "Error in fetching category movies ",
    });
  }
};
