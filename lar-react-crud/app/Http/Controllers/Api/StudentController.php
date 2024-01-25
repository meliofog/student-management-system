<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();
        if($students->count() > 0){
            $data = [
                'status' => 200,
                'students' => $students
            ];
            return response()->json($data, 200);
        }else{
            $data = [
                'status' => 404,
                'students' => 'No Records Found'
            ];
            return response()->json($data, 200);
        }
        
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'phone' => 'required|digits:10'
        ]);

        if($validator->fails()){
            $data = [
                'status' => 422,
                'errors' => $validator->messages()
            ];
            return response()->json($data, 422);
        }else{
            $data = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ];
            $student = Student::create($data);

            if($student){
                $data = [
                    'status' => 200,
                    'message' => "Student Created Successfully"
                ];
                return response()->json($data, 200);
            }else{
                $data = [
                    'status' => 500,
                    'message' => "Something Went Wrong"
                ];
                return response()->json($data, 500);
            }
        }
    }

    public function show($id)
    {
        $student = Student::find($id);
        
        if($student){
            $data = [
                'status' => 200,
                'student' => $student
            ];
            return response()->json($data, 200);
        }else{
            $data = [
                'status' => 404,
                'message' => "No Such Student Found!"
            ];
            return response()->json($data, 404);
        }
    }
    public function edit($id)
    {
        $student = Student::find($id);
        
        if($student){
            $data = [
                'status' => 200,
                'student' => $student
            ];
            return response()->json($data, 200);
        }else{
            $data = [
                'status' => 404,
                'message' => "No Such Student Found!"
            ];
            return response()->json($data, 404);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'phone' => 'required|digits:10'
        ]);

        if($validator->fails()){
            $data = [
                'status' => 422,
                'errors' => $validator->messages()
            ];
            return response()->json($data, 422);
        }else{
            $data = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ];
            $student = Student::find($id);

            if($student){
                $student->update($data);

                $data = [
                    'status' => 200,
                    'message' => "Student Updated Successfully"
                ];
                return response()->json($data, 200);
            }else{
                $data = [
                    'status' => 404,
                    'message' => "No Such Student Found!"
                ];
                return response()->json($data, 404);
            }
        }
    }
    public function destroy($id)
    {
        $student = Student::find($id);

        if($student){
            $student->delete();

            $data = [
                'status' => 200,
                'message' => "Student Deleted Successfully"
            ];
            return response()->json($data, 200);
        }else{
            $data = [
                'status' => 404,
                'message' => "No Such Student Found!"
            ];
            return response()->json($data, 404);
        }
    }
}
