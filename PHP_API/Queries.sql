CREATE TABLE `products` (
  `type` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `sku` varchar(100) NOT NULL,
  `lastArg` varchar(100) NOT NULL,
  PRIMARY KEY (`sku`)
)