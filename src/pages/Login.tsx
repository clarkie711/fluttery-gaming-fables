import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Vulnerable implementation (DO NOT USE IN PRODUCTION!)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vulnerable: Plain text comparison in client-side code
    if (username === "clark" && password === "password") {
      // Vulnerable: Using localStorage without encryption
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login successful!");
      navigate("/game");
    } else {
      // Vulnerable: Specific error messages
      if (username !== "clark") {
        toast.error("Invalid username!");
      } else {
        toast.error("Invalid password!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-start to-sky-end p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login to Play</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="Enter password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;