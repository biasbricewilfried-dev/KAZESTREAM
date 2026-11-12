<?php
/* ============================================
   KAZESTREAM - Configuration Base de Données
   ============================================ */

// --- Paramètres de connexion MySQL ---
define('DB_HOST', 'localhost');
define('DB_NAME', 'kazestream_db');
define('DB_USER', 'root');        // <-- Changez ce mot de passe
define('DB_PASS', '');            // <-- Mettez votre mot de passe MySQL
define('DB_CHARSET', 'utf8mb4');

// --- Paramètres de l'API ---
define('API_KEY', 'kazestream-secret-key-2024');  // Clé pour sécuriser les endpoints d'écriture
define('FREE_EPISODES', 2);                        // Nombre d'épisodes gratuits

// --- Limites ---
define('MAX_UPLOAD_SIZE', 104857600);  // 100 Mo
define('ALLOWED_VIDEO_EXT', ['mp4', 'webm', 'mkv', 'm4v']);

// --- Connexion PDO ---
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur de connexion à la base de données', 'detail' => $e->getMessage()]);
            exit;
        }
    }
    return $pdo;
}

// --- Vérification de la clé API ---
function checkApiKey() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    $key = str_replace('Bearer ', '', $auth);
    if ($key !== API_KEY) {
        http_response_code(401);
        echo json_encode(['error' => 'Clé API invalide']);
        exit;
    }
}

// --- Réponse JSON ---
function jsonResponse($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// --- Input cleaning ---
function cleanInput($str) {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}

// --- Générer un slug ---
function generateSlug($title) {
    $slug = preg_replace('/[^a-z0-9]+/i', '-', strtolower($title));
    $slug = preg_replace('/-+/', '-', $slug);
    return trim($slug, '-');
}