<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'jwtusername' => 'required',
            'jwtpassword' => 'required',
        ]);
    
        $hardCodedUrl = "https://tvm.utauk.org:4443/api/login";
        
        Log::info('Making POST request to login endpoint');
        Log::info('Hardcoded URL:', [$hardCodedUrl]);
        Log::info('Request data:', $credentials);
    
        $response = Http::post($hardCodedUrl, [
            'jwtusername' => $request->jwtusername,
            'jwtpassword' => $request->jwtpassword,
        ]);
    
        Log::info('Response status code:', [$response->status()]);
        Log::info('Response body:', [$response->body()]);
    
        if ($response->successful()) {
            $token = $response->json()['token'];
            // Store token and current time
            $request->session()->put('token', $token);
            $request->session()->put('token_time', now());
            Log::info('User logged in successfully');
            Log::info('Session data:', $request->session()->all());
            return $response->json();
        } else {
            Log::error('Invalid credentials');
            Log::error('Response status code:', [$response->status()]);
            Log::error('Response body:', [$response->body()]);
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

    public function checkIsLogin(Request $request)
    {
        Log::info('Checking login status');
        Log::info('Session data:', $request->session()->all());

        if ($request->session()->has('token')) {
            $tokenTime = $request->session()->get('token_time');
            $currentTime = now();
            // Calculate the difference in minutes
            $diffInMinutes = $tokenTime->diffInMinutes($currentTime);
            // Check if the token is older than 15 minutes
            if ($diffInMinutes > 15) {
                // Token is older than 15 minutes, clear it from the session
                $request->session()->forget(['token', 'token_time']);
                Log::info('Session expired');
                // Return a response indicating the session has expired
                return response()->json(['message' => 'Session expired, please login again'], 401);
            }
            Log::info('User is logged in');
            return response()->json(['message' => 'User is logged in'], 200);
        }

        Log::info('User is not logged in');
        // If no token is found in the session or it's expired, return a response indicating user is not logged in
        return response()->json(['message' => 'User is not logged in'], 401);
    }
}