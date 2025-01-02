<?php
// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require Composer's autoload file
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Check for required fields
    if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                                          // Send using SMTP
        $mail->Host = 'smtp.gmail.com';                           // Set the SMTP server to send through
        $mail->SMTPAuth = true;                                   // Enable SMTP authentication
        $mail->Username = 'ashikshettyc@gmail.com';                 // SMTP username
        $mail->Password = 'qkizljnyfdkagcah';  // SMTP password or app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;       // Enable TLS encryption
        $mail->Port = 587;                                        // TCP port to connect to

        // Recipients
        $mail->setFrom($email, $name);                            // Sender's email and name
        $mail->addAddress('ashikshettyc@gmail.com', 'Admin'); // Add a recipient (your email)

        // Content
        $mail->Subject = $subject;                               // Email subject
        $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        // Send the email
        $mail->send();
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
