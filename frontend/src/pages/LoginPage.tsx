import { useState } from "react";
import axios from "axios";
import api from "../api/axios";
import useAuthStore from "../store/authStore";

type LoginResponse = {
  access_token: string;
  token_type: string;
};

type User = {
  id: string;
  email: string;
  role: "CLIENT" | "PROFESSIONAL";
  name?: string | null;
};

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const login = useAuthStore((state) => state.login);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
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
      const loginData = new URLSearchParams();

      loginData.append("username", formData.email);
      loginData.append("password", formData.password);

      const response = await api.post<LoginResponse>(
        "/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Login response:", response.data);

      const token = response.data.access_token;

      login(token);

      setMessage("Login successful!");
    } catch (error) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.detail || "Login failed."
        );
      } else {
        setMessage("Something unexpected happened.");
      }
    } finally {
      setLoading(false);
    }
  };

  const setUser = useAuthStore((state) => state.setUser);

  const getCurrentUser = async () => {
    try{
      const response = await api.get<User>("/users/me");

      console.log("Current user:", response.data);

      setUser(response.data);
    } catch (error) {
      console.error("Could not fetch user:", error);
    }
  };
  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p>{message}</p>}

      
    </main>
  );
}

export default LoginPage;