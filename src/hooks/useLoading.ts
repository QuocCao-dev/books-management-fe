import { useState } from "react";

type UseLoadingReturnType = [
  boolean,
  { showLoading: () => void; hideLoading: () => void }
];

export function useLoading(): UseLoadingReturnType {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return [loading, { showLoading, hideLoading }];
}
