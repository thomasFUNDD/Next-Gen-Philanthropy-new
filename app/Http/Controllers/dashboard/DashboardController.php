<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class DashboardController extends Controller
{
    public function getDashboardData(Request $request)
    {
        $token = Session::get('token');
        Log::info('Tsdfsdfsdfsdata', ['token' => $token]);
        Log::info('Tsdfsdfsdfsdata', ['token' => $token]);
        Log::info('Tsdfsdfsdfsdata', ['token' => $token]);

        $baseUrl = 'https://api.utauk.org:4443/api';

        Log::info('URL', ['url' => $baseUrl]);
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
            '/client/accounts/transactions/filtered?count=15000&type=all'
        ];

        $mh = curl_multi_init();
        $curlHandles = [];

        foreach ($endpoints as $endpoint) {
            $url = $baseUrl . $endpoint;
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_multi_add_handle($mh, $ch);
            $curlHandles[$url] = $ch;
        }

        $running = null;
        do {
            curl_multi_exec($mh, $running);
        } while ($running);

        $data = [];
        foreach ($curlHandles as $url => $ch) {
            $response = curl_multi_getcontent($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

            Log::info('API response', [
                'url' => $url,
                'status' => $httpCode,
                'response' => $response,
            ]);

            if ($response === false) {
                $error = curl_error($ch);
                Log::error('CURL error during API request', [
                    'url' => $url,
                    'error' => $error,
                ]);
                $data[ltrim(parse_url($url, PHP_URL_PATH), '/')] = ['error' => 'CURL error: ' . $error];
            } elseif ($httpCode >= 200 && $httpCode < 300) {
                if (json_decode($response) !== null) {
                    $data[ltrim(parse_url($url, PHP_URL_PATH), '/')] = json_decode($response, true);

                    // Store the charities data in the session
                    if (strpos($url, '/client/distributions/charities') !== false) {
                        Session::put('charities_data', json_decode($response, true));
                    }
                } else {
                    Log::error('Invalid JSON response', [
                        'url' => $url,
                        'response' => $response,
                    ]);
                    $data[ltrim(parse_url($url, PHP_URL_PATH), '/')] = ['error' => 'Invalid JSON response'];
                }
            } else {
                Log::error('API request failed', [
                    'url' => $url,
                    'status' => $httpCode,
                    'response' => $response,
                ]);
                $data[ltrim(parse_url($url, PHP_URL_PATH), '/')] = ['error' => 'API request failed with status code: ' . $httpCode];
            }

            curl_multi_remove_handle($mh, $ch);
            curl_close($ch);
        }

        curl_multi_close($mh);

        Log::info('Processed data', ['data' => $data]);

        return response()->json($data);
    }
}