import { useEffect } from "react";
import { useBooks } from "./hooks/useBooks";

const Test2 = () => {
  const { fetchBooks } = useBooks();

  useEffect(() => {
    fetchBooks();
  }, []);

  return <div>Test2</div>;
};
export default Test2;
