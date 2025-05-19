-- Adminer 5.2.1 MySQL 5.7.44 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `Actuacios`;
CREATE TABLE `Actuacios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcio` text,
  `data` datetime DEFAULT NULL,
  `temps` int(11) DEFAULT NULL,
  `resolta` tinyint(1) DEFAULT '0',
  `visible` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `incidentid` int(11) DEFAULT NULL,
  `tecnic_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `incidentid` (`incidentid`),
  KEY `tecnic_id` (`tecnic_id`),
  CONSTRAINT `Actuacios_ibfk_1` FOREIGN KEY (`incidentid`) REFERENCES `Incidents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Actuacios_ibfk_2` FOREIGN KEY (`tecnic_id`) REFERENCES `Tecnics` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Actuacios` (`id`, `descripcio`, `data`, `temps`, `resolta`, `visible`, `createdAt`, `updatedAt`, `incidentid`, `tecnic_id`) VALUES
(1,	'Ja esta fet',	'2025-05-19 00:00:00',	15,	1,	1,	'2025-05-19 11:07:35',	'2025-05-19 11:07:35',	1,	5),
(3,	'Encara falta per resoldre',	'2025-05-19 00:00:00',	20,	0,	1,	'2025-05-19 11:09:02',	'2025-05-19 11:09:02',	3,	5),
(4,	'Ja l\'hem trobat',	'2025-05-20 00:00:00',	30,	1,	1,	'2025-05-19 11:09:44',	'2025-05-19 11:09:44',	3,	5),
(5,	'He identificat el problema del google, encara que no ho he pogut solucionar avui',	'2025-05-19 00:00:00',	58,	0,	1,	'2025-05-19 11:30:29',	'2025-05-19 11:30:29',	4,	3),
(6,	'El problema d\'aquest es que necesita que els servidors tornin a funcionar hi ha hagur un apagon a tota Europa',	'2025-05-20 00:00:00',	38,	0,	1,	'2025-05-19 11:31:13',	'2025-05-19 11:31:13',	4,	3),
(7,	'Per fi ha tornat la llum i el google ya le configurat un altre cop',	'2025-05-21 00:00:00',	27,	1,	1,	'2025-05-19 11:31:47',	'2025-05-19 11:31:47',	4,	3),
(8,	'La pissara s\'ha trencat te un gran forat al centre d\'ella i necesitem una nova',	'2025-05-19 00:00:00',	43,	0,	0,	'2025-05-19 11:32:34',	'2025-05-19 11:32:34',	5,	5),
(9,	'Algun gracios ha fet un virus Troyano i tot l\'institut ha descarregat l\'archiu, tots els ordinadors estan corruptes ara',	'2025-05-19 00:00:00',	18,	0,	0,	'2025-05-19 11:33:58',	'2025-05-19 11:33:58',	6,	3);

DROP TABLE IF EXISTS `Departaments`;
CREATE TABLE `Departaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Departaments` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1,	'Matemàtiques',	'2025-05-19 10:26:00',	'2025-05-19 10:26:00'),
(2,	'Informàtica',	'2025-05-19 10:26:15',	'2025-05-19 10:26:15'),
(3,	'Llengua',	'2025-05-19 10:26:47',	'2025-05-19 10:26:47'),
(7,	'Filosofia',	'2025-05-19 10:55:38',	'2025-05-19 10:55:47');

DROP TABLE IF EXISTS `Incidents`;
CREATE TABLE `Incidents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcio` text NOT NULL,
  `dataCreacio` datetime NOT NULL,
  `resolta` tinyint(1) DEFAULT '0',
  `prioritat` enum('Alta','Mitjana','Baixa') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tecnic_id` int(11) DEFAULT NULL,
  `departamentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tecnic_id` (`tecnic_id`),
  KEY `departamentId` (`departamentId`),
  CONSTRAINT `Incidents_ibfk_1` FOREIGN KEY (`tecnic_id`) REFERENCES `Tecnics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Incidents_ibfk_2` FOREIGN KEY (`departamentId`) REFERENCES `Departaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Incidents` (`id`, `descripcio`, `dataCreacio`, `resolta`, `prioritat`, `createdAt`, `updatedAt`, `tecnic_id`, `departamentId`) VALUES
(1,	'No va el ratolí',	'2025-05-19 11:04:42',	0,	'Mitjana',	'2025-05-19 11:04:42',	'2025-05-19 11:05:14',	5,	2),
(3,	'El llibre de classe se m\'ha perdut',	'2025-05-19 11:06:15',	0,	'Mitjana',	'2025-05-19 11:06:15',	'2025-05-19 11:08:07',	5,	3),
(4,	'El google no funciona',	'2025-05-19 11:28:03',	0,	'Alta',	'2025-05-19 11:28:03',	'2025-05-19 11:29:05',	3,	1),
(5,	'No funciona la pissarra digital',	'2025-05-19 11:28:27',	0,	'Baixa',	'2025-05-19 11:28:27',	'2025-05-19 11:29:27',	5,	1),
(6,	'Els portatils no funciones',	'2025-05-19 11:28:52',	0,	'Mitjana',	'2025-05-19 11:28:52',	'2025-05-19 11:29:22',	3,	7);

DROP TABLE IF EXISTS `Tecnics`;
CREATE TABLE `Tecnics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `especialitat` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Tecnics` (`id`, `nom`, `especialitat`, `createdAt`, `updatedAt`) VALUES
(3,	'Arnau',	'Software',	'2025-05-19 10:33:20',	'2025-05-19 10:33:20'),
(5,	'Pau',	'Hardware',	'2025-05-19 11:03:37',	'2025-05-19 11:03:37');

-- 2025-05-19 11:34:17 UTC
