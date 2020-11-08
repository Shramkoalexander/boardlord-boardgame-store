import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const useHistoryChange = (callback) => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(callback);

    return () => {
      unlisten();
    };
  }, [callback, history]);
};

export default useHistoryChange;
