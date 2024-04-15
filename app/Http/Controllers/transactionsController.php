<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Use the Log facade
use Illuminate\Support\Facades\Response;


class TransactionsController extends Controller
{
    public function getTransactions(Request $request)
    {
        $accountno = $request->input('accountno', '146'); // Default to '146' if not provided
        $processedValue = $request->input('processed');
        $token = Session::get('token');
    
        Log::info("Fetching transactions and donations", ['accountno' => $accountno, 'processedValue' => $processedValue]); // Log the input values
    
        // Make the API calls to fetch the transactions and donations data
        $transactionsResponse = $this->fetchTransactions($token);
        $donationsResponse = $this->fetchDonations($token);
    
        // Log the responses and their HTTP status codes
        Log::info("Transactions fetched", ['transactions' => $transactionsResponse['data'], 'status_code' => $transactionsResponse['status_code']]);
        Log::info("Donations fetched", ['donations' => $donationsResponse['data'], 'status_code' => $donationsResponse['status_code']]);
    
        // Return the API responses as JSON
        return response()->json([
            'transactions' => $transactionsResponse['data'],
            'donations' => $donationsResponse['data'],
        ]);
    }

    private function fetchTransactions($token)
    {
        $url = 'https://api.utauk.org:4443/api/webdata/nvts?accountno=146&processed=all';
    
        // Initialize a cURL session
        $curl = curl_init($url);
    
        // Set options for the cURL request
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPGET, true);
    
        // Execute the cURL session and get the response
        $response = curl_exec($curl);
    
        // Check for errors in the cURL session
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            // Optionally log or display the error message
            // Log::error("fetchTransactions error", ['error' => $error_msg]);
            throw new \Exception("fetchTransactions error: " . $error_msg);
        }
    
        // Get the HTTP status code
        $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    
        // Close the cURL session
        curl_close($curl);
    
        // Decode the JSON response into an array
        $responseData = json_decode($response, true);
    
        // Log the request URL, response, and HTTP status code
        Log::debug("fetchTransactions response", ['url' => $url, 'response' => $responseData, 'status_code' => $statusCode]);
    
        // Include the status code in the return value
        return [
            'data' => $responseData,
            'status_code' => $statusCode
        ];
    }


    private function fetchDonations($token)
    {
        $url = 'https://api.utauk.org:4443/api/client/donations';
    
        // Initialize a cURL session
        $curl = curl_init($url);
    
        // Set options for the cURL request
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer $token",
        ]);
    
        // Execute the cURL session and get the response
        $response = curl_exec($curl);
    
        // Check for errors in the cURL session
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            // Optionally log or display the error message
            // Log::error("fetchDonations error", ['error' => $error_msg]);
            throw new \Exception("fetchDonations error: " . $error_msg);
        }
    
        // Get the HTTP status code
        $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    
        // Close the cURL session
        curl_close($curl);
    
        // Decode the JSON response into an array
        $responseData = json_decode($response, true);
    
        // Log the request URL, response, and HTTP status code
        Log::debug("fetchDonations response", ['url' => $url, 'response' => $responseData, 'status_code' => $statusCode]);
    
        // Include the status code in the return value
        return [
            'data' => $responseData,
            'status_code' => $statusCode
        ];
    }
}