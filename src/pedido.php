<?php 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

$json = file_get_contents('php://input');
$obj = json_decode($json);

$nombre = $obj->nombre;
$email = $obj->email;
$telefono = $obj->telefono;
$ciudad = $obj->ciudad;
$pedido = $obj->lineasDePedido;

if (count($pedido) > 1) {

}


$to = "gerardo.velez.sanchez@gmail.com.com";
$subject = "HTML email";

$message = "
<html>
<head>
<title>HTML email</title>
</head>
<body>

<h1>Saludos</h1>
<p>This email contains HTML Tags!</p>
<table>
<tr>
<th>Firstname</th>
<th>Lastname</th>
</tr>
<tr>
<td>John</td>
<td>Doe</td>
</tr>
</table>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <danger.200506@gmail.com.com>' . "\r\n";
// $headers .= 'Cc: myboss@example.com' . "\r\n";

$res = mail($to,$subject,$message,$headers);


/* $res = array(
    'nombre' => $nombre,
    'email' => $email
); */

$response = json_encode($res);
echo $response;

?>