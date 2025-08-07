-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 05 août 2025 à 10:16
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `img_notes`
--
CREATE DATABASE IF NOT EXISTS `img_notes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `img_notes`;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `filename`, `title`, `uploaded_at`) VALUES
(3, '3.jpg', 'Protector Hex Map #1', '2025-07-30 10:59:00'),
(4, '4.jpg', 'Protector Character Sheet', '2025-07-30 10:59:00');

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `pin_id`, `content`, `created_at`, `title`) VALUES
(29, 32, 'Armé de son épée, il peut fuir les combats sans jeter de dés ni subir de dégats.\n\nRoberto est mort en voulant aider un petit scarabée retourné.', '2025-08-01 15:44:08', '(MORT) Roberto le guerillero'),
(30, 34, 'L\'atmosphère est irrespirable ici, je suis contraint de faire demi tour', '2025-07-30 21:46:32', 'Premier pas'),
(32, 37, 'A mon arrivée, je ne vois pas loin autour de moi.\nMais en marchant, je constate que certaines feuilles tombées sont plus épaisses que d\'autres et ont l\'air commestibles.\n+3 feuilles', '2025-07-30 21:52:19', 'Des ombres ancestrales m\'etreignent'),
(33, 32, '- 10 Lareons Jaunes\n- 2 Lareons rouges\n- 3 bois\n- 2 fer', '2025-08-02 14:24:53', 'Inventaire'),
(34, 39, 'La nuit vient de tomber (-1 feuille)\nEncore une fois je pense pense m\'etre perdu.\nMais accroché a un arbre je distingue de la lumière vacillante. iI s\'agit d\'une torche a la flamme faiblissante.\nJe decide de l\'eteindre précautionneusement pour la ranger dans mon sac. (+ 1 torche)', '2025-07-30 21:57:08', 'Des ombres m\'entourrent'),
(35, 38, 'En suivant les chants de la foret, je percois une douce mélodie au loin derrière les grand arbres noir.\nBercé par les rythmes tranquilles des percussions, je me perd dans mes pensée, jusqu\'a arriver a l\'entrée d\'un village Bruja.\n\nDerriere une maison je trouve 2 fruits suspendus a un arbre.', '2025-08-02 14:12:35', 'Village Bruja'),
(36, 49, 'L\'oratoire est un Grand arbre creux,\nen son centre, une statue représentant un Bruja primitif en posture méditative.\nPenché devant la statue, je rencontre une Bruja pleurant.\nElle me dit qu\'elle s\'appelle Isonela, elle grandit dans ce village, la ruine qui s\'y trouve l\'a toujours intriguée, mais s\'y rendre est un tabou pour les autres membres du village.\nElle a deja essayé de s\'y rendre par curiosité mais son grand père l\'en a défendu fortement et l\'a réprimandé pour avoir osé défier le tabou du  village.\nSont grand père est mort récemment, ce pourquoi elle s\'est sentie triste et a ressenti le besoin de se receuillir auprès de la statue des ancêtres.', '2025-07-31 21:59:42', 'Batiment - Oratoire Permanent'),
(37, 49, 'La boutique est tenue par Dolores,\nUne ancienne Bruja au regard perçant et soutenu.\nElle est vielle et semble très malade.\nElle écoule ses derniers vetements sachant que la fin approche.\n\n---Magasin---\n500 Po > Pull Over Bruja :\nLes motifs représentent des dessins traditionels.\nCelui la semble conter la vie d\'un bruja qui franchit les ombres de la foret', '2025-07-31 21:11:37', 'Batiment - Petite boutique de vetement'),
(38, 49, 'L\'agence est tenue par Abil, un bruja Adulte et entousiaste.\nLes objets qui viennent d\'autres contrées l\'interesssent beaucoup et serait prêt a les acheter.\n\n--------- Les missions -----------\n- Apporter un arrosoir a Dolores, de la boutique de vetement\n> 5 points d\'honneur\n\n[TERMINE] Amener un habitant d\'un autre village dans ce village\n> Contruction d\'un nouveau batiment\n\n- Isonela souhaite qu\'on lui apporte 6 plats Cucurbitus\n> Récompense aléatoire\n\n- Apporter un plat d\'un autre village a l\'agence\n> Recompense aléatoire', '2025-08-02 14:18:04', 'Batiment - Grande Agence de missions'),
(39, 49, 'La Taverne est plutot déserte Aujourd\'hui, \nElle est tenue par Florendino et Lontana, deux Brujas amicaux.\nCette taverne est leur maison et vivent heureux avec leur fille Daldrida.\nQuand j\'arrive dans la taverne, Daldrida pleure car elle a perdu lezard jaune que ses parents lui ont donné pour son anniversaire. \nSi je lui retrouve un lezard jaune  elle peut me donner une carte de Biome.\n\n------- Menu de la taverne ------------\n// Biscuits au fruits : 80po //\n1 mais / 1 fruit \n> +1 attribut au choix et +1 ame\n\n// Gateau aux pignons de pin : 10po //\n1 feuille / 1 racine \n> +2 endurance\n\n// Soupe aux herbes : 70po //\n4 feuille / 1 Eau\n> +1 courage et  +1 ame\n\n// Mijoté de tige : 30po //\n2 bois / 1 eau\n> +2 endurance\n\n// Thé de racine : 100po //\n1 Eau / 2 racine \n> +3 points dans UN attribut', '2025-07-31 22:17:55', 'Batiment - Grande Taverne'),
(40, 49, '.', '2025-07-30 22:03:34', 'Batiment - Ruine'),
(45, 51, 'Peuple : Bruja\nNom : Dolores\nÂge : Ancien\nPersonnalité : Amicale\nPhrase d\'accroche : Lui reste très peu de temps', '2025-07-31 21:12:41', 'Dolores (Boutique de vetement)'),
(46, 51, 'Âge : Adulte (♣)\nPersonnalité : Triste (K)\nPhrase d\'accroche : 9 - Interessé par les ruine, souhaite en savoir plus', '2025-07-31 21:16:26', 'Isonela (Oratoire)'),
(47, 51, 'Peuple : Bruja\nÂge : Adulte (♣)\nPersonnalité : Enthousiaste (A)\nPhrase d\'accroche : J - Achete des objets venus d\'ailleurs', '2025-07-31 22:01:52', 'Abil (Grande agence de mission)'),
(48, 51, 'Peuple : Bruja\nÂge : Adulte (♣)\nPersonnalité : Amical (7)', '2025-07-31 22:08:14', 'Florendino (Taverne)'),
(49, 51, 'Peuple : Bruja\nÂge : Enfant (♥)\nFille de Florendino et Lontana\nPersonnalité : Triste (K)\nPhrase d\'accroche : 7 - Est un cartographe', '2025-07-31 22:09:24', 'Daldrida (taverne)'),
(50, 51, 'Peuple : Bruja\nFemme de Florendino\nÂge : Adulte (♣)\nPersonnalité : Amical (7)', '2025-07-31 22:10:00', 'Lontana (Taverne)'),
(51, 52, 'Devant moi, des plaines de blé s\'etendent a perte de vue.\nAu milieu de cette mer, des batiment émergent.\nIl s\'agit d\'une ferme Cucurbitus.\n\nLa nuit tombant je suis contrain de manger quelque chose (-1 feuille).\nJe ne dispose pas de beaucoup de ressoure alors je decide de repasser plus tard dans ce village.', '2025-08-01 15:25:11', 'Le crépuscule est bientot là'),
(52, 55, 'Tenue par : Nunumu\n\n-------------------', '2025-08-01 15:08:55', 'Gare en activité'),
(53, 55, 'Tenu par : Tamil \n\n-------------------\nSirop Gargarisant : 50po \n> +1 attribut\n[1 mais / 1 eau / 1 champi commun]\n\nDecoction florale : 500po \n> Change la couleur d\'un sauriflore\n[1 mais / 1 biere de mycelium]\n\nThé transparent : 300po \n> Rend invisible a toute créature pendant 1jour et 1 nuit\n[1 or / 1 eau ]\n\nRaffraichissement pétillant : 100po \n> imunité aux deserts 1 jour\n[1 cactus / 1 eau / 1 charbon]\n\nStimulant Hardi : 100po \n> -1 au dé sur un jet de courage \n[2 cactus / 1 biere mycellium]', '2025-08-01 15:15:08', 'Grande boutique de potion'),
(54, 57, 'Peuple : Cucurbitus\nNom : Nunumu (Dés: 6 & 5)\nÂge : Adulte (♣)\nPersonnalité : Curieux (6)\nPhrase d\'accroche : 7 - Est un cartographe', '2025-08-01 15:16:23', 'Nunumu (Gare)'),
(55, 57, 'Peuple : Cucurbitus\nNom : Tamil (Dés: 4 & 3)\nÂge : Ancien (♠)\nPersonnalité : Curieux (6)\nPhrase d\'accroche : 10 - Prononce un nom en errant', '2025-08-01 15:16:50', 'Tamil (grande Boutique potions)'),
(56, 55, '.', '2025-08-01 15:18:49', 'Ruine I'),
(57, 55, '.', '2025-08-01 15:18:55', 'Ruine II'),
(58, 55, 'Tenu par : Jerim \n\n-------------------\nSalopette Cucurbitus : 500po\n\nChapeau de paille : 500po', '2025-08-01 15:20:31', 'Grande Boutique de vetements'),
(59, 57, 'Peuple : Cucurbitus\nNom : Jerim (Dés: 5 & 6)\nÂge : Adolescent (♦)\nPersonnalité : Triste (K)\nPhrase d\'accroche : 6 - Se languit d\'un etre cher', '2025-08-01 15:21:03', 'Jerim (Boutique de vetements)'),
(60, 53, 'Le jour se leve a mon arrivée et le vent aussi.\n\nLes bourrasques sont terrible mais je parvient a rester debout pour continuer mon chemin.', '2025-08-01 17:51:02', '1er passage - Vents Violents'),
(61, 54, 'Milieu de journée, le vent souffle fort ici aussi.\n\nLes bourrasques sont terrible mais je parvient a rester debout pour continuer mon chemin.\n\nSur le chemin, je récolte tout de meme 2 brins de mais (+2 mais)', '2025-08-01 15:28:48', 'Vent violents'),
(62, 65, 'A mon arrivée, la chaleur est encore forte, mais la nuit va bientot tomber (-1 courage).\n\nA mes pieds, un petit scrabée est retourné sur le dos.\nJe n\'ai pas réussi a le retournée malheureusement et je me suis piqué avec ses épines. (-1 ame).\n\nJe ne trouve rien d\'autre d\'interessant dans le coin. \nJe mainge un épi de mais avant la tombée de la nuit et je poursuit ma route', '2025-08-01 15:35:31', 'Scarabée du désert'),
(63, 32, 'AME :\n3 / 3\n\nCOURAGE\n2 / 2\n\nENDURANCE :\n4 / 4', '2025-08-01 15:50:21', 'Stats - Remi le pelerin'),
(64, 66, 'La chaleur est beaucoup plus supportable de nuit.\nJe rencontre a nouveau un scarabée retourné.\nIl a doit etre un proche parent de celui que j\'ai croisé plus tot.\n\nen voulant l\'aider a se retourner, je me pique a nouveau et fini par succomber.', '2025-08-01 15:38:03', 'Scrabée retourné'),
(65, 69, 'La chaleur est terrible ici\nmais geureusement ce petit paradis de palmier me permet de me reposer pour récuperer un peu d\'ame.\n\nDe nuit, je me repose a l\'ombre des palmiers pour retrouver un peu d\'ame', '2025-08-01 17:23:51', 'Oasis de palmier'),
(66, 73, 'Je tombe sur une clairiere remplie de débris bizarre, il semble s\'agir de pizis cassés.\nL\'un deux encore en vie semble ravi de me voir, il commence à me suivre.\nCelui ci me montre avec joie un arbre rempli de fruit.\nJe décide d\'en prendre 2 avec moi.', '2025-08-01 16:14:30', 'Un pizi !'),
(67, 74, 'Tenue par : Alascavar', '2025-08-01 16:19:05', 'Gare en activité'),
(68, 74, '.', '2025-08-01 16:19:14', 'Ruine I'),
(69, 74, 'Tenue par : Agata\n\n> 300 po la nuit', '2025-08-01 16:27:12', 'Grande Auberge'),
(70, 74, 'Tenue par : Avenca \n\n----------------------\n\nHache : 250po \nDura :  10\n[1 bois / 1 fer]\n\nMachine a vapeur : 500po \nDura :  1\n[1 ame en bouteille / 1 fer]\n\nTenu fongique : 300po \nDura :  1\n[1 or / 1 fer / 1 beaume champi]\n\nGants thermiques : 300po \nDura :  5\n[1 cactus / 1 cuivre]\n\nTorche : 10po \nDura :  1\n[1 bois / 1 charbon]', '2025-08-01 16:24:24', 'Grande boutique d\'équipement'),
(71, 80, 'Peuple : Bruja\nNom : Avenca (Dés: 5 & 4)\nÂge : Ancien (♠)\nPersonnalité : Triste (K)\nPhrase d\'accroche : 8 - En train de peindre un tableau', '2025-08-01 16:26:48', 'Avenca (boutique equipement)'),
(72, 80, 'Peuple : Bruja\nNom : Agata (Dés: 1 & 1)\nÂge : Enfant (♥)\nPersonnalité : Sarcastique (3)\nPhrase d\'accroche : A - Pleure une perte récente', '2025-08-01 16:27:25', 'Agata (Auberge)'),
(74, 80, 'Peuple : Bruja\nNom : Alascavar (Dés: 6 & 4)\nÂge : Adolescent (♦)\nPersonnalité : Triste (K)\nPhrase d\'accroche : 4 - Est très malade, lui reste très peu de temps', '2025-08-01 16:28:28', 'Alascavar (Gare)'),
(75, 82, 'Devans moi une prairie remplie de lareons jaunes.\nJ\'en ceuille 5 et les ranges dans mon sac.', '2025-08-01 17:16:05', 'Jardin de Laréons jaunes de taille normale (récoltés)'),
(76, 83, 'Cette fois ce sont des lareons jaunes qui parsement la prairie.\nJ\'ai met 2 dans mon sac', '2025-08-01 17:17:40', 'Lareons rouge de taille normale (récoltés)'),
(77, 84, 'Une majestueuse baleine luxuriante vole au dessus de moi.\nElle se pose a quelques dizaines de metres.\nQuand je decide de m\'approcher, elle s\'enfuie.\nAu revoir petite baleine.', '2025-08-01 17:19:39', 'Baleine luxuriante paisible'),
(78, 70, 'J\'ai profité de la nuit pour m\'aventurer dans ce desert.\nDans la nuit , j\'entend un bruit repetitif de frottement dans le sable.\nA la leur de la lune, je distingue un scarabé sur le dos.\nJe n\'arrive pas a le retourner et me blesse avec ses piquants.\nVilain !', '2025-08-01 17:21:49', 'Scarabée retourné'),
(79, 75, '2', '2025-08-02 14:20:45', 'AME (3)'),
(80, 75, '2', '2025-08-01 17:22:16', 'COURAGE (2)'),
(81, 75, '4', '2025-08-01 17:22:25', 'ENDURANCE(4)'),
(82, 73, 'En revenant ici, je retrouve mon ami le pizi.\nIl m\'indique cette fois ci un tas de bois qui pourrait m\'etre fort bien utile !', '2025-08-01 17:25:47', '2eme passage'),
(83, 72, 'Le jour se leve, je me vois contraint d\'avaler quelque chose.\n\nPendant que j\'avalait mon dernier epi de mais, un Yaba a l\'air perdu s\'est approché de moi. Il a l\'air perdu le pauvre petit.\nMalheureusement je n\'ai rien a lui donner.', '2025-08-01 17:28:56', '1er passage - Yaba perdu'),
(84, 85, 'Je cueuille 4 petales que je range dans mon sac', '2025-08-01 17:31:06', '1er passage - Jardin de lareons jaunes'),
(85, 86, 'Les ossements d\'une immense baleines recouvrent le sol. Jonchant le sol, je trouve une bourse de 100 pieces d\'or.', '2025-08-01 17:32:49', '1er passage - Un tas d\'ossement géants'),
(86, 75, '90', '2025-08-01 17:43:47', 'Pieces'),
(87, 87, 'Je profite des dernieres lueurs du jour pour récolter 6 lareons que je range dans mon sac.', '2025-08-01 17:34:18', '1er passage - Jardin de lareons jaunes'),
(88, 88, 'Je profite du début de la nuit pour m\'aventurer dans le desert.\nDans la pénombre, une forme blanche se distingue.\nC\'est une ruine.\nMais je ne suis pas assez équipé pour m\'en approcher.', '2025-08-01 17:36:39', '1er passage - Ruine'),
(89, 89, 'Un paradis de palmier qui semble bien calme au clair de la lune du soir.\n\nJe n\'y trouve rien d\'interessant, bien dommage.', '2025-08-01 17:38:25', '1er passage - Paradis de palmier'),
(90, 91, 'Toujours la meme chose, est-ce un mirage ?', '2025-08-01 17:39:42', '1er passage - Encore un paradis de palmier'),
(91, 92, 'Profitant de la nuit pour traverser le desert, je rencontre un Kiore Amical.\nConnaissant ses traditions je lui propose d\'emblée de miser 10 pieces dans un combat.\nJe perd aussitot mon pari evidemment.\n\nEn discutant un peu avec lui, j\'apprend qu\'il manque de compagnie et cherche en réalité a rencontrer des gens.\nC\'est pour cela qu\'il parcourre le désert.\n\nJe lui propose donc de me suivre et lui promet de l\'amener dans un village ou il pourrait rencontrer des gens et s\'installer.', '2025-08-01 17:45:08', 'Un kiore !'),
(94, 91, 'Cette fois ci je viens de jour et la chaleur est accablante.\nJe suis accompagné de darynius et nous nous arretons pour faire une pause a l\'abri des palmier et recupérer nos points d\'ame perdus.\n\nCette fois avec son aide je trouve un peu de fer derriere un caillou', '2025-08-01 17:48:52', '2eme passage - avec Darynius'),
(95, 38, 'Je suis arrivé avec Darynius dans le village, il semble très content de voir autant de monde, lui qui a passé si longtemps en solitaire.\nNous nous rendons tout de suite a l\'agence de mission ou il rencontre Abil.\nJ\'explique a Abil que Darynius souhaite s\'inataller ici.\nAbil nous explique que justement, le village aurait bien besoin d\'une petite boutique d\'équipement.\n\nEn aidant Darynius a réaliser un rêve, je gagne 1 Inpiration', '2025-08-02 14:18:44', '2eme passage - Avec Darynius'),
(96, 51, 'Peuple : Kiore\n\nNom : Darynius (Dés: 2 & 1)\nÂge : Adulte (♣)\nPersonnalité : Hatif (9)\nPhrase d\'accroche : 5 - Cherche l\'amitié - ou peut etre l\'amour ?\n\nRencontré dans le desert, ramené au village.', '2025-08-02 14:14:15', 'Darynius (petite boutique d\'équipement)'),
(97, 49, 'La boutique est tenue par Darynius, un kiore trouvé dans le desert qui désirait rencontrer plus de monde.\n\n--------- A vendre -----------\nTenu fongique : 300po\nDura : 1\n[1 or / 1 fer / 1 beaume champi]\n\nGants thermiques : 300po\nDura : 5\n[1 cactus / 1 cuivre]\n\nEpée : 300po\nDura : 5\n[3 cactus / 1 cuivre]', '2025-08-02 14:16:50', 'Batiment - Petite boutique d\'équipement'),
(98, 75, '0', '2025-08-02 14:17:27', 'Honneur'),
(99, 75, '1', '2025-08-02 14:17:42', 'Inspiration'),
(100, 53, 'Encore une fois, le vent souffle fort ici.\nN\'ayant pas assez de force pour lutter, je perd 1 point d\'ame', '2025-08-02 14:20:38', '2eme passage - Vents violents'),
(101, 54, 'La petite créature semble interessée par moi, ou en tout cas, a mon sac.\n\nEn effet, je suis blindé de Lareons Jaune qu\'il semble convoiter.\nJe décide de lui en donner 5, ce qui semble le ravir.\nJ\'en profite pour récolter 5 petales de sauriflore', '2025-08-02 14:24:35', '2eme passage - Sauriflore Jaune'),
(102, 75, 'Sauriflore Jaune', '2025-08-02 14:25:06', 'Compagnon');

--
-- Déchargement des données de la table `pins`
--

INSERT INTO `pins` (`id`, `x_percent`, `y_percent`, `created_at`, `image_id`, `title`, `color`, `label`) VALUES
(32, 51.9137, 51.4586, '2025-07-30 21:40:17', 3, 'Depart', '#222255', ''),
(34, 55.4893, 44.2415, '2025-07-30 21:45:36', 3, 'D14 - Jungle champignon', '#5170d6', ''),
(35, 58.8002, 34.7067, '2025-07-30 21:45:53', 3, 'C15 - Jungle champignon', '#5170d6', ''),
(37, 61.8461, 43.2446, '2025-07-30 21:48:08', 3, 'D16 - foret des ombres', '#753b1e', ''),
(38, 65.4218, 35.1939, '2025-07-30 21:48:26', 3, 'C17 - foret des ombres', '#753b1e', ''),
(39, 69.2624, 43.0657, '2025-07-30 21:49:01', 3, 'D19 - Foret des ombres', '#753b1e', ''),
(49, 63.4353, 34.8314, '2025-07-31 21:10:15', 3, 'Village Bruja', '#222255', '🏠'),
(50, 67.35, 33.3889, '2025-07-31 21:10:44', 3, 'Ruine', '#222255', '🏛️'),
(51, 65.1081, 31.3889, '2025-07-31 21:11:02', 3, 'Habitants', '#EEEEAA', '👨‍🌾'),
(52, 69.8721, 25.9762, '2025-08-01 15:03:27', 3, 'B18 - Mer champetre', '#7cd121', ''),
(53, 62.5859, 25.4048, '2025-08-01 15:05:25', 3, 'B16 - Mer champetre', '#7cd121', ''),
(54, 55.2064, 26.119, '2025-08-01 15:05:35', 3, 'B14 - Mer champetre', '#7cd121', ''),
(55, 68.3775, 26.4048, '2025-08-01 15:05:50', 3, 'Ferme Cucurbitus', '#222255', '🏠'),
(57, 67.9104, 23.8333, '2025-08-01 15:16:00', 3, 'Habitants', '#EEEEAA', '👨‍🌾'),
(58, 71.3667, 27.3413, '2025-08-01 15:17:06', 3, 'Ruine', '#222255', '🏛️'),
(59, 69.6852, 29.627, '2025-08-01 15:17:40', 3, 'Ruine II', '#222255', '🏛️'),
(65, 52.0304, 18.4524, '2025-08-01 15:30:22', 3, 'A13 - desert silencieux', '#eb9b34', ''),
(66, 45.585, 17.5952, '2025-08-01 15:30:39', 3, 'A11 - Desert silencieux', '#eb9b34', ''),
(69, 58.6627, 49.4048, '2025-08-01 15:54:20', 3, 'E15 - desert silencieux', '#eb9b34', ''),
(70, 55.6735, 59.8333, '2025-08-01 15:54:39', 3, 'F14 - Desert silencieux', '#eb9b34', ''),
(72, 73.3283, 51.8333, '2025-08-01 16:11:19', 3, 'E19 - foret des ombres', '#753b1e', ''),
(73, 64.9212, 51.4048, '2025-08-01 16:11:40', 3, 'E17 - foret des ombres', '#753b1e', ''),
(74, 62.4925, 59.5476, '2025-08-01 16:12:00', 3, 'F16 - foret des ombres', '#753b1e', ''),
(75, 52.4041, 33.8651, '2025-08-01 16:15:37', 3, 'Mon pin', '#EEEEAA', '👤​'),
(76, 60.9045, 61.4048, '2025-08-01 16:16:01', 3, 'Village Bruja', '#222255', '🏠'),
(77, 62.5859, 62.8651, '2025-08-01 16:24:38', 3, 'Ruine I ', '#222255', '🏛️'),
(78, 62.3991, 56.7222, '2025-08-01 16:25:08', 3, 'Gare - Brunosland', '#EEEEAA', '🚂'),
(79, 68.0973, 28.5476, '2025-08-01 16:25:32', 3, 'Gare - Potirouille', '#EEEEAA', '🚂'),
(80, 60.4189, 58.0397, '2025-08-01 17:06:21', 3, 'Habitants', '#EEEEAA', '👨‍🌾'),
(82, 58.6627, 65.881, '2025-08-01 17:14:02', 3, 'Jardins titanesques', '#De70d6', ''),
(83, 52.2172, 67.4524, '2025-08-01 17:14:17', 3, 'Jardins titanesques', '#De70d6', ''),
(84, 48.5742, 59.4524, '2025-08-01 17:14:25', 3, 'Jardins Titanesques', '#De70d6', ''),
(85, 78.5594, 51.6111, '2025-08-01 17:29:29', 3, 'Jardins titanesques', '#De70d6', ''),
(86, 86.6862, 50.754, '2025-08-01 17:29:38', 3, 'Jardins titanesques', '#De70d6', ''),
(87, 90.049, 43.3254, '2025-08-01 17:29:46', 3, 'Jardins titanesques', '#De70d6', ''),
(88, 82.2024, 42.8016, '2025-08-01 17:35:02', 3, 'Desert silencieux', '#eb9b34', ''),
(89, 76.5043, 42.6429, '2025-08-01 17:35:13', 3, 'Desert silencieux', '#eb9b34', ''),
(90, 83.3234, 45.373, '2025-08-01 17:35:32', 3, 'Ruine I', '#222255', '🏛️'),
(91, 73.1415, 34.0714, '2025-08-01 17:38:57', 3, 'Desert silencieux', '#eb9b34', ''),
(92, 79.9606, 34.2143, '2025-08-01 17:39:07', 3, 'Desert silencieux', '#eb9b34', '');

--
-- Déchargement des données de la table `pin_links`
--

INSERT INTO `pin_links` (`id`, `pin1_id`, `pin2_id`, `color`) VALUES
(2, 79, 78, '#EEEEAA');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
