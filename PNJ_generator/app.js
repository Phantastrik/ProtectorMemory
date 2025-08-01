

const peuples = ["Bruja", "Cucurbitus", "Kiore", "Mousseron"];

// Placeholder pour les noms (à personnaliser)

const noms = {
    "Bruja": {
        "1-1": "Agata", "1-2": "Galileo", "1-3": "Carmilla", "1-4": "Lontana", "1-5": "Teresa", "1-6": "Gamilo",
        "2-1": "Delfinio", "2-2": "Ludelia", "2-3": "Daldrida", "2-4": "Keliana", "2-5": "Isonela", "2-6": "Sororia",
        "3-1": "Prisca", "3-2": "Florendino", "3-3": "Cornelio", "3-4": "Margarita", "3-5": "Edna", "3-6": "Arnica",
        "4-1": "Estrella", "4-2": "Sibilia", "4-3": "Falco", "4-4": "Lili", "4-5": "Rosalina", "4-6": "Edita",
        "5-1": "Dalia", "5-2": "Monarda", "5-3": "Enice", "5-4": "Avenca", "5-5": "Gaudi", "5-6": "Abil",
        "6-1": "Dolores", "6-2": "Zolernia", "6-3": "Minerva", "6-4": "Alascavar", "6-5": "Glivina", "6-6": "Adonitan"
    },
    "Cucurbitus": {
        "1-1": "Brubru", "1-2": "Pepo", "1-3": "Yana", "1-4": "Morei", "1-5": "Nobo", "1-6": "Silo",
        "2-1": "Lineu", "2-2": "Bunga", "2-3": "Largo", "2-4": "Mungo", "2-5": "Bodo", "2-6": "Tingo",
        "3-1": "Mimil", "3-2": "Gogum", "3-3": "Bosor", "3-4": "Dido", "3-5": "Nabo", "3-6": "Nilso",
        "4-1": "Belco", "4-2": "Gribo", "4-3": "Tamil", "4-4": "Fanfa", "4-5": "Guila", "4-6": "Dodo",
        "5-1": "Tini", "5-2": "Felca", "5-3": "Cobodo", "5-4": "Tilu", "5-5": "Muni", "5-6": "Jerim",
        "6-1": "Apopo", "6-2": "Rumu", "6-3": "Buqui", "6-4": "Bira", "6-5": "Nunumu", "6-6": "Guito"
    },
    "Kiore": {
        "1-1": "Genus", "1-2": "Tierros", "1-3": "Zabynnu", "1-4": "Laokys", "1-5": "Agafya", "1-6": "Faas",
        "2-1": "Darynius", "2-2": "Vaydi", "2-3": "Uffe", "2-4": "Pavoy", "2-5": "Taavy", "2-6": "Ambroos",
        "3-1": "Oydus", "3-2": "Jaako", "3-3": "Talyko", "3-4": "Oynora", "3-5": "Paroiny", "3-6": "Gyattan",
        "4-1": "Payvoli", "4-2": "Taynnier", "4-3": "Alyx", "4-4": "Veyra", "4-5": "Gyno", "4-6": "Yasanima",
        "5-1": "Yutiku", "5-2": "Tabby", "5-3": "Qiussay", "5-4": "Yaffa", "5-5": "Callisty", "5-6": "Qyadir",
        "6-1": "Myaiar", "6-2": "Javvony", "6-3": "Ellysse", "6-4": "Ozylla", "6-5": "Eujy", "6-6": "Hiiyr"
    },
    "Mousseron": {
        "1-1": "Cremonium", "1-2": "Pahlandii", "1-3": "Asconmta", "1-4": "Armihlli", "1-5": "Sodlpe", "1-6": "Bavorhum",
        "2-1": "Auhdur", "2-2": "Ckaero", "2-3": "Ahmenidis", "2-4": "Isetno", "2-5": "Mektre", "2-6": "Anmetus",
        "3-1": "Teplome", "3-2": "Nimtri", "3-3": "Siobhan", "3-4": "Rhiyrnm", "3-5": "Lrhemuin", "3-6": "Sqervno",
        "4-1": "Bsintio", "4-2": "Kchyinmo", "4-3": "Lchalan", "4-4": "Aeihofe", "4-5": "Aghaltorn", "4-6": "Rhiyrzs",
        "5-1": "Zhaphil", "5-2": "Lybzsi", "5-3": "Ahrtenor", "5-4": "Comvrig", "5-5": "Thautlus", "5-6": "Descevrus",
        "6-1": "Jyihrt", "6-2": "Btonie", "6-3": "Vrymtodius", "6-4": "Hjimo", "6-5": "Tyiuhje", "6-6": "Szlohvven"
    }
};


const personnalites = {
    "A": "Enthousiaste",
    "2": "Poétique",
    "3": "Sarcastique",
    "4": "Charismatique",
    "5": "Grincheux",
    "6": "Curieux",
    "7": "Amical",
    "8": "Embarassé",
    "9": "Hatif",
    "10": "Reveur",
    "J": "Tranquille",
    "Q": "Joyeux",
    "K": "Triste"
};

const valeurs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const couleurs = ["♥", "♦", "♣", "♠"];
const tranchesAge = {
    "♥": "Enfant",
    "♦": "Adolescent",
    "♣": "Adulte",
    "♠": "Ancien"
};
const phrases = {
    "A": "Pleure une perte récente",
    "2": "A la recherche de quelque chose",
    "3": "Reve de voyager dans un autre village",
    "4": "Est très malade, lui reste très peu de temps ",
    "5": "Cherche l'amitié - ou peut etre l'amour  ?",
    "6": "Se languit d'un etre cher",
    "7": "Est un cartographe",
    "8": "En train de peindre un tableau",
    "9": "Interessé par les ruine, souhaite en savoir plus",
    "10": "Prononce un nom en errant",
    "J": "Achete des objets venus d'ailleurs",
    "Q": "Ressemble a quelqu'un, deja vu ? ",
    "K": "Est un batisseur"
}

function tirerCarte() {
    const couleur = couleurs[Math.floor(Math.random() * 4)];
    const valeur = valeurs[Math.floor(Math.random() * 13)];
    return { valeur, couleur };
}

function lancerDe(sides = 6) {
    return Math.floor(Math.random() * sides) + 1;
}

function genererPNJ() {
    let peuple = document.getElementById("peupleSelect").value;
    if (peuple === "random") {
        const d6 = lancerDe();
        if (d6 <= 2) peuple = "Bruja";
        else if (d6 <= 4) peuple = "Cucurbitus";
        else if (d6 === 5) peuple = "Kiore";
        else peuple = "Mousseron";
    }

    // Carte pour âge/personnalité
    const carteAge = tirerCarte();
    const age = tranchesAge[carteAge.couleur];
    const personnalite = personnalites[carteAge.valeur];

    // Carte pour phrase d'accroche
    const cartePhrase = tirerCarte();
    const phrase = phrases[cartePhrase.valeur]
    const phraseAccroche = ` ${cartePhrase.valeur} - ${phrase}`;

    // Lancer 2 dés pour le nom
    const d1 = lancerDe();
    const d2 = lancerDe();
    const cleNom = `${d1}-${d2}`;
    const nom = noms[peuple]?.[cleNom];

    // Affichage
    const resultat = `
        <p class="label">Peuple : ${peuple}</p>
        <p class="label">Nom : ${nom} (Dés: ${d1} & ${d2})</p>
        <p class="label">Âge : ${age} (${carteAge.couleur})</p>
        <p class="label">Personnalité : ${personnalite} (${carteAge.valeur})</p>
        <p class="label">Phrase d'accroche : ${phraseAccroche}</p>
      `;
    const blocPrincipal = document.getElementById("resultatPNJ");
    blocPrincipal.className = `result peuple-${peuple}`;
    blocPrincipal.innerHTML = resultat;


    // Historique
    const historiqueDiv = document.getElementById("historiquePNJ");
    const bloc = document.createElement("div");
    bloc.className = `result peuple-${peuple}`; // applique la classe de couleur
    bloc.innerHTML = `<hr>${resultat}`;
    historiqueDiv.prepend(bloc);
}
function viderHistorique() {
    document.getElementById("historiquePNJ").innerHTML = "";
}
