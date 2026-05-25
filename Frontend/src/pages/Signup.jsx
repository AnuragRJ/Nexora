import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(response.ok) {
                navigate("/login");
            } else {
                alert(data.message);
            }

        } catch(err) {
            console.log(err);
        }
    };
    return (
        <div>
            <h1>Signup</h1>

            <form onSubmit={handleSignup}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

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
                    Signup
                </button>

            </form>

            <p>
                Already have account?
                <Link to="/login"> Login</Link>
            </p>

        </div>
    );
}

export default Signup;