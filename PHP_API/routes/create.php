<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 86400");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, X-Auth-Token");

// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';
include_once '../objects/Book.php';
include_once '../objects/DISC.php';
include_once '../objects/Furniture.php';

if(!empty(json_decode(file_get_contents("php://input"))->type)){
  $data = json_decode(file_get_contents("php://input"));

  $database = new Database();
  $db = $database->getConnection();
  $productClass = ucfirst($data->type);
  $Product = new $productClass($db);

  $lastArg = $Product->getArgs()['lastArg'];

  $Product->name = $data->name;
  $Product->price = $data->price;
  $Product->sku = $data->sku;
  $Product->$lastArg = $data->lastArg;
  $result = $Product->create();

  if ($result == 1) {

    http_response_code(201);

    echo json_encode(array("result" => true));
  } else if ($result == 1062) {

    echo json_encode(array("result" => false, "reason" => 1062));

    http_response_code(400);
  } else {
    http_response_code(400);

    echo json_encode(array("result" => false));
  }
}else{
  http_response_code(200);

  echo json_encode(array("result"=>false));
}
