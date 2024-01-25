import {Routes,Route} from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Student from '../pages/Student';
import StudentCreate from '../pages/StudentCreate';
import StudentEdit from '../pages/StudentEdit';
import Login from '../components/Login';

function MyRouter(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/students" element={<Student/>}/>
            <Route path="/students/create" element={<StudentCreate/>}/>
            <Route path="/students/:id/edit" element={<StudentEdit/>}/>
        </Routes>
    )
}

export default MyRouter;