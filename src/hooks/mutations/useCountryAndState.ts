import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import alabaApi from "../ApiClient";

const addCountry = async (payload: { name: string }) => {
  const formData = new FormData();
  if (payload.name) {
    formData.append("name", payload.name);
  }
  const res = await alabaApi.post(`/country/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
const editCountry = async (payload: { name: string; id: number }) => {
  const formData = new FormData();
  if (payload.name) {
    formData.append("name", payload.name);
  }
  const res = await alabaApi.put(`/country/${payload.id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
const deleteCountry = async (id: number) => {
  const res = await alabaApi.delete(`/country/${id}/`);
  return res.data;
};

const addState = async (payload: { name: string; country: number }) => {
  const formData = new FormData();
  if (payload.name) {
    formData.append("name", payload.name);
  }
  if (payload.country) {
    formData.append("country", String(payload.country));
  }
  const res = await alabaApi.post(`/state/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
const editState = async (payload: {
  name: string;
  id: number;
  country?: number;
}) => {
  const formData = new FormData();
  if (payload.name) {
    formData.append("name", payload.name);
  }
  if (payload.country) {
    formData.append("country", String(payload.country));
  }
  const res = await alabaApi.put(`/state/${payload.id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
const deleteState = async (id: number) => {
  const res = await alabaApi.delete(`/state/${id}/`);
  return res.data;
};

export const useAddCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCountry,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["countries"],
      });
      toast.success("added country successfully!");
    },
    onError() {
      toast.error("Unable to create...try again later");
    },
  });
};
export const useEditCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editCountry,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["countries"],
      });
      toast.success("updated country successfully!");
    },
    onError() {
      toast.error("Unable to update...try again later");
    },
  });
};
export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["countries"],
      });
      toast.success("deleted country successfully!");
    },
    onError() {
      toast.error("Unable to delete...try again later");
    },
  });
};
export const useAddState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addState,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["states"],
      });
      toast.success("added state successfully!");
    },
    onError() {
      toast.error("Unable to create...try again later");
    },
  });
};
export const useEditState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editState,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["states"],
      });
      toast.success("updated state successfully!");
    },
    onError() {
      toast.error("Unable to update...try again later");
    },
  });
};
export const useDeleteState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteState,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["states"],
      });
      toast.success("deleted state successfully!");
    },
    onError() {
      toast.error("Unable to delete...try again later");
    },
  });
};
