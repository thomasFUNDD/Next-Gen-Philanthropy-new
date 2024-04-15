<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
class StatementController extends Controller
{
    
    public function getStatements(Request $request)
    {

        dd('Route reached');
        Log::info('Fetching statements');

        // Add your logic to fetch statements here

        return response()->json(['message' => 'Statements fetched successfully'], 200);
    }
}
