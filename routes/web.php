<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Statement\StatementController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\SendEmailsController;
use App\Http\Controllers\TransactionReceiptController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UnusedVouchersController;

// API routes
Route::prefix('api')->group(function () {
    Route::get('/getDashboardData', [DashboardController::class, 'getDashboardData']);
    Route::post('/fetchStatements', [StatementController::class, 'fetchStatement']);
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/checkIsLogin', [LoginController::class, 'checkIsLogin']);
    Route::get('/transactions', [TransactionsController::class, 'getTransactions']);
    Route::post('/make-email', [SendEmailsController::class, 'makeEmail']);
    Route::post('/create-receipt', [TransactionReceiptController::class, 'createTransactionReceipt']);
        // Add the new routes for changing password and email
        Route::put('/change-password', [ProfileController::class, 'changePassword']);
        Route::put('/change-email', [ProfileController::class, 'changeEmail']);

        Route::get('/unused-vouchers', [UnusedVouchersController::class, 'getUnusedVouchers']);

});

// Catch-all route to serve the React application
Route::get('/{path?}', [AppController::class, 'index'])->where('path', '.*');