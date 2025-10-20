import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../zustand/ToastStore";
import alabaApi from "../ApiClient";
import type { Events } from "../querys/useEventsandTags";

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
  const response = await alabaApi.put(
    `/dashboard/events/create/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const useUpdateEvents = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      showToast("Updated Events successfully!", "success");
    },
    onError() {
      showToast("Unable to create...try again later", "error");
    },
  });
};
export const useCreateEvents = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      showToast("Created Events successfully!", "success");
    },
    onError() {
      showToast("Unable to create...try again later", "error");
    },
  });
};
