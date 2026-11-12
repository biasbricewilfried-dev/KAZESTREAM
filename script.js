/* ============================================
   KAZESTREAM - JavaScript V2
   Toutes fonctionnalités activées
   ============================================ */

// ===== BASE DE DONNÉES ANIME =====
const animeDatabase = [
    { id:1, title:"Attack on Titan", titleJp:"Shingeki no Kyojin", year:2023, rating:9.8, episodes:87, status:"Terminé", description:"Dans un monde où l'humanité vit enfermée derrière d'immenses murs pour se protéger des Titans, des créatures géantes qui dévorent les humains, Eren Yeager et ses amis rejoignent l'armée pour combattre ces monstres après la destruction de leur ville natale.", color:"#8B0000", emoji:"⚔️", badge:"top", rank:1, image:"images/attack-on-titan.png", episodeList:generateEpisodes(87,"Attack on Titan") },
    { id:2, title:"Jujutsu Kaisen", titleJp:"Jujutsu Kaisen", year:2024, rating:9.5, episodes:48, status:"En cours", description:"Yuji Itadori, un lycéen aux capacités physiques exceptionnelles, rejoint une organisation secrète de sorciers après avoir avalé un doigt maudit appartenant au Roi des Malédictions, Ryomen Sukuna.", color:"#4B0082", emoji:"👁️", badge:"new", rank:2, image:"images/jujutsu-kaisen.png", episodeList:generateEpisodes(48,"Jujutsu Kaisen") },
    { id:3, title:"Demon Slayer", titleJp:"Kimetsu no Yaiba", year:2024, rating:9.4, episodes:55, status:"En cours", description:"Tanjiro Kamado devient un chasseur de démons après que sa famille a été massacrée et sa jeune sœur Nezuko transformée en démon. Il part en voyage pour trouver un remède et venger sa famille.", color:"#006400", emoji:"🔥", badge:"new", rank:3, image:"images/demon-slayer.png", episodeList:generateEpisodes(55,"Demon Slayer") },
    { id:4, title:"One Piece", titleJp:"One Piece", year:2024, rating:9.7, episodes:1100, status:"En cours", description:"Monkey D. Luffy, un jeune garçon dont le corps est devenu élastique après avoir mangé un Fruit du Démon, explore la Grand Line à la recherche du trésor légendaire One Piece pour devenir le Roi des Pirates.", color:"#FF4500", emoji:"🏴‍☠️", badge:"top", rank:4, image:"images/one-piece.png", episodeList:generateEpisodes(24,"One Piece - Egghead Arc") },
    { id:5, title:"Solo Leveling", titleJp:"Ore dake Level Up na Ken", year:2024, rating:9.3, episodes:24, status:"En cours", description:"Sung Jin-Woo, le chasseur le plus faible de l'humanité, découvre un système mystérieux qui lui permet de monter en niveau seul dans les donjons remplis de monstres.", color:"#191970", emoji:"⬆️", badge:"new", rank:5, image:"images/solo-leveling.png", episodeList:generateEpisodes(24,"Solo Leveling") },
    { id:6, title:"My Hero Academia", titleJp:"Boku no Hero Academia", year:2024, rating:8.9, episodes:138, status:"En cours", description:"Dans un monde où 80% de la population possède des super-pouvoirs, Izuku Midoriya, né sans pouvoir, rêve de devenir le plus grand héros grâce à son courage et sa détermination.", color:"#228B22", emoji:"💪", badge:null, rank:null, image:"images/my-hero-academia.png", episodeList:generateEpisodes(25,"My Hero Academia S7") },
    { id:7, title:"Spy x Family", titleJp:"Spy x Family", year:2024, rating:9.0, episodes:37, status:"En cours", description:"Un espion, une assassine et une télépathe forment une famille de façade pour accomplir leurs missions respectives, sans savoir les secrets des uns et des autres.", color:"#FF69B4", emoji:"🕵️", badge:"new", rank:null, image:"images/spy-x-family.png", episodeList:generateEpisodes(12,"Spy x Family S3") },
    { id:8, title:"Chainsaw Man", titleJp:"Chainsaw Man", year:2023, rating:9.1, episodes:12, status:"En attente", description:"Denji, un jeune homme endetté, fusionne avec son démon-chainsaw pour devenir le Chainsaw Man, un chasseur de démons au service du gouvernement.", color:"#8B0000", emoji:"🪚", badge:null, rank:null, image:"images/chainsaw-man.png", episodeList:generateEpisodes(12,"Chainsaw Man") },
    { id:9, title:"Frieren: Beyond Journey's End", titleJp:"Sousou no Frieren", year:2024, rating:9.6, episodes:28, status:"Terminé", description:"Frieren, une elfe magicienne, voyage avec ses compagnons pour vaincre le Roi Démon. Après leur victoire, elle réalise l'importance des relations humaines et entreprend un nouveau voyage pour comprendre les émotions.", color:"#4169E1", emoji:"✨", badge:"new", rank:6, image:"images/frieren.png", episodeList:generateEpisodes(28,"Frieren") },
    { id:10, title:"Vinland Saga", titleJp:"Vinland Saga", year:2023, rating:9.2, episodes:48, status:"Terminé", description:"Thorfinn, le fils d'un grand guerrier, cherche la terre paradisiaque de Vinland tout en luttant contre la violence et en cherchant la rédemption dans l'ère des Vikings.", color:"#556B2F", emoji:"🛡️", badge:null, rank:null, image:"images/vinland-saga.png", episodeList:generateEpisodes(24,"Vinland Saga S2") },
    { id:11, title:"Your Lie in April", titleJp:"Shigatsu wa Kimi no Uso", year:2015, rating:9.0, episodes:22, status:"Terminé", description:"Kousei Arima, un pianiste prodige qui a perdu le talent d'entendre les notes après la mort de sa mère, retrouve sa passion pour la musique grâce à une violoniste libre et enjouée.", color:"#FFB6C1", emoji:"🎹", badge:null, rank:null, image:"images/your-lie-in-april.png", episodeList:generateEpisodes(22,"Your Lie in April") },
    { id:12, title:"Steins;Gate", titleJp:"Steins;Gate", year:2011, rating:9.5, episodes:24, status:"Terminé", description:"Rintaro Okabe, un scientifique autoproclamé, découvre par accident un moyen d'envoyer des messages dans le passé, ce qui le plonge dans un complot qui menace l'avenir de l'humanité.", color:"#008080", emoji:"⏰", badge:"top", rank:7, image:"images/steins-gate.png", episodeList:generateEpisodes(24,"Steins;Gate") },
    { id:13, title:"Death Note", titleJp:"Desu Noto", year:2007, rating:9.4, episodes:37, status:"Terminé", description:"Light Yagami, un lycéen brillant, trouve un carnet surnaturel qui lui permet de tuer quiconque dont il écrit le nom, et se prend pour un dieu de la justice face au détective L.", color:"#2F2F2F", emoji:"📓", badge:null, rank:8, image:"images/death-note.png", episodeList:generateEpisodes(37,"Death Note") },
    { id:14, title:"Horimiya", titleJp:"Hori miya", year:2021, rating:8.8, episodes:13, status:"Terminé", description:"Kyoko Hori, la fille populaire, et Izumi Miyamura, le garçon solitaire, découvrent les faces cachées de leur personnalité et développent une relation amoureuse.", color:"#FF1493", emoji:"💕", badge:null, rank:null, image:"images/horimiya.png", episodeList:generateEpisodes(13,"Horimiya") },
    { id:15, title:"Neon Genesis Evangelion", titleJp:"Shinseiki Evangelion", year:1995, rating:9.0, episodes:26, status:"Terminé", description:"Shinji Ikari est recruté pour piloter un robot géant appelé Evangelion pour combattre des êtres mystérieux nommés Anges qui menacent l'humanité.", color:"#800080", emoji:"🤖", badge:null, rank:null, image:"images/evangelion.png", episodeList:generateEpisodes(26,"Evangelion") },
    { id:16, title:"Tokyo Ghoul", titleJp:"Tokyo Guru", year:2018, rating:8.7, episodes:48, status:"Terminé", description:"Ken Kaneki, un étudiant ordinaire, est transformé en demi-ghoul après une rencontre mortelle et doit naviguer entre le monde humain et la société secrète des goules.", color:"#8B0000", emoji:"👁️‍🗨️", badge:null, rank:null, image:"images/tokyo-ghoul.png", episodeList:generateEpisodes(48,"Tokyo Ghoul") },
    { id:17, title:"Mushoku Tensei", titleJp:"Mushoku Tensei: Isekai Ittara Honki Dasu", year:2024, rating:9.1, episodes:35, status:"En cours", description:"Un homme sans emploi meurt et renaît dans un monde de fantasy en tant que bébé nommé Rudeus Greyrat, avec tous ses souvenirs intacts, déterminé à vivre une vie dont il ne regrettera rien.", color:"#2E8B57", emoji:"🌀", badge:"new", rank:null, image:"images/mushoku-tensei.png", episodeList:generateEpisodes(12,"Mushoku Tensei S3") },
    { id:18, title:"Cyberpunk: Edgerunners", titleJp:"Cyberpunk: Edgerunners", year:2022, rating:9.0, episodes:10, status:"Terminé", description:"Dans la mégalopole de Night City, un jeune sans-avenir décide de devenir un edgerunner, un mercenaire cybernétique, pour survivre et changer son destin.", color:"#FFD700", emoji:"🌆", badge:null, rank:null, image:"images/cyberpunk-edgerunners.png", episodeList:generateEpisodes(10,"Edgerunners") },
    { id:19, title:"Kaguya-sama: Love is War", titleJp:"Kaguya-sama wa Kokurasetai", year:2022, rating:9.0, episodes:37, status:"Terminé", description:"Deux génies du lycée, Miyuki Shirogane et Kaguya Shinomiya, se font la guerre psychologique car aucun ne veut avouer ses sentiments en premier.", color:"#FF6347", emoji:"💘", badge:null, rank:null, image:"images/kaguya-sama.png", episodeList:generateEpisodes(37,"Kaguya-sama") },
    { id:20, title:"Made in Abyss", titleJp:"Made in Abyss", year:2022, rating:9.1, episodes:25, status:"En cours", description:"Riko, une jeune orpheline, et Reg, un robot amnésique, descendent dans l'Abyss, un immense gouffre mystérieux rempli de créatures et de reliques anciennes, à la recherche de la mère de Riko.", color:"#4682B4", emoji:"🕳️", badge:null, rank:null, image:"images/made-in-abyss.png", episodeList:generateEpisodes(12,"Made in Abyss S2") },
    { id:21, title:"Oshi no Ko", titleJp:"Oshi no Ko", year:2024, rating:9.2, episodes:23, status:"En cours", description:"Un médecin et sa patiente, fans d'une idole, renaissent sous de nouvelles formes dans le monde du divertissement, confrontés aux sombres réalités de l'industrie.", color:"#DA70D6", emoji:"⭐", badge:"new", rank:null, image:"images/oshi-no-ko.png", episodeList:generateEpisodes(12,"Oshi no Ko S2") },
    { id:22, title:"Ghost in the Shell: SAC_2045", titleJp:"Koukaku Kidoutai: SAC_2045", year:2020, rating:8.5, episodes:24, status:"Terminé", description:"En 2045, la Section 9 dirigée par la Major Motoko Kusanagi fait face à une nouvelle menace post-humaniste alors que le monde est transformé par l'intelligence artificielle et la post-vérité.", color:"#708090", emoji:"🌐", badge:null, rank:null, image:"images/ghost-in-the-shell.png", episodeList:generateEpisodes(24,"Ghost in the Shell") },
    { id:23, title:"Another", titleJp:"Another", year:2012, rating:8.6, episodes:12, status:"Terminé", description:"Kouichi Sakakibara, transféré dans une nouvelle classe, découvre une malédiction qui frappe les élèves un par un avec des morts mystérieuses et violentes.", color:"#2F4F4F", emoji:"💀", badge:null, rank:null, image:"images/another.png", episodeList:generateEpisodes(12,"Another") },
    { id:24, title:"Bocchi the Rock!", titleJp:"Bocchi za Rokku!", year:2022, rating:9.0, episodes:12, status:"Terminé", description:"Hitori Gotoh, une lycéenne ultra-timide et virtuose de la guitare, rejoint un groupe de rock et découvre l'amitié et la musique en direct.", color:"#FF69B4", emoji:"🎸", badge:null, rank:null, image:"images/bocchi-the-rock.png", episodeList:generateEpisodes(12,"Bocchi the Rock!") },
    { id:25, title:"Haikyuu!!", titleJp:"Haikyuu!!", year:2024, rating:9.3, episodes:85, status:"Terminé", description:"Shoyo Hinata, un petit garçon passionné de volley-ball, rêve de devenir le meilleur attaquant malgré sa petite taille. Il rejoint le lycée Karasuno et forme un duo explosif avec Tobio Kageyama, un prodige du passe.", color:"#FF6600", emoji:"🏐", badge:"top", rank:9, image:"images/haikyuu.png", episodeList:generateEpisodes(25,"Haikyuu!! - Battle of the Garbage Dump") },
    { id:26, title:"Blue Lock", titleJp:"Burū Rokku", year:2024, rating:9.1, episodes:24, status:"En cours", description:"300 des meilleurs jeunes attaquants de football du Japon sont enfermés dans un programme secret appelé Blue Lock. Leur objectif : devenir l'attaquant égoïste le plus puissant au monde, sous la direction du mystérieux Jinpachi Ego.", color:"#0047AB", emoji:"⚽", badge:"new", rank:null, image:"images/blue-lock.png", episodeList:generateEpisodes(24,"Blue Lock S2") },
    { id:27, title:"Kuroko no Basket", titleJp:"Kuroko no Basuketto", year:2015, rating:8.9, episodes:75, status:"Terminé", description:"Tetsuya Kuroko, un joueur de basket au talent invisible, s'associe avec Taiga Kagami, un prodige revenu des États-Unis, pour vaincre la Génération des Miracles, les cinq meilleurs joueurs de leur génération.", color:"#4169E1", emoji:"🏀", badge:null, rank:null, image:"images/kuroko-no-basket.png", episodeList:generateEpisodes(25,"Kuroko no Basket - Winter Cup") },
    { id:28, title:"Hajime no Ippo", titleJp:"Hajime no Ippo", year:2009, rating:9.2, episodes:76, status:"Terminé", description:"Ippo Makunouchi, un lycéen timide et harcelé, découvre la boxe et se révèle être un prodige du ring. Sous la guidance de son coach Genji Kamogawa, il gravit les échelons du monde professionnel avec determination et courage.", color:"#DC143C", emoji:"🥊", badge:null, rank:10, image:"images/hajime-no-ippo.png", episodeList:generateEpisodes(25,"Hajime no Ippo - New Challenger") },
    { id:29, title:"Ping Pong the Animation", titleJp:"Pingu Pongu Taishō", year:2014, rating:8.8, episodes:11, status:"Terminé", description:"Deux amis d'enfance, Peco et Smile, pratiquent le tennis de table depuis leur plus jeune âge. Leur parcours les confronte au talent brut, à la pression de la compétition et au sens profond du sport.", color:"#228B22", emoji:"🏓", badge:null, rank:null, image:"images/ping-pong.png", episodeList:generateEpisodes(11,"Ping Pong the Animation") },
    { id:30, title:"Run with the Wind", titleJp:"Kaze ga Tsuyoku Fuiteiru", year:2019, rating:9.0, episodes:23, status:"Terminé", description:"Kakeru Kurahara, un ancien coureur de fond talentueux mais brisé, est recruté par Haiji Kiyose pour former une équipe de 10 étudiants et participer au célèbre relais Hakone Ekiden, l'une des courses les plus prestigieuses du Japon.", color:"#FF8C00", emoji:"🏃", badge:null, rank:null, image:"images/run-with-the-wind.png", episodeList:generateEpisodes(23,"Run with the Wind") }
];

// Trier par ordre alphabétique
animeDatabase.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));

function generateEpisodes(count, animeTitle) {
    const names = ["Le Commencement","L'Éveil","La Confrontation","Le Choix","L'Épreuve","Révélations","La Trahison","Le Duel","Rédemption","Le Sacrifice","Nouveau Pouvoir","L'Alliance","Le Passé","L'Assaut","La Vérité","Le Tournoi","Les Ténèbres","L'Espoir","La Bataille Finale","L'Aube","Renaissance","Le Secret","La Quête","Le Champion"];
    const episodes = [];
    for (let i = 1; i <= count; i++) {
        episodes.push({ number: i, title: `Ep. ${i} - ${names[(i-1) % names.length]}`, duration: `${20+Math.floor(Math.random()*5)}:${String(Math.floor(Math.random()*60)).padStart(2,'0')}`, description: `Épisode ${i} de ${animeTitle}. Les événements prennent une tournure inattendue...` });
    }
    return episodes;
}

// ===== ÉTAT =====
const state = {
    currentAnime: null,
    myList: JSON.parse(localStorage.getItem('kazestream-mylist') || '[]'),
    user: JSON.parse(localStorage.getItem('kazestream-user') || 'null'),
    subscription: JSON.parse(localStorage.getItem('kazestream-sub') || 'null'),
    settings: JSON.parse(localStorage.getItem('kazestream-settings') || '{"theme":"dark"}'),
    searchQuery: '',
    isPlaying: false,
    currentEpisode: 1
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.settings.theme);
    updateUIForAuth();
    initNavbar();
    initHero();
    renderAllRows();
    initSearch();
    initModals();
    initVideoPlayer();
    initDownloadModal();
    initNotifications();
    initScrollEffects();
});

// ===== THEME =====
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const switchEl = document.getElementById('themeSwitch');
    if (switchEl) switchEl.checked = theme === 'light';
    state.settings.theme = theme;
    localStorage.setItem('kazestream-settings', JSON.stringify(state.settings));
}

function toggleTheme() {
    const newTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(newTheme === 'dark' ? '🌙' : '☀️', 'Thème', `Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`);
    const profileDropdown = document.getElementById('profileDropdown');
    if (profileDropdown) profileDropdown.classList.remove('open');
}

// ===== AUTH SYSTEM =====
function openAuthModal(tab = 'login') {
    switchAuthTab(tab);
    document.getElementById('authModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('profileDropdown').classList.remove('open');
}

function closeAuthModal() {
    document.getElementById('authModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.getElementById('loginForm').style.display = tab === 'login' ? 'flex' : 'none';
    document.getElementById('registerForm').style.display = tab === 'register' ? 'flex' : 'none';
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.innerHTML = isPassword
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (!email || !password) return;

    // Check registered users
    const users = JSON.parse(localStorage.getItem('kazestream-users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    const user = found || { firstName: email.split('@')[0], lastName: '', email, phone: '', favGenres: [] };

    state.user = { ...user, loginDate: new Date().toISOString() };
    localStorage.setItem('kazestream-user', JSON.stringify(state.user));
    closeAuthModal();
    updateUIForAuth();
    showToast('🎉', 'Bienvenue !', `Connecté en tant que ${state.user.firstName}`);
}

function handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById('regFirstName').value;
    const lastName = document.getElementById('regLastName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regPasswordConfirm').value;

    if (password !== confirm) { showToast('⚠️', 'Erreur', 'Les mots de passe ne correspondent pas.'); return; }
    if (password.length < 8) { showToast('⚠️', 'Erreur', 'Le mot de passe doit contenir au moins 8 caractères.'); return; }

    const user = { firstName, lastName, email, phone, password, favGenres: [], registerDate: new Date().toISOString() };

    // Save to users list
    const users = JSON.parse(localStorage.getItem('kazestream-users') || '[]');
    users.push(user);
    localStorage.setItem('kazestream-users', JSON.stringify(users));

    state.user = { firstName, lastName, email, phone, favGenres: [], loginDate: new Date().toISOString() };
    localStorage.setItem('kazestream-user', JSON.stringify(state.user));
    closeAuthModal();
    updateUIForAuth();
    showToast('🎉', 'Compte créé !', `Bienvenue ${firstName} ! Votre compte a été créé avec succès.`);
}

function logoutUser() {
    state.user = null;
    localStorage.removeItem('kazestream-user');
    updateUIForAuth();
    showToast('👋', 'Déconnexion', 'À bientôt !');
    document.getElementById('profileDropdown').classList.remove('open');
}

function whatsappLogin() {
    closeAuthModal();
    window.open('https://wa.me/237600000000?text=Bonjour%20KazeStream%20!%20Je%20veux%20créer%20mon%20compte.', '_blank');
    showToast('📱', 'WhatsApp', 'Redirection vers WhatsApp pour l\'inscription...');
}

function updateUIForAuth() {
    const loggedIn = document.getElementById('dropdownLoggedIn');
    const loggedOut = document.getElementById('dropdownLoggedOut');
    const navAvatar = document.getElementById('navAvatar');
    const bookmarkBtn = document.getElementById('bookmarkBtn');

    if (state.user) {
        loggedIn.style.display = '';
        loggedOut.style.display = 'none';
        navAvatar.textContent = state.user.firstName ? state.user.firstName.charAt(0).toUpperCase() : 'O';
        navAvatar.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-dark))';
    } else {
        loggedIn.style.display = 'none';
        loggedOut.style.display = '';
        navAvatar.textContent = 'O';
        navAvatar.style.background = 'linear-gradient(135deg, var(--text-muted), #555)';
    }
}

// ===== PROFILE MODAL =====
function openProfileModal() {
    if (!state.user) { openAuthModal('login'); return; }
    const displayName = `${state.user.firstName || ''} ${state.user.lastName || ''}`.trim() || 'Kaze';
    document.getElementById('profileDisplayName').textContent = displayName;
    document.getElementById('profileDisplayEmail').textContent = state.user.email;
    document.getElementById('profileAvatarLarge').textContent = displayName.charAt(0).toUpperCase();

    const isPremium = state.subscription && state.subscription.active;
    document.getElementById('profileBadge').textContent = isPremium ? 'Premium' : 'Gratuit';
    document.getElementById('profileBadgeVerified').style.display = isPremium ? 'flex' : 'none';
    document.getElementById('profileBadge').style.display = isPremium ? 'none' : 'inline-block';
    document.getElementById('subStatusText').textContent = isPremium ? 'Actif' : 'Gratuit';
    document.getElementById('subRenewalText').textContent = isPremium ? formatDate(state.subscription.endDate) : '-';
    document.getElementById('subPaymentText').textContent = isPremium ? (state.subscription.method === 'orange_money' ? 'Orange Money' : 'MTN MoMo') : '-';
    document.getElementById('upgradeBtn').style.display = isPremium ? 'none' : '';

    const watched = Math.floor(Math.random() * 20) + 5;
    const hours = Math.floor(Math.random() * 200) + 30;
    document.getElementById('statWatched').textContent = watched;
    document.getElementById('statHours').textContent = hours;
    document.getElementById('statList').textContent = state.myList.length;
    document.getElementById('statEpisodes').textContent = watched * Math.floor(Math.random() * 10 + 5);

    document.getElementById('profileModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('profileDropdown').classList.remove('open');
}

function closeProfileModal() {
    document.getElementById('profileModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SETTINGS MODAL =====
function openSettingsModal() {
    document.getElementById('settingsModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    if (document.getElementById('profileModalOverlay').classList.contains('active')) closeProfileModal();
    document.getElementById('profileDropdown').classList.remove('open');
}

function closeSettingsModal() {
    document.getElementById('settingsModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function saveSettings() {
    showToast('✅', 'Paramètres', 'Paramètres sauvegardés avec succès !');
    closeSettingsModal();
}

// ===== SUBSCRIPTION MODAL =====
function openSubscriptionModal() {
    const isPremium = state.subscription && state.subscription.active;
    document.getElementById('selectFreeBtn').textContent = isPremium ? 'Plan actuel' : 'Choisir Gratuit';
    document.getElementById('selectPremiumBtn').textContent = isPremium ? 'Déjà Premium' : 'Choisir Premium';
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('paymentStatus').style.display = 'none';
    document.getElementById('paymentSuccess').style.display = 'none';

    document.getElementById('subscriptionModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('profileDropdown').classList.remove('open');
}

function closeSubscriptionModal() {
    document.getElementById('subscriptionModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function selectPlan(plan) {
    if (plan === 'premium') {
        const isPremium = state.subscription && state.subscription.active;
        if (isPremium) { showToast('👑', 'Premium', 'Vous êtes déjà abonné Premium !'); return; }
        document.getElementById('paymentSection').style.display = 'block';
        document.getElementById('paymentSection').scrollIntoView({ behavior: 'smooth' });
    } else {
        state.subscription = { active: false };
        localStorage.setItem('kazestream-sub', JSON.stringify(state.subscription));
        closeSubscriptionModal();
        showToast('ℹ️', 'Plan Gratuit', 'Vous utilisez le plan gratuit.');
    }
}

function onPaymentMethodChange() {
    const method = document.querySelector('input[name="paymentMethod"]:checked');
    if (!method) return;
    document.getElementById('orangeMoneyForm').style.display = method.value === 'orange_money' ? 'block' : 'none';
    document.getElementById('mtnMomoForm').style.display = method.value === 'mtn_momo' ? 'block' : 'none';
}

function processPayment(method) {
    if (method === 'orange_money') {
        const phone = document.getElementById('omPhone').value.replace(/\s/g, '');
        if (phone.length < 9) { showToast('⚠️', 'Erreur', 'Veuillez entrer un numéro Orange Money valide (9 chiffres).'); return; }
    } else {
        const phone = document.getElementById('mtnPhone').value.replace(/\s/g, '');
        if (phone.length < 9) { showToast('⚠️', 'Erreur', 'Veuillez entrer un numéro MTN MoMo valide (9 chiffres).'); return; }
    }

    // Hide forms, show loading
    document.getElementById('orangeMoneyForm').style.display = 'none';
    document.getElementById('mtnMomoForm').style.display = 'none';
    document.getElementById('paymentStatus').style.display = 'block';
    document.getElementById('paymentSuccess').style.display = 'none';

    const methodName = method === 'orange_money' ? 'Orange Money' : 'MTN Mobile Money';

    // Simulate payment processing
    setTimeout(() => {
        document.getElementById('paymentStatusText').textContent = `Envoi de la requête ${methodName}...`;
    }, 1000);

    setTimeout(() => {
        document.getElementById('paymentStatusText').textContent = 'En attente de confirmation de votre part...';
    }, 2500);

    setTimeout(() => {
        document.getElementById('paymentStatusText').textContent = 'Validation du paiement...';
    }, 4000);

    setTimeout(() => {
        // Payment success
        document.getElementById('paymentStatus').style.display = 'none';

        const now = new Date();
        const endDate = new Date(now);
        endDate.setMonth(endDate.getMonth() + 1);

        state.subscription = {
            active: true,
            plan: 'premium',
            method: method,
            amount: 5000,
            currency: 'FCFA',
            startDate: now.toISOString(),
            endDate: endDate.toISOString(),
            autoRenew: true
        };
        localStorage.setItem('kazestream-sub', JSON.stringify(state.subscription));

        const successMsg = method === 'orange_money'
            ? `Paiement de 5 000 FCFA via Orange Money confirmé ! Votre abonnement Premium est actif jusqu'au ${formatDate(endDate.toISOString())}.`
            : `Paiement de 5 000 FCFA via MTN Mobile Money confirmé ! Votre abonnement Premium est actif jusqu'au ${formatDate(endDate.toISOString())}.`;
        document.getElementById('paymentSuccessMsg').textContent = successMsg;
        document.getElementById('paymentSuccess').style.display = 'block';

        updateUIForAuth();
        showToast('🎉', 'Premium activé !', 'Bienvenue dans l\'univers Premium KazeStream !');
    }, 5000);
}

// ===== MY LIST MODAL =====
function openMyListModal() {
    const container = document.getElementById('myListContent');
    if (state.myList.length === 0) {
        container.innerHTML = '<p class="mylist-empty">Votre liste est vide. Cliquez sur l\'icône bookmark d\'un anime pour l\'ajouter.</p>';
    } else {
        container.innerHTML = state.myList.map(id => {
            const anime = animeDatabase.find(a => a.id === id);
            if (!anime) return '';
            return `
                <div class="mylist-anime-item" onclick="closeMyListModal(); openModal(animeDatabase.find(a=>a.id===${anime.id}));">
                    <div class="mylist-anime-thumb"><img src="${anime.image}" alt="${anime.title}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;"></div>
                    <div class="mylist-anime-info">
                        <h4>${anime.title}</h4>
                        <p>${anime.episodes} ep</p>
                    </div>
                    <button class="mylist-remove-btn" onclick="event.stopPropagation(); toggleMyList(${anime.id}); openMyListModal();">Retirer</button>
                </div>
            `;
        }).join('');
    }
    document.getElementById('myListModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMyListModal() {
    document.getElementById('myListModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== INFO MODALS (About, CGU, Privacy, Help, Report) =====
function openAboutModal() {
    document.getElementById('aboutModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeAboutModal() {
    document.getElementById('aboutModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function openCGUModal() {
    document.getElementById('cguModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeCGUModal() {
    document.getElementById('cguModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function openPrivacyModal() {
    document.getElementById('privacyModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closePrivacyModal() {
    document.getElementById('privacyModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function openHelpModal() {
    document.getElementById('helpModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeHelpModal() {
    document.getElementById('helpModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function openReportModal() {
    document.getElementById('reportModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeReportModal() {
    document.getElementById('reportModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function handleReportSubmit(e) {
    e.preventDefault();
    closeReportModal();
    showToast('✅', 'Signalement envoyé', 'Votre signalement a été envoyé. Nous vous répondrons sous 24h.');
}

function closeMoreMenu() {
    const moreDropdown = document.getElementById('moreDropdown');
    if (moreDropdown) moreDropdown.classList.remove('open');
}

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    element.classList.toggle('faq-active');
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        if (icon) icon.textContent = '+';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.textContent = '−';
    }
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchBox = searchBtn.closest('.search-box');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const moreBtn = document.getElementById('moreBtn');
    const moreDropdown = document.getElementById('moreDropdown');

    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
    searchBtn.addEventListener('click', () => { searchBox.classList.toggle('active'); if (searchBox.classList.contains('active')) searchInput.focus(); });
    document.addEventListener('click', (e) => { if (!searchBox.contains(e.target)) searchBox.classList.remove('active'); });
    hamburgerBtn.addEventListener('click', () => { hamburgerBtn.classList.toggle('active'); mobileMenu.classList.toggle('open'); });
    profileBtn.addEventListener('click', (e) => { e.stopPropagation(); profileDropdown.classList.toggle('open'); });
    if (moreBtn) {
        moreBtn.addEventListener('click', (e) => { e.stopPropagation(); profileDropdown.classList.remove('open'); moreDropdown.classList.toggle('open'); });
    }
    document.addEventListener('click', () => { profileDropdown.classList.remove('open'); if (moreDropdown) moreDropdown.classList.remove('open'); });

    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link, .mobile-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('open');
            goHome();
        });
    });
}

// ===== HERO =====
function initHero() {
    const featured = animeDatabase.find(a => a.id === 1);
    updateHero(featured);
    const heroAnimes = animeDatabase.filter(a => a.rank && a.rank <= 5);
    let heroIndex = 0;
    setInterval(() => { heroIndex = (heroIndex + 1) % heroAnimes.length; updateHero(heroAnimes[heroIndex]); }, 8000);
    document.getElementById('heroPlayBtn').addEventListener('click', () => openVideoPlayer(featured, 1));
    document.getElementById('heroInfoBtn').addEventListener('click', () => openModal(featured));
}

function updateHero(anime) {
    document.querySelector('.hero-bg').style.background = `linear-gradient(135deg,${anime.color}cc,${adjustColor(anime.color,40)}aa,${adjustColor(anime.color,80)}cc), url('${anime.image}') center/cover no-repeat`;
    document.getElementById('heroBadge').textContent = anime.rank ? `Populaire #${anime.rank}` : 'Tendance';
    document.getElementById('heroTitle').textContent = anime.title;
    document.getElementById('heroYear').textContent = anime.year;
    document.getElementById('heroEpisodes').textContent = `${anime.episodes} Episodes`;
    document.getElementById('heroDescription').textContent = anime.description;
    document.getElementById('heroPlayBtn').onclick = () => openVideoPlayer(anime, 1);
    document.getElementById('heroInfoBtn').onclick = () => openModal(anime);
}

// ===== RENDER =====
function renderAllRows() {
    const grid = document.getElementById('animeGrid');
    if (!grid) return;
    grid.innerHTML = animeDatabase.map(anime => createAnimeCard(anime, false)).join('');
}

function createAnimeCard(anime, isTop10 = false) {
    const badgeHTML = anime.badge === 'new' ? '<span class="anime-card-badge badge-new">Nouveau</span>' : anime.badge === 'top' ? '<span class="anime-card-badge badge-top">Top</span>' : '';
    const topNumberHTML = isTop10 && anime.rank ? `<span class="top10-number">${anime.rank}</span>` : '';
    const isInList = state.myList.includes(anime.id);
    return `<div class="anime-card" data-id="${anime.id}" onclick="openModal(animeDatabase.find(a=>a.id===${anime.id}))">
        ${topNumberHTML}
        <div class="anime-card-img">
            <img src="${anime.image}" alt="${anime.title}" loading="lazy">
            <div class="anime-card-img-gradient" style="background:linear-gradient(to top,${anime.color}ee,${anime.color}44,transparent);"></div>
        </div>
        ${badgeHTML}
        <div class="anime-card-info">
            <h3 class="anime-card-title">${anime.title}</h3>
            <div class="anime-card-meta">
                <span>${anime.year}</span><span>${anime.episodes} ep</span>
            </div>
        </div>
        <div class="anime-card-hover">
            <div class="hover-play-btn" onclick="event.stopPropagation(); openVideoPlayer(animeDatabase.find(a=>a.id===${anime.id}),1)">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="anime-card-hover-title">${anime.title}</span>
            <span class="anime-card-hover-meta">${anime.year}</span>
            <div class="hover-buttons">
                <button class="hover-btn" onclick="event.stopPropagation(); toggleMyList(${anime.id})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="${isInList ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                    Ma Liste
                </button>
                <button class="hover-btn" onclick="event.stopPropagation(); openModal(animeDatabase.find(a=>a.id===${anime.id}))">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    Infos
                </button>
            </div>
        </div>
    </div>`;
}

function initScrollButtons(row) {
    const wrapper = row.closest('.anime-row-wrapper');
    if (!wrapper) return;
    const l = wrapper.querySelector('.scroll-left');
    const r = wrapper.querySelector('.scroll-right');
    if (l) l.addEventListener('click', () => row.scrollBy({ left: -600, behavior: 'smooth' }));
    if (r) r.addEventListener('click', () => row.scrollBy({ left: 600, behavior: 'smooth' }));
}

// ===== SEARCH =====
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    let timer;
    searchInput.addEventListener('input', (e) => { clearTimeout(timer); timer = setTimeout(() => performSearch(e.target.value.trim()), 300); });
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') performSearch(e.target.value.trim()); if (e.key === 'Escape') { searchInput.value = ''; searchInput.closest('.search-box').classList.remove('active'); clearSearch(); } });
}

function performSearch(query) {
    if (!query) { clearSearch(); return; }
    const results = animeDatabase.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.titleJp.toLowerCase().includes(query.toLowerCase()));
    document.getElementById('searchQuery').textContent = query;
    document.getElementById('searchGrid').innerHTML = results.length > 0
        ? results.map(a => `<div class="anime-card" onclick="openModal(animeDatabase.find(a2=>a2.id===${a.id}))"><div class="anime-card-img"><img src="${a.image}" alt="${a.title}" loading="lazy"></div><div class="anime-card-info"><h3 class="anime-card-title">${a.title}</h3><div class="anime-card-meta"><span>${a.year}</span></div></div></div>`).join('')
        : '<p style="color:var(--text-secondary);padding:40px;text-align:center;grid-column:1/-1;">Aucun résultat trouvé.</p>';
    document.getElementById('hero').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('searchResults').style.display = 'block';
}

function clearSearch() {
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('mainContent').style.display = '';
    document.getElementById('hero').style.display = '';
}

// ===== MODALS =====
function initModals() {
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => { if (e.target === document.getElementById('modalOverlay')) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeAuthModal(); closeProfileModal(); closeSettingsModal(); closeSubscriptionModal(); closeMyListModal(); closeAboutModal(); closeCGUModal(); closePrivacyModal(); closeHelpModal(); closeReportModal(); } });
}

function openModal(anime) {
    if (!anime) return;
    state.currentAnime = anime;
    document.getElementById('modalBg').style.background = `linear-gradient(135deg,${anime.color}cc,${adjustColor(anime.color,50)}cc), url('${anime.image}') center/cover no-repeat`;
    document.getElementById('modalTitle').textContent = anime.title;
    document.getElementById('modalYear').textContent = anime.year;
    document.getElementById('modalStatus').textContent = anime.status;
    document.getElementById('modalStatus').style.background = anime.status === 'En cours' ? '#22c55e' : anime.status === 'Terminé' ? '#3b82f6' : '#f59e0b';
    document.getElementById('modalEpisodes').textContent = `${anime.episodes} Episodes`;
    document.getElementById('modalDescription').textContent = anime.description;
    const isPremium = state.subscription && state.subscription.active;
    const FREE_EPISODES = 2;
    const displayEps = anime.episodeList.slice(0, 24);
    document.getElementById('episodesList').innerHTML = displayEps.map(ep => {
        const isLocked = ep.number > FREE_EPISODES && !isPremium;
        return `<div class="episode-item${isLocked ? ' episode-locked' : ''}" onclick="${isLocked ? 'event.stopPropagation(); openSubscriptionModal(); showToast(\'🔒\', \'Premium requis\', \'Abonnez-vous pour acceder aux episodes 3 et + !\');' : `openVideoPlayer(animeDatabase.find(a=>a.id===${anime.id}),${ep.number})`}">
            <span class="episode-number">${ep.number}</span>
            <div class="episode-thumb" style="position:relative;"><img src="${anime.image}" alt="Ep ${ep.number}" style="width:100%;height:100%;object-fit:cover;${isLocked ? 'filter:brightness(0.4);' : ''}">${isLocked ? '<div class="lock-overlay"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>' : ''}</div>
            <div class="episode-info"><h4>${ep.title}${isLocked ? ' <span class="lock-badge">Premium</span>' : ''}</h4><p>${ep.description}</p></div>
            <span class="episode-duration">${isLocked ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Verrouillé' : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${ep.duration}`}</span>
        </div>`;
    }).join('');
    document.getElementById('modalPlayBtn').onclick = () => openVideoPlayer(anime, 1);
    if (!isPremium) {
        const freeInfo = document.createElement('div');
        freeInfo.className = 'free-episodes-info';
        freeInfo.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> Les <strong>2 premiers episodes</strong> sont gratuits. <a href="#" onclick="event.preventDefault(); event.stopPropagation(); closeModal(); setTimeout(()=>openSubscriptionModal(), 300);">Passer Premium pour tout regarder</a>';
        document.getElementById('episodesList').parentElement.insertBefore(freeInfo, document.getElementById('episodesList'));
    }
    document.getElementById('modalBookmarkBtn').onclick = () => toggleMyList(anime.id);
    document.getElementById('modalDownloadBtn').onclick = () => { closeModal(); openDownloadModal(anime); };
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== VIDEO PLAYER =====
const videoPlayerState = {
    currentQuality: '1080',
    currentFormat: 'mp4',
    qualities: ['1080', '720', '480'],
    qualityLabels: { '1080': '1080p', '720': '720p', '480': '480p' },
    savedTime: 0,
    hasRealVideo: false,
    detectedFormats: {} // { '1080': ['mp4','webm'], '720': ['mp4'], ... }
};

// Formats supportés par le HTML5 <video> avec leur MIME type
const SUPPORTED_FORMATS = {
    'mp4':  { mime: 'video/mp4',                  label: 'MP4',  ext: '.mp4',  priority: 1, browserSupport: () => document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"') },
    'webm': { mime: 'video/webm; codecs="vp9"',   label: 'WebM', ext: '.webm', priority: 2, browserSupport: () => document.createElement('video').canPlayType('video/webm; codecs="vp9"') },
    'ogg':  { mime: 'video/ogg; codecs="theora"', label: 'OGG',  ext: '.ogg',  priority: 3, browserSupport: () => document.createElement('video').canPlayType('video/ogg; codecs="theora"') },
    'ogv':  { mime: 'video/ogg',                   label: 'OGV',  ext: '.ogv',  priority: 3, browserSupport: () => document.createElement('video').canPlayType('video/ogg') },
    '3gp':  { mime: 'video/3gpp',                  label: '3GP',  ext: '.3gp',  priority: 4, browserSupport: () => document.createElement('video').canPlayType('video/3gpp') },
    'mov':  { mime: 'video/quicktime',             label: 'MOV',  ext: '.mov',  priority: 5, browserSupport: () => document.createElement('video').canPlayType('video/quicktime') },
    'mkv':  { mime: 'video/x-matroska',            label: 'MKV',  ext: '.mkv',  priority: 6, browserSupport: () => document.createElement('video').canPlayType('video/x-matroska') || document.createElement('video').canPlayType('video/mp4') },
    'avi':  { mime: 'video/x-msvideo',             label: 'AVI',  ext: '.avi',  priority: 7, browserSupport: () => document.createElement('video').canPlayType('video/x-msvideo') || document.createElement('video').canPlayType('video/mp4') },
    'm4v':  { mime: 'video/mp4',                   label: 'M4V',  ext: '.m4v',  priority: 1, browserSupport: () => document.createElement('video').canPlayType('video/mp4') },
    'ts':   { mime: 'video/mp2t',                  label: 'TS',   ext: '.ts',   priority: 8, browserSupport: () => document.createElement('video').canPlayType('video/mp2t') || document.createElement('video').canPlayType('video/mp4') },
};

// Ordre de préférence pour tenter les formats
const FORMAT_PRIORITY = ['mp4', 'webm', 'mkv', 'm4v', 'ogg', 'ogv', '3gp', 'mov', 'avi', 'ts'];

// ===== GÉNÉRATION DES URLS =====
function getVideoBaseUrl(animeId, episodeNum) {
    const anime = animeDatabase.find(a => a.id === animeId);
    if (!anime) return '';
    const slug = anime.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `videos/${slug}/ep${episodeNum}`;
}

// Retourne l'URL vidéo pour une qualité et un format donnés
// Structure attendue :
//   videos/{anime-slug}/ep{num}/{quality}.mp4
//   OU videos/{anime-slug}/ep{num}/{quality}_{format}.mp4
//   OU videos/{anime-slug}/ep{num}/{quality}.{format}
function getVideoUrl(animeId, episodeNum, quality, format) {
    const base = getVideoBaseUrl(animeId, episodeNum);
    const fmt = SUPPORTED_FORMATS[format];
    if (!fmt) return '';
    return `${base}/${quality}${fmt.ext}`;
}

// ===== DÉTECTION AUTOMATIQUE DU FORMAT =====
function getBrowserSupportedFormats() {
    const supported = [];
    FORMAT_PRIORITY.forEach(fmt => {
        const info = SUPPORTED_FORMATS[fmt];
        if (info && info.browserSupport()) {
            supported.push(fmt);
        }
    });
    return supported;
}

// Tente de charger une vidéo et vérifie si elle est lisible
function probeVideo(src, mime) {
    return new Promise((resolve) => {
        const testVideo = document.createElement('video');
        testVideo.preload = 'metadata';
        let resolved = false;

        const done = (canPlay) => {
            if (!resolved) {
                resolved = true;
                testVideo.removeAttribute('src');
                testVideo.load();
                resolve(canPlay);
            }
        };

        testVideo.addEventListener('canplaythrough', () => done(true), { once: true });
        testVideo.addEventListener('loadedmetadata', () => done(true), { once: true });
        testVideo.addEventListener('error', () => done(false), { once: true });

        // Timeout après 5 secondes
        setTimeout(() => done(false), 5000);

        if (mime) {
            testVideo.src = src;
        } else {
            testVideo.src = src;
        }
        testVideo.load();
    });
}

// Détecte quels formats sont réellement disponibles pour chaque qualité
async function detectAvailableFormats(animeId, epNum) {
    const qualities = videoPlayerState.qualities;
    const browserFormats = getBrowserSupportedFormats();
    const detected = {};

    for (const q of qualities) {
        detected[q] = [];
        for (const fmt of browserFormats) {
            const url = getVideoUrl(animeId, epNum, q, fmt);
            if (!url) continue;
            const canPlay = await probeVideo(url);
            if (canPlay) {
                detected[q].push(fmt);
            }
        }
    }

    videoPlayerState.detectedFormats = detected;
    return detected;
}

// ===== CHARGEMENT DES SOURCES =====
function buildSourceElements(animeId, epNum, quality) {
    const video = document.getElementById('mainVideo');

    // Vider les sources existantes
    video.innerHTML = '';

    const detected = videoPlayerState.detectedFormats[quality] || [];
    const browserFormats = getBrowserSupportedFormats();

    // Prioriser les formats détectés, sinon essayer les formats supportés par le navigateur
    const formatsToTry = detected.length > 0 ? detected : browserFormats;

    formatsToTry.forEach(fmt => {
        const url = getVideoUrl(animeId, epNum, quality, fmt);
        if (!url) return;
        const info = SUPPORTED_FORMATS[fmt];
        if (!info) return;

        const source = document.createElement('source');
        source.src = url;
        source.type = info.mime;
        source.dataset.format = fmt;
        source.dataset.quality = quality;
        source.label = `${videoPlayerState.qualityLabels[quality]} (${info.label})`;
        video.appendChild(source);
    });

    return formatsToTry.length > 0 ? formatsToTry[0] : null;
}

function loadVideoSources(animeId, epNum) {
    const video = document.getElementById('mainVideo');
    const currentQ = videoPlayerState.currentQuality;

    // Construire les <source> pour toutes les qualités (le navigateur choisira)
    // mais prioriser la qualité actuelle
    const primaryFormat = buildSourceElements(animeId, epNum, currentQ);

    if (primaryFormat) {
        videoPlayerState.currentFormat = primaryFormat;
    }

    // Si on a déjà détecté les formats disponibles, charger directement
    const detected = videoPlayerState.detectedFormats[currentQ] || [];
    if (detected.length > 0) {
        // Mettre le premier format détecté comme source principale
        const url = getVideoUrl(animeId, epNum, currentQ, detected[0]);
        video.src = url;
        videoPlayerState.currentFormat = detected[0];
    }

    video.load();
}

// Initialisation avec détection asynchrone des formats
async function initVideoWithDetection(animeId, epNum) {
    const video = document.getElementById('mainVideo');
    const placeholder = document.getElementById('videoPlaceholder');
    const loading = document.getElementById('videoLoading');

    // Afficher le loader
    loading.style.display = 'flex';

    // Détecter les formats disponibles
    const detected = await detectAvailableFormats(animeId, epNum);

    // Construire les sources
    const currentQ = videoPlayerState.currentQuality;
    const formatsForQuality = detected[currentQ] || getBrowserSupportedFormats();

    if (formatsForQuality.length > 0) {
        // Construire les sources multi-format dans l'élément <video>
        video.innerHTML = '';
        formatsForQuality.forEach(fmt => {
            const url = getVideoUrl(animeId, epNum, currentQ, fmt);
            if (!url) return;
            const info = SUPPORTED_FORMATS[fmt];
            if (!info) return;
            const source = document.createElement('source');
            source.src = url;
            source.type = info.mime;
            source.dataset.format = fmt;
            source.dataset.quality = currentQ;
            video.appendChild(source);
        });

        videoPlayerState.currentFormat = formatsForQuality[0];
        video.load();
    } else {
        // Aucun format trouvé - mode aperçu
        loading.style.display = 'none';
        videoPlayerState.hasRealVideo = false;
    }

    updateBadges();
}

function initVideoPlayer() {
    const video = document.getElementById('mainVideo');
    const playPauseBtn = document.getElementById('videoPlayPauseBtn');
    const nextBtn = document.getElementById('videoNextBtn');
    const fullscreenBtn = document.getElementById('videoFullscreenBtn');
    const qualityBtn = document.getElementById('qualityBtn');
    const qualityDropdown = document.getElementById('qualityDropdown');
    const muteBtn = document.getElementById('videoMuteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressContainer = document.getElementById('videoProgress');
    const playOverlay = document.getElementById('playOverlay');

    // Close player
    document.getElementById('videoClose').addEventListener('click', closeVideoPlayer);

    // Play/Pause button
    playPauseBtn.addEventListener('click', togglePlayPause);

    // Play overlay click
    if (playOverlay) {
        playOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            startPlayback();
        });
    }

    // Next episode
    nextBtn.addEventListener('click', playNextEpisode);

    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
        const el = document.getElementById('videoPlayer');
        if (document.fullscreenElement) document.exitFullscreen(); else el.requestFullscreen();
    });

    // Quality selector toggle
    qualityBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        qualityDropdown.classList.toggle('open');
    });

    // Close quality dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.quality-selector')) {
            qualityDropdown.classList.remove('open');
        }
    });

    // Mute button
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        updateMuteIcon();
        volumeSlider.value = video.muted ? 0 : video.volume;
    });

    // Volume slider
    volumeSlider.addEventListener('input', () => {
        video.volume = parseFloat(volumeSlider.value);
        video.muted = video.volume === 0;
        updateMuteIcon();
    });

    // Progress bar click to seek
    progressContainer.addEventListener('click', (e) => {
        if (!video.duration) return;
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });

    // Video events
    video.addEventListener('loadedmetadata', () => {
        document.getElementById('videoDuration').textContent = formatTime(video.duration);
        videoPlayerState.hasRealVideo = true;
    });

    video.addEventListener('timeupdate', () => {
        if (!video.duration) return;
        const pct = (video.currentTime / video.duration) * 100;
        document.getElementById('videoProgressBar').style.width = pct + '%';
        document.getElementById('videoCurrentTime').textContent = formatTime(video.currentTime);
    });

    video.addEventListener('progress', updateBufferedBar);

    video.addEventListener('waiting', () => {
        document.getElementById('videoLoading').style.display = 'flex';
    });

    video.addEventListener('canplay', () => {
        document.getElementById('videoLoading').style.display = 'none';
    });

    video.addEventListener('ended', () => {
        playNextEpisode();
    });

    video.addEventListener('error', () => {
        // Si la vidéo n'est pas trouvée, on affiche le placeholder
        document.getElementById('videoLoading').style.display = 'none';
        document.getElementById('mainVideo').style.display = 'none';
        const placeholder = document.getElementById('videoPlaceholder');
        if (placeholder) placeholder.classList.remove('hidden');
        videoPlayerState.hasRealVideo = false;
        // Mode simulation si pas de vidéo réelle
        showToast('ℹ️', 'Mode aperçu', 'Vidéo non disponible. Mode aperçu activé.');
        state.isPlaying = false;
        startSimulationProgress();
    });

    // Click on video container to toggle play/pause
    document.getElementById('videoContainer').addEventListener('click', (e) => {
        if (e.target.closest('.play-overlay') || e.target.closest('.video-close') ||
            e.target.closest('.quality-selector') || e.target.closest('.video-controls')) return;
        togglePlayPause();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('videoPlayerOverlay').classList.contains('active')) return;
        switch(e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (videoPlayerState.hasRealVideo && video.duration) {
                    video.currentTime = Math.min(video.duration, video.currentTime + 10);
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (videoPlayerState.hasRealVideo && video.duration) {
                    video.currentTime = Math.max(0, video.currentTime - 10);
                }
                break;
            case 'f':
                e.preventDefault();
                if (document.fullscreenElement) document.exitFullscreen();
                else document.getElementById('videoPlayer').requestFullscreen();
                break;
            case 'm':
                e.preventDefault();
                video.muted = !video.muted;
                updateMuteIcon();
                volumeSlider.value = video.muted ? 0 : video.volume;
                break;
            case 'Escape':
                if (document.fullscreenElement) document.exitFullscreen();
                break;
        }
    });
}

function updateMuteIcon() {
    const video = document.getElementById('mainVideo');
    const btn = document.getElementById('videoMuteBtn');
    if (video.muted || video.volume === 0) {
        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
    } else {
        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
    }
}

function updateBufferedBar() {
    const video = document.getElementById('mainVideo');
    const bar = document.getElementById('videoBufferedBar');
    if (video.buffered.length > 0 && video.duration) {
        const buffered = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100;
        bar.style.width = buffered + '%';
    }
}

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
        return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function openVideoPlayer(anime, epNum) {
    if (!anime) return;
    const isPremium = state.subscription && state.subscription.active;
    if (epNum > 2 && !isPremium) {
        closeVideoPlayer();
        openSubscriptionModal();
        showToast('🔒', 'Premium requis', `L'episode ${epNum} necessite un abonnement Premium. Les 2 premiers episodes sont gratuits !`);
        return;
    }
    state.currentAnime = anime;
    state.currentEpisode = epNum;
    state.isPlaying = false;
    videoPlayerState.savedTime = 0;
    videoPlayerState.hasRealVideo = false;

    const video = document.getElementById('mainVideo');
    const placeholder = document.getElementById('videoPlaceholder');

    // Set background
    placeholder.style.background = `linear-gradient(135deg,${anime.color}dd,${adjustColor(anime.color,40)}dd), url('${anime.image}') center/cover no-repeat`;
    document.getElementById('videoNowPlaying').textContent = `${anime.title} - Episode ${epNum}`;
    document.getElementById('videoProgressBar').style.width = '0%';
    document.getElementById('videoBufferedBar').style.width = '0%';
    document.getElementById('videoCurrentTime').textContent = '00:00';
    document.getElementById('videoDuration').textContent = '00:00';

    // Reset play button icon
    document.getElementById('videoPlayPauseBtn').innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

    // Load saved quality preference
    videoPlayerState.currentQuality = localStorage.getItem('kazestream-video-quality') || '1080';

    // Show player
    video.style.display = 'none';
    video.innerHTML = '';
    placeholder.classList.remove('hidden');
    document.getElementById('videoLoading').style.display = 'none';
    document.getElementById('videoQualityBadge').classList.remove('visible');
    document.getElementById('videoFormatBadge').classList.remove('visible');

    // Update quality selector UI
    updateQualityUI();
    updateBadges();

    document.getElementById('videoPlayerOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    closeModal();

    // Lancer la détection asynchrone des formats
    initVideoWithDetection(anime.id, epNum);
}

function loadVideoSources(animeId, epNum) {
    const video = document.getElementById('mainVideo');
    const qualities = videoPlayerState.qualities;
    const currentQ = videoPlayerState.currentQuality;

    qualities.forEach(q => {
        const sourceEl = document.getElementById(`videoSource${q}`);
        if (sourceEl) {
            sourceEl.src = getVideoUrl(animeId, epNum, q);
        }
    });

    // Set the current quality source
    video.querySelectorAll('source').forEach(s => {
        s.removeAttribute('selected');
        if (s.dataset.quality === currentQ) {
            video.src = s.src;
        }
    });

    // Load the video to check if it exists
    video.load();
}

function startPlayback() {
    const video = document.getElementById('mainVideo');
    const placeholder = document.getElementById('videoPlaceholder');

    if (videoPlayerState.hasRealVideo) {
        // Real video mode
        placeholder.classList.add('hidden');
        video.style.display = 'block';
        document.getElementById('videoQualityBadge').classList.add('visible');
        document.getElementById('videoFormatBadge').classList.add('visible');
        video.play().then(() => {
            state.isPlaying = true;
            updatePlayPauseIcon();
        }).catch(() => {
            // Auto-play blocked or error
            state.isPlaying = false;
            updatePlayPauseIcon();
        });
    } else {
        // Simulation mode (no real video file)
        placeholder.classList.remove('hidden');
        video.style.display = 'none';
        state.isPlaying = !state.isPlaying;
        updatePlayPauseIcon();
        if (state.isPlaying) {
            startSimulationProgress();
        }
    }
}

function togglePlayPause() {
    const video = document.getElementById('mainVideo');
    const placeholder = document.getElementById('videoPlaceholder');

    if (videoPlayerState.hasRealVideo && video.readyState >= 1) {
        if (video.paused || video.ended) {
            // Switch from placeholder to real video on first play
            if (video.style.display === 'none') {
                placeholder.classList.add('hidden');
                video.style.display = 'block';
                document.getElementById('videoQualityBadge').classList.add('visible');
                document.getElementById('videoFormatBadge').classList.add('visible');
            }
            video.play().then(() => {
                state.isPlaying = true;
                updatePlayPauseIcon();
            }).catch(() => {});
        } else {
            video.pause();
            state.isPlaying = false;
            updatePlayPauseIcon();
        }
    } else {
        startPlayback();
    }
}

function updatePlayPauseIcon() {
    const btn = document.getElementById('videoPlayPauseBtn');
    btn.innerHTML = state.isPlaying
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
}

// Simulation progress when no real video
let simulationInterval = null;
function startSimulationProgress() {
    if (simulationInterval) clearInterval(simulationInterval);
    simulationInterval = setInterval(() => {
        if (state.isPlaying && !videoPlayerState.hasRealVideo) {
            const bar = document.getElementById('videoProgressBar');
            let w = parseFloat(bar.style.width) || 0;
            w += 0.1;
            if (w > 100) { w = 100; clearInterval(simulationInterval); }
            bar.style.width = w + '%';
            const total = 23 * 60 + 45, cur = Math.floor((w / 100) * total);
            const m = Math.floor(cur / 60), s = cur % 60;
            document.getElementById('videoCurrentTime').textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            document.getElementById('videoDuration').textContent = '23:45';
        }
    }, 1000);
}

// ===== CHANGE VIDEO QUALITY =====
function changeVideoQuality(quality) {
    if (videoPlayerState.currentQuality === quality) {
        document.getElementById('qualityDropdown').classList.remove('open');
        return;
    }

    const video = document.getElementById('mainVideo');
    videoPlayerState.currentQuality = quality;

    // Save preference
    localStorage.setItem('kazestream-video-quality', quality);

    // Save current time
    let savedTime = 0;
    if (videoPlayerState.hasRealVideo && video.duration) {
        savedTime = video.currentTime;
    }

    // Get available formats for this quality
    const detected = videoPlayerState.detectedFormats[quality] || getBrowserSupportedFormats();

    // Rebuild source elements for new quality
    video.innerHTML = '';
    if (detected.length > 0) {
        detected.forEach(fmt => {
            const url = getVideoUrl(state.currentAnime.id, state.currentEpisode, quality, fmt);
            if (!url) return;
            const info = SUPPORTED_FORMATS[fmt];
            if (!info) return;
            const source = document.createElement('source');
            source.src = url;
            source.type = info.mime;
            source.dataset.format = fmt;
            source.dataset.quality = quality;
            video.appendChild(source);
        });

        videoPlayerState.currentFormat = detected[0];
        video.load();

        // After loading, seek to saved time and resume
        video.addEventListener('loadeddata', function onLoaded() {
            video.removeEventListener('loadeddata', onLoaded);
            video.currentTime = savedTime;
            if (state.isPlaying) {
                video.play().catch(() => {});
            }
        });

        video.addEventListener('error', function onError() {
            video.removeEventListener('error', onError);
            // Tenter le format suivant si disponible
            const currentFmtIndex = detected.indexOf(videoPlayerState.currentFormat);
            if (currentFmtIndex < detected.length - 1) {
                const nextFmt = detected[currentFmtIndex + 1];
                videoPlayerState.currentFormat = nextFmt;
                video.src = getVideoUrl(state.currentAnime.id, state.currentEpisode, quality, nextFmt);
                video.load();
            } else {
                videoPlayerState.hasRealVideo = false;
                document.getElementById('mainVideo').style.display = 'none';
                document.getElementById('videoPlaceholder').classList.remove('hidden');
                showToast('⚠️', 'Format non supporté', `Aucun format lisible trouvé pour ${videoPlayerState.qualityLabels[quality]}.`);
            }
        });
    }

    // Update UI
    updateQualityUI();
    updateBadges();

    // Close dropdown
    document.getElementById('qualityDropdown').classList.remove('open');

    // Show quality change toast
    showQualityChangeToast(quality);
}

function updateBadges() {
    const q = videoPlayerState.currentQuality;
    const f = videoPlayerState.currentFormat;
    const qualityLabel = videoPlayerState.qualityLabels[q] || q;
    const formatInfo = SUPPORTED_FORMATS[f];
    const formatLabel = formatInfo ? formatInfo.label : f.toUpperCase();

    document.getElementById('videoQualityBadge').textContent = qualityLabel;
    document.getElementById('videoFormatBadge').textContent = formatLabel;
}

function updateQualityUI() {
    const q = videoPlayerState.currentQuality;
    const label = videoPlayerState.qualityLabels[q];

    // Update button label
    document.getElementById('qualityLabel').textContent = label;

    // Update dropdown active state
    document.querySelectorAll('.quality-option').forEach(opt => {
        const isActive = opt.dataset.quality === q;
        opt.classList.toggle('active', isActive);
    });
}

function showQualityChangeToast(quality) {
    const label = videoPlayerState.qualityLabels[quality];
    const container = document.getElementById('videoPlayer');
    const toast = document.createElement('div');
    toast.className = 'quality-change-toast';
    toast.textContent = `Qualité changée : ${label}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 1600);
}

function closeVideoPlayer() {
    const video = document.getElementById('mainVideo');
    video.pause();
    video.removeAttribute('src');
    video.innerHTML = '';
    video.load();
    video.style.display = 'none';
    if (simulationInterval) clearInterval(simulationInterval);
    document.getElementById('videoPlayerOverlay').classList.remove('active');
    document.body.style.overflow = '';
    state.isPlaying = false;
    videoPlayerState.hasRealVideo = false;
    const placeholder = document.getElementById('videoPlaceholder');
    if (placeholder) placeholder.classList.remove('hidden');
    document.getElementById('videoQualityBadge').classList.remove('visible');
    document.getElementById('videoFormatBadge').classList.remove('visible');
    document.getElementById('videoLoading').style.display = 'none';
}

function playNextEpisode() {
    if (!state.currentAnime) return;
    const next = state.currentEpisode + 1;
    if (next <= state.currentAnime.episodes) {
        openVideoPlayer(state.currentAnime, next);
        // Auto-play after a short delay if was playing
        if (state.isPlaying) {
            setTimeout(() => startPlayback(), 500);
        }
    } else {
        showToast('ℹ️', 'Fin', 'Vous avez regardé tous les épisodes disponibles.');
    }
}

// ===== DOWNLOAD MODAL =====
function initDownloadModal() {
    document.getElementById('downloadClose').addEventListener('click', closeDownloadModal);
    document.getElementById('downloadModalOverlay').addEventListener('click', (e) => { if (e.target === document.getElementById('downloadModalOverlay')) closeDownloadModal(); });
    document.getElementById('selectAllEpisodes').addEventListener('click', () => document.querySelectorAll('.download-ep-item').forEach(i => i.classList.add('selected')));
    document.getElementById('deselectAllEpisodes').addEventListener('click', () => document.querySelectorAll('.download-ep-item').forEach(i => i.classList.remove('selected')));
    document.getElementById('startDownloadBtn').addEventListener('click', startDownload);
}

function openDownloadModal(anime) {
    document.getElementById('downloadAnimeTitle').textContent = anime.title;
    const grid = document.getElementById('downloadEpGrid');
    grid.innerHTML = '';
    for (let i = 1; i <= Math.min(anime.episodes, 24); i++) {
        const item = document.createElement('div');
        item.className = 'download-ep-item selected'; item.textContent = i;
        item.addEventListener('click', () => item.classList.toggle('selected'));
        grid.appendChild(item);
    }
    document.getElementById('downloadProgress').style.display = 'none';
    document.getElementById('downloadProgressBar').style.width = '0%';
    document.getElementById('downloadModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDownloadModal() { document.getElementById('downloadModalOverlay').classList.remove('active'); document.body.style.overflow = ''; }

function startDownload() {
    const sel = document.querySelectorAll('.download-ep-item.selected');
    if (sel.length === 0) { showToast('⚠️', 'Attention', 'Sélectionnez au moins un épisode.'); return; }
    const prog = document.getElementById('downloadProgress');
    const bar = document.getElementById('downloadProgressBar');
    const status = document.getElementById('downloadStatus');
    const btn = document.getElementById('startDownloadBtn');
    prog.style.display = 'block'; btn.disabled = true; btn.style.opacity = '0.5';
    let p = 0;
    const iv = setInterval(() => {
        p += Math.random() * 3;
        if (p >= 100) { p = 100; clearInterval(iv); status.textContent = `Terminé ! ${sel.length} épisode(s) téléchargé(s).`; bar.style.background = 'linear-gradient(90deg,#22c55e,#10b981)'; btn.disabled = false; btn.style.opacity = '1'; showToast('✅', 'Téléchargement', `${sel.length} épisode(s) prêt(s) !`); }
        else status.textContent = `Téléchargement... ${Math.floor(p)}%`;
        bar.style.width = p + '%';
    }, 100);
}

// ===== MY LIST =====
function toggleMyList(id) {
    const idx = state.myList.indexOf(id);
    if (idx > -1) { state.myList.splice(idx, 1); showToast('🗑️', 'Retiré', 'Anime retiré de votre liste.'); }
    else { state.myList.push(id); showToast('❤️', 'Ajouté', 'Anime ajouté à votre liste !'); }
    localStorage.setItem('kazestream-mylist', JSON.stringify(state.myList));
    renderAllRows();
}

// ===== NOTIFICATIONS =====
function initNotifications() {
    const notifBtn = document.getElementById('notifBtn');
    const notifPanel = document.getElementById('notifPanel');
    const notifList = document.getElementById('notifList');
    notifBtn.addEventListener('click', (e) => { e.stopPropagation(); notifPanel.classList.toggle('open'); });
    document.addEventListener('click', (e) => { if (!notifPanel.contains(e.target)) notifPanel.classList.remove('open'); });
    document.querySelector('.notif-mark-read').addEventListener('click', () => {
        document.querySelectorAll('.notif-item.unread').forEach(i => i.classList.remove('unread'));
        document.getElementById('notifBadge').style.display = 'none';
        showToast('✅', 'Notifications', 'Toutes marquées comme lues.');
    });

    // Generate dynamic notifications based on anime database
    const notifications = [];

    // New anime
    animeDatabase.filter(a => a.badge === 'new').forEach(anime => {
        notifications.push({
            icon: 'new-ep',
            iconText: 'NOUV',
            text: `<strong>Nouveau sur KazeStream</strong> — ${anime.title} est maintenant disponible !`,
            time: 'Aujourd\'hui',
            unread: true
        });
    });

    // Ongoing anime - new episodes
    animeDatabase.filter(a => a.status === 'En cours' && a.badge !== 'new').forEach(anime => {
        notifications.push({
            icon: 'new-ep',
            iconText: 'EP',
            text: `<strong>Nouvel episode</strong> — ${anime.title} : un nouvel episode est disponible !`, 
            time: 'Hier',
            unread: true
        });
    });

    // Site update notifications
    notifications.push({
        icon: 'update',
        iconText: 'MAJ',
        text: '<strong>Mise a jour du catalogue</strong> — De nouveaux animes Fantasy et Sci-Fi ont ete ajoutes ce mois.',
        time: 'Il y a 3 jours',
        unread: true
    });
    notifications.push({
        icon: 'update',
        iconText: 'MAJ',
        text: '<strong>Nouvelle fonctionnalite</strong> — Le telechargement hors-ligne est maintenant disponible pour les abonnes Premium.',
        time: 'Il y a 5 jours',
        unread: false
    });
    notifications.push({
        icon: 'rec',
        iconText: 'REC',
        text: '<strong>Recommandation</strong> — Decouvrez Frieren : Beyond Journey\'s End, le meilleur anime de l\'annee !',
        time: 'Il y a 1 semaine',
        unread: false
    });

    // Render notifications
    const unreadCount = notifications.filter(n => n.unread).length;
    const badge = document.getElementById('notifBadge');
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }

    notifList.innerHTML = notifications.map(n => `
        <div class="notif-item ${n.unread ? 'unread' : ''}">
            <div class="notif-icon ${n.icon}">${n.iconText}</div>
            <div class="notif-content">
                <p>${n.text}</p>
                <span class="notif-time">${n.time}</span>
            </div>
        </div>
    `).join('');
}

// ===== INFO MODALS (About, CGU, Privacy, Help, Report) =====
function openAboutModal() {
    document.getElementById('aboutModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeAboutModal() {
    document.getElementById('aboutModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function openCGUModal() {
    document.getElementById('cguModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeCGUModal() {
    document.getElementById('cguModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function openPrivacyModal() {
    document.getElementById('privacyModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closePrivacyModal() {
    document.getElementById('privacyModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function openHelpModal() {
    document.getElementById('helpModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeHelpModal() {
    document.getElementById('helpModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function openReportModal() {
    document.getElementById('reportModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeReportModal() {
    document.getElementById('reportModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
function handleReportSubmit(e) {
    e.preventDefault();
    closeReportModal();
    showToast('✅', 'Signalement envoye', 'Votre signalement a ete envoye. Nous vous repondrons sous 24h.');
}
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    element.classList.toggle('faq-active');
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        if (icon) icon.textContent = '+';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.textContent = '−';
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; } }); }, { threshold: 0.1 });
    document.querySelectorAll('.anime-section').forEach(s => { s.style.opacity = '0'; s.style.transform = 'translateY(30px)'; s.style.transition = 'all 0.6s ease'; observer.observe(s); });
}

// ===== UTILITIES =====
function goHome() {
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('hero').style.display = '';
    document.getElementById('mainContent').style.display = '';
    document.querySelectorAll('.nav-link, .mobile-link').forEach(l => l.classList.add('active'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function adjustColor(hex, amount) {
    hex = hex.replace('#', '');
    const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
    const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
    const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function formatDate(isoStr) {
    const d = new Date(isoStr);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function showToast(icon, title, message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><div><strong>${title}</strong><p>${message}</p></div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
