<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use FPDF;

class transactionReceiptController extends Controller
{
    public function createTransactionReceipt(Request $request)
    {
        $transaction = $request->input('transaction');
        Log::info('Creating receipt for transaction ID', ['transactionId' => $transaction['id']]);

        $pdf = new FPDF();
        $pdf->AddPage();
        $pdf->SetFont('Arial', 'B', 18);

        // Insert logo
        $pdf->Image(base_path('resources/images/logo.png'), 10, 10, 50, 30);

        // Adjust the X position to be just to the right of the logo
        $currentX = $pdf->GetX() + 105;

        $pdf->SetY(10);
        $pdf->SetX($currentX);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->SetTextColor(169, 142, 99); // Gold color
        $pdf->Cell(0, 5, env('COMPANY_NAME'), 0, 2, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->SetTextColor(50, 50, 50); // Dark gray color
        $pdf->SetX($currentX);
        $pdf->Cell(0, 5, "Charity No: " . env('CHARITYNO'), 0, 2, 'L');
        $pdf->SetX($currentX);
        $pdf->Cell(0, 5, env('ADDRESS_1') . ", " . env('ADDRESS_2'), 0, 2, 'L');
        $pdf->SetX($currentX);
        $pdf->Cell(0, 5, "Call: " . env('PHONE_NUMBER') . "  Email: " . env('MAIL_FROM_ADDRESS'), 0, 2, 'L');
        $pdf->SetX($currentX);
        $pdf->Cell(0, 5, "Fax: " . env('FAX') . "  Web: " . env('APP_URL'), 0, 2, 'L');

        $pdf->Ln(30);
        $pdf->SetFont('Arial', '', 18);
        $pdf->MultiCell(0, 10, 'Donation ID: ' . $transaction['id'], 0, 'C');
        // Donation details
        $pdf->SetFont('Arial', '', 14);
        $pdf->Ln(15);
        $pdf->MultiCell(0, 10, 'Created: ' . $transaction['created'], 0, 'C');
        $pdf->MultiCell(0, 10, 'Transaction Number: ' . $transaction['id'], 0, 'C');
        $pdf->MultiCell(0, 10, 'Amount: ' . '£' . number_format(floatval($transaction['amount']), 2), 0, 'C');
        $pdf->MultiCell(0, 10, 'Charity: ' . $transaction['charity'], 0, 'C');

        $pdf->Ln(40);

        // Footer
        $pdf->SetFont('Arial', 'I', 10);
        $pdf->Cell(0, 10, 'No goods or services have been provided in consideration of this contribution.', 0, 1, 'C');
        $pdf->Cell(0, 10, 'All donations are tax deductible', 0, 1, 'C');

        // Create the 'receipts' directory if it doesn't exist
        $receiptsDir = storage_path('app/receipts');
        if (!file_exists($receiptsDir)) {
            mkdir($receiptsDir, 0755, true);
        }

        $pdfFilePath = $receiptsDir . '/receipt_' . $transaction['id'] . '.pdf';
        $pdf->Output('F', $pdfFilePath);

        return response()->file($pdfFilePath);
    }
}