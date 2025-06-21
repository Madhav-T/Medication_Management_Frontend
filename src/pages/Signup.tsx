import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken, getUserRole } from "../lib/auth";
import { API_BASE_URL } from "../lib/api";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "patient",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      saveToken(data.token);
      const role = getUserRole();

      if (role === "patient") navigate("/patient-dashboard");
      else if (role === "caretaker") navigate("/caretaker-dashboard");
      else navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold">Create Account</h2>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
        className="w-full p-2 border"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full p-2 border"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full p-2 border"
      >
        <option value="patient">Patient</option>
        <option value="caretaker">Caretaker</option>
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Sign Up
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default Signup;
