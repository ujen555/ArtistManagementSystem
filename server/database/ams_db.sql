-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2025 at 02:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ams_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('m','f','o') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `first_release_year` int(11) DEFAULT NULL,
  `no_of_albums_released` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`id`, `name`, `dob`, `gender`, `address`, `first_release_year`, `no_of_albums_released`, `user_id`, `created_at`, `updated_at`) VALUES
(21, 'Brielle Cervantes', '2004-05-21', 'f', 'Est aliquip facilis', 2014, 23, 44, '2025-05-06 11:35:58', '2025-05-06 11:35:58'),
(24, 'yujensfff', '1994-10-31', 'm', 'balkumari12', 2001, 3, 40, '2025-05-06 11:41:06', '2025-05-06 11:41:51'),
(25, 'Dillon Davidson', '1980-03-18', 'o', 'Officia velit praese', 1981, 123, 57, '2025-05-06 11:42:40', '2025-05-06 11:42:40');

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `album_name` varchar(255) DEFAULT NULL,
  `genre` enum('rnb','country','classic','rock','jazz') NOT NULL,
  `artist_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`id`, `title`, `album_name`, `genre`, `artist_id`, `created_at`, `updated_at`) VALUES
(13, 'Sapiente dicta nesci', 'Joy Gregory', 'country', 24, '2025-05-06 11:50:53', '2025-05-06 11:51:04');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(500) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('m','f','o') NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` enum('super_admin','artist_manager','artist') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `dob`, `gender`, `address`, `role`, `created_at`, `updated_at`) VALUES
(10, 'Trevor', 'Herrera', 'kuwoko@mailinator.com', '$2b$10$7PNtiTet2g96YBtXlhjIBOAK0htmkZrNgE40RoSlrhBfUAhQrTWSy', '8787877655', '2002-11-25', 'f', 'Consequuntur ut dolo', 'super_admin', '2025-04-28 04:49:43', '2025-04-28 04:49:43'),
(11, 'yujen', 'shakya', 'ujen555@gmail.com', '$2b$10$lfv/sjgkZKKnUk0tJuBFau5Y79CRP0PjpntiacGgseyu/e.mC3xzW', '9861665558', '1995-06-15', 'm', 'Kathmandu', 'super_admin', '2025-04-29 05:23:52', '2025-04-29 05:23:52'),
(12, 'Keaton', 'Wilson', 'sofanuparo@mailinator.com', '$2b$10$xxAoZtsHoqGHxe6nTThldOR.2agboEN/zK/tnjW/dJtR2dPyRmomS', '9861665556', '2018-12-07', 'f', 'Repudiandae adipisic', 'artist_manager', '2025-04-29 05:40:22', '2025-04-29 05:40:22'),
(13, 'Stacy', 'Stewart', 'hyxuve@mailinator.com', '$2b$10$d9y4jQyrcOSZmtoMeNzqSe9/NejaRX/rmrf540huUGbsm7eOvH4I6', '6563123456', '2023-06-08', 'm', 'Expedita et quis eni', 'artist_manager', '2025-04-29 07:27:13', '2025-04-29 07:27:13'),
(14, 'Amaya', 'Dunn', 'zinedagolu@mailinator.com', '$2b$10$TPOwPkfWP4MzcHpsIGEixuhUOMFF.w8S1D6pV.iQIdn8xAZT7ujXu', '3456785433', '1997-04-09', 'o', 'Dolore sint assumen', 'artist_manager', '2025-04-29 07:28:06', '2025-04-29 07:28:06'),
(15, 'Nicholas', 'pp', 'wifud@mailinator.com', '$2b$10$uKepixcXgpa1QN1bLewXNu3VLe/E8wV7xdXwuC6v9b/XHKPcxJAsS', '3456785433', '2020-04-30', 'm', 'Officiis atque dolor', 'super_admin', '2025-04-29 07:32:57', '2025-05-04 08:36:25'),
(16, 'Jordan', 'Blair', 'manager@gmail.com', '$2b$10$Q7UuYzButW9G5cALa8iwz.GDsAokeTsDhkAjIkOv.sALQ09KJJ2/K', '9861665554', '1978-01-14', 'm', 'Aut nihil culpa eum', 'artist_manager', '2025-04-29 09:22:18', '2025-04-29 09:22:18'),
(17, 'Olympia', 'Palmer', 'gylisaton@mailinator.com', '$2b$10$GGAg44icNnhEDCahq5bZYO8aK6iOAaddouRxxv474LIFJSXLy/YC2', '9861665554', '2003-07-07', 'o', 'Eaque in est ea ulla', 'artist_manager', '2025-05-03 05:37:16', '2025-05-03 05:37:16'),
(36, 'Andrew', 'Monroe', 'nahitoqar@mailinator.com', '$2b$10$XljqZC1jWhNIQxrOYYyc2uJFEVLrHekj8Bk60g29CUjZbSyAVX0e.', '8999889980', '2007-09-06', 'o', 'Corporis adipisci re', 'artist', '2025-05-04 08:15:14', '2025-05-04 08:15:14'),
(38, 'Beau', 'Powell', 'jugypu@mailinator.com', '$2b$10$t4sTBBvgqgHfj7xd..QxnuNecfzmMRd6bo5S08HrHqGE/5UKZcIv6', '1234567891', '1988-08-01', 'f', 'Et dolor do corrupti', 'artist_manager', '2025-05-04 08:19:25', '2025-05-04 08:19:25'),
(40, 'Yujen', 'shakya', 'ujen555+artist@gmail.com', '$2b$10$xPKmtqBhfWFglGzMwuxoje4BkIaCcVvNXGR9Hlsrc.Pk.qo/TDh7u', '2344234234', '2025-05-04', 'm', 'Numquam eos molesti', 'artist', '2025-05-04 08:24:41', '2025-05-04 08:24:41'),
(41, 'Myles', 'Graves', 'finaxotipy@mailinator.com', '$2b$10$ACX.y0L0bsuDcuJZmNrE6.5lEw4Nb16.q9aJAA1bS7QCjOkJFibuG', '2344234234', '1990-08-08', 'm', 'Omnis explicabo Mag', 'artist_manager', '2025-05-04 14:56:17', '2025-05-04 14:56:17'),
(42, 'Dominic', 'Hendrix', 'zipysuhozy@mailinator.com', '$2b$10$gHaTaidTMkFJdS/cVm/C4.BUlluHG/uRe9dH5Ei8gESgJzE0Ho9de', '3456785433', '2000-01-15', 'o', 'Aliqua Dolor ducimu', 'artist_manager', '2025-05-04 14:56:53', '2025-05-04 14:56:53'),
(43, 'Buckminster', 'Mosley', 'hofus@mailinator.com', '$2b$10$hnzdCnW15D4nVcI9GDN2dun5bUmcmXWp50VsMpdrQhzFukeK9PiMa', '2344234234', '1970-02-01', 'o', 'Minus dolor deserunt', 'super_admin', '2025-05-04 15:00:09', '2025-05-04 15:00:09'),
(44, 'Hanae', 'Hodges', 'tuhixafi@mailinator.com', '$2b$10$9DpIUnvrhFzh/xQmlgfvlOEcWA/69SqVTQDMEq4buBdWJuLZGRT4.', '1234567891', '1988-12-09', 'm', 'Ut obcaecati est su', 'artist', '2025-05-04 15:02:13', '2025-05-04 15:02:13'),
(45, 'Chandler', 'Allison', 'johupe@mailinator.com', '$2b$10$wCFKKXI0yZRmQf1ELs0vCuffsQjsaeuteVnfwkzPWb70qeX/.9c1.', '2344234234', '2022-07-14', 'm', 'Modi commodi assumen', 'super_admin', '2025-05-04 15:51:55', '2025-05-04 15:51:55'),
(48, 'Alana', 'Oconnor', 'mykuwyw@mailinator.com', '$2b$10$VJwtadAK.0hJXvjCAvpJBeLmPkoBGRzkl6y9afjuMMA.taOu5swhm', '1234567891', '1980-12-29', 'm', 'Aut culpa nostrud q', 'artist_manager', '2025-05-04 15:56:02', '2025-05-04 15:56:02'),
(49, 'Lynn', 'Hale', 'ujen555+artistmanager@gmail.com', '$2b$10$yzFcYOJm7X927R0gj7SzuOgyqpSC7vJp2C0QLwWIjoHviFLEwCrvy', '1234567891', '2005-04-04', 'm', 'Accusamus nesciunt ', 'artist_manager', '2025-05-04 16:33:35', '2025-05-04 16:33:35'),
(50, 'Kylie', 'Dean', 'hijohusina@mailinator.com', '$2b$10$LvQio/xcshW..TVzB/CHDOGdNVhr61n3fpuaSmwCSlimIaDzLa/ky', '1234567891', '1996-05-24', 'o', 'Quo qui esse iste p', 'artist', '2025-05-05 04:15:45', '2025-05-05 04:15:45'),
(51, 'Nora', 'Newton', 'tyvorebe@mailinator.com', '$2b$10$0djDzRDC95h4SL0Caz.qZ.di9PbjKookFeHiNJEBv7yrNBoIOm8Gy', '1234567891', '1991-12-08', 'f', 'Reprehenderit minus ', 'artist_manager', '2025-05-05 04:17:30', '2025-05-05 04:17:30'),
(52, 'Caldwell', 'Gomez', 'gosyvelox@mailinator.com', '$2b$10$UBJj2eI4hVFzQ23/TErHLuDd2DvfLvuBeTkky4ZmKbOjlW7t1mxOC', '1234567891', '2016-04-04', 'f', 'Elit quam incidunt', 'artist_manager', '2025-05-05 04:19:54', '2025-05-05 04:19:54'),
(53, 'Basia', 'Whitney', 'pyqytexeji@mailinator.com', '$2b$10$lL/CovhWQfOTL96GgvsU/errTHomzKLA8OrEN40uXjPQAErbg7DM.', '1234567891', '1989-05-19', 'f', 'Perferendis non inci', 'artist_manager', '2025-05-05 04:20:23', '2025-05-05 04:20:23'),
(54, 'Dale', 'Watts', 'diwowyhijo@mailinator.com', '$2b$10$ZCJyATPo4kOolSpSa8IoOeQ7iDMsoJJaWor.iJQmrBXsFHXnJbfcC', '1234567891', '1972-07-19', 'm', 'Ut non quod reprehen', 'artist_manager', '2025-05-05 04:21:02', '2025-05-05 04:21:02'),
(55, 'Timon', 'Ayala', 'suvoxax@mailinator.com', '$2b$10$ibkzVewskwRFnnkSU9s3K.tScIpE611c7Lj8bmPkUyCrdra/yO.u.', '1234567891', '1994-10-17', 'm', 'Voluptas incidunt l', 'artist_manager', '2025-05-05 04:21:49', '2025-05-05 04:21:49'),
(56, 'Uta', 'Pennington', 'rutebypoci@mailinator.com', '$2b$10$E/hsgcT3Bu7pfM/PDL.NlO5KAxKxV8dHP/YiVwSzcKcgXhKzw74MG', '1234567123', '1980-11-28', 'm', 'Esse excepteur nihil', 'artist_manager', '2025-05-05 04:23:05', '2025-05-05 04:23:05'),
(57, 'Kristen', 'Bowen', 'lohyzu@mailinator.com', '$2b$10$Qm2GUkaTyAG/Huz45/P.H.9JkLVQTJOPNRpI.88hkNQOh2ql1cNWy', '1234567891', '2019-05-18', 'o', 'Architecto libero mo', 'artist', '2025-05-05 04:29:47', '2025-05-05 04:29:47'),
(58, 'Breanna', 'Martin', 'hydurary@mailinator.com', '$2b$10$yrUi6BqwwYH9ACxNstx8TeNj6IbLIWJnJJhGPsTBjWCZW0idTyyqy', '1234567891', '1998-10-12', 'm', 'Enim odio expedita a', 'artist', '2025-05-05 04:29:56', '2025-05-05 04:29:56'),
(59, 'Clayton', 'Ayala', 'cavos@mailinator.com', '$2b$10$.PCmHlmt/YK/pdpk4ikoQe0B/zhwLBmBqi8UE8FKlb9Rmq4v2mM1a', '1234567891', '1991-05-17', 'o', 'Et occaecat recusand', 'artist', '2025-05-05 04:30:09', '2025-05-05 04:30:09'),
(60, 'Winter', 'Stewart', 'keralo@mailinator.com', '$2b$10$/O48Z/JDIrH64PEby6yuM./BWuSE9SzbT1ZMSqqBUbN7KnFjcFZzy', '1234567891', '2000-09-20', 'o', 'Qui ipsam quo proide', 'artist', '2025-05-05 07:38:10', '2025-05-05 07:38:10'),
(61, 'Blaine', 'Washington', 'ujen555+superadmin@gmail.com', '$2b$10$pMpghqYQr9IJLF2d5vpD8eT2AjQVAhu90i/wM10ozuLKYaE84p8l2', '1234567891', '2014-08-02', 'f', 'Rerum ad enim sit ea', 'super_admin', '2025-05-06 10:19:45', '2025-05-06 10:19:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artist`
--
ALTER TABLE `artist`
  ADD CONSTRAINT `artist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `song_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
