<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UnusedVouchersController extends Controller
{
    public function getUnusedVouchers(Request $request)
    {
        $token = $request->session()->get('token');

        if (!$token) {
            Log::error('Token not found in session');
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $apiUrl = env('API_BASE_URL') . 'client/vouchers/unused';
        Log::info('API URL:', ['url' => $apiUrl]);

        try {
            $ch = curl_init($apiUrl);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $token,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

            Log::info('API response', [
                'url' => $apiUrl,
                'status' => $httpCode,
                'response' => $response,
            ]);

            curl_close($ch);

            if ($response === false) {
                $error = curl_error($ch);
                Log::error('CURL error during API request', [
                    'url' => $apiUrl,
                    'error' => $error,
                ]);
                return response()->json(['message' => 'Internal Server Error'], 500);
            } elseif ($httpCode >= 200 && $httpCode < 300) {
                if (json_decode($response) !== null) {
                    Log::info('Unused vouchers fetched successfully');
                    return response()->json(json_decode($response, true));
                } else {
                    Log::error('Invalid JSON response', [
                        'url' => $apiUrl,
                        'response' => $response,
                    ]);
                    return response()->json(['message' => 'Internal Server Error'], 500);
                }
            } else {
                Log::error('API request failed', [
                    'url' => $apiUrl,
                    'status' => $httpCode,
                    'response' => $response,
                ]);
                return response()->json(['message' => 'Internal Server Error'], 500);
            }
        } catch (\Exception $e) {
            Log::error('Error fetching unused vouchers: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
}