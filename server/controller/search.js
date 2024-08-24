import { User } from "../models/user.js";
import { fetchFromMovieDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0)
      res.status(404).json({ success: false, message: "No such person found" });
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in searching person" });
  }
};
export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    console.log(data);
    if (data.results.length === 0)
      res.status(404).json({ success: false, message: "No such movie found" });
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in searching movie" });
  }
};
export const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0)
      res.status(404).json({ success: false, message: "No such tv found" });
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in searching tv" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error in getting search history" });
  }
};
export const deleteSearchHistory = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { searchHistory: { id: parseInt(id) } },
      },
      false,
      true
    );
    res.status(200).json({ success: true, content: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error in delete history controller",
    });
  }
};
