<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class ProfileController extends Controller
{
    public function changePassword(Request $request)
    {
        $token = Session::get('token');
        $oldPassword = $request->input('old_password');
        $newPassword = $request->input('new_password');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Content-Type' => 'application/json',
        ])->put(env('API_URL') . '/client/accounts/password', [
            'old_password' => $oldPassword,
            'new_password' => $newPassword,
        ]);

        Log::info('Change password response', [
            'status' => $response->status(),
            'body' => $response->body(),
        ]);

        if ($response->successful()) {
            return response()->json(['message' => 'Password changed successfully']);
        } else {
            return response()->json(['error' => 'Failed to change password'], $response->status());
        }
    }

    public function changeEmail(Request $request)
    {
        $token = Session::get('token');
        $oldEmail = $request->input('old_email');
        $newEmail = $request->input('new_email');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Content-Type' => 'application/json',
        ])->put(env('API_URL') . '/client/accounts/email', [
            'old_email' => $oldEmail,
            'new_email' => $newEmail,
        ]);

        Log::info('Change email response', [
            'status' => $response->status(),
            'body' => $response->body(),
        ]);

        if ($response->successful()) {
            return response()->json(['message' => 'Email changed successfully']);
        } else {
            return response()->json(['error' => 'Failed to change email'], $response->status());
        }
    }
}