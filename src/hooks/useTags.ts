import { useQuery } from "@tanstack/react-query";
import axiosClient from "../services/axios-client";

export const useTags = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axiosClient.get("/tags");
      return response.data;
    },
  });

  return {
    tags: data || [],
    isLoading,
  };
};
