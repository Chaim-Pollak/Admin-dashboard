// it's not used in any code
import { useState, useEffect } from "react";
import axios from "axios";
import { ActionContext } from "../contexts/ActionContext";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { toggleRequest } = useContext(ActionContext);

  async function getRequest() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(url);

      if (data.success) {
        console.log(data);
        setData(data.data);
      }
    } catch (error) {
      console.log(error);
      const err = error.response.data.error;
      setIsError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getRequest();
  }, [toggleRequest]);

  return [data, isLoading, isError];
};

export default useFetch;
