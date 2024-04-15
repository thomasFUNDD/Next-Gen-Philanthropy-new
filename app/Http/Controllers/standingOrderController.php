<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class StandingOrderController extends Controller
{
    public function getStandingOrders(Request $request)
    {
        $token = $request->bearerToken(); // Assuming the token is passed as a bearer token

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->get(env('API_URL') . '/webdata/standingorders/unprocessed');

        if ($response->status() == 401) {
            // Handle unauthorized access
            return response()->json(['message' => 'Unauthorized'], 401);
        } elseif ($response->status() == 500) {
            // Handle internal server error
            return response()->json(['message' => 'Internal Server Error'], 500);
        } else {
            $responseData = $response->json();
            // Process the response data as needed
            // ...

            return response()->json($responseData);
        }
    }

    public function getCharities(Request $request)
    {
        // Retrieve the charities data from the session
        $charitiesData = Session::get('charities_data');

        if ($charitiesData) {
            return response()->json($charitiesData);
        } else {
            // Handle the case when charities data is not available in the session
            return response()->json(['message' => 'Charities data not found'], 404);
        }
    }
}