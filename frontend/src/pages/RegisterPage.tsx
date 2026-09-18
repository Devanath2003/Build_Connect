import { useState } from "react";
import axios from "axios";
import api from "../api/axios";

type Role = "CLIENT" | "PROFESSIONAL";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

type RegisterResponse = {
  id: string;
  email: string;
  role: Role;
  name?: string | null;
};

function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    role: "CLIENT",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post<RegisterResponse>(
        "/auth/register",
        formData
      );

      console.log("Registered user:", response.data);

      setMessage("Registration successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "CLIENT",
      });
    } catch (error) {
      console.error("Registration error:", error);

      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.detail || "Registration failed."
        );
      } else {
        setMessage("Something unexpected happened.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="role">Role</label>

          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="CLIENT">Client</option>
            <option value="PROFESSIONAL">Professional</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}

export default RegisterPage;