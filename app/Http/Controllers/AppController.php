<?php

// app/Http/Controllers/AppController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
    public function index()
    {
        return view('app'); // The 'app' view should be your main React entry point
    }
}