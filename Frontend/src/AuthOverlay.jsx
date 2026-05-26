import { useState } from "react";
import "./AuthOverlay.css";

function AuthOverlay() {

    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const url = isLogin
        ? "import.meta.env.VITE_BACKEND_URL/api/auth/login"
        : "import.meta.env.VITE_BACKEND_URL/api/auth/signup";

        const body = isLogin
        ? { email, password }
        : { username, email, password };

        try {

            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            });

            const data = await response.json();

            if(response.ok){

                if(isLogin){

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );

                    window.location.reload();

                }else{

                    alert("Signup successful");

                    setIsLogin(true);
                }

            }else{
                alert(data.message);
            }

        } catch(err){
            console.log(err);
        }
    };

    return (

        <div className="auth-overlay">

            <div className="auth-box">

                <h1>
                    {
                        isLogin
                        ? "Welcome back"
                        : "Create account"
                    }
                </h1>

                <p>
                    Continue to Nexora
                </p>

                <form onSubmit={handleSubmit}>

                    {

                        !isLogin &&

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />

                    }

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

                        {
                            isLogin
                            ? "Log in"
                            : "Sign up"
                        }

                    </button>

                </form>

                <p className="switch-text">

                    {

                        isLogin
                        ? "Don't have account?"
                        : "Already have account?"

                    }

                    <span
                        onClick={()=>setIsLogin(!isLogin)}
                    >

                        {

                            isLogin
                            ? " Sign up"
                            : " Login"

                        }

                    </span>

                </p>

            </div>

        </div>
    );
}

export default AuthOverlay;