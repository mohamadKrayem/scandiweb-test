<?php


class Book implements Product
{

  protected $conn;
  public $sku;
  public $name;
  public $price;
  public $type = "Book";
  public $weight;

  function __construct($db)
  {
    $this->conn = $db;
  }

  public function getArgs()
  {
    return array("type", "price", "name", "sku", "lastArg" => "weight", "unit" => "KG");
  }

  public function read()
  {
    $query = "SELECT * from products WHERE type='Book'";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  public function create()
  {
    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->price = htmlspecialchars(strip_tags($this->price));
    $this->sku = htmlspecialchars(strip_tags($this->sku));
    $this->weight = htmlspecialchars(strip_tags($this->weight));


    try {
      $query = "INSERT INTO products (type, price, sku, name, lastArg) VALUES('$this->type', '$this->price', '$this->sku', '$this->name', '$this->weight') ";
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return true;
    } catch (PDOException $e) {
      if (str_contains($e, '1062 Duplicate entry')) {
        return 1062;
      }
    }
  }
}
