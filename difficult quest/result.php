<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$correct = (int)($data['correct'] ?? 0);
$total   = (int)($data['total'] ?? 1);

$percent = ($correct / $total) * 100;

$status = '';
$image  = '';

if ($percent == 100) {
    $status = 'Автомастер';
    $image  = 'img/status4.png';
} elseif ($percent >= 90) {
    $status = 'Опытный водитель';
    $image  = 'img/status3.png';
} elseif ($percent >= 50) {
    $status = 'Ученик автошколы';
    $image  = 'img/status2.png';
} else {
    $status = 'Пешеход';
    $image  = 'img/status1.png';
}

echo json_encode([
    'status' => $status,
    'image'  => $image,
    'percent'=> round($percent)
]);
