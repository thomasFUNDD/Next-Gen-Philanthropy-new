<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class DonationController extends Controller
{
    public function donate(Request $request)
    {
        Log::info('Donation request received');

        Log::info('Donation request data', $request->all());

        $validatedData = $request->validate([
      
            'recipientcomment' => 'nullable',
            'donorcomment' => 'nullable',
            'email' => 'nullable|email',
            'amount' => 'required|numeric',
            'anonymous' => 'required|boolean',
            'charityno' => 'required',
            'payon' => 'required|date',
            'donorid' => 'nullable',
            'banksortcode' => 'required',
            'bankaccountno' => 'required',
        ]);

        $token = Session::get('token');

        $url = 'https://tvm.utauk.org:4443/api/client/distributions/pay';
        $headers = [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($validatedData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        Log::info('Donation API request', [
            'url' => $url,
            'payload' => $validatedData,
            'token' => $token,
        ]);

        Log::info('Donation API response', [
            'status' => $httpCode,
            'response' => $response,
        ]);

        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            return response()->json(['message' => 'Donation successful'], 200);
        } else {
            Log::error('Donation API request failed', [
                'url' => $url,
                'payload' => $validatedData,
                'token' => $token,
                'status' => $httpCode,
                'response' => $response,
            ]);
            return response()->json(['message' => 'Donation failed'], 500);
        }
    }
}