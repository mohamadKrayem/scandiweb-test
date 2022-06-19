<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 86400");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';
include_once '../objects/Furniture.php';
include_once '../objects/DISC.php';
include_once '../objects/Book.php';

$types = isset($_GET['type']) ? $_GET['type'] : die();
$products_arr = array();

$database = new Database();
$db = $database->getConnection();

foreach ($types as &$type) {
  $productClass = ucfirst($type);
  $Product = new $productClass($db);
  $stmt = $Product->read();
  $num = $stmt->rowCount();


  if ($num > 0) {



    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

      extract($row);
      $args = $Product->getArgs();
      $product_item = array(
        $args[0] => ucfirst($type),
        $args[1] => $price,
        $args[2] => ucfirst($name),
        $args[3] => ucfirst($sku),
        "lastArg" => ucfirst($args['lastArg']),
        "value" => $lastArg,
        "unit" => $args['unit']
      );

      array_push($products_arr, $product_item);
    }
  }
}

http_response_code(200);

echo json_encode($products_arr);
