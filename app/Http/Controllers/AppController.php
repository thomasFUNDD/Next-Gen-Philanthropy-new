<?php

// app/Http/Controllers/AppController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AppController extends Controller
{
    public function index()
    {
        $view = 'BAT';
        Log::info("Returning view: $view");
        return view($view);
    }
}