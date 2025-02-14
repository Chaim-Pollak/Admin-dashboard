import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "../../lib/index";

const useSuggestions = (url) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestion = async (source) => {
    try {
      if (searchInput) {
        const { data } = await axios.get(
          `/${url}/autocomplete?query=${searchInput}`,
          {
            cancelToken: source.token,
          }
        );
        setSuggestions(data.data);
      } else setSuggestions([]);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Error fetching suggestions:", error);
      }
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const processChange = debounce(() => getSuggestion(source));
    processChange();

    return () => {
      source.cancel("operation cancelled by the user.");
    };
  }, [searchInput]);

  return [suggestions, setSearchInput];
};

export default useSuggestions;
