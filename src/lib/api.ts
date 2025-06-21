// src/lib/api.ts
import { getToken } from "./auth";


export const fetchMedications = async () => {
  const res = await fetch("http://localhost:5000/api/medications", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch medications");
  }

  return res.json();
};

export const markMedicationAsTaken = async (
  medId: number,
  date: string,
  imageFile?: File
) => {
  const formData = new FormData();
  formData.append("medId", medId.toString());
  formData.append("date", date);
  if (imageFile) {
    formData.append("proof", imageFile);
  }

  const res = await fetch("http://localhost:5000/api/medications/mark-taken", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData, // no Content-Type; browser sets it automatically
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to mark medication as taken");
  }

  return res.json();
};
