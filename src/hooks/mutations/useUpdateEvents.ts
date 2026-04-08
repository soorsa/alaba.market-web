import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import alabaApi from "../ApiClient";

interface Payload {
  formData: FormData;
  slug?: string;
}

export const updateEvent = async (payload: Payload): Promise<Events> => {
  const response = await alabaApi.put(
    `/dashboard/events/${payload.slug}/update/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const createEvent = async (payload: Payload): Promise<Events> => {
  const response = await alabaApi.post(`/events/`, payload.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteEvent = async (id: number): Promise<Events> => {
  const response = await alabaApi.delete(`/events/${id}/`);
  return response.data;
};

export const useUpdateEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      toast.success("Updated Events successfully!");
    },
    onError() {
      toast.error("Unable to create...try again later");
    },
  });
};
export const useCreateEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      toast.success("Created Events successfully");
    },
    onError() {
      toast.error("Unable to create...try again later");
    },
  });
};
export const useDeleteEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      toast.success("Deleted Events successfully!");
    },
    onError() {
      toast.error("Unable to delete...try again later");
    },
  });
};
