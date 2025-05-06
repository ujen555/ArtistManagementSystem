import { useMutation } from "@tanstack/react-query";
import { exportArtistsCSV } from "../api/artistsService";
import { toast } from "react-toastify";

export const useExportArtists = () =>
    useMutation({
        mutationFn: exportArtistsCSV,
        onSuccess: (data) => {
          const blob = new Blob([data], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "artists.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
          toast.success("Artists exported successfully");
        },
        onError: () => {
          toast.error("Failed to export artists");
    },
});