<?php
/* ============================================
   KAZESTREAM - API REST
   Router principal - .htaccess redirige ici
   ============================================ */
require_once __DIR__ . '/config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Gérer les requêtes OPTIONS preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Router simple basé sur le paramètre "endpoint"
$endpoint = $_GET['endpoint'] ?? '';
$method   = $_SERVER['REQUEST_METHOD'];
$id       = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($endpoint) {

    /* ==========================
       ANIMES
       ========================== */
    case 'animes':
        if ($method === 'GET') {
            // GET /api/?endpoint=animes
            // GET /api/?endpoint=animes&id=5
            // GET /api/?endpoint=animes&search=naruto
            // GET /api/?endpoint=animes&status=En+cours
            if ($id) {
                getAnimeById($id);
            } elseif (isset($_GET['search'])) {
                searchAnimes($_GET['search']);
            } elseif (isset($_GET['status'])) {
                getAnimesByStatus($_GET['status']);
            } else {
                getAllAnimes();
            }
        } elseif ($method === 'POST') {
            // POST /api/?endpoint=animes  (créer un anime)
            checkApiKey();
            createAnime();
        } elseif ($method === 'PUT') {
            // PUT /api/?endpoint=animes&id=5  (modifier)
            checkApiKey();
            updateAnime($id);
        } elseif ($method === 'DELETE') {
            // DELETE /api/?endpoint=animes&id=5
            checkApiKey();
            deleteAnime($id);
        }
        break;

    /* ==========================
       EPISODES
       ========================== */
    case 'episodes':
        if ($method === 'GET') {
            // GET /api/?endpoint=episodes&anime_id=1
            // GET /api/?endpoint=episodes&anime_id=1&season_id=3
            // GET /api/?endpoint=episodes&id=45
            if ($id) {
                getEpisodeById($id);
            } elseif (isset($_GET['anime_id'])) {
                $animeId = (int)$_GET['anime_id'];
                $seasonId = isset($_GET['season_id']) ? (int)$_GET['season_id'] : null;
                getEpisodesByAnime($animeId, $seasonId);
            } else {
                getAllEpisodes();
            }
        } elseif ($method === 'POST') {
            // POST /api/?endpoint=episodes  (créer un épisode)
            checkApiKey();
            createEpisode();
        } elseif ($method === 'PUT') {
            // PUT /api/?endpoint=episodes&id=45  (modifier)
            checkApiKey();
            updateEpisode($id);
        } elseif ($method === 'DELETE') {
            // DELETE /api/?endpoint=episodes&id=45
            checkApiKey();
            deleteEpisode($id);
        }
        break;

    /* ==========================
       SEASONS
       ========================== */
    case 'seasons':
        if ($method === 'GET') {
            // GET /api/?endpoint=seasons&anime_id=1
            if (isset($_GET['anime_id'])) {
                getSeasonsByAnime((int)$_GET['anime_id']);
            } else {
                getAllSeasons();
            }
        } elseif ($method === 'POST') {
            checkApiKey();
            createSeason();
        } elseif ($method === 'PUT') {
            checkApiKey();
            updateSeason($id);
        } elseif ($method === 'DELETE') {
            checkApiKey();
            deleteSeason($id);
        }
        break;

    /* ==========================
       GENERATION EN MASSE D'EPISODES
       ========================== */
    case 'generate-episodes':
        if ($method === 'POST') {
            checkApiKey();
            generateEpisodesBatch();
        }
        break;

    /* ==========================
       STATS
       ========================== */
    case 'stats':
        if ($method === 'GET') {
            getStats();
        }
        break;

    /* ==========================
       EPISODES - BATCH DELETE
       ========================== */
    case 'batch-episodes':
        if ($method === 'DELETE') {
            checkApiKey();
            deleteEpisodesBatch();
        }
        break;

    default:
        jsonResponse(['error' => 'Endpoint inconnu. Endpoints disponibles : animes, episodes, seasons, generate-episodes, stats, batch-episodes'], 404);
}


/* ================================================================
   FONCTIONS ANIMES
   ================================================================ */

function getAllAnimes() {
    $db = getDB();
    $stmt = $db->query("SELECT * FROM animes ORDER BY title ASC");
    $animes = $stmt->fetchAll();

    // Ajouter le nombre d'épisodes en DB et le statut
    foreach ($animes as &$a) {
        $stmt2 = $db->prepare("SELECT COUNT(*) as cnt FROM episodes WHERE anime_id = ?");
        $stmt2->execute([$a['id']]);
        $a['db_episode_count'] = (int)$stmt2->fetch()['cnt'];
    }

    jsonResponse($animes);
}

function getAnimeById($id) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM animes WHERE id = ?");
    $stmt->execute([$id]);
    $anime = $stmt->fetch();

    if (!$anime) {
        jsonResponse(['error' => 'Anime non trouvé'], 404);
    }

    // Saisons
    $stmt2 = $db->prepare("SELECT * FROM seasons WHERE anime_id = ? ORDER BY season_number");
    $stmt2->execute([$id]);
    $anime['seasons'] = $stmt2->fetchAll();

    // Nombre total d'épisodes en DB
    $stmt3 = $db->prepare("SELECT COUNT(*) as cnt FROM episodes WHERE anime_id = ?");
    $stmt3->execute([$id]);
    $anime['db_episode_count'] = (int)$stmt3->fetch()['cnt'];

    jsonResponse($anime);
}

function searchAnimes($query) {
    $db = getDB();
    $q = '%' . $query . '%';
    $stmt = $db->prepare("SELECT * FROM animes WHERE title LIKE ? OR title_jp LIKE ? ORDER BY title ASC");
    $stmt->execute([$q, $q]);
    jsonResponse($stmt->fetchAll());
}

function getAnimesByStatus($status) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM animes WHERE status = ? ORDER BY title ASC");
    $stmt->execute([$status]);
    jsonResponse($stmt->fetchAll());
}

function createAnime() {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        jsonResponse(['error' => 'Données JSON invalides'], 400);
    }

    $required = ['title', 'year', 'rating'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            jsonResponse(['error' => "Champ '$field' requis"], 400);
        }
    }

    $db = getDB();
    $slug = generateSlug($input['title']);

    // Vérifier l'unicité du slug
    $check = $db->prepare("SELECT id FROM animes WHERE slug = ?");
    $check->execute([$slug]);
    if ($check->fetch()) {
        $slug .= '-' . time();
    }

    $stmt = $db->prepare("
        INSERT INTO animes (title, title_jp, slug, year, rating, total_episodes, status, description, color, emoji, badge, rank, image, genre, studio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        cleanInput($input['title']),
        cleanInput($input['title_jp'] ?? ''),
        $slug,
        (int)$input['year'],
        (float)$input['rating'],
        (int)($input['total_episodes'] ?? 0),
        $input['status'] ?? 'En cours',
        $input['description'] ?? '',
        $input['color'] ?? '#e50914',
        $input['emoji'] ?? '',
        $input['badge'] ?? null,
        $input['rank'] ?? null,
        $input['image'] ?? 'images/default.png',
        $input['genre'] ?? '',
        $input['studio'] ?? ''
    ]);

    $newId = $db->lastInsertId();
    getAnimeById($newId);
}

function updateAnime($id) {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        jsonResponse(['error' => 'Données JSON invalides'], 400);
    }

    $db = getDB();

    // Vérifier que l'anime existe
    $check = $db->prepare("SELECT id FROM animes WHERE id = ?");
    $check->execute([$id]);
    if (!$check->fetch()) {
        jsonResponse(['error' => 'Anime non trouvé'], 404);
    }

    $fields = [];
    $values = [];

    $allowed = ['title', 'title_jp', 'year', 'rating', 'total_episodes', 'status', 'description', 'color', 'emoji', 'badge', 'rank', 'image', 'genre', 'studio'];
    foreach ($allowed as $field) {
        if (isset($input[$field])) {
            $fields[] = "$field = ?";
            $values[] = $input[$field];
        }
    }

    if (isset($input['title'])) {
        $fields[] = "slug = ?";
        $values[] = generateSlug($input['title']);
    }

    if (empty($fields)) {
        jsonResponse(['error' => 'Aucun champ à modifier'], 400);
    }

    $values[] = $id;
    $sql = "UPDATE animes SET " . implode(', ', $fields) . " WHERE id = ?";
    $db->prepare($sql)->execute($values);

    getAnimeById($id);
}

function deleteAnime($id) {
    $db = getDB();
    $stmt = $db->prepare("DELETE FROM animes WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(['error' => 'Anime non trouvé'], 404);
    }

    jsonResponse(['success' => true, 'message' => 'Anime et tous ses épisodes supprimés']);
}


/* ================================================================
   FONCTIONS EPISODES
   ================================================================ */

function getAllEpisodes() {
    $db = getDB();
    $stmt = $db->query("SELECT * FROM episodes ORDER BY anime_id, episode_number");
    jsonResponse($stmt->fetchAll());
}

function getEpisodeById($id) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM episodes WHERE id = ?");
    $stmt->execute([$id]);
    $ep = $stmt->fetch();

    if (!$ep) {
        jsonResponse(['error' => 'Episode non trouvé'], 404);
    }

    jsonResponse($ep);
}

function getEpisodesByAnime($animeId, $seasonId = null) {
    $db = getDB();

    // Vérifier que l'anime existe
    $check = $db->prepare("SELECT id, title FROM animes WHERE id = ?");
    $check->execute([$animeId]);
    $anime = $check->fetch();
    if (!$anime) {
        jsonResponse(['error' => 'Anime non trouvé'], 404);
    }

    if ($seasonId) {
        $stmt = $db->prepare("SELECT * FROM episodes WHERE anime_id = ? AND season_id = ? ORDER BY episode_number");
        $stmt->execute([$animeId, $seasonId]);
    } else {
        $stmt = $db->prepare("SELECT * FROM episodes WHERE anime_id = ? ORDER BY episode_number");
        $stmt->execute([$animeId]);
    }

    $episodes = $stmt->fetchAll();

    // Formater pour le frontend KazeStream
    $formatted = array_map(function($ep) {
        return [
            'number'     => (int)$ep['episode_number'],
            'title'      => $ep['title'],
            'duration'   => $ep['duration'],
            'description'=> $ep['description'],
            'is_free'    => (bool)$ep['is_free'],
            'video_url_1080' => $ep['video_url_1080'],
            'video_url_720'  => $ep['video_url_720'],
            'video_url_480'  => $ep['video_url_480'],
            'thumbnail'  => $ep['thumbnail'],
            'air_date'   => $ep['air_date'],
        ];
    }, $episodes);

    jsonResponse([
        'anime_id' => $animeId,
        'anime_title' => $anime['title'],
        'total_in_db' => count($formatted),
        'episodes' => $formatted
    ]);
}

function createEpisode() {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        jsonResponse(['error' => 'Données JSON invalides'], 400);
    }

    $required = ['anime_id', 'episode_number', 'title'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            jsonResponse(['error' => "Champ '$field' requis"], 400);
        }
    }

    $db = getDB();

    $stmt = $db->prepare("
        INSERT INTO episodes (anime_id, season_id, episode_number, title, description, duration, thumbnail, video_url_1080, video_url_720, video_url_480, air_date, is_free)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $isFree = isset($input['is_free']) ? (int)$input['is_free'] : (((int)$input['episode_number'] <= FREE_EPISODES) ? 1 : 0);

    $stmt->execute([
        (int)$input['anime_id'],
        $input['season_id'] ?? null,
        (int)$input['episode_number'],
        cleanInput($input['title']),
        $input['description'] ?? '',
        $input['duration'] ?? '23:45',
        $input['thumbnail'] ?? null,
        $input['video_url_1080'] ?? null,
        $input['video_url_720'] ?? null,
        $input['video_url_480'] ?? null,
        $input['air_date'] ?? null,
        $isFree
    ]);

    $newId = $db->lastInsertId();
    getEpisodeById($newId);
}

function updateEpisode($id) {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        jsonResponse(['error' => 'Données JSON invalides'], 400);
    }

    $db = getDB();
    $check = $db->prepare("SELECT id FROM episodes WHERE id = ?");
    $check->execute([$id]);
    if (!$check->fetch()) {
        jsonResponse(['error' => 'Episode non trouvé'], 404);
    }

    $fields = [];
    $values = [];

    $allowed = ['anime_id', 'season_id', 'episode_number', 'title', 'description', 'duration', 'thumbnail', 'video_url_1080', 'video_url_720', 'video_url_480', 'air_date', 'is_free'];
    foreach ($allowed as $field) {
        if (isset($input[$field])) {
            $fields[] = "$field = ?";
            $values[] = $input[$field];
        }
    }

    if (empty($fields)) {
        jsonResponse(['error' => 'Aucun champ à modifier'], 400);
    }

    $values[] = $id;
    $sql = "UPDATE episodes SET " . implode(', ', $fields) . " WHERE id = ?";
    $db->prepare($sql)->execute($values);

    getEpisodeById($id);
}

function deleteEpisode($id) {
    $db = getDB();
    $stmt = $db->prepare("DELETE FROM episodes WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(['error' => 'Episode non trouvé'], 404);
    }

    jsonResponse(['success' => true, 'message' => 'Episode supprimé']);
}

function deleteEpisodesBatch() {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['ids']) || !is_array($input['ids'])) {
        jsonResponse(['error' => 'Fournissez un tableau "ids"'], 400);
    }

    $db = getDB();
    $placeholders = implode(',', array_fill(0, count($input['ids']), '?'));
    $stmt = $db->prepare("DELETE FROM episodes WHERE id IN ($placeholders)");
    $stmt->execute($input['ids']);

    jsonResponse(['success' => true, 'deleted_count' => $stmt->rowCount()]);
}


/* ================================================================
   FONCTIONS SAISONS
   ================================================================ */

function getAllSeasons() {
    $db = getDB();
    $stmt = $db->query("SELECT * FROM seasons ORDER BY anime_id, season_number");
    jsonResponse($stmt->fetchAll());
}

function getSeasonsByAnime($animeId) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM seasons WHERE anime_id = ? ORDER BY season_number");
    $stmt->execute([$animeId]);
    jsonResponse($stmt->fetchAll());
}

function createSeason() {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['anime_id']) || empty($input['title'])) {
        jsonResponse(['error' => 'Champs anime_id et title requis'], 400);
    }

    $db = getDB();
    $stmt = $db->prepare("
        INSERT INTO seasons (anime_id, season_number, title, description, year, episode_count)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        (int)$input['anime_id'],
        (int)($input['season_number'] ?? 1),
        cleanInput($input['title']),
        $input['description'] ?? '',
        $input['year'] ?? null,
        (int)($input['episode_count'] ?? 0)
    ]);

    $newId = $db->lastInsertId();
    $stmt2 = $db->prepare("SELECT * FROM seasons WHERE id = ?");
    $stmt2->execute([$newId]);
    jsonResponse($stmt2->fetch());
}

function updateSeason($id) {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        jsonResponse(['error' => 'Données JSON invalides'], 400);
    }

    $db = getDB();
    $fields = [];
    $values = [];

    $allowed = ['anime_id', 'season_number', 'title', 'description', 'year', 'episode_count'];
    foreach ($allowed as $field) {
        if (isset($input[$field])) {
            $fields[] = "$field = ?";
            $values[] = $input[$field];
        }
    }

    if (empty($fields)) {
        jsonResponse(['error' => 'Aucun champ à modifier'], 400);
    }

    $values[] = $id;
    $sql = "UPDATE seasons SET " . implode(', ', $fields) . " WHERE id = ?";
    $db->prepare($sql)->execute($values);

    $stmt = $db->prepare("SELECT * FROM seasons WHERE id = ?");
    $stmt->execute([$id]);
    jsonResponse($stmt->fetch());
}

function deleteSeason($id) {
    $db = getDB();
    $stmt = $db->prepare("DELETE FROM seasons WHERE id = ?");
    $stmt->execute([$id]);
    jsonResponse(['success' => true, 'deleted' => $stmt->rowCount() > 0]);
}


/* ================================================================
   GENERATION EN MASSE D'EPISODES
   ================================================================ */

function generateEpisodesBatch() {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['anime_id']) || empty($input['start']) || empty($input['end'])) {
        jsonResponse(['error' => 'Champs requis : anime_id, start, end'], 400);
    }

    $animeId  = (int)$input['anime_id'];
    $seasonId = $input['season_id'] ?? null;
    $start    = (int)$input['start'];
    $end      = (int)$input['end'];
    $titlePrefix = $input['title_prefix'] ?? 'Episode';

    if ($start > $end || $end - $start > 500) {
        jsonResponse(['error' => 'Plage invalide (max 500 épisodes à la fois)'], 400);
    }

    $db = getDB();

    // Vérifier l'anime
    $check = $db->prepare("SELECT title, total_episodes FROM animes WHERE id = ?");
    $check->execute([$animeId]);
    $anime = $check->fetch();
    if (!$anime) {
        jsonResponse(['error' => 'Anime non trouvé'], 404);
    }

    // Noms d'épisodes par défaut
    $names = [
        'Le Commencement', 'L\'Éveil', 'La Confrontation', 'Le Choix', 'L\'Épreuve',
        'Révélations', 'La Trahison', 'Le Duel', 'Rédemption', 'Le Sacrifice',
        'Nouveau Pouvoir', 'L\'Alliance', 'Le Passé', 'L\'Assaut', 'La Vérité',
        'Le Tournoi', 'Les Ténèbres', 'L\'Espoir', 'La Bataille Finale', 'L\'Aube',
        'Renaissance', 'Le Secret', 'La Quête', 'Le Champion'
    ];

    $stmt = $db->prepare("
        INSERT IGNORE INTO episodes (anime_id, season_id, episode_number, title, description, duration, is_free)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    $created = 0;
    for ($i = $start; $i <= $end; $i++) {
        $epTitle = sprintf('%s %d - %s', $titlePrefix, $i, $names[($i - 1) % 24]);
        $epDesc  = sprintf('Épisode %d de %s. Les événements prennent une tournure inattendue...', $i, $anime['title']);
        $mins    = 20 + floor(rand(0, 5));
        $secs    = str_pad(floor(rand(0, 59)), 2, '0', STR_PAD_LEFT);
        $duration = sprintf('%d:%s', $mins, $secs);
        $isFree = ($i <= FREE_EPISODES) ? 1 : 0;

        $stmt->execute([$animeId, $seasonId, $i, $epTitle, $epDesc, $duration, $isFree]);
        if ($stmt->rowCount() > 0) {
            $created++;
        }
    }

    // Mettre à jour le nombre total d'épisodes de l'anime
    $countStmt = $db->prepare("SELECT COUNT(*) as cnt FROM episodes WHERE anime_id = ?");
    $countStmt->execute([$animeId]);
    $total = $countStmt->fetch()['cnt'];

    $updateStmt = $db->prepare("UPDATE animes SET total_episodes = ? WHERE id = ?");
    $updateStmt->execute([$total, $animeId]);

    jsonResponse([
        'success' => true,
        'anime_id' => $animeId,
        'anime_title' => $anime['title'],
        'range' => "$start-$end",
        'created' => $created,
        'total_episodes_in_db' => (int)$total
    ]);
}


/* ================================================================
   STATISTIQUES
   ================================================================ */

function getStats() {
    $db = getDB();

    $totalAnimes = $db->query("SELECT COUNT(*) FROM animes")->fetchColumn();
    $totalEpisodes = $db->query("SELECT COUNT(*) FROM episodes")->fetchColumn();
    $totalSeasons = $db->query("SELECT COUNT(*) FROM seasons")->fetchColumn();
    $enCours = $db->query("SELECT COUNT(*) FROM animes WHERE status = 'En cours'")->fetchColumn();
    $termines = $db->query("SELECT COUNT(*) FROM animes WHERE status = 'Terminé'")->fetchColumn();

    // Top 5 animes par rating
    $top5 = $db->query("SELECT id, title, rating, total_episodes, status FROM animes ORDER BY rating DESC LIMIT 5")->fetchAll();

    // Distribution par statut
    $statusDist = $db->query("SELECT status, COUNT(*) as count FROM animes GROUP BY status")->fetchAll();

    // Épisodes par anime (top 10)
    $epByAnime = $db->query("
        SELECT a.id, a.title, COUNT(e.id) as ep_count
        FROM animes a
        LEFT JOIN episodes e ON e.anime_id = a.id
        GROUP BY a.id
        ORDER BY ep_count DESC
        LIMIT 10
    ")->fetchAll();

    jsonResponse([
        'total_animes'   => (int)$totalAnimes,
        'total_episodes' => (int)$totalEpisodes,
        'total_seasons'  => (int)$totalSeasons,
        'en_cours'       => (int)$enCours,
        'termines'       => (int)$termines,
        'top_5_rating'   => $top5,
        'status_distribution' => $statusDist,
        'episodes_by_anime'   => $epByAnime
    ]);
}