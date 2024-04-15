<?php

namespace App\Http\Controllers\Statement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class StatementController extends Controller
{
    public function getDashboardData(Request $request)
    {
        $token = Session::get('token');
        Log::info('Token retrieved from session for general account data', ['token' => $token]);
    
        $baseUrl = 'https://api.utauk.org:4443/api';
    
        $headers = [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
        ];
    
        $endpoints = [
            '/client/accounts/general',
            '/client/accounts/balances',
            '/client/distributions/nvts',
            '/client/statements',
            '/client/distributions/charities',
            '/client/vouchers/unused',
            '/webdata/standingorders/unprocessed',
            '/client/accounts/transactions/filtered?count=15000&type=all',
        ];
    
        // Initialize multi handle
        $mh = curl_multi_init();
    
        $curlArray = [];
        foreach ($endpoints as $i => $endpoint) {
            $url = $baseUrl . $endpoint;
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
            curl_multi_add_handle($mh, $ch);
            $curlArray[$url] = $ch;
        }
    
        // Execute all queries simultaneously, and continue when all are complete
        $running = null;
        do {
            curl_multi_exec($mh, $running);
        } while ($running);
    
        // Collect the responses and remove the handles
        $data = [];
        foreach ($curlArray as $url => $ch) {
            $response = curl_multi_getcontent($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
            if ($response === false) {
                $error = curl_error($ch);
                Log::error('CURL error during API request', [
                    'url' => $url,
                    'error' => $error,
                ]);
                $data[ltrim(parse_url($url, PHP_URL_PATH), '/')] = ['error' => 'CURL error: ' . $error];
            } elseif ($httpCode >= 200 && $httpCode < 300) {
                $data[ltrim(parse_url($url, PHP_URL_PATH), '/')] = json_decode($response, true);
            } else {
                Log::error('API request failed', [
                    'url' => $url,
                    'status' => $httpCode,
                    'response' => $response,
                ]);
                $data[ltrim(parse_url($url, PHP_URL_PATH), '/')] = ['error' => 'An error occurred during the request. HTTP Code: ' . $httpCode];
            }
    
            curl_multi_remove_handle($mh, $ch);
            curl_close($ch);
        }
    
        curl_multi_close($mh);
    
        return response()->json($data);
    }

    public function fetchStatement(Request $request)
    {
        $token = Session::get('token');
        Log::info('Token retrieved from session for fetching statement', ['token' => $token]);

        $baseUrl = 'https://api.utauk.org:4443/api';
        $endpoint = '/client/statements/' . $request->input('pageNumber');

        $headers = [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
        ];

        $ch = curl_init($baseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($response === false) {
            $error = curl_error($ch);
            Log::error('CURL error during API request', [
                'url' => $baseUrl . $endpoint,
                'error' => $error,
            ]);
            return response()->json(['error' => 'CURL error: ' . $error], 500);
        } elseif ($httpCode >= 200 && $httpCode < 300) {
            // Assuming the response is the raw PDF content
            return response($response)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'attachment; filename="statement.pdf"');
        } else {
            Log::error('API request failed', [
                'url' => $baseUrl . $endpoint,
                'status' => $httpCode,
                'response' => $response,
            ]);
            return response()->json(['error' => 'An error occurred during the request. HTTP Code: ' . $httpCode], $httpCode);
        }

        curl_close($ch);
    }
}
