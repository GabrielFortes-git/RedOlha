<?php

require "vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendEmail($data){
    // $from , $to , $name ,  $subject, $body

    $name = "Gabriel Fortes";
    $email = "gabrielpedro9375@gmail.com";

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'gabrielpedro9375@gmail.com';

        // Senha de app do Gmail
        $mail->Password   = 'pdqgbqizvkvebgfg'; 

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Remetente
        $mail->setFrom($email, $name);

        // Destinatário
        $mail->addAddress('gabrielfortes.tech@gmail.com', 'Gabriel');

        $mail->Subject = 'Gmail SMTP Test';
        $mail->Body    = 'This is a test email sent via Gmail SMTP and PHP.';

        $mail->send();

        return 'Message has been sent';

    } catch (Exception $e) {

        return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

    // pdqg bqiz vkve bgfg
}