



<?php
// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// Require Composer's autoload file
require 'vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);
    $mobile = isset($_POST["mblno"]) && !empty(trim($_POST["mblno"])) ? trim($_POST["mblno"]) : "0";


    // Validate fields
    if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Send email via PHPMailer
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['SMTP_PORT'];

        $mail->setFrom($email, $name);
        $mail->addAddress('ashikshettyc@gmail.com', 'Admin');

        $mail->Subject = $subject;
        $mail->Body = "Name: $name\nEmail: $email\nMobile: $mobile\n\nMessage:\n$message";

        $mail->send();
    } catch (Exception $e) {
        http_response_code(500);
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        exit;
    }

    // Send data to CodeIgniter route
    $postData = [
        'name' => $name,
        'subject' => $subject,
        'email' => $email,
        'msg' => $message,
        'mblno' => $mobile,
        'created_at' => date('Y-m-d H:i:s'),
    ];

    $ciUrl = "https://nkwayshome.co.za/admin_panel/website_management/email";

    $options = [
        'http' => [
            'header' => "Content-Type: application/json\r\n",
            'method' => 'POST',
            'content' => json_encode($postData),
        ],
    ];

    $context = stream_context_create($options);
    $ciResponse = file_get_contents($ciUrl, false, $context);

    if ($ciResponse === false) {
        http_response_code(500);
        echo "Failed to send data to CodeIgniter.";
    } else {
        http_response_code(200);
        echo "Email sent and data saved successfully!";
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
