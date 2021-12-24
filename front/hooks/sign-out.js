import { useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";

export function useSignOut() {
  const queryClient = useQueryClient();
  const mutation = useMutation(() =>
    fetchJson("http://localhost:3000/api/logout")
  );
  return async () => {
    await mutation.mutateAsync();
    queryClient.setQueryData("user", undefined);
  };
}
