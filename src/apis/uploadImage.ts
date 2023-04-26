import axios from "axios";

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  return axios.post("/api/upload-image", formData);
}
