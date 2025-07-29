-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 29 juil. 2025 à 17:11
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

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

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `filename`, `title`, `uploaded_at`) VALUES
(1, '1.png', 'Hex map #1', '2025-07-29 15:04:01'),
(2, '2.jpg', 'Hex color #2', '2025-07-29 16:17:43');

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `pin_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `pin_id`, `content`, `created_at`) VALUES
(1, 12, 'arrr', '2025-07-29 16:02:17'),
(2, 11, 'aa', '2025-07-29 16:04:22'),
(3, 12, 'aaaaaaa', '2025-07-29 16:08:46'),
(4, 13, 'Test', '2025-07-29 16:18:06'),
(5, 13, 'Lorem ipsum dolor sit amet \nLorem ipsum dolor sit amet \nLorem ipsum dolor sit amet \nLorem ipsum dolor sit amet \nLorem ipsum dolor sit amet \nLorem ipsum dolor sit amet', '2025-07-29 16:18:22');

-- --------------------------------------------------------

--
-- Structure de la table `pins`
--

CREATE TABLE `pins` (
  `id` int(11) NOT NULL,
  `x_percent` float NOT NULL,
  `y_percent` float NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `image_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `color` varchar(7) DEFAULT '#ff0000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pins`
--

INSERT INTO `pins` (`id`, `x_percent`, `y_percent`, `created_at`, `image_id`, `title`, `color`) VALUES
(10, 54.5741, 46.3051, '2025-07-29 15:46:16', 1, 'Mon pin', '#ff00EE'),
(11, 57.7219, 51.3111, '2025-07-29 15:49:38', 1, 'test', '#ff0000'),
(12, 66.0883, 40.7628, '2025-07-29 15:54:21', 1, 'Mon pin', '#ff0000'),
(13, 59.4577, 51.3136, '2025-07-29 16:18:01', 2, 'Mon pin', '#220000'),
(14, 76.1007, 41.2919, '2025-07-29 16:18:48', 2, 'ABEC', '#552200'),
(15, 40.447, 73.4601, '2025-07-29 17:03:31', 1, 'Mon pin', '#ffc107'),
(16, 45.4829, 48.3176, '2025-07-29 17:03:36', 1, 'Mon pin', '#4b7bff'),
(17, 56.1994, 34.4811, '2025-07-29 17:03:48', 2, 'Mon pin', '#ffc107'),
(18, 84.809, 73.8439, '2025-07-29 17:03:58', 2, 'Mon pin', '#a347ff');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pin_id` (`pin_id`);

--
-- Index pour la table `pins`
--
ALTER TABLE `pins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `pins`
--
ALTER TABLE `pins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`pin_id`) REFERENCES `pins` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `pins`
--
ALTER TABLE `pins`
  ADD CONSTRAINT `pins_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
