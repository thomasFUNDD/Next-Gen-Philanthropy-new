<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Statement\StatementController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\SendEmailsController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\transactionReceiptController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/getDashboardData', [DashboardController::class, 'getDashboardData']);
Route::post('/fetchStatements', [StatementController::class, 'fetchStatement']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/checkIsLogin', [LoginController::class, 'checkIsLogin']);

Route::get('/api/transactions', [TransactionsController::class, 'getTransactions']);
// Add this line within the Route group in web.php
Route::get('/{any}', [AppController::class, 'index'])->where('any', '.*');
Route::post('/make-email', [SendEmailsController::class, 'makeEmail']);

Route::post('/create-receipt',[transactionReceiptController::class,'createTransactionReceipt']);
