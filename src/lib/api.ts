// src/lib/api.ts
import { getToken } from "./auth";


const BASE_URL = "https://medication-management-backend-cang.onrender.com";

export const fetchMedications = async () => {
  const res = await fetch(`${BASE_URL}/api/medications`, {
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

  const res = await fetch(`${BASE_URL}/api/medications/mark-taken`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to mark medication as taken");
  }

  return res.json();
};

export const API_BASE_URL = "https://medication-management-backend-cang.onrender.com";

// existing functions like fetchMedications and markMedicationAsTaken can remain here
