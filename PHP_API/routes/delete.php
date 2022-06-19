<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 86400");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, X-Auth-Token");

include_once '../config/database.php';
include_once '../objects/product.php';

if(!empty(json_decode(file_get_contents("php://input"))->delete)){
  $data = json_decode(file_get_contents("php://input"));

  $database = new Database();
  $db = $database->getConnection();

  function delete($sku, $conn)
  {
    $query = "DELETE FROM products where sku='$sku'";
    $stmt = $conn->prepare($query);
    $stmt->execute();
  }

  foreach ($data->selectedItems as &$id) {
    delete($id, $db);
  }


  http_response_code(200);

  echo json_encode(array("result" => true));
}else{
  http_response_code(200);

  echo json_encode(array("result"=> false));
}
