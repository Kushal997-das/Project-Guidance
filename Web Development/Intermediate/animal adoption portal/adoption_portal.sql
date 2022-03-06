-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2022 at 07:02 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adoption portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`id`, `Name`, `Email`, `Phone`, `Message`) VALUES
(1, 'Jyothi', 'jyothi@gmail.com', '2534564', 'Hello, how can I adopt a pet?'),
(2, 'jyothi', 'jyo@gmail.com', '4567890', 'xxx'),
(3, 'jyothi', 'jyothi@gmail.com', '56789', 'xxxxxxxxxxxxxxxxxxx');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `life span` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `details` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `breed`, `name`, `life span`, `image`, `details`) VALUES
(1, 'Jack Russell Terrier', 'Benny', '13-16 years', '1-1.jpg', 'These jaunty little fellows pack lots of personality into a compact, rectangular body standing 10 to 12 inches at the shoulder. Their dark, almond-shaped eyes and mobile V-shaped ears bring out the keenly intelligent expression—an endearing hallmark of the breed. All three coat types are mostly white with markings that are tan or black, or both. Russells move with a free, effortless gait that announces the breed’s innate confidence.'),
(2, 'Belgian Tervuren', 'Callie', '12-14 years', '1-2.jpg', 'The Belgian Tervuren is characterized by a straight and abundant coat, an elegant but muscular frame, a proudly carried head, an alert and intelligent demeanor, and an insatiable work drive. The Tervuren’s coat furnishings, like the sporty “collarette” around the neck, are more profuse on males, who run larger than females.\r\n\r\n“Their intelligence and high activity level can be a challenge for the less creative individual who may not understand the breed’s need to work,” warns one longtime owner. But don’t get the idea that Tervurens are grim, mechanical worker drones. In fact, this breed takes real delight in their ability to master any task, and owners say a mischievous sense of humor is at work whenever Tervurens outsmart their beloved human.'),
(3, 'Dutch Rabbit', 'Blaze', '6-9 years', '1-4.jpg', 'The Dutch rabbit is probably one of the easiest breeds to identify because of the distinctive white markings. The white blaze on the nose, and the white collar and the “saddle” on the back are a dead giveaway. Dutch are a small breed, but not a dwarf. The fur is normal length, with a soft under layer covered by longer guard hairs. The fur is flyback, meaning that if brushed opposite to the direction of growth, the fur quickly snaps back to normal position. Ears are upright.\r\n\r\nThe breed standard for Dutch rabbit calls for a compact body. It should be rounded and balanced. Ears are upright and the markings must be distinct.'),
(4, 'American Wirehair Cat', 'Ellie', '7-12 years', '2-1.jpg', 'The American Wirehair is a medium-sized cat, but she is a very powerful one. She is heavily muscled and has heavy boning. Her rounded, thick appearance makes you realize that she will be heavy when you pick her up.\r\n\r\nThe Wirehair is a powerful cat. She has a broad chest, a muscular neck, strong jaws and a well-developed muzzle. Her legs are thick and strong. All components of this cat should be well developed. She looks like her ancestors, which were cats meant to keep rodents out of the barn and the house.\r\n\r\nThe coat of the Wirehair is similar to that of the American Shorthair, except for the crimped texture. It is thick and dense. It becomes much longer and thicker during the winter. The texture of the coat is relatively hard, as it is meant as protection for her and the crimping makes it feel even harder.'),
(5, 'Pug', 'Hufi', '12-15 years', '2-2.jpg', 'The Pug’s motto is the Latin phrase “multum in parvo” (a lot in a little)—an apt description of this small but muscular breed. They come in three colors: silver or apricot-fawn with a black face mask, or all black. The large round head, the big, sparkling eyes, and the wrinkled brow give Pugs a range of human-like expressions—surprise, happiness, curiosity—that have delighted owners for centuries.\r\n\r\nPug owners say their breed is the ideal house dog. Pugs are happy in the city or country, with kids or old folks, as an only pet or in a pack. They enjoy their food, and care must be taken to keep them trim. They do best in moderate climates—not too hot, not too cold—but, with proper care, Pugs can be their adorable selves anywhere.'),
(6, 'LaPerm Cat', 'Goldie', '10-15years', '2-3.jpg', 'LaPerm has a sense of humor. Often described as clownish, he is something of a mischief-maker who makes talented use of his paws to open doors, swipe things he wants or tap you on the shoulder for attention. He’s not clingy, but he likes to be with you and will follow you around, sit on your shoulder or the top of your computer, or sit in your lap, whichever option is most convenient for him. He is moderately active and enjoys retrieving items that are thrown for him.\r\n\r\nDespite his reputation for getting into things, the LaPerm is pleasant to live with. He rarely uses his voice, and he is affectionate, gentle and patient with his people. Most are also welcoming to visitors as long as they were well socialized as kittens.'),
(7, 'Holland Lop Rabbit', 'Jenna', '7-10 years', '3-1.jpg', 'ully grown. They have a wide, yet short body. This consequently gives these rabbits a compact body shape. They pose similarly to a cat, resting mostly on their hind legs and only slightly on their two front feet. The Holland Lop’s head is broad with a distinct puff of fur at the back, that has become known as the “crown”. The crown should be thick and wide and raised above the head.\r\n\r\nWhile their stocky body and fluffy round head would have been more than enough to make these bunnies cute, it’s their floppy ears that make this breed district and endlessly lovable. Without a doubt, the Holland Lop’s most famous feature is their large fur-covered ears which fall on either side of their heads. The ears are well-furred and thick and they are in the shape of a teaspoon (rounded tips and wider at the bottom).'),
(8, 'Doxle', 'Jack', '11-14 years', '3-2.jpg', 'The Doxle is a sweet, well-mannered companion that makes a wonderful family pet, no matter how old your children are. Because of its naturally happy disposition, this Beagle and Dachshund mix will eagerly play with anyone they deem a friend.\r\n\r\nDoxle dogs definitely consider themselves a part of the family (or you a part of their pack) and they will do anything to make you smile and laugh. Their friendly faces and affectionate behavior will no doubt be the cause for many wonderful stories for years to come.'),
(9, 'Golden Cocker Retriever', 'Nico', '10-15 years', '3-3.jpg', 'The Golden Retriever has since become a classic family pet — and movie superstar.\r\n\r\nIt’s best recognized for its golden coat, kind expression, and long hair.\r\n\r\nThis dog’s temperament can best be described as friendly, intelligent, and devoted, making it an all-around good choice for owners with children.\r\n\r\nTapping into its gun dog instinct, the Golden Retriever is a highly active breed that loves to chase after tennis balls and frisbees.\r\n\r\nIt requires a lot of stimulation like most Sporting Group dogs.\r\n\r\nA full-grown Golden Retriever reaches a height of 21 – 24 inches (53 – 61 cm) and a weight of 55 – 65 pounds (25 – 29 kg). These measurements count for males and females.\r\n\r\nThis golden dog is generally considered a healthy breed with just a few minor health concerns to watch out for.\r\n\r\nThe most common ones are hypothyroidism, elbow and hip dysplasia, and seizures. These are frequent illnesses in the dog world.'),
(10, 'Harlequin Rabbit', 'Millie', ' 5 years', '4-1.jpg', 'Harlequin rabbits are known to have a part black or some other color and another part white or orange. The brighter the orange color, the better. The coat should have a mix of both colors and with possible half and half design on the head. The color and not the name of the breed may also be referred to as magpie, where the second hue is white rather than the traditional orange.'),
(11, 'British Shorthair Cat Breed', 'Ollie', '7-12 years', '4-2.jpg', 'The British Shorthair is a very pleasant cat to have as a companion. She is easy going and placid. The British Shorthair is a fiercely loyal, loving cat and will attach herself to every one of her family members.\r\n\r\nWhile the British Shorthair loves to play, she doesn\'t need hourly attention. If she is in the mood to play, she will find someone and bring a toy to that person. The British Shorthair also plays well by herself, and thus is a good companion for single people'),
(12, 'Siberian Cat Breed', 'Noah', '12-15 years', '4-3.jpg', 'The Siberian Cat appears in Russian fairy tales, folktales and children’s books.\r\nRecords about the breed weren’t kept until the 1980s, although references to the feline date back to 1,000 A.D. They may even be the ancestors to other longhaired cats, including the Norwegian Forest Cat and Maine Coon.\r\nThey are sometimes referred to as Siberian Forest Cats or Moscow Longhairs.\r\nThere are claims Siberians are hypoallergenic, but this hasn’t been scientifically proven.'),
(13, 'Somali Cat Breed', 'Snoopy', '11-16 years', '7-1.jpg', 'The Somali is moderate looking in all aspects with smooth planes on her head. She has a gentle dip in the triangular head. Her rather large ears sit tilted forward giving her an alert, aware look as if she is always paying attention to everything. The eyes, which look large in the face, show the alertness and intelligence inherent in the breed.\r\n\r\nThe coat on the Somali is full with exaggerated tufts of hair in the ears. The fur is soft without being woolly and the tail is fluffy like a fox\'s tail. The coloring of the Somali is special. The majority of the fur has bands of color on each individual hair, with the coat looking darker along the spine line. The color on the body softens and lightens under the neck and the underside of the cat and the insides of the legs. She has a wild look about her, but is not at all extreme except in the color of the fur, which carries bands of color giving her a richness and depth not seen in other breeds.'),
(14, 'Belgian Hare Rabbit', 'Stewie', '7 years', '7-2.jpg', 'The Belgian Hare breed’s lengthy history originates in 18th century Belgium where they were developed using selective breeding tactics from domestic and wild European rabbits with the intention of making a hearty meat. They were imported as early as 1856 into England,  and dubbed the “Belgian Hare”, but it wasn’t until 1873 that a man by the name of Winter “William” Lumb and Benjamin Greaves developed into the breed that exists today.'),
(15, 'American Shorthair Cat', 'Hufi', '15 years\r\n', '7-3.jpg', 'As a working cat, American Shorthairs have a stocky, muscular build. Their muscular legs lend themselves to the American’s agility and endurance. They have a large head and full face, medium-sized ears and large, wide eyes.'),
(16, 'Turkish Van Cat Breed', 'Winnie', '12-17 years', '8-2.jpg', 'The Turkish Van cat is a large, muscular yet elegant breed with a white body and distinctively coloured head and tail. These cats are well balanced and strong in appearance. The large ears are set high on the head and the eyes are large, oval and expressive. The Turkish Van cat\'s coat is long, soft and silky with no woolly undercoat. The paws are tufted and the tail has a full brush. The body of The Turkish Van cat is predominately chalk white with coloured markings on top of the head. The colouring on the head is separated by a vertical white blaze. Occasionally small thumbprints of colour appear on the body. The eyes may be amber or blue or one of each.');

-- --------------------------------------------------------

--
-- Table structure for table `responses_form`
--

CREATE TABLE `responses_form` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `petname` varchar(255) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `responses_form`
--

INSERT INTO `responses_form` (`id`, `name`, `petname`, `breed`, `email`, `phone`) VALUES
(1, 'Jyothi', 'Hufi', 'Pug', 'jyothi@gmail.com', '2534435644');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `responses_form`
--
ALTER TABLE `responses_form`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `responses_form`
--
ALTER TABLE `responses_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
