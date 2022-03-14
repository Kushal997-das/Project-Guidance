-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2021 at 03:14 PM
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
-- Database: `cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `centers`
--

CREATE TABLE `centers` (
  `id` int(11) NOT NULL,
  `branch_code` varchar(255) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phn_no` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `centers`
--

INSERT INTO `centers` (`id`, `branch_code`, `branch_name`, `address`, `phn_no`, `city`, `state`, `zip`) VALUES
(1, 'BRAN001', 'Branch 1', 'Vishwesharaya building, 5th street, MG road', '96876856', 'Hassan', 'Karnataka', '573221'),
(2, 'BRAN002', 'Branch 2', 'Sumeru buliding, 3rd cross, RJ nagar', '897699785', 'Bangalore', 'Karnataka', '560073'),
(3, 'BRAN003', 'Branch 3', 'Vrindavan Nilaya, Near RTO, JP Nagar', '7546798745', 'Hubli', 'Karnataka', '538908'),
(4, 'BRAN004', 'Branch 4', 'Vishweshwarya uilding, 4th street, MG Road', '8976988996', 'Mandya', 'Karnataka', '520943'),
(5, 'BRAN005', 'Branch 5', 'Sathyamangala, Behind RTO,', '909087696', 'Kolar', 'Karnataka', '578960');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`id`, `name`, `email`, `message`) VALUES
(1, 'hudf', 'hvds@gmail.com', 'dsvhy'),
(2, 'Jyothi', 'jyothi@gmail.com', 'tfyre'),
(3, '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `couriers`
--

CREATE TABLE `couriers` (
  `id` int(11) NOT NULL,
  `courier_id` varchar(255) NOT NULL,
  `send_name` varchar(255) NOT NULL,
  `send_no` varchar(255) NOT NULL,
  `send_address` text NOT NULL,
  `rec_name` varchar(255) NOT NULL,
  `rec_no` varchar(255) NOT NULL,
  `rec_address` varchar(255) NOT NULL,
  `srcbranch` varchar(255) NOT NULL,
  `dstbranch` varchar(255) NOT NULL,
  `cou_weight` varchar(255) NOT NULL,
  `height` varchar(255) NOT NULL,
  `length` varchar(255) NOT NULL,
  `width` varchar(255) NOT NULL,
  `cou_fee` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `couriers`
--

INSERT INTO `couriers` (`id`, `courier_id`, `send_name`, `send_no`, `send_address`, `rec_name`, `rec_no`, `rec_address`, `srcbranch`, `dstbranch`, `cou_weight`, `height`, `length`, `width`, `cou_fee`, `status`) VALUES
(1, 'COUR001', 'Manjunath', '9887778784', 'JP Nagar, Bangalore', 'Deepika', '983278930', 'Vidhya Nagar, Hubli', 'BRAN002Bangalore', 'BRAN003Hubli', '8 Kg', '10cm', '12cm', '10cm', '200Rs', 'Shipped'),
(2, 'COUR002', 'Kshama', '9678994593', 'Shanti Nilaya, 8th cross, Hubli', 'Jyothi', '8957689591', 'Sathyamangala, Hassan', 'BRAN003Hubli', 'BRAN001Hassan', '5kg', '5cm', '7cm', '8cm', '100Rs', 'Delivered'),
(3, 'COUR003', 'Dhanya', '897689789', 'Vidhya Nilaya, 6th street, Kolar', 'Divya', '785687879', 'R J Nagar, Mandya', 'BRAN005Kolar', 'BRAN004Mandya', '3Kg', '3cm', '5cm', '6cm', '100Rs', 'Out for delivery'),
(4, 'COUR004', 'Sanvith', '8796898762', 'Hassan', 'Akasha', '8796578587', 'Bangalore', 'BRAN001Hassan', 'BRAN002Bangalore', '2', '7', '4', '6', '20Rs', 'Registered'),
(5, '', '', '', '', '', '', '', 'BRAN003Hubli', 'BRAN004Mandya', '', '', '', '', '', 'Shipped');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `branch_code` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `branch_code`, `city`, `password`) VALUES
(1, 'Admin', 'admin@gmail.com', 'BRAN002', 'Bangalore', 'admin@123'),
(2, 'Vandan', 'vandan@gmail.com', 'BRAN004', 'Mandya', 'vandan'),
(3, 'Kshama', 'kshama123@gmail.com', 'BRAN002', 'Bangalore', 'kshama');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `centers`
--
ALTER TABLE `centers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `couriers`
--
ALTER TABLE `couriers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `centers`
--
ALTER TABLE `centers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `couriers`
--
ALTER TABLE `couriers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
