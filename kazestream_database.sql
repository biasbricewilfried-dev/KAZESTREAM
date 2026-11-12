-- ============================================================
--  KAZESTREAM - Base de Données MySQL
--  Structure complète avec données initiales des 30 animes
-- ============================================================

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS kazestream_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kazestream_db;

-- ============================================================
--  TABLE : animes
--  Stocke les informations générales de chaque anime
-- ============================================================
DROP TABLE IF EXISTS `episodes`;
DROP TABLE IF EXISTS `seasons`;
DROP TABLE IF EXISTS `my_list`;
DROP TABLE IF EXISTS `subscriptions`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `animes`;

CREATE TABLE `animes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `title_jp` VARCHAR(255) DEFAULT NULL,
  `slug` VARCHAR(300) NOT NULL,
  `year` YEAR NOT NULL,
  `rating` DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  `total_episodes` INT UNSIGNED NOT NULL DEFAULT 0,
  `status` ENUM('En cours', 'Terminé', 'En attente', 'Annoncé') NOT NULL DEFAULT 'En cours',
  `description` TEXT DEFAULT NULL,
  `color` VARCHAR(7) DEFAULT '#e50914',
  `emoji` VARCHAR(10) DEFAULT NULL,
  `badge` ENUM('new', 'top', NULL) DEFAULT NULL,
  `rank` TINYINT UNSIGNED DEFAULT NULL,
  `image` VARCHAR(500) DEFAULT 'images/default.png',
  `genre` VARCHAR(500) DEFAULT NULL,
  `studio` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_slug` (`slug`),
  KEY `idx_status` (`status`),
  KEY `idx_rating` (`rating` DESC),
  KEY `idx_year` (`year`),
  KEY `idx_title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
--  TABLE : seasons
--  Permet de découper un anime en saisons / arcs
-- ============================================================
CREATE TABLE `seasons` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `anime_id` INT UNSIGNED NOT NULL,
  `season_number` INT UNSIGNED NOT NULL DEFAULT 1,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `year` YEAR DEFAULT NULL,
  `episode_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_anime_id` (`anime_id`),
  CONSTRAINT `fk_seasons_anime` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
--  TABLE : episodes
--  Stocke CHAQUE épisode individuel
-- ============================================================
CREATE TABLE `episodes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `anime_id` INT UNSIGNED NOT NULL,
  `season_id` INT UNSIGNED DEFAULT NULL,
  `episode_number` INT UNSIGNED NOT NULL,
  `title` VARCHAR(500) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `duration` VARCHAR(10) DEFAULT '23:45',
  `thumbnail` VARCHAR(500) DEFAULT NULL,
  `video_url_1080` VARCHAR(1000) DEFAULT NULL,
  `video_url_720` VARCHAR(1000) DEFAULT NULL,
  `video_url_480` VARCHAR(1000) DEFAULT NULL,
  `air_date` DATE DEFAULT NULL,
  `is_free` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_anime_season_ep` (`anime_id`, `season_id`, `episode_number`),
  KEY `idx_anime_id` (`anime_id`),
  KEY `idx_season_id` (`season_id`),
  KEY `idx_episode_number` (`episode_number`),
  CONSTRAINT `fk_episodes_anime` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_episodes_season` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
--  TABLE : users
--  Comptes utilisateurs
-- ============================================================
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) DEFAULT NULL,
  `last_name` VARCHAR(100) DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `fav_genres` JSON DEFAULT NULL,
  `register_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
--  TABLE : subscriptions
--  Abonnements Premium
-- ============================================================
CREATE TABLE `subscriptions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `plan` ENUM('free', 'premium') NOT NULL DEFAULT 'free',
  `method` ENUM('orange_money', 'mtn_momo', NULL) DEFAULT NULL,
  `amount` INT UNSIGNED DEFAULT 0,
  `currency` VARCHAR(5) DEFAULT 'FCFA',
  `active` TINYINT(1) NOT NULL DEFAULT 0,
  `auto_renew` TINYINT(1) DEFAULT 0,
  `start_date` TIMESTAMP NULL DEFAULT NULL,
  `end_date` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `fk_subs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
--  TABLE : my_list
--  Liste personnelle de chaque utilisateur
-- ============================================================
CREATE TABLE `my_list` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `anime_id` INT UNSIGNED NOT NULL,
  `added_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_anime` (`user_id`, `anime_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `fk_mylist_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mylist_anime` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
--  DONNÉES INITIALES : Les 30 animes existants
-- ============================================================

INSERT INTO `animes` (`id`, `title`, `title_jp`, `slug`, `year`, `rating`, `total_episodes`, `status`, `description`, `color`, `emoji`, `badge`, `rank`, `image`, `genre`) VALUES
(1,  'Attack on Titan', 'Shingeki no Kyojin', 'attack-on-titan', 2023, 9.8, 87, 'Terminé', 'Dans un monde où l''humanité vit enfermée derrière d''immenses murs pour se protéger des Titans, des créatures géantes qui dévorent les humains, Eren Yeager et ses amis rejoignent l''armée pour combattre ces monstres après la destruction de leur ville natale.', '#8B0000', '⚔️', 'top', 1, 'images/attack-on-titan.png', 'Action,Drama,Fantasy'),
(2,  'Jujutsu Kaisen', 'Jujutsu Kaisen', 'jujutsu-kaisen', 2024, 9.5, 48, 'En cours', 'Yuji Itadori, un lycéen aux capacités physiques exceptionnelles, rejoint une organisation secrète de sorciers après avoir avalé un doigt maudit appartenant au Roi des Malédictions, Ryomen Sukuna.', '#4B0082', '👁️', 'new', 2, 'images/jujutsu-kaisen.png', 'Action,Supernatural'),
(3,  'Demon Slayer', 'Kimetsu no Yaiba', 'demon-slayer', 2024, 9.4, 55, 'En cours', 'Tanjiro Kamado devient un chasseur de démons après que sa famille a été massacrée et sa jeune sœur Nezuko transformée en démon. Il part en voyage pour trouver un remède et venger sa famille.', '#006400', '🔥', 'new', 3, 'images/demon-slayer.png', 'Action,Fantasy,Supernatural'),
(4,  'One Piece', 'One Piece', 'one-piece', 2024, 9.7, 1100, 'En cours', 'Monkey D. Luffy, un jeune garçon dont le corps est devenu élastique après avoir mangé un Fruit du Démon, explore la Grand Line à la recherche du trésor légendaire One Piece pour devenir le Roi des Pirates.', '#FF4500', '🏴‍☠️', 'top', 4, 'images/one-piece.png', 'Action,Adventure,Comedy'),
(5,  'Solo Leveling', 'Ore dake Level Up na Ken', 'solo-leveling', 2024, 9.3, 24, 'En cours', 'Sung Jin-Woo, le chasseur le plus faible de l''humanité, découvre un système mystérieux qui lui permet de monter en niveau seul dans les donjons remplis de monstres.', '#191970', '⬆️', 'new', 5, 'images/solo-leveling.png', 'Action,Fantasy'),
(6,  'My Hero Academia', 'Boku no Hero Academia', 'my-hero-academia', 2024, 8.9, 138, 'En cours', 'Dans un monde où 80% de la population possède des super-pouvoirs, Izuku Midoriya, né sans pouvoir, rêve de devenir le plus grand héros grâce à son courage et sa détermination.', '#228B22', '💪', NULL, NULL, 'images/my-hero-academia.png', 'Action,Superhero'),
(7,  'Spy x Family', 'Spy x Family', 'spy-x-family', 2024, 9.0, 37, 'En cours', 'Un espion, une assassine et une télépathe forment une famille de façade pour accomplir leurs missions respectives, sans savoir les secrets des uns et des autres.', '#FF69B4', '🕵️', 'new', NULL, 'images/spy-x-family.png', 'Action,Comedy,Slice of Life'),
(8,  'Chainsaw Man', 'Chainsaw Man', 'chainsaw-man', 2023, 9.1, 12, 'En attente', 'Denji, un jeune homme endetté, fusionne avec son démon-chainsaw pour devenir le Chainsaw Man, un chasseur de démons au service du gouvernement.', '#8B0000', '🪚', NULL, NULL, 'images/chainsaw-man.png', 'Action,Horror,Supernatural'),
(9,  'Frieren: Beyond Journey''s End', 'Sousou no Frieren', 'frieren', 2024, 9.6, 28, 'Terminé', 'Frieren, une elfe magicienne, voyage avec ses compagnons pour vaincre le Roi Démon. Après leur victoire, elle réalise l''importance des relations humaines et entreprend un nouveau voyage pour comprendre les émotions.', '#4169E1', '✨', 'new', 6, 'images/frieren.png', 'Adventure,Fantasy,Drama'),
(10, 'Vinland Saga', 'Vinland Saga', 'vinland-saga', 2023, 9.2, 48, 'Terminé', 'Thorfinn, le fils d''un grand guerrier, cherche la terre paradisiaque de Vinland tout en luttant contre la violence et en cherchant la rédemption dans l''ère des Vikings.', '#556B2F', '🛡️', NULL, NULL, 'images/vinland-saga.png', 'Action,Adventure,History'),
(11, 'Your Lie in April', 'Shigatsu wa Kimi no Uso', 'your-lie-in-april', 2015, 9.0, 22, 'Terminé', 'Kousei Arima, un pianiste prodige qui a perdu le talent d''entendre les notes après la mort de sa mère, retrouve sa passion pour la musique grâce à une violoniste libre et enjouée.', '#FFB6C1', '🎹', NULL, NULL, 'images/your-lie-in-april.png', 'Drama,Romance,Music'),
(12, 'Steins;Gate', 'Steins;Gate', 'steins-gate', 2011, 9.5, 24, 'Terminé', 'Rintaro Okabe, un scientifique autoproclamé, découvre par accident un moyen d''envoyer des messages dans le passé, ce qui le plonge dans un complot qui menace l''avenir de l''humanité.', '#008080', '⏰', 'top', 7, 'images/steins-gate.png', 'Sci-Fi,Thriller'),
(13, 'Death Note', 'Desu Noto', 'death-note', 2007, 9.4, 37, 'Terminé', 'Light Yagami, un lycéen brillant, trouve un carnet surnaturel qui lui permet de tuer quiconque dont il écrit le nom, et se prend pour un dieu de la justice face au détective L.', '#2F2F2F', '📓', NULL, 8, 'images/death-note.png', 'Mystery,Psychological,Thriller'),
(14, 'Horimiya', 'Hori miya', 'horimiya', 2021, 8.8, 13, 'Terminé', 'Kyoko Hori, la fille populaire, et Izumi Miyamura, le garçon solitaire, découvrent les faces cachées de leur personnalité et développent une relation amoureuse.', '#FF1493', '💕', NULL, NULL, 'images/horimiya.png', 'Romance,Slice of Life,Comedy'),
(15, 'Neon Genesis Evangelion', 'Shinseiki Evangelion', 'neon-genesis-evangelion', 1995, 9.0, 26, 'Terminé', 'Shinji Ikari est recruté pour piloter un robot géant appelé Evangelion pour combattre des êtres mystérieux nommés Anges qui menacent l''humanité.', '#800080', '🤖', NULL, NULL, 'images/evangelion.png', 'Mecha,Sci-Fi,Psychological'),
(16, 'Tokyo Ghoul', 'Tokyo Guru', 'tokyo-ghoul', 2018, 8.7, 48, 'Terminé', 'Ken Kaneki, un étudiant ordinaire, est transformé en demi-ghoul après une rencontre mortelle et doit naviguer entre le monde humain et la société secrète des goules.', '#8B0000', '👁️‍🗨️', NULL, NULL, 'images/tokyo-ghoul.png', 'Action,Horror,Supernatural'),
(17, 'Mushoku Tensei', 'Mushoku Tensei: Isekai Ittara Honki Dasu', 'mushoku-tensei', 2024, 9.1, 35, 'En cours', 'Un homme sans emploi meurt et renaît dans un monde de fantasy en tant que bébé nommé Rudeus Greyrat, avec tous ses souvenirs intacts, déterminé à vivre une vie dont il ne regrettera rien.', '#2E8B57', '🌀', 'new', NULL, 'images/mushoku-tensei.png', 'Fantasy,Isekai,Adventure'),
(18, 'Cyberpunk: Edgerunners', 'Cyberpunk: Edgerunners', 'cyberpunk-edgerunners', 2022, 9.0, 10, 'Terminé', 'Dans la mégalopole de Night City, un jeune sans-avenir décide de devenir un edgerunner, un mercenaire cybernétique, pour survivre et changer son destin.', '#FFD700', '🌆', NULL, NULL, 'images/cyberpunk-edgerunners.png', 'Action,Sci-Fi,Cyberpunk'),
(19, 'Kaguya-sama: Love is War', 'Kaguya-sama wa Kokurasetai', 'kaguya-sama-love-is-war', 2022, 9.0, 37, 'Terminé', 'Deux génies du lycée, Miyuki Shirogane et Kaguya Shinomiya, se font la guerre psychologique car aucun ne veut avouer ses sentiments en premier.', '#FF6347', '💘', NULL, NULL, 'images/kaguya-sama.png', 'Comedy,Romance'),
(20, 'Made in Abyss', 'Made in Abyss', 'made-in-abyss', 2022, 9.1, 25, 'En cours', 'Riko, une jeune orpheline, et Reg, un robot amnésique, descendent dans l''Abyss, un immense gouffre mystérieux rempli de créatures et de reliques anciennes, à la recherche de la mère de Riko.', '#4682B4', '🕳️', NULL, NULL, 'images/made-in-abyss.png', 'Adventure,Fantasy,Mystery'),
(21, 'Oshi no Ko', 'Oshi no Ko', 'oshi-no-ko', 2024, 9.2, 23, 'En cours', 'Un médecin et sa patiente, fans d''une idole, renaissent sous de nouvelles formes dans le monde du divertissement, confrontés aux sombres réalités de l''industrie.', '#DA70D6', '⭐', 'new', NULL, 'images/oshi-no-ko.png', 'Drama,Mystery,Supernatural'),
(22, 'Ghost in the Shell: SAC_2045', 'Koukaku Kidoutai: SAC_2045', 'ghost-in-the-shell-sac-2045', 2020, 8.5, 24, 'Terminé', 'En 2045, la Section 9 dirigée par la Major Motoko Kusanagi fait face à une nouvelle menace post-humaniste alors que le monde est transformé par l''intelligence artificielle et la post-vérité.', '#708090', '🌐', NULL, NULL, 'images/ghost-in-the-shell.png', 'Sci-Fi,Action,Cyberpunk'),
(23, 'Another', 'Another', 'another', 2012, 8.6, 12, 'Terminé', 'Kouichi Sakakibara, transféré dans une nouvelle classe, découvre une malédiction qui frappe les élèves un par un avec des morts mystérieuses et violentes.', '#2F4F4F', '💀', NULL, NULL, 'images/another.png', 'Horror,Mystery,Thriller'),
(24, 'Bocchi the Rock!', 'Bocchi za Rokku!', 'bocchi-the-rock', 2022, 9.0, 12, 'Terminé', 'Hitori Gotoh, une lycéenne ultra-timide et virtuose de la guitare, rejoint un groupe de rock et découvre l''amitié et la musique en direct.', '#FF69B4', '🎸', NULL, NULL, 'images/bocchi-the-rock.png', 'Comedy,Music,Slice of Life'),
(25, 'Haikyuu!!', 'Haikyuu!!', 'haikyuu', 2024, 9.3, 85, 'Terminé', 'Shoyo Hinata, un petit garçon passionné de volley-ball, rêve de devenir le meilleur attaquant malgré sa petite taille. Il rejoint le lycée Karasuno et forme un duo explosif avec Tobio Kageyama.', '#FF6600', '🏐', 'top', 9, 'images/haikyuu.png', 'Sports,Drama'),
(26, 'Blue Lock', 'Burū Rokku', 'blue-lock', 2024, 9.1, 24, 'En cours', '300 des meilleurs jeunes attaquants de football du Japon sont enfermés dans un programme secret appelé Blue Lock. Leur objectif : devenir l''attaquant égoïste le plus puissant au monde.', '#0047AB', '⚽', 'new', NULL, 'images/blue-lock.png', 'Sports,Psychological'),
(27, 'Kuroko no Basket', 'Kuroko no Basuketto', 'kuroko-no-basket', 2015, 8.9, 75, 'Terminé', 'Tetsuya Kuroko, un joueur de basket au talent invisible, s''associe avec Taiga Kagami, un prodige revenu des États-Unis, pour vaincre la Génération des Miracles.', '#4169E1', '🏀', NULL, NULL, 'images/kuroko-no-basket.png', 'Sports,Drama'),
(28, 'Hajime no Ippo', 'Hajime no Ippo', 'hajime-no-ippo', 2009, 9.2, 76, 'Terminé', 'Ippo Makunouchi, un lycéen timide et harcelé, découvre la boxe et se révèle être un prodige du ring. Sous la guidance de son coach Genji Kamogawa, il gravit les échelons du monde professionnel.', '#DC143C', '🥊', NULL, 10, 'images/hajime-no-ippo.png', 'Sports,Drama'),
(29, 'Ping Pong the Animation', 'Pingu Pongu Taishō', 'ping-pong-the-animation', 2014, 8.8, 11, 'Terminé', 'Deux amis d''enfance, Peco et Smile, pratiquent le tennis de table depuis leur plus jeune âge. Leur parcours les confronte au talent brut, à la pression de la compétition et au sens profond du sport.', '#228B22', '🏓', NULL, NULL, 'images/ping-pong.png', 'Sports,Drama'),
(30, 'Run with the Wind', 'Kaze ga Tsuyoku Fuiteiru', 'run-with-the-wind', 2019, 9.0, 23, 'Terminé', 'Kakeru Kurahara, un ancien coureur de fond talentueux mais brisé, est recruté par Haiji Kiyose pour former une équipe de 10 étudiants et participer au célèbre relais Hakone Ekiden.', '#FF8C00', '🏃', NULL, NULL, 'images/run-with-the-wind.png', 'Sports,Drama');


-- ============================================================
--  DONNÉES INITIALES : Saisons (exemples pour quelques animes)
-- ============================================================

INSERT INTO `seasons` (`anime_id`, `season_number`, `title`, `description`, `year`, `episode_count`) VALUES
-- Attack on Titan
(1, 1, 'Saison 1', 'Arc du siège de Trost et la découverte du pouvoir titan d''Eren', 2013, 25),
(1, 2, 'Saison 2', 'Arc de la traîtrise et la bataille de Shiganshina', 2017, 12),
(1, 3, 'Saison 3 Partie 1', 'Arc de l''intérieur des murs et la révélation des origines', 2018, 12),
(1, 4, 'Saison 3 Partie 2', 'Arc de la bataille finale contre le Titan Bestial', 2019, 10),
(1, 5, 'Saison 4 Partie 1', 'La guerre de libération - Arc Marley', 2020, 16),
(1, 6, 'Saison 4 Partie 2', 'La guerre de libération - La bataille finale', 2022, 12),
-- Demon Slayer
(3, 1, 'Saison 1 - Récit de Tanjiro', 'Arc de la formation et du mont Natagumo', 2019, 26),
(3, 2, 'Saison 2 - Train de l''Infini', 'Arc du train de l''infini et du quartier des plaisirs', 2021, 18),
(3, 3, 'Saison 3 - Village des Forgerons', 'Arc du village des forgerons et des épées', 2023, 11),
-- Jujutsu Kaisen
(2, 1, 'Saison 1', 'Arc de l''institution Jujutsu et le tournoi d''échange', 2020, 24),
(2, 2, 'Saison 2 - Shibuya', 'Arc de l''incident de Shibuya', 2023, 24),
-- One Piece
(4, 1, 'Saison 1 - East Blue', 'Début de l''aventure et recrutement de l''équipage', 1999, 61),
(4, 2, 'Saison 2 - Alabasta', 'Arc Alabasta et la confrontation avec Baroque Works', 2001, 130),
(4, 3, 'Saison 3 - Skypiea', 'Arc Skypiea et l''île dans les cieux', 2003, 207),
(4, 4, 'Saison 4 - Egghead Arc', 'Arc Egghead - les dernières aventures', 2024, 24),
-- Solo Leveling
(5, 1, 'Saison 1', 'Arc de l''éveil du système et les premiers donjons', 2024, 12),
(5, 2, 'Saison 2 - Arise from the Shadow', 'Arc de la montée en puissance et les monstres S-rang', 2025, 12),
-- My Hero Academia
(6, 1, 'Saison 7', 'Dernière saison avec la guerre finale des héros', 2024, 25),
-- Spy x Family
(7, 1, 'Saison 1', 'La formation de la famille Forger', 2022, 12),
(7, 2, 'Saison 2', 'Nouvelles missions familiales', 2023, 12),
(7, 3, 'Saison 3', 'Les aventures continuent', 2024, 13),
-- Frieren
(9, 1, 'Saison 1', 'Le voyage de Frieren après la défaite du Roi Démon', 2023, 28),
-- Mushoku Tensei
(17, 1, 'Saison 1', 'Renaissance dans un nouveau monde', 2021, 11),
(17, 2, 'Saison 2', 'Arc de l''université de magie', 2023, 12),
(17, 3, 'Saison 3', 'Arc des aventures avancées', 2024, 12),
-- Oshi no Ko
(21, 1, 'Saison 1', 'La renaissance dans le monde du spectacle', 2023, 11),
(21, 2, 'Saison 2', 'Arc du thriller théâtral', 2024, 12),
-- Made in Abyss
(20, 1, 'Saison 1', 'La descente dans l''Abyss commence', 2017, 13),
(20, 2, 'Saison 2 - Golden City of the Scorching Sun', 'Arc de la cité dorée', 2022, 12),
-- Blue Lock
(26, 1, 'Saison 1', 'Le début du programme Blue Lock', 2022, 24),
(26, 2, 'Saison 2 - U-20 World Cup', 'Arc de la coupe du monde U-20', 2024, 24),
-- Haikyuu!!
(25, 1, 'Saison 1', 'Les débuts de Karasuno', 2014, 25),
(25, 2, 'Saison 2', 'Arc du tournoi du printemps', 2015, 25),
(25, 3, 'Saison 3', 'Arc des qualifications', 2016, 10),
(25, 4, 'Saison 4', 'Arc de la bataille de la décharge', 2020, 25),
-- Kuroko no Basket
(27, 1, 'Saison 1', 'Formation de l''équipe Seirin', 2012, 25),
(27, 2, 'Saison 2 - Winter Cup', 'Arc de la Winter Cup', 2013, 25),
(27, 3, 'Saison 3 - Winter Cup Finals', 'Finales de la Winter Cup', 2015, 25),
-- Hajime no Ippo
(28, 1, 'Saison 1 - The Fighting!', 'Les débuts professionnels d''Ippo', 2000, 75),
(28, 2, 'Saison 2 - New Challenger', 'Arc des nouveaux défis', 2009, 26),
(28, 3, 'Saison 3 - Rising', 'Arc de la montée vers le titre', 2013, 25);


-- ============================================================
--  PROCÉDURE STOCKÉE : Générer les épisodes pour un anime
--  Utilisez-la pour remplir rapidement la table episodes
-- ============================================================

DELIMITER //

CREATE PROCEDURE `generate_episodes_for_anime`(
  IN p_anime_id INT,
  IN p_season_id INT,
  IN p_start_ep INT,
  IN p_end_ep INT,
  IN p_anime_title VARCHAR(255)
)
BEGIN
  DECLARE i INT DEFAULT p_start_ep;
  DECLARE ep_titles TEXT;
  DECLARE ep_title VARCHAR(255);

  SET ep_titles = 'Le Commencement|L''Éveil|La Confrontation|Le Choix|L''Épreuve|Révélations|La Trahison|Le Duel|Rédemption|Le Sacrifice|Nouveau Pouvoir|L''Alliance|Le Passé|L''Assaut|La Vérité|Le Tournoi|Les Ténèbres|L''Espoir|La Bataille Finale|L''Aube|Renaissance|Le Secret|La Quête|Le Champion';

  WHILE i <= p_end_ep DO
    SET ep_title = CONCAT('Ep. ', i, ' - ', SUBSTRING_INDEX(SUBSTRING_INDEX(ep_titles, '|', ((i - 1) % 24) + 1), '|', -1));
    INSERT INTO `episodes` (`anime_id`, `season_id`, `episode_number`, `title`, `description`, `duration`, `is_free`)
    VALUES (
      p_anime_id,
      IFNULL(p_season_id, NULL),
      i,
      ep_title,
      CONCAT('Épisode ', i, ' de ', p_anime_title, '. Les événements prennent une tournure inattendue...'),
      CONCAT(LPAD(20 + FLOOR(RAND() * 5), 2, '0'), ':', LPAD(FLOOR(RAND() * 60), 2, '0')),
      IF(i <= 2, 1, 0)
    );
    SET i = i + 1;
  END WHILE;
END //

DELIMITER ;

-- ============================================================
--  GÉNÉRER LES ÉPISODES POUR CHAQUE ANIME
--  Appel de la procédure stockée pour les 30 animes
-- ============================================================

-- Attack on Titan (87 épisodes répartis en 6 saisons)
CALL generate_episodes_for_anime(1, 1, 1, 25, 'Attack on Titan');
CALL generate_episodes_for_anime(1, 2, 26, 37, 'Attack on Titan');
CALL generate_episodes_for_anime(1, 3, 38, 49, 'Attack on Titan');
CALL generate_episodes_for_anime(1, 4, 50, 59, 'Attack on Titan');
CALL generate_episodes_for_anime(1, 5, 60, 75, 'Attack on Titan');
CALL generate_episodes_for_anime(1, 6, 76, 87, 'Attack on Titan');

-- Jujutsu Kaisen (48 épisodes)
CALL generate_episodes_for_anime(2, 1, 1, 24, 'Jujutsu Kaisen');
CALL generate_episodes_for_anime(2, 2, 25, 48, 'Jujutsu Kaisen');

-- Demon Slayer (55 épisodes)
CALL generate_episodes_for_anime(3, 1, 1, 26, 'Demon Slayer');
CALL generate_episodes_for_anime(3, 2, 27, 44, 'Demon Slayer');
CALL generate_episodes_for_anime(3, 3, 45, 55, 'Demon Slayer');

-- One Piece (24 épisodes visibles - Egghead Arc)
CALL generate_episodes_for_anime(4, 4, 1, 24, 'One Piece - Egghead Arc');

-- Solo Leveling (24 épisodes)
CALL generate_episodes_for_anime(5, 1, 1, 12, 'Solo Leveling');
CALL generate_episodes_for_anime(5, 2, 13, 24, 'Solo Leveling');

-- My Hero Academia (25 épisodes - S7)
CALL generate_episodes_for_anime(6, 1, 1, 25, 'My Hero Academia S7');

-- Spy x Family (37 épisodes)
CALL generate_episodes_for_anime(7, 1, 1, 12, 'Spy x Family');
CALL generate_episodes_for_anime(7, 2, 13, 24, 'Spy x Family');
CALL generate_episodes_for_anime(7, 3, 25, 37, 'Spy x Family');

-- Chainsaw Man (12 épisodes)
CALL generate_episodes_for_anime(8, NULL, 1, 12, 'Chainsaw Man');

-- Frieren (28 épisodes)
CALL generate_episodes_for_anime(9, 1, 1, 28, 'Frieren');

-- Vinland Saga (24 épisodes - S2)
CALL generate_episodes_for_anime(10, NULL, 1, 24, 'Vinland Saga S2');

-- Your Lie in April (22 épisodes)
CALL generate_episodes_for_anime(11, NULL, 1, 22, 'Your Lie in April');

-- Steins;Gate (24 épisodes)
CALL generate_episodes_for_anime(12, NULL, 1, 24, 'Steins;Gate');

-- Death Note (37 épisodes)
CALL generate_episodes_for_anime(13, NULL, 1, 37, 'Death Note');

-- Horimiya (13 épisodes)
CALL generate_episodes_for_anime(14, NULL, 1, 13, 'Horimiya');

-- Neon Genesis Evangelion (26 épisodes)
CALL generate_episodes_for_anime(15, NULL, 1, 26, 'Evangelion');

-- Tokyo Ghoul (48 épisodes)
CALL generate_episodes_for_anime(16, NULL, 1, 48, 'Tokyo Ghoul');

-- Mushoku Tensei (12 épisodes - S3)
CALL generate_episodes_for_anime(17, 3, 1, 12, 'Mushoku Tensei S3');

-- Cyberpunk Edgerunners (10 épisodes)
CALL generate_episodes_for_anime(18, NULL, 1, 10, 'Cyberpunk Edgerunners');

-- Kaguya-sama (37 épisodes)
CALL generate_episodes_for_anime(19, NULL, 1, 37, 'Kaguya-sama');

-- Made in Abyss (12 épisodes - S2)
CALL generate_episodes_for_anime(20, 2, 1, 12, 'Made in Abyss S2');

-- Oshi no Ko (12 épisodes - S2)
CALL generate_episodes_for_anime(21, 2, 1, 12, 'Oshi no Ko S2');

-- Ghost in the Shell (24 épisodes)
CALL generate_episodes_for_anime(22, NULL, 1, 24, 'Ghost in the Shell');

-- Another (12 épisodes)
CALL generate_episodes_for_anime(23, NULL, 1, 12, 'Another');

-- Bocchi the Rock! (12 épisodes)
CALL generate_episodes_for_anime(24, NULL, 1, 12, 'Bocchi the Rock!');

-- Haikyuu!! (25 épisodes - Battle of the Garbage Dump)
CALL generate_episodes_for_anime(25, 4, 1, 25, 'Haikyuu!!');

-- Blue Lock (24 épisodes - S2)
CALL generate_episodes_for_anime(26, 2, 1, 24, 'Blue Lock S2');

-- Kuroko no Basket (25 épisodes - Winter Cup)
CALL generate_episodes_for_anime(27, 3, 1, 25, 'Kuroko no Basket');

-- Hajime no Ippo (25 épisodes - New Challenger)
CALL generate_episodes_for_anime(28, 2, 1, 25, 'Hajime no Ippo');

-- Ping Pong the Animation (11 épisodes)
CALL generate_episodes_for_anime(29, NULL, 1, 11, 'Ping Pong the Animation');

-- Run with the Wind (23 épisodes)
CALL generate_episodes_for_anime(30, NULL, 1, 23, 'Run with the Wind');


-- ============================================================
--  VUES UTILES
-- ============================================================

-- Vue : Liste complète des épisodes avec info anime
CREATE OR REPLACE VIEW `v_episodes_full` AS
SELECT
  e.id AS episode_id,
  e.episode_number,
  e.title AS episode_title,
  e.description AS episode_description,
  e.duration,
  e.video_url_1080,
  e.video_url_720,
  e.video_url_480,
  e.air_date,
  e.is_free,
  a.id AS anime_id,
  a.title AS anime_title,
  a.title_jp,
  a.slug AS anime_slug,
  a.image AS anime_image,
  a.color AS anime_color,
  a.status AS anime_status,
  a.rating,
  s.id AS season_id,
  s.title AS season_title,
  s.season_number
FROM `episodes` e
LEFT JOIN `animes` a ON e.anime_id = a.id
LEFT JOIN `seasons` s ON e.season_id = s.id
ORDER BY a.title, e.episode_number;

-- Vue : Statistiques par anime
CREATE OR REPLACE VIEW `v_anime_stats` AS
SELECT
  a.id,
  a.title,
  a.slug,
  a.status,
  a.rating,
  COUNT(DISTINCT e.id) AS episode_count_in_db,
  COUNT(DISTINCT s.id) AS season_count
FROM `animes` a
LEFT JOIN `episodes` e ON e.anime_id = a.id
LEFT JOIN `seasons` s ON s.anime_id = a.id
GROUP BY a.id;


-- ============================================================
--  NETTOYAGE : Supprimer la procédure temporaire
-- ============================================================
DROP PROCEDURE IF EXISTS `generate_episodes_for_anime`;


-- ============================================================
--  FIN - La base est prête !
-- ============================================================
-- Résumé des tables créées :
--   - animes       : 30 enregistrements
--   - seasons      : ~35 enregistrements
--   - episodes     : ~700+ enregistrements
--   - users        : 0 (vide, inscrivez-vous via le site)
--   - subscriptions: 0 (vide, activées via le site)
--   - my_list      : 0 (vide, gérée via le site)
--   - vues         : v_episodes_full, v_anime_stats
-- ============================================================