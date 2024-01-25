import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function StudentEdit(){
    
    let { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)
    const [InputErrorList, setInputErrorList] = useState({})
    const [student, setStudent] = useState({})

    useEffect(() =>{
        
        axios.get(`http://localhost:8000/api/students/${id}/edit`).then(res =>{
            setStudent(res.data.student);
            setLoading(false);
        })
        .catch(function (error){
            if(error.response.status === 404){
                alert(error.response.data.message)
                navigate('/students');
                setLoading(false);
            }
            if(error.response.status === 500){
                alert(error.response.data)
                navigate('/students');
                setLoading(false);
            }
        });

    },[id, navigate])

    const handleInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const updateStudent = (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            name:student.name,
            email:student.email,
            phone:student.phone
        }

        axios.put(`http://127.0.0.1:8000/api/students/${id}/edit`, data).then(res =>{

            alert(res.data.message);
            setLoading(false);

        })
        .catch(function (error){
            if(error.response.status === 422){
                setInputErrorList(error.response.data.errors)
                setLoading(false);
            }
            if(error.response.status === 404){
                alert(error.response.data.message)
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
                            <h4>Edit Student
                                <Link to="/students" className="btn btn-dark float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateStudent}>
                            <div className="mb-3">
                                    <label>ID</label>
                                    <input type="text" name="id" value={student.id} onChange={handleInput} className="form-control" disabled/>
                                </div>
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
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentEdit;