import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axiosClient from "./services/axios-client";

const Test1 = () => {
  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axiosClient.get("/books");
      return response.data;
    },
  });

  useEffect(() => {}, []);

  return (
    <div>
      Test 1 <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
export default Test1;
