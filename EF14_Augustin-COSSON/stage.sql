-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 07, 2021 at 05:03 PM
-- Server version: 5.7.24
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stage`
--

-- --------------------------------------------------------

--
-- Table structure for table `stage`
--

CREATE TABLE `stage` (
  `nom_eleve` varchar(255) NOT NULL,
  `prenon_eleve` varchar(255) NOT NULL,
  `nom_maitre` varchar(255) NOT NULL,
  `prenom_maitre` varchar(255) NOT NULL,
  `adresse_maitre` varchar(255) NOT NULL,
  `titre_francais` varchar(255) NOT NULL,
  `titre_anglais` varchar(255) NOT NULL,
  `resume_francais` varchar(255) NOT NULL,
  `resume_anglais` varchar(255) NOT NULL,
  `annee` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `latitude_corrige` double NOT NULL,
  `longitude_corrige` double NOT NULL,
  `rue` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `pays` varchar(255) NOT NULL,
  `postal` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stage`
--

INSERT INTO `stage` (`nom_eleve`, `prenon_eleve`, `nom_maitre`, `prenom_maitre`, `adresse_maitre`, `titre_francais`, `titre_anglais`, `resume_francais`, `resume_anglais`, `annee`, `latitude`, `longitude`, `latitude_corrige`, `longitude_corrige`, `rue`, `ville`, `pays`, `postal`, `id`, `rank`) VALUES

('COSSON', 'augustin', '', '', '', '', '', '', '', 2021, 50.8241883,4.51388, 50.8241883,4.51388, '', 'Tervuren', '', 3080, 0, 16),
('BIERLAIRE', 'jules', '', '', '', '', '', '', '', 2021,-20.877098, 55.448791, -20.877098, 55.448791,'', 'Saint-Denis', '', 97400, 1, 18),
('DAUDET', 'alphonse', '', '', '', '', '', '', '', 2020, 48.843263, 2.4185126, 48.8432633, 2.4185126,'', 'Saint-Mande', '', 94160, 2, 12),
('EINSTEIN', 'alfred', '', '', '', '', '', '', '', 2020, 49.2577886, 4.031926, 49.2577886, 4.031926,'', 'Reims', '', 51100, 3, 11),
('CURIE', 'pierre', '', '', '', '', '', '', '', 2021,51.5073219, -0.1276474, 51.5073219, -0.1276474,'', 'Londres', '', 0, 4, 15),
('TRAIN', 'donald', '', '', '', '', '', '', '', 2021,40.4167047, -3.7035825, 40.4167047, -3.7035825, '','Madrid', '', 0, 5, 16),
('MAISON', 'achille', '', '', '', '', '', '', '', 2021,40.7127281, -74.0060152, 40.7127281, -74.0060152, '','New York', '', 0, 6, 13),
('TALON', 'henri', '', '', '', '', '','', '', 2021,-22.9110137, -43.2093727, -22.9110137, -43.2093727,'', 'Rio de Janeiro','', 0, 7, 19);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
