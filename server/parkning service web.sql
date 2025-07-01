-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.39 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for parking_service_web
CREATE DATABASE IF NOT EXISTS `parking_service_web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `parking_service_web`;

-- Dumping structure for table parking_service_web.about
CREATE TABLE IF NOT EXISTS `about` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `language_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `about_ibfk_1` (`language_id`),
  CONSTRAINT `about_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.about: ~2 rows (approximately)
INSERT INTO `about` (`id`, `title`, `subtitle`, `description`, `language_id`) VALUES
	(1, 'ჩვენი მიზანია გავაუმჯობესოთ პარკინგის გამოცდილება', 'ჩვენი მიზანია გავაუმჯობესოთ პარკინგის გამოცდილება საქართველოში და დავამყაროთ სტანდარტი მაღალი ხარისხის სერვისის სფეროში.', '["ჩვენი კომპანია უზრუნველყოფს ინოვაციურ და თანამედროვე პარკინგის მართვის სისტემებს, რომლებიც მორგებულია ბიზნესის სპეციფიკურ მოთხოვნებზე. ჩვენ ვამაყობთ ქართული წარმოებით, რაც საშუალებას გვაძლევს მომხმარებლებს შევთავაზოთ ხარისხიანი, სანდო და სწრაფად რეაგირებადი სერვისი.","ჩვენი გუნდი მუდმივად მუშაობს ტექნოლოგიების განვითარებაზე და მაქსიმალური კომფორტის უზრუნველყოფაზე მომხმარებლისთვის. ჩვენი სისტემები უზრუნველყოფს მარტივ და ეფექტურ პარკინგის მართვას, ფულის გადახდის მრავალფეროვან შესაძლებლობას და ბიზნესის სრული კონტროლის შესაძლებლობას.","ჩვენი მიზანია გავაუმჯობესოთ პარკინგის გამოცდილება საქართველოში და დავამყაროთ სტანდარტი მაღალი ხარისხის სერვისის სფეროში.\\n"]', 0),
	(2, 'Our goal is to enhance the parking experienc', 'Our goal is to enhance the parking experience in Georgia and set a standard for high-quality service in the industry.', '["Our company provides innovative and modern parking management systems tailored to the specific needs of businesses. We take pride in our local production, which allows us to offer high-quality, reliable, and responsive service to our customers.","Our team is constantly working on technological advancements to ensure maximum convenience for users. Our systems provide simple and efficient parking management, diverse payment options, and full control for businesses.","Our goal is to enhance the parking experience in Georgia and set a standard for high-quality service in the industry."]', 1);

-- Dumping structure for table parking_service_web.benefits
CREATE TABLE IF NOT EXISTS `benefits` (
  `benefit_id` int NOT NULL AUTO_INCREMENT,
  `benefit` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` int NOT NULL,
  PRIMARY KEY (`benefit_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `benefits_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.benefits: ~10 rows (approximately)
INSERT INTO `benefits` (`benefit_id`, `benefit`, `language_id`) VALUES
	(1, 'Easy Park გამოირჩევა სანდო და ადაპტირებადი პარკირების მართვის სისტემით, რომელიც განკუთვნილია როგორც მცირე, ასევე დიდი ზომის საწარმოებისთვის', 0),
	(2, 'ადმინისტრაციული ხარჯების შემცირება: ავტომატიზირებული სისტემა გამორიცხავს ხელით მართვის საჭიროებას და ზოგავს დროისა და ფინანსურ რესურსებს', 0),
	(3, 'სწრაფი გადახდის შესაძლებლობა: გადახდა შესაძლებელია ნაღდი ფულით ან ბარათით გასასვლელ სადგურზე – მარტივად და სწრაფად', 0),
	(4, 'განვითარებული ადმინისტრაციული პანელი: აკონტროლეთ მნიშვნელოვანი მეტრიკები ჩვენს ინტერფეისში. დეტალური ანგარიშგება დაგეხმარებათ პარკირების სივრცეების ოპტიმიზაციაში', 0),
	(5, 'ჩვენ გთავაზობთ გამძლე და  მარტივ ტექნოლოგიას, რაც უზრუნველყოფს, რომ ნებისმიერი სერვისის საჭიროება სწრაფად და პროფესიონალურად იყოს დაკმაყოფილებული ადგილობრივი გუნდის მიერ', 0),
	(6, 'Reliable and adaptable parking management system: Suited for businesses of all sizes and types', 1),
	(7, 'Lower administrative costs: Automated systems eliminate the need for manual management, saving time and financial resources', 1),
	(8, 'Fast and secure payment: exit stations allow payments via cash or card – quick and easy', 1),
	(9, 'Advanced administrative panel: Control key metrics through our interface. Detailed reporting helps optimize parking spaces', 1),
	(10, 'Durable and simple technology: Our system is designed for resilience and ease of use, ensuring quick and professional service by a local team', 1);

-- Dumping structure for table parking_service_web.devices
CREATE TABLE IF NOT EXISTS `devices` (
  `device_id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `language_id` int DEFAULT NULL,
  `device_type_id` int DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  KEY `language_id` (`language_id`),
  KEY `device_type_id` (`device_type_id`),
  CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`) ON DELETE SET NULL,
  CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`device_type_id`) REFERENCES `device_type` (`device_type_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.devices: ~4 rows (approximately)
INSERT INTO `devices` (`device_id`, `name`, `description`, `language_id`, `device_type_id`) VALUES
	(0, 'ბარათის მიმღები S200', '["სერიის S200 ავტოსადგომის ბილეთების მიმღები აპარატი არის მოწყობილობა, რომელიც გამოიყენება ავტოსადგომების შესასვლელებში ავტომობილების წვდომის სამართავად. ის ჩვეულებრივ დამონტაჟებულია ავტომატურ ბარიერთან ერთად.","ავტოსადგომის შესასვლელი სვეტი დამზადებულია გამძლე რკინის კორპუსით, რომელიც გამართულად მუშაობს როგორც შიდა, ასევე გარე პირობებში. მისი გულდასმით დამუშავებული დიზაინი და უახლესი მოდელის კომპონენტები საშუალებას გვაძლევს შევთავაზოთ ერთ-ერთი ყველაზე მცირე და კომპაქტური მოწყობილობა.","მოკლედ რომ ვთქვათ, ეს არის მოწყობილობა, რომელიც შეიცავს უახლეს ტექნოლოგიებს, რაც თანამედროვე ავტოსადგომს სჭირდება, დაწყებული პარკინგზე შესვლისთვის ტელეფონის გამოყენებით, დამთავრებული სანომრე ნიშნის ამოცნობის LPR კამერით."]', 0, 0),
	(1, 'ticket reciever serie S200', '["The car park ticket dispenser serie S200 is an equipment used in entryways to parking to control vehicle access. It is usually installed with an automatic barrier.","The entry column to the car park is built with a sturdy iron body, working properly both indoors and outdoors. Its careful design and its latest model components allow us to offer one of the smallest and most compact machines.","In short, this is an equipment that includes the latest technology that a modern car park needs, from technology for accessing the parking with a phone to an LPR camera for license plate recognition."]', 1, 0),
	(2, 'ბილეთების გამცემ S100', '["სერიის S100 ავტოსადგომის ბილეთების გამცემ აპარატი არის მოწყობილობა, რომელიც გამოიყენება ავტოსადგომების შესასვლელებში ავტომობილების წვდომის სამართავად. ის ჩვეულებრივ დამონტაჟებულია ავტომატურ ბარიერთან ერთად.", "ავტოსადგომის შესასვლელი სვეტი დამზადებულია გამძლე რკინის კორპუსით, რომელიც გამართულად მუშაობს როგორც შიდა, ასევე გარე პირობებში. მისი გულდასმით დამუშავებული დიზაინი და უახლესი მოდელის კომპონენტები საშუალებას გვაძლევს შევთავაზოთ ერთ-ერთი ყველაზე მცირე და კომპაქტური მოწყობილობა.", "მოკლედ რომ ვთქვათ, ეს არის მოწყობილობა, რომელიც შეიცავს უახლეს ტექნოლოგიებს, რაც თანამედროვე ავტოსადგომს სჭირდება, დაწყებული პარკინგზე შესვლისთვის ტელეფონის გამოყენებით, დამთავრებული სანომრე ნიშნის ამოცნობის LPR კამერით."]\n', 0, 1),
	(3, 'ticket dispenser S100', '["The car park ticket dispenser serie S100 is an equipment used in entryways to parking to control vehicle access. It is usually installed with an automatic barrier.","The entry column to the car park is built with a sturdy iron body, working properly both indoors and outdoors. Its careful design and its latest model components allow us to offer one of the smallest and most compact machines.","In short, this is an equipment that includes the latest technology that a modern car park needs, from technology for accessing the parking with a phone to an LPR camera for license plate recognition."]', 1, 1);

-- Dumping structure for table parking_service_web.device_type
CREATE TABLE IF NOT EXISTS `device_type` (
  `device_type_id` int NOT NULL AUTO_INCREMENT,
  `device_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`device_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.device_type: ~2 rows (approximately)
INSERT INTO `device_type` (`device_type_id`, `device_type`) VALUES
	(0, 'card_receiver'),
	(1, 'card_dispenser');

-- Dumping structure for table parking_service_web.faq
CREATE TABLE IF NOT EXISTS `faq` (
  `faq_id` int NOT NULL AUTO_INCREMENT,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` int NOT NULL,
  PRIMARY KEY (`faq_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `faq_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.faq: ~8 rows (approximately)
INSERT INTO `faq` (`faq_id`, `question`, `answer`, `language_id`) VALUES
	(1, 'შეიძლება Easy Park-ის პერსონალიზაცია განსხვავებული ზომის ბიზნესებისთვის?', 'რა თქმა უნდა. Easy Park შექმნილია ნებისმიერი მასშტაბის დასახმარებლად, მცირე ბიზნესიდან დიდ საწარმოებამდე, რეგულირებადი ფუნქციებითა და კონფიგურაციებით.', 0),
	(2, 'როგორ მუშაობს სივრცეების რეალურ დროში მონიტორინგი ადმინისტრაციისთვის?', 'ჩვენი სისტემა აჩვენებს დაკავებული ადგილების რაოდენობას.', 0),
	(3, 'რა მონაცემებს გვთავაზობს ადმინისტრაციული პანელი?', 'ადმინისტრაციული პანელი გთავაზობთ სხვადასხვა მეტრიკებს, მათ შორის მოწყობილობაში საერთო ბარათების რაოდენობა; საპარკინგე სივრცის გამოყენების სიხშირე, სასურველი დროის მიხედვთ; დაჯამებული ან მიმდინარე თანხის ჩვენება, ბარათების რაოდენობები მოწყობილობებში.', 0),
	(4, 'როგორ ხდება გადახდა გასვლისას?', 'გასასვლელთან მომხმარებლებს შეუძლიათ ბარათის დაბრუნების შემდეგ გადახდა ნაღდი ფულით ან ბარათით, რაც პროცესს შეუფერხებელს ხდის.', 0),
	(5, 'Can Easy Park be customized for businesses of different sizes?', 'Absolutely. Easy Park is designed to support businesses of all scales, from small to large enterprises, with adjustable features and configurations.', 1),
	(6, 'How does real-time space monitoring work for administration?', 'Our system displays the number of occupied spaces in real time.', 1),
	(7, 'What data does the administrative panel provide?', 'Metrics include: Total cards in devices; Parking space usage frequency based on preferred times; Summary or ongoing payment details.', 1),
	(8, 'How is payment processed at exit points?', 'Customers can pay with cash or card after returning their card at the exit, ensuring a smooth process.', 1);

-- Dumping structure for table parking_service_web.features
CREATE TABLE IF NOT EXISTS `features` (
  `feature_id` int NOT NULL AUTO_INCREMENT,
  `feature` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language_id` int DEFAULT NULL,
  `device_type_id` int DEFAULT NULL,
  PRIMARY KEY (`feature_id`),
  KEY `language_id` (`language_id`),
  KEY `device_type_id` (`device_type_id`),
  CONSTRAINT `features_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`) ON DELETE SET NULL,
  CONSTRAINT `features_ibfk_2` FOREIGN KEY (`device_type_id`) REFERENCES `device_type` (`device_type_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.features: ~5 rows (approximately)
INSERT INTO `features` (`feature_id`, `feature`, `language_id`, `device_type_id`) VALUES
	(9, 'cxc', 0, 1),
	(10, 'cv', 0, 1),
	(11, 'zxzxzx', 1, 0),
	(13, 'sdsd', 1, 0),
	(14, 'sdsd', 0, 0);

-- Dumping structure for table parking_service_web.images
CREATE TABLE IF NOT EXISTS `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_type_id` int DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `images_type_ibfk_2_idx` (`device_type_id`),
  CONSTRAINT `images_type_ibfk_2` FOREIGN KEY (`device_type_id`) REFERENCES `device_type` (`device_type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.images: ~12 rows (approximately)
INSERT INTO `images` (`image_id`, `image_url`, `device_type_id`) VALUES
	(1, '/images/services/monitoring.svg', NULL),
	(2, '/images/services/paying.svg', NULL),
	(3, '/images/services/adminPanel.svg', NULL),
	(4, '/images/services/personalSystem.svg', NULL),
	(5, '/images/services/support.svg', NULL),
	(6, '/images/services/automatization.svg', NULL),
	(7, '/images/services/statistics.svg', NULL),
	(120, '/images/1744565748633-1.svg', 1),
	(121, '/images/1744565753347-2.svg', 1),
	(126, '/images/1744565753347-2.svg', 0),
	(127, '/images/1744565748633-1.svg', 0),
	(136, '/images/1744565748633-1.svg', 0);

-- Dumping structure for table parking_service_web.languages
CREATE TABLE IF NOT EXISTS `languages` (
  `language_id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.languages: ~2 rows (approximately)
INSERT INTO `languages` (`language_id`, `language`) VALUES
	(0, 'Ge'),
	(1, 'En');

-- Dumping structure for table parking_service_web.services
CREATE TABLE IF NOT EXISTS `services` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language_id` int NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_id` int DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  KEY `language_id` (`language_id`),
  KEY `fk_image_id` (`image_id`),
  CONSTRAINT `fk_image_id` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.services: ~14 rows (approximately)
INSERT INTO `services` (`service_id`, `service_name`, `title`, `language_id`, `description`, `image_id`) VALUES
	(1, 'სივრცის მონიტორინგი', 'მიმდინარე დროში სივრცეების მონიტორინგი', 0, 'მიმდინარე დროში, თვალყური ადევნეთ დაკავებული ადგილების რაოდენობას.', 1),
	(2, 'მოქნილი გადახდის პარამეტრები', 'მოქნილი გადახდის პარამეტრები', 0, 'მომხმარებლებს შეუძლიათ გასასვლელში დამონტაჟებულ მოწყობილობასთან გადახდა, ნაღდი ფულით ან ბარათით, რაც ამარტივებს პროცესს.', 2),
	(3, 'ადმინისტრაციული პანელი', 'კომპლექსური ადმინისტრაციული პანელი', 0, 'მიიღეთ მნიშვნელოვანი სტატისტიკა და მეტრიკები, როგორიცაა: მიმდინარე დროში დაკავებული ადგილების რაოდენობა, მიმღებ და გამცემ მოწყობილობაში ბარათების რაოდენობის მონიტორინგი, დაჯამებული ან მიმდინარე თანხის მონიტორინგი.', 3),
	(4, 'პერსონალიზებადი სისტემა', 'პერსონალიზირებადი პარკირების მართვის სისტემა', 0, 'Easy Park შეიძლება ადაპტირდეს ნებისმიერი ზომის ან ტიპის სივრცეზე, რაც უზრუნველყოფს, თქვენი ობიექტის, უნიკალურ საჭიროებებზე მორგებულ კონფიგურაციას.', 4),
	(5, 'ადგილობრივი მხარდაჭერა', 'ადგილობრივი მხარდაჭერა', 0, 'ჩვენი ტექნიკის წარმოება და სერვისით უზრუნველყოფა ხდება საქართველოში, რაც უზრუნველყოფს სწრაფ და სანდო მხარდაჭერას თქვენი ოპერაციების შეუფერხებლად ფუნქციონირებისათვის. ამასთანავე ჩვენი გუნდი მუდმივად ზრუნავს სისტემის ახალი ფუნქციებით აღჭურვაზე.', 5),
	(6, 'ავტომატიზირებული სისტემა', 'ავტომატიზირებული სისტემა', 0, 'ავტომატიზირებული სისტემა გამორიცხავს ხელით მართვის საჭიროებას რაც ზოგავს ადამიანურ რესურსებს', 6),
	(7, 'სტატისტიკები ', NULL, 0, NULL, 7),
	(8, 'Space Monitoring', 'Real-time space monitoring', 1, 'Keep track of the number of occupied spaces in real time.', 1),
	(9, 'Flexible Payment Options', 'Flexible payment options', 1, 'Users can pay at the exit terminal using cash or card, simplifying the process.', 2),
	(10, 'Admin Panel', 'Comprehensive admin panel', 1, 'Access critical statistics and metrics, such as the real-time number of occupied spaces, monitoring the number of cards in entry and exit devices, and tracking cumulative or current funds.', 3),
	(11, 'Customizable System', 'Customizable parking management system', 1, 'Easy Park can adapt to any size or type of space, ensuring a configuration tailored to the unique needs of your property.', 4),
	(12, 'Local Support', 'Local support', 1, 'Our equipment is manufactured and serviced in Georgia, providing quick and reliable support to ensure uninterrupted operations. Additionally, our team continuously enhances the system with new features.', 5),
	(13, 'Automated System', 'Automated system', 1, 'The automated system eliminates the need for manual management, saving human resources.', 6),
	(14, 'Statistics', NULL, 1, NULL, 7);

-- Dumping structure for table parking_service_web.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.sessions: ~43 rows (approximately)
INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('00561d18-9785-4fd6-b794-a9307deda514', 1782122853, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T09:57:25.171Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"provider":"google","sub":"102772841881082815393","id":"102772841881082815393","displayName":"Davit Dvalashvili","name":{"givenName":"Davit","familyName":"Dvalashvili"},"given_name":"Davit","family_name":"Dvalashvili","email_verified":true,"verified":true,"email":"davitdvalashvili@gmail.com","emails":[{"value":"davitdvalashvili@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","_raw":"{\\n  \\"sub\\": \\"102772841881082815393\\",\\n  \\"name\\": \\"Davit Dvalashvili\\",\\n  \\"given_name\\": \\"Davit\\",\\n  \\"family_name\\": \\"Dvalashvili\\",\\n  \\"picture\\": \\"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1\\\\u003ds96-c\\",\\n  \\"email\\": \\"davitdvalashvili@gmail.com\\",\\n  \\"email_verified\\": true\\n}","_json":{"sub":"102772841881082815393","name":"Davit Dvalashvili","given_name":"Davit","family_name":"Dvalashvili","picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","email":"davitdvalashvili@gmail.com","email_verified":true}}}}'),
	('0339bf73-01f4-4c61-bcd1-d67fa3a11100', 1782007264, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-21T01:55:46.558Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('057c9232-6448-455e-b892-3bb4b1aef4d8', 1782942235, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-07-01T19:47:31.783Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('0f2efd36-a368-4adf-9627-21ff5f68e105', 1782125706, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:54:26.727Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('1193c870-cf17-4c2f-89ff-8f1696980737', 1782005492, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-21T00:51:31.463Z","secure":false,"httpOnly":true,"path":"/","sameSite":false},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('1302b5e9-f0a9-4e40-8eb2-a21b6330155a', 1782126501, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:07:38.141Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}}'),
	('22b00509-8f14-4c4d-86c7-2542abb0e930', 1782122862, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:07:37.507Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('2da34dde-042e-4f87-bef3-89a669d2d5e4', 1782006729, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-21T01:51:06.300Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('2f67c043-bfa0-4d60-9c2e-dca71baaf7c4', 1782129239, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:53:34.955Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('309ab236-475c-4186-851f-742451c9a55f', 1782000366, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-20T23:35:06.556Z","secure":false,"httpOnly":true,"path":"/","sameSite":false},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('3ef15348-cc49-4416-bc7a-deb830f9e0d7', 1782129481, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:57:47.109Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('4050723a-2a45-4c85-be1a-77f9f685d068', 1782125742, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:55:09.207Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('408ae6b8-c73d-4d36-bfb9-96f207b113e9', 1782126292, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:04:21.959Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}}'),
	('46c1ba62-90a3-43e4-98b7-f8e9b2a509df', 1782128670, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:43:31.076Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('491b0ff5-6da6-454b-9c63-d2c69b361461', 1782120631, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T00:20:35.296Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"provider":"google","sub":"102772841881082815393","id":"102772841881082815393","displayName":"Davit Dvalashvili","name":{"givenName":"Davit","familyName":"Dvalashvili"},"given_name":"Davit","family_name":"Dvalashvili","email_verified":true,"verified":true,"email":"davitdvalashvili@gmail.com","emails":[{"value":"davitdvalashvili@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","_raw":"{\\n  \\"sub\\": \\"102772841881082815393\\",\\n  \\"name\\": \\"Davit Dvalashvili\\",\\n  \\"given_name\\": \\"Davit\\",\\n  \\"family_name\\": \\"Dvalashvili\\",\\n  \\"picture\\": \\"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1\\\\u003ds96-c\\",\\n  \\"email\\": \\"davitdvalashvili@gmail.com\\",\\n  \\"email_verified\\": true\\n}","_json":{"sub":"102772841881082815393","name":"Davit Dvalashvili","given_name":"Davit","family_name":"Dvalashvili","picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","email":"davitdvalashvili@gmail.com","email_verified":true}}}}'),
	('4c773d79-2420-443c-9b0b-47e7e1f979eb', 1782006085, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-21T01:39:21.013Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('4f4729bd-1568-48f4-ac45-c4a8e094f1c0', 1782002492, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-21T00:20:55.615Z","secure":false,"httpOnly":true,"path":"/","sameSite":false},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('59070aea-c554-4527-950c-99669ae0ceed', 1782128373, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:08:24.166Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}}'),
	('5f3d9902-e41c-4f11-9d73-40634a394477', 1782123942, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:22:44.477Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('69b6adde-1572-47d2-9447-39289a558500', 1782125585, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:28:17.311Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('7de89852-aaf9-4595-b9b8-2e5a341c4f22', 1782124093, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:27:47.319Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('8d1897bd-e4f4-456b-8141-a87caa16e370', 1782126259, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:55:45.495Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('8f7b668e-2411-415e-a3ae-f787b929044c', 1782129838, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T12:02:38.977Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('90f72236-f0aa-4693-a421-6f6205420a05', 1782130269, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T12:09:52.563Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('941d61b8-76c8-4da1-a14d-7b9299144d19', 1782129328, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:54:48.522Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('9558f20b-861e-403d-ace5-d52507dedd35', 1782087586, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T00:19:32.193Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"provider":"google","sub":"102772841881082815393","id":"102772841881082815393","displayName":"Davit Dvalashvili","name":{"givenName":"Davit","familyName":"Dvalashvili"},"given_name":"Davit","family_name":"Dvalashvili","email_verified":true,"verified":true,"email":"davitdvalashvili@gmail.com","emails":[{"value":"davitdvalashvili@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","_raw":"{\\n  \\"sub\\": \\"102772841881082815393\\",\\n  \\"name\\": \\"Davit Dvalashvili\\",\\n  \\"given_name\\": \\"Davit\\",\\n  \\"family_name\\": \\"Dvalashvili\\",\\n  \\"picture\\": \\"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1\\\\u003ds96-c\\",\\n  \\"email\\": \\"davitdvalashvili@gmail.com\\",\\n  \\"email_verified\\": true\\n}","_json":{"sub":"102772841881082815393","name":"Davit Dvalashvili","given_name":"Davit","family_name":"Dvalashvili","picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","email":"davitdvalashvili@gmail.com","email_verified":true}}}}'),
	('963456e8-26e6-4663-b86c-eb0f9b1fb42d', 1782123720, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:21:59.453Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('9aecf725-e590-45f6-8f06-752504022524', 1782130502, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T12:14:34.978Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('9bb0c8ca-ee42-41cd-a81a-e826aad65142', 1782122242, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T09:56:13.243Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"provider":"google","sub":"102772841881082815393","id":"102772841881082815393","displayName":"Davit Dvalashvili","name":{"givenName":"Davit","familyName":"Dvalashvili"},"given_name":"Davit","family_name":"Dvalashvili","email_verified":true,"verified":true,"email":"davitdvalashvili@gmail.com","emails":[{"value":"davitdvalashvili@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","_raw":"{\\n  \\"sub\\": \\"102772841881082815393\\",\\n  \\"name\\": \\"Davit Dvalashvili\\",\\n  \\"given_name\\": \\"Davit\\",\\n  \\"family_name\\": \\"Dvalashvili\\",\\n  \\"picture\\": \\"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1\\\\u003ds96-c\\",\\n  \\"email\\": \\"davitdvalashvili@gmail.com\\",\\n  \\"email_verified\\": true\\n}","_json":{"sub":"102772841881082815393","name":"Davit Dvalashvili","given_name":"Davit","family_name":"Dvalashvili","picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","email":"davitdvalashvili@gmail.com","email_verified":true}}}}'),
	('bde29dc1-00d6-4e08-97c9-badb9d763e5f', 1782128608, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:39:44.263Z","secure":false,"httpOnly":true,"path":"/","sameSite":true}}'),
	('c68ac622-7742-40f2-a314-1186a2fc48f6', 1782130190, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T12:05:00.407Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('ca6ec1e5-871c-4940-b11c-7eafba10d2a4', 1782120710, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T09:30:37.384Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"provider":"google","sub":"102772841881082815393","id":"102772841881082815393","displayName":"Davit Dvalashvili","name":{"givenName":"Davit","familyName":"Dvalashvili"},"given_name":"Davit","family_name":"Dvalashvili","email_verified":true,"verified":true,"email":"davitdvalashvili@gmail.com","emails":[{"value":"davitdvalashvili@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","_raw":"{\\n  \\"sub\\": \\"102772841881082815393\\",\\n  \\"name\\": \\"Davit Dvalashvili\\",\\n  \\"given_name\\": \\"Davit\\",\\n  \\"family_name\\": \\"Dvalashvili\\",\\n  \\"picture\\": \\"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1\\\\u003ds96-c\\",\\n  \\"email\\": \\"davitdvalashvili@gmail.com\\",\\n  \\"email_verified\\": true\\n}","_json":{"sub":"102772841881082815393","name":"Davit Dvalashvili","given_name":"Davit","family_name":"Dvalashvili","picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","email":"davitdvalashvili@gmail.com","email_verified":true}}}}'),
	('cb8a6114-57b7-470d-a5b2-79dab6f2962d', 1782122170, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T09:32:08.140Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"provider":"google","sub":"102772841881082815393","id":"102772841881082815393","displayName":"Davit Dvalashvili","name":{"givenName":"Davit","familyName":"Dvalashvili"},"given_name":"Davit","family_name":"Dvalashvili","email_verified":true,"verified":true,"email":"davitdvalashvili@gmail.com","emails":[{"value":"davitdvalashvili@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","_raw":"{\\n  \\"sub\\": \\"102772841881082815393\\",\\n  \\"name\\": \\"Davit Dvalashvili\\",\\n  \\"given_name\\": \\"Davit\\",\\n  \\"family_name\\": \\"Dvalashvili\\",\\n  \\"picture\\": \\"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1\\\\u003ds96-c\\",\\n  \\"email\\": \\"davitdvalashvili@gmail.com\\",\\n  \\"email_verified\\": true\\n}","_json":{"sub":"102772841881082815393","name":"Davit Dvalashvili","given_name":"Davit","family_name":"Dvalashvili","picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","email":"davitdvalashvili@gmail.com","email_verified":true}}}}'),
	('d6862646-f0c1-4a18-9de3-ada755da6c69', 1782123656, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:09:14.148Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili1996@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocLd7lDSk9kP1gFeE1rZeO5zpLdwHve8ltCkwh_W7Mf4jn2kh5Y=s96-c","user_id":"114875729600333322918"}},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('e3bf8ec4-466c-45c4-a61a-7007e850d9c4', 1782124061, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:26:17.219Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('e8422884-ef3b-4068-be15-1922101672ce', 1782125663, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:53:08.397Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('e8cf9c40-364f-4410-98c0-4cda97cce4ec', 1782128695, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:44:39.535Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('f271ca8e-e906-4095-9e38-503e86e933e8', 1782123974, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T10:25:45.243Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","user_id":"102772841881082815393"}}}'),
	('f8a7ec0c-bf43-497b-aadd-d0d91064810f', 1782130440, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T12:11:12.146Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}'),
	('fd7fbbcb-86ce-4b75-994a-8a0235c0ee27', 1782943177, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-07-01T21:44:52.202Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('fdd07d72-5da4-4687-96db-775979bb3b81', 1782132829, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T12:15:04.737Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"Auth":{"user_id":1,"user_name":"admin"}}'),
	('fe279987-49ce-401e-a0d5-006e1f01928f', 1782126450, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T11:04:54.917Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"user_id":"102772841881082815393","user_name":"Davit Dvalashvili","user_email":"davitdvalashvili@gmail.com","user_picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c"}}}'),
	('fe295600-502a-41b1-8a07-8f14aa93164f', 1782086759, '{"cookie":{"originalMaxAge":31536000000,"expires":"2026-06-22T00:05:40.829Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"passport":{"user":{"provider":"google","sub":"102772841881082815393","id":"102772841881082815393","displayName":"Davit Dvalashvili","name":{"givenName":"Davit","familyName":"Dvalashvili"},"given_name":"Davit","family_name":"Dvalashvili","email_verified":true,"verified":true,"email":"davitdvalashvili@gmail.com","emails":[{"value":"davitdvalashvili@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","_raw":"{\\n  \\"sub\\": \\"102772841881082815393\\",\\n  \\"name\\": \\"Davit Dvalashvili\\",\\n  \\"given_name\\": \\"Davit\\",\\n  \\"family_name\\": \\"Dvalashvili\\",\\n  \\"picture\\": \\"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1\\\\u003ds96-c\\",\\n  \\"email\\": \\"davitdvalashvili@gmail.com\\",\\n  \\"email_verified\\": true\\n}","_json":{"sub":"102772841881082815393","name":"Davit Dvalashvili","given_name":"Davit","family_name":"Dvalashvili","picture":"https://lh3.googleusercontent.com/a/ACg8ocIpz0UrOJeV1yrI4bK2moIuOVgdB2JTLSuCMTpBBHcArEUY5IK1=s96-c","email":"davitdvalashvili@gmail.com","email_verified":true}}}}');

-- Dumping structure for table parking_service_web.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_password` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table parking_service_web.users: ~1 rows (approximately)
INSERT INTO `users` (`user_id`, `user_name`, `user_password`) VALUES
	(1, 'admin', '$2b$10$NEmTF.kQDj3wTEuXHfz7NuPzrdH9ZQwNAvfKRku03NuibiYcCFxxG');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
