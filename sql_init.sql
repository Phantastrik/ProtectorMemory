-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 31 juil. 2025 à 10:46
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

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `images`
--


-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pin_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `title` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `pin_id` (`pin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notes`
--

-- --------------------------------------------------------

--
-- Structure de la table `pins`
--

CREATE TABLE IF NOT EXISTS `pins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `x_percent` float NOT NULL,
  `y_percent` float NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `image_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `color` varchar(7) DEFAULT '#ff0000',
  `label` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pins`
--

-- --------------------------------------------------------

--
-- Structure de la table `pin_links`
--

CREATE TABLE IF NOT EXISTS `pin_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pin1_id` int(11) NOT NULL,
  `pin2_id` int(11) NOT NULL,
  `color` varchar(7) DEFAULT '#000000',
  PRIMARY KEY (`id`),
  KEY `fk_pin1` (`pin1_id`),
  KEY `fk_pin2` (`pin2_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pin_links`
--

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

--
-- Contraintes pour la table `pin_links`
--
ALTER TABLE `pin_links`
  ADD CONSTRAINT `fk_pin1` FOREIGN KEY (`pin1_id`) REFERENCES `pins` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pin2` FOREIGN KEY (`pin2_id`) REFERENCES `pins` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
