<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function login(Request $request){
        $user = User::find($id);
        if($user){
            $student->update($data);

            $data = [
                'status' => 200,
                'message' => "Login Successful"
            ];
            return response()->json($data, 200);
        }else{
            $data = [
                'status' => 404,
                'message' => "Incorrect username or password!"
            ];
            return response()->json($data, 404);
        }
    }
}
