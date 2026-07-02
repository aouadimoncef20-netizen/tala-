import { ARTISTS } from './artists';
import { ALBUMS } from './albums';

// ===== TRACK TITLE POOLS (for generation) =====
const TITLE_POOLS = {
  khaled: [
    'Didi', 'Aicha', "C'est la Vie", 'Wahran', 'N\'ssa N\'ssa', 'Alech Taadi', 'Liberte', 'El Arbi',
    'Kouli Youm', 'Ya Rayi', 'Raba', 'Mektoub', 'Oran Oran', 'Bladi', 'Salam', 'Habibi',
    'El Baraka', 'Zine', 'Mazal', 'Goulou', 'Nouvelle Vie', 'Sahara', 'Dounia', 'Mira',
    'Enfant du Soleil', 'Ami', 'Taj', 'Nour', 'Fou de Toi', 'Ana', 'Nti', 'Houwa',
    'Ya Lemma', 'Khalouni', 'Hada Houwa', 'El Ghorba', 'Machi Hak', 'Saha', 'Lala', 'Yamma',
    'Melaya', 'L\'amour', 'Tahia', 'El Wakt', 'Bghit Ntir', 'Chouf', 'Rani', 'Zid',

    'Seragi', 'Khalini', 'Dja', 'Fiha', 'J\'attendrai', 'Ya Zahri', 'Mazalni', 'Djazair',
    'Sobhan', 'Wahdani', 'Tlata', 'Zarga', 'Hamdoulah', 'Maquis', 'Soleil de Minuit',
    'Rouhou', 'Galbi', "N'ti El Bahdja", 'Bent Bladi', 'Ya Msafir', 'Ana El Ghorba',
    'Khalas', 'Roh', 'Machi Anaya', 'Salam Alaikum', 'El Watan', 'Ya Mama', 'Dzair',
    'Saha Ftour', 'El Jamila', 'Nadi', 'Bledi', "N'ti Nour", 'Ya Rayess', 'Chhal',
    'Rani Mlih', 'Mazalna', 'Nar', 'Zaman', 'El Kaoui', 'Mizana', 'Dounia Zina', 'Achki',
  ],

  'cheb-hasni': [
    'Ya Lella', 'Tal Ghyabek', 'Merci', 'Rohou', 'Galou Meni Nsiti', 'El Ghyab', 'Rani Mlih',
    'Nabghi Nhawas', 'Ya Rabi', 'Khalliha', 'Maakoum', 'Saha', 'Mazal', 'El Haraka',
    'Ya Rayess', 'Mektoub', 'Galbi', 'Wahran', 'Nti', 'Houwa', 'Ana', 'Ya Moulay',
    'Sobhan Allah', 'Zarga', 'Djamila', 'Khalouni', 'Ya Zahri', 'Melaya', 'Ya Lalla',
    'Bent Bladi', 'Chouf', 'Nti El Bahdja', 'Salam', 'El Watan', 'Ana El Ghorba',
    'Khalas', 'Machi Hak', 'Roh', 'Djazair', 'Bledi', 'Nti Nour', 'Nadi', 'Ya Mami',
    'Saha Ftour', 'El Jamila', 'Tlata', 'Ya Rayi', 'Nouvelle Vie', 'Soleil de Minuit',
    'Mira', 'Nar', 'Zaman', 'Mizana', 'Dounia Zina', 'Chhal', 'Dzair', 'Sahara',
    'Fou de Toi', 'Ya Lemma', 'Taj', 'Nour', 'L\'amour', 'Machi Anaya', 'Dja', 'Fiha',
    'Seragi', 'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum', 'El Kaoui', 'Ya Mama',
  ],

  'cheb-mami': [
    'El Harraga', 'Sahraoui', 'Yalil', 'Parisien du Nord', 'Des Reves', 'Medina', 'Ana Hiya',
    'Mektoub', 'Ya Lella', 'Sahara', 'Bladi', 'Nour', 'Dounia', 'Liberte', 'Mira',
    'Salam', 'Taj', 'Raba', 'Habibi', 'El Baraka', 'Zine', 'Mazal', 'Goulou',
    'Khalouni', 'Ya Zahri', 'Melaya', 'Ya Moulay', 'Sobhan', 'Zarga', 'Djamila',
    'Chouf', 'Nti', 'Houwa', 'Ana', 'Ya Lemma', 'Hada Houwa', 'El Ghorba',
    'Machi Hak', 'Saha Ftour', 'El Watan', 'Ana El Ghorba', 'Khalas', 'Machi Anaya',
    'Roh', 'Djazair', 'Bledi', 'Nti Nour', 'Nadi', 'Ya Mami', 'Ya Rayess',
    'Soleil de Minuit', 'Nouvelle Vie', 'Fou de Toi', 'Dzair', 'Chhal', 'Mizana',
    'Dounia Zina', 'Nar', 'Zaman', 'El Kaoui', 'Achki', 'J\'attendrai',
    'Tlata', 'Bent Bladi', 'Ya Msafir', 'Rouhou', 'Galbi', 'Khalini',
  ],

  zahouania: [
    'Hada Rayek', 'Galbi', 'Nabghi Nhawas', 'Ya Lella', 'Rani Mlih', 'Khalliha',
    'Maakoum', 'Mazal', 'El Haraka', 'Ya Rabi', 'Nti', 'Houwa', 'Ana',
    'Ya Moulay', 'Sobhan', 'Zarga', 'Djamila', 'Ya Zahri', 'Melaya', 'Ya Lalla',
    'Bent Bladi', 'Chouf', 'Nti El Bahdja', 'Salam', 'El Watan', 'Ana El Ghorba',
    'Khalas', 'Machi Hak', 'Roh', 'Djazair', 'Bledi', 'Nti Nour', 'Nadi',
    'Ya Mami', 'Saha Ftour', 'El Jamila', 'Tlata', 'Ya Rayi', 'Nouvelle Vie',
    'Soleil de Minuit', 'Mira', 'Nar', 'Zaman', 'Mizana', 'Dounia Zina',
    'Chhal', 'Dzair', 'Fou de Toi', 'Ya Lemma', 'Taj', 'Nour', 'L\'amour',
    'Machi Anaya', 'Dja', 'Fiha', 'Seragi', 'Khalini', 'Maquis', 'Rouhou',
    'Salam Alaikum', 'El Kaoui', 'Ya Mama', 'Ana', 'Sahara', 'Bladi', 'Habibi',
    'Zine', 'Goulou', 'Khalouni', 'El Ghorba', 'Saha', 'Saha Ftour', 'Ami',
  ],

  bilal: [
    'Sobhan Allah', 'Zina', 'Nouveau Rai', 'Ana', 'Habibi', 'El Baraka', 'Dounia',
    'Nour', 'Taj', 'Mira', 'Salam', 'Liberte', 'Raba', 'Sahara', 'Bladi',
    'Ya Lella', 'Mektoub', 'Ya Rayi', 'Khalas', 'Roh', 'Zaman', 'El Ghorba',
    'Chhal', 'Dzair', 'Nti', 'Houwa', 'Bledi', 'Nadi', 'Ya Mami', 'Ya Zahri',
    'Melaya', 'Chouf', 'Saha Ftour', 'El Jamila', 'Tlata', 'Nouvelle Vie',
    'Soleil de Minuit', 'Fou de Toi', 'Ya Lemma', 'L\'amour', 'Machi Anaya',
    'Dja', 'Fiha', 'Seragi', 'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum',
    'El Kaoui', 'Ya Mama', 'Galbi', 'El Haraka', 'Ya Rabi', 'Zarga', 'Djamila',
    'Bent Bladi', 'Nti El Bahdja', 'El Watan', 'Ana El Ghorba', 'Machi Hak',
    'Nti Nour', 'Ya Rayess', 'J\'attendrai', 'Achki', 'Mizana', 'Dounia Zina',
  ],

  'cheb-rimi': [
    'Oran Sunset', 'Sahara', 'Bladi', 'Habibi', 'El Baraka', 'Zine', 'Mazal',
    'Ya Lella', 'Nour', 'Taj', 'Mira', 'Salam', 'Liberte', 'Raba', 'Dounia',
    'Khalas', 'Roh', 'Zaman', 'El Ghorba', 'Chhal', 'Dzair', 'Nti', 'Houwa',
    'Bledi', 'Nadi', 'Ya Mami', 'Ya Zahri', 'Melaya', 'Chouf', 'Saha Ftour',
    'El Jamila', 'Tlata', 'Nouvelle Vie', 'Soleil de Minuit', 'Fou de Toi',
    'Ya Lemma', 'L\'amour', 'Machi Anaya', 'Dja', 'Fiha', 'Seragi', 'Khalini',
    'Maquis', 'Rouhou', 'Salam Alaikum', 'El Kaoui', 'Ya Mama', 'Galbi',
    'El Haraka', 'Ya Rabi', 'Zarga', 'Djamila', 'Bent Bladi', 'Nti El Bahdja',
    'El Watan', 'Ana El Ghorba', 'Machi Hak', 'Nti Nour', 'Ya Rayess',
    'J\'attendrai', 'Achki', 'Mizana', 'Dounia Zina', 'Ya Lalla', 'Khalouni',
    'Saha', 'Ndi', 'Bghit', 'Gbali', 'Mektoub', 'For Real', 'Ana Wiyak',
  ],

  'cheb-akil': [
    'Rai Electro', 'Fusion', 'Beat Rai', 'Sahara Nights', 'Bladi', 'Habibi',
    'El Baraka', 'Zine', 'Mazal', 'Ya Lella', 'Nour', 'Taj', 'Mira', 'Salam',
    'Liberte', 'Raba', 'Dounia', 'Khalas', 'Roh', 'Zaman', 'El Ghorba',
    'Chhal', 'Dzair', 'Nti', 'Houwa', 'Bledi', 'Nadi', 'Ya Mami', 'Ya Zahri',
    'Melaya', 'Chouf', 'Nouvelle Vie', 'Soleil de Minuit', 'Fou de Toi',
    'Ya Lemma', 'L\'amour', 'Machi Anaya', 'Dja', 'Fiha', 'Seragi', 'Khalini',
    'Maquis', 'Rouhou', 'Salam Alaikum', 'El Kaoui', 'Ya Mama', 'Galbi',
    'El Haraka', 'Ya Rabi', 'Zarga', 'Djamila', 'Bent Bladi', 'Nti El Bahdja',
    'El Watan', 'Ana El Ghorba', 'Machi Hak', 'Nti Nour', 'Ya Rayess',
    'J\'attendrai', 'Achki', 'Mizana', 'Dounia Zina', 'Ya Lalla', 'Khalouni',
    'Saha', 'Nti Nour', 'Rai 2025', 'Electro Rai', 'Boom', 'Light', 'Night Rider',
  ],

  'el-anka': [
    'Sanaat El Khoubz', 'El Hamdoulah', 'Ya Rayess', 'El Kaoui', 'Nostalgie',
    'Alger Mashhour', 'El Baraka', 'Salam', 'Taj', 'Mira', 'Nour', 'Dounia',
    'Raba', 'Zaman', 'Chhal', 'Dzair', 'Nti', 'Houwa', 'Bledi', 'Nadi',
    'Ya Mami', 'Melaya', 'Chouf', 'Saha Ftour', 'El Jamila', 'Tlata',
    'Soleil de Minuit', 'Fou de Toi', 'Ya Lemma', 'L\'amour', 'Machi Anaya',
    'Dja', 'Fiha', 'Seragi', 'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum',
    'Ya Mama', 'Galbi', 'El Haraka', 'Zarga', 'Djamila', 'Bent Bladi',
    'Nti El Bahdja', 'El Watan', 'Ana El Ghorba', 'Machi Hak', 'Nti Nour',
    'Ya Rayess', 'El Ghorba', 'Saha', 'Mektoub', 'Ya Zahri', 'Khalouni',

    'Achek', 'Mizana', 'Dounia Zina', 'Nar', 'Achki', 'Ya Lalla', 'Ntiya',
    'Algiers', 'Casbah', 'Medina', 'Saha El Youm', 'Rabi', 'El Qalb', 'Sanaat',
    'Ya Moulay', 'Habib', 'Wahran', 'Constantine', 'Tlemcen', 'Annaba',
    'Qacentina', 'Tizi', 'Bejaia', 'Setif', 'Oranais', 'Beldi', 'Chaabi 2025',
  ],

  harrachi: [
    'Ya Rayah', 'Ya Mahla', 'Maakoulli', 'Sidi Ali', 'Bledi', 'El Kaoui',
    'Salam', 'Nostalgie', 'Mira', 'Nour', 'Taj', 'Dounia', 'Raba', 'Zaman',
    'Chhal', 'Dzair', 'Nti', 'Houwa', 'Bledi', 'Nadi', 'Ya Mami', 'Melaya',
    'Chouf', 'Saha Ftour', 'El Jamila', 'Tlata', 'Soleil de Minuit',
    'Fou de Toi', 'Ya Lemma', 'L\'amour', 'Machi Anaya', 'Dja', 'Fiha',
    'Seragi', 'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum', 'Ya Mama',
    'Galbi', 'El Haraka', 'Zarga', 'Djamila', 'Bent Bladi', 'Nti El Bahdja',
    'El Watan', 'Ana El Ghorba', 'Machi Hak', 'Nti Nour', 'Ya Rayess',
    'El Ghorba', 'Saha', 'Mektoub', 'Ya Zahri', 'Khalouni',

    'Achek', 'Mizana', 'Dounia Zina', 'Nar', 'Ya Lalla', 'Algiers', 'Casbah',
    'Medina', 'Saha El Youm', 'Rabi', 'El Qalb', 'Ya Moulay', 'Habib',
    'Wahran', 'Constantine', 'Tlemcen', 'Annaba', 'Tizi', 'Bejaia', 'Setif',
    'Oranais', 'Beldi', 'Maghreb', 'Exil', 'Voyage', 'Rayah 2025', 'Madrasa',
  ],

  amar: [
    'Achki', 'El Kaoui', 'Mizana', 'Dounia Zina', 'Nar', 'Zman', 'Qalbi',
    'Salam', 'Ya Rayess', 'Saha', 'El Watan', 'Raba', 'Nti', 'Houwa',
    'Dja', 'Fiha', 'Seragi', 'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum',
    'Ya Mama', 'Galbi', 'El Haraka', 'Zarga', 'Djamila', 'Bent Bladi',
    'Nti El Bahdja', 'Ana El Ghorba', 'Machi Hak', 'Nti Nour', 'Ya Zahri',
    'Melaya', 'Chouf', 'Saha Ftour', 'El Jamila', 'Tlata', 'Nouvelle Vie',
    'Soleil de Minuit', 'Fou de Toi', 'Ya Lemma', 'L\'amour', 'Machi Anaya',
    'Habib', 'Chaabi 2025', 'Beldi', 'Oranais', 'Casbah', 'Algiers', 'Wahran',
    'Tlemcen', 'Annaba', 'Tizi', 'Bejaia', 'Setif', 'Constantine', 'Medina',
    'Saha El Youm', 'Rabi', 'El Qalb', 'Ya Moulay', 'Maghreb', 'Exil', 'Voyage',
  ],

  boudjema: [
    'El Hamdoulah', 'Sanaat', 'Ya Rayess', 'Nostalgie', 'Chaabi Pur',
    'Salam', 'Mira', 'Nour', 'Taj', 'Dounia', 'Raba', 'Zaman', 'Chhal',
    'Dzair', 'Nti', 'Houwa', 'Bledi', 'Nadi', 'Ya Mami', 'Melaya',
    'Chouf', 'Saha Ftour', 'El Jamila', 'Tlata', 'Soleil de Minuit',
    'Fou de Toi', 'Ya Lemma', 'L\'amour', 'Machi Anaya', 'Dja', 'Fiha',
    'Seragi', 'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum', 'Ya Mama',
    'Galbi', 'El Haraka', 'Zarga', 'Djamila', 'Bent Bladi', 'Nti El Bahdja',
    'El Watan', 'Ana El Ghorba', 'Machi Hak', 'Nti Nour', 'El Ghorba',
    'Saha', 'Mektoub', 'Ya Zahri', 'Khalouni', 'Achek', 'Mizana',
    'Dounia Zina', 'Nar', 'Ya Lalla', 'Algiers', 'Casbah', 'Medina',
    'Rabi', 'El Qalb', 'Ya Moulay', 'Habib', 'Wahran', 'Chaabi 2025',
  ],

  idir: [
    'A Vava Inouva', 'Azawad', 'Ssendu', 'Zwit Rwit', 'Cfiyeh', 'Taghareg',
    'Tamatart', 'Arrach', 'Imbark', 'Tilleli', 'Ay Arrac Nnegh', 'L\'exil',
    'Tamazight', 'Thileli', 'Tizi', 'Amazigh', 'Kabylie', 'Dda Lmulud',
    'Tamurt', 'Ighil', 'Tawriqt', 'Amroud', 'Tafsut', 'Izem', 'Anzar',
    'Tala', 'Thala', 'Thilelli', 'Tadukli', 'Tirga', 'Tagdudt', 'Timsan',
    'Tajmaat', 'Tawsa', 'Taneflit', 'Tasuret', 'Tagerfa', 'Tadukli',
    'Amezgun', 'Tala N Tazart', 'Idhur', 'Tislit', 'Tawrirt', 'Adrar',
    'Tillelli', 'Tajt', 'Tandint', 'Takebbayt', 'Taqbaylit', 'Akal',
    'Tamettant', 'Tamejjant', 'Taqvaylit', 'Times', 'Adles', 'Amezruy',
    'Isem', 'Tajmaet', 'Tayri', 'Tafunast', 'Taqbaylit Identity',
  ],

  lounis: [
    'Raba Hni', 'Tamezghit', 'Asfel', 'Tajmaat', 'Amazigh', 'Tamurt',
    'Tizi', 'Ighil', 'Tawriqt', 'Amroud', 'Tafsut', 'Izem', 'Anzar',
    'Tala', 'Thala', 'Thilelli', 'Tadukli', 'Tirga', 'Tagdudt', 'Timsan',
    'Tawsa', 'Taneflit', 'Tasuret', 'Tagerfa', 'Amezgun', 'Tala N Tazart',
    'Idhur', 'Tislit', 'Tawrirt', 'Adrar', 'Tillelli', 'Tajt', 'Tandint',
    'Takebbayt', 'Taqbaylit', 'Akal', 'Tamettant', 'Tamejjant', 'Times',
    'Adles', 'Amezruy', 'Isem', 'Tajmaet', 'Tayri', 'Tafunast',
    'Cfiyeh', 'Taghareg', 'Tamatart', 'Arrach', 'Imbark', 'Tilleli',
    'Ay Arrac Nnegh', 'L\'exil', 'Tamazight', 'Thileli', 'Kabylie',
    'Dda Lmulud', 'Taqvaylit', 'Ammi', 'Yelli', 'Zzhu', 'Alla',
  ],

  matoub: [
    'Thassast', 'A ttnagh', 'Amazigh', 'Tajmaat', 'Tamurt', 'Tizi',
    'Ighil', 'Tawriqt', 'Amroud', 'Tafsut', 'Izem', 'Anzar', 'Tala',
    'Thala', 'Thilelli', 'Tadukli', 'Tirga', 'Tagdudt', 'Timsan',
    'Tawsa', 'Taneflit', 'Tasuret', 'Tagerfa', 'Amezgun', 'Tala N Tazart',
    'Idhur', 'Tislit', 'Tawrirt', 'Adrar', 'Tillelli', 'Tajt', 'Tandint',
    'Takebbayt', 'Taqbaylit', 'Akal', 'Tamettant', 'Tamejjant', 'Times',
    'Adles', 'Amezruy', 'Isem', 'Tajmaet', 'Tayri', 'Tafunast',
    'Cfiyeh', 'Taghareg', 'Tamatart', 'Arrach', 'Imbark', 'Tilleli',
    'Kabylie', 'Dda Lmulud', 'Taqvaylit', 'Tislit', 'Thileli',
    'A Vava', 'Tazart', 'Tajmaat Nnegh', 'Tamazight Identity',
  ],

  taos: [
    'Chants de L\'Atlas', 'Achewal', 'Tajmaat', 'Amazigh', 'Tamurt',
    'Tizi', 'Ighil', 'Tawriqt', 'Amroud', 'Tafsut', 'Izem', 'Anzar',
    'Tala', 'Thala', 'Thilelli', 'Tadukli', 'Tirga', 'Tagdudt', 'Timsan',
    'Tawsa', 'Taneflit', 'Tasuret', 'Tagerfa', 'Amezgun', 'Tala N Tazart',
    'Idhur', 'Tislit', 'Tawrirt', 'Adrar', 'Tillelli', 'Tajt', 'Tandint',
    'Takebbayt', 'Taqbaylit', 'Akal', 'Tamettant', 'Tamejjant', 'Times',
    'Adles', 'Amezruy', 'Isem', 'Tajmaet', 'Tayri', 'Tafunast',
    'Kabylie', 'Dda Lmulud', 'Taqvaylit', 'Thileli', 'Tazart', 'Alla',
    'Tajt N Tata', 'Tamghart', 'Yelli', 'Ammi', 'Zzhu', 'Aneggaf',
  ],

  'lotfi-dz': [
    'Khalti', 'Bladi', 'Rap Dz', 'Ana El Hak', 'Machi Hak', 'Dzair',
    'El Watan', 'Salam', 'Liberte', 'Houwa', 'Nti', 'Ana', 'Zman',
    'Chhal', 'Bledi', 'Nadi', 'El Ghorba', 'Khalas', 'Roh', 'Zarga',
    'Djamila', 'Bent Bladi', 'Saha Ftour', 'Tlata', 'Nouvelle Vie',
    'Soleil de Minuit', 'Fou de Toi', 'Ya Lemma', 'L\'amour', 'Machi Anaya',
    'Dja', 'Fiha', 'Seragi', 'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum',
    'Ya Mama', 'Galbi', 'El Haraka', 'Ya Rabi', 'Nti El Bahdja', 'Nti Nour',
    'Ya Rayess', 'J\'attendrai', 'Mizana', 'Dounia Zina', 'Achki',
    'Rap 2025', 'Underground', 'Street', 'Justice', 'Paix', 'Verite',
    'Liberte Expression', 'Citoyen', 'Generation', 'Revolte', 'Espoir',
    'Alger Ma Ville', 'SOS', 'Message', 'Conscience', 'Eveil', 'Cri',
    'Debout', 'Resistance', 'Change', 'Combattant', 'Lutte', 'Droits',
  ],

  didine: [
    'Ana El Hak', 'Dz Hip Hop', 'Bladi', 'Mix', 'Beat', 'Flow',
    'Rap Dz', 'Salam', 'Zman', 'Chhal', 'Nti', 'Houwa', 'Ana',
    'Bledi', 'Nadi', 'Khalas', 'Roh', 'Zarga', 'Djamila', 'Bent Bladi',
    'Saha Ftour', 'Tlata', 'Nouvelle Vie', 'Fou de Toi', 'Ya Lemma',
    'L\'amour', 'Machi Anaya', 'Dja', 'Fiha', 'Seragi', 'Khalini',
    'Maquis', 'Rouhou', 'Salam Alaikum', 'Ya Mama', 'Galbi', 'El Haraka',
    'Ya Rabi', 'Nti El Bahdja', 'Nti Nour', 'Ya Rayess', 'J\'attendrai',
    'Mizana', 'Dounia Zina', 'Rap 2025', 'Street', 'Urban',
    'Hip Hop Dz', 'Flex', 'Money', 'Hustle', 'Dream', 'Boss', 'Team',
    'Gang', 'Real Talk', 'Old School', 'New Wave', 'Underground Dz',
    'Rapper', 'Mic Check', 'One Shot', 'Freestyle', 'Cypher', 'Battle',
  ],

  tiba: [
    'Nzida', 'Rap Dz', 'Bladi', 'Nti', 'Ana', 'Houwa', 'Bledi',
    'Nadi', 'Salam', 'Khalas', 'Roh', 'Zman', 'Chhal', 'Zarga',
    'Djamila', 'Saha Ftour', 'Tlata', 'Nouvelle Vie', 'Fou de Toi',
    'Ya Lemma', 'L\'amour', 'Machi Anaya', 'Dja', 'Fiha', 'Seragi',
    'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum', 'Ya Mama', 'Galbi',
    'El Haraka', 'Ya Rabi', 'Nti El Bahdja', 'Nti Nour', 'Ya Rayess',
    'Mizana', 'Dounia Zina', 'Rap 2025', 'Street', 'Urban', 'Hip Hop Dz',
    'Flex', 'Dream', 'Boss', 'Real Talk', 'New Wave', 'Underground Dz',
    'Freestyle', 'Cypher', 'Queen', 'Female Power', 'Voice', 'Rise Up',
    'Strong', 'Independante', 'Feminine', 'Courage', 'Batisseuse',
    'Breakthrough', 'Gloire', 'Succes', 'Determination', 'Ambition',
  ],

  tamtam: [
    'Mimouna', 'Tahala', 'Gnawa', 'Diwan', 'Sahara', 'Tombouctou',
    'Bambara', 'Tourareg', 'Soudani', 'Mrabtin', 'Gnawi', 'Kouyou',
    'Bled', 'Salam', 'Zman', 'Nti', 'Houwa', 'Ana', 'Bledi', 'Nadi',
    'Saha Ftour', 'Nouvelle Vie', 'Fou de Toi', 'Ya Lemma', 'L\'amour',
    'Dja', 'Fiha', 'Seragi', 'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum',
    'Ya Mama', 'Galbi', 'El Haraka', 'Ya Rabi', 'Nti Nour', 'Mizana',
    'Dounia Zina', 'Amazigh', 'Tamazight', 'Adrar', 'Tinfou', 'Tanezrouft',
    'Hoggar', 'Tassili', 'Atakor', 'Tahaggart', 'Tefedest', 'Immidir',
    'Tadrart', 'Ajjer', 'Mouydir', 'Tinhert', 'Ahnet', 'Issaouane',
  ],

  'groupe-douli': [
    'Tinariwen', 'Desert Blues', 'Targui', 'Sahara', 'Tamanrasset',
    'Adrar', 'Hoggar', 'Tassili', 'Amazigh', 'Tamazight', 'Tinfou',
    'Tanezrouft', 'Atakor', 'Tahaggart', 'Tefedest', 'Immidir',
    'Tadrart', 'Ajjer', 'Mouydir', 'Tinhert', 'Ahnet', 'Issaouane',
    'Salam', 'Zman', 'Nti', 'Houwa', 'Ana', 'Bledi', 'Nadi',
    'Saha Ftour', 'Nouvelle Vie', 'Fou de Toi', 'Ya Lemma', 'L\'amour',
    'Dja', 'Fiha', 'Seragi', 'Khalini', 'Maquis', 'Rouhou', 'Salam Alaikum',
    'Ya Mama', 'Galbi', 'El Haraka', 'Ya Rabi', 'Nti Nour', 'Mizana',
    'Dounia Zina', 'Diwan', 'Blues', 'Desert Wind', 'Azawad', 'Sahara Blues',
  ],
};

const _trackDurations = ['3:42','4:18','5:04','4:36','5:22','3:58','6:12','4:48','3:34','5:44','4:22','6:08','3:48','4:56','5:38','4:14','3:52','5:18','4:28','6:34'];

// ===== GENERATE TRACKS with unique IDs =====
export const TRACKS = [];
const usedIds = new Set();

Object.entries(TITLE_POOLS).forEach(([artistId, titles]) => {
  const artist = ARTISTS.find(a => a.id === artistId);
  const albumPool = ALBUMS.filter(a => a.artistId === artistId);
  titles.forEach((title, idx) => {
    const album = albumPool[idx % Math.max(albumPool.length, 1)] || { title: 'Singles' };
    const id = `track_${artistId}_${idx}`;

    // Uniqueness check — if duplicate, append a counter
    let finalId = id;
    let counter = 0;
    while (usedIds.has(finalId)) {
      counter++;
      finalId = `${id}_${counter}`;
    }
    usedIds.add(finalId);

    TRACKS.push({
      id: finalId,
      title,
      artist: artist.name,
      artistId,
      album: album.title,
      duration: _trackDurations[idx % _trackDurations.length],
      image: `https://picsum.photos/seed/${artistId}${idx}/300/170`,
    });
  });
});
