import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

      try {

    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );


            const data = await response.json();

            if(response.ok) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                navigate("/");

            } else {
                alert(data.message);
            }

        } catch(err) {
            console.log(err);
        }
    };
     return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>
                Don't have account?
                <Link to="/signup"> Signup</Link>
            </p>

        </div>
    );
}

export default Login;