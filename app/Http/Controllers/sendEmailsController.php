<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmailsController extends Controller
{
    public function makeEmail(Request $request)
    {
        $vaccountNo = $request->input('vaccountNo');
        $firstname = $request->input('firstname');
        $lastname = $request->input('lastname');
        //$emAddress = $request->input('em_address');
        $emAddress = "thomasfillermail@gmail.com";
        $type = $request->input('type');

        // Perform your cancellation logic here using the received data

        // Log a test message with the received data
        Log::info('Transaction cancellation requested.', [
            'transactionId' => $request->transactionId,
            'vaccountNo' => $vaccountNo,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'em_address' => $emAddress,
        ]);

        // Send email based on the type
        $this->sendEmail($type, [
            'transactionId' => $request->transactionId,
            'vaccountNo' => $vaccountNo,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'em_address' => $emAddress,
        ]);

        // Return a response
        return response()->json(['message' => 'Transaction cancellation processed.']);
    }

    private function sendEmail($type, $requestPayload)
    {
        switch ($type) {
            case 'cancel-transaction':
                $this->sendCancelTransactionEmail($requestPayload);
                break;
            // Add more cases for different email types
            default:
                Log::warning('Unknown email type: ' . $type);
                break;
        }
    }

    private function sendCancelTransactionEmail($requestPayload)
    {
        $toEmail = $requestPayload['em_address'];
        $subject = 'Transaction Cancellation';
        $firstname = $requestPayload['firstname'];
        $lastname = $requestPayload['lastname'];
        $transactionId = $requestPayload['transactionId'];

        try {
            Mail::to($toEmail)->send(new TransactionCancellationMail($subject, $firstname, $lastname, $transactionId));
            Log::info('Transaction cancellation email sent successfully to ' . $toEmail);
        } catch (\Exception $e) {
            Log::error('Transaction cancellation email failed to send. Error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send transaction cancellation email'], 500);
        }
    }
}

class TransactionCancellationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $firstname;
    public $lastname;
    public $transactionId;

    public function __construct($subject, $firstname, $lastname, $transactionId)
    {
        $this->subject = $subject;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->transactionId = $transactionId;
    }

    public function build()
    {
        return $this->subject($this->subject)
                    ->view('emails.transaction_cancellation')
                    ->with([
                        'firstname' => $this->firstname,
                        'lastname' => $this->lastname,
                        'transactionId' => $this->transactionId,
                    ]);
    }
}