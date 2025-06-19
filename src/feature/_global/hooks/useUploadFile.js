import { useState } from "react";
import axios from "axios";

const useUploadFile = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Upload file to a dynamic endpoint with a dynamic key
   * @param {string} endpoint - The API endpoint for file upload
   * @param {File} file - The file to be uploaded
   * @param {string} fileKey - The key name for the file in the FormData
   * @returns {Promise<void>}
   */
  const uploadFile = async (endpoint, file, fileKey) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append(fileKey, file);

      const res = await axios.post(import.meta.env.VITE_BACKEND + endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadFile, response, error, isLoading };
};

export default useUploadFile;
