<?php
// api/generate-code.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// =========================================================
// 1. منع الوصول المباشر
// =========================================================
if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    http_response_code(403);
    die(json_encode(['error' => 'Direct access not allowed.']));
}

// =========================================================
// 2. المفاتيح السرية (ثابتة)
// =========================================================
define('MASTER_KEY', 'CBBX_MASTER_KEY_2026_ULTRA_SECURE_256_BIT_HMAC_SHA512');
define('SECONDARY_KEY', 'CBBX_SECONDARY_SALT_2026_VERY_LONG_AND_COMPLEX_STRING');
define('FIXED_NONCE', 'CBBX_NONCE_2026_UNIQUE_IDENTIFIER');

// =========================================================
// 3. قائمة الأدوات (للعرض فقط، مش للتشفير)
// =========================================================
define('ALLOWED_TOOLS', [
    'tool-silence' => 'إزالة الصمت من الفيديو',
    'tool-scenes'  => 'تحويل الفيديو إلى مشاهد',
    // أضف أدواتك المستقبلية هنا (للعرض فقط)
]);

// =========================================================
// 4. الحد من عدد الطلبات (Rate Limiting)
// =========================================================
session_start();
$ip = $_SERVER['REMOTE_ADDR'];
if (!isset($_SESSION['rate_limit'])) {
    $_SESSION['rate_limit'] = ['count' => 0, 'time' => time()];
}
if (time() - $_SESSION['rate_limit']['time'] > 3600) {
    $_SESSION['rate_limit'] = ['count' => 0, 'time' => time()];
}
if ($_SESSION['rate_limit']['count'] >= 5) {
    http_response_code(429);
    die(json_encode(['error' => 'Too many requests. Please try again later.']));
}
$_SESSION['rate_limit']['count']++;

// =========================================================
// 5. قراءة البيانات (نتجاهل tool_id تماماً)
// =========================================================
$input = json_decode(file_get_contents('php://input'), true);
$hwid = isset($input['hwid']) ? strtoupper(trim($input['hwid'])) : '';

// =========================================================
// 6. التحقق من صحة البصمة
// =========================================================
if (strlen($hwid) < 10 || !preg_match('/^[A-Z0-9\-]+$/', $hwid)) {
    http_response_code(400);
    die(json_encode(['error' => 'Invalid HWID format.']));
}

// =========================================================
// 7. دالة توليد الكود (تعتمد فقط على HWID + التاريخ)
// =========================================================
function generateSecureCode($hwid) {
    $date_str = gmdate('Y-m-d');
    
    // ✅ تم إزالة tool_id من هنا، أصبح الكود واحداً لكل الأدوات
    $base_payload = "{$hwid}_{$date_str}_" . SECONDARY_KEY;
    
    // HMAC-SHA256
    $hmac = hash_hmac('sha256', $base_payload, MASTER_KEY);
    $hmac_hex = strtoupper($hmac);
    
    // إضافة Nonce وإعادة تشفير
    $combined = $hmac_hex . '_' . FIXED_NONCE;
    $second_hash = strtoupper(hash('sha256', $combined));
    
    // المزج النهائي
    $final_hash = strtoupper(hash('sha256', $hmac_hex . $second_hash));
    
    $parts = [];
    for ($i = 0; $i < 6; $i++) {
        $parts[] = substr($final_hash, $i * 4, 4);
    }
    
    return 'CBBX-' . implode('-', $parts);
}

// =========================================================
// 8. توليد الكود
// =========================================================
$code = generateSecureCode($hwid);

// =========================================================
// 9. تسجيل الطلب في سجل المتابعة
// =========================================================
$log_dir = __DIR__ . '/../logs';
if (!is_dir($log_dir)) {
    mkdir($log_dir, 0755, true);
}
$log_file = $log_dir . '/activation.log';
$log_entry = date('Y-m-d H:i:s') . " | IP: $ip | HWID: $hwid | Code: $code\n";
file_put_contents($log_file, $log_entry, FILE_APPEND);

// =========================================================
// 10. إرجاع النتيجة للواجهة
// =========================================================
echo json_encode([
    'success' => true,
    'code' => $code,
    'expires' => date('Y-m-d H:i:s', strtotime('+24 hours'))
]);
?>