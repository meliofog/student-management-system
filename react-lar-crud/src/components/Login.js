import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            name:user,
            password:password
        }

        axios.post(`http://127.0.0.1:8000/api/user`, data).then(res =>{

            alert(res.data.message);
            navigate('/students');
        })
        .catch(function (error){
            if(error.response.status === 404){
                alert(error.response.data.message)
            }
        });
    }

    return(
        <div className="container text-center">
            <h1 className="mt-2 text-primary">Login:</h1>
        <form className="mt-5" onSubmit={handleLogin}>
            <div className="form-group">
                <label for="exampleInputuser1">User</label>
                <input type="user" value={user} onChange={(e) => setUser(e.target.value)} className="form-control m-2" id="exampleInputuser1" aria-describedby="userHelp" placeholder="Enter user"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control m-2" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary m-2">Login</button>
        </form>
        </div>
    )
}

export default Login;

