import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function StudentCreate(){
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [InputErrorList, setInputErrorList] = useState({})
    const [student, setStudent] = useState({
        name:'',
        email:'',
        phone:''
    })

    const handleInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const addStudent = (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            name:student.name,
            email:student.email,
            phone:student.phone
        }

        axios.post('http://127.0.0.1:8000/api/students', data).then(res =>{

            alert(res.data.message);
            navigate('/students');
            setLoading(false);

        })
        .catch(function (error){
            if(error.response.status === 422){
                setInputErrorList(error.response.data.errors)
                setLoading(false);
            }
            if(error.response.status === 500){
                alert(error.response.data)
                setLoading(false);
            }
        });
    }

    if(loading){
        return(
            <Loading/>
        )
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header"> 
                            <h4>Add Student
                                <Link to="/students" className="btn btn-dark float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={addStudent}>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" value={student.name} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{InputErrorList.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="text" name="email" value={student.email} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{InputErrorList.email}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Phone</label>
                                    <input type="text" name="phone" value={student.phone} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{InputErrorList.phone}</span>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentCreate;