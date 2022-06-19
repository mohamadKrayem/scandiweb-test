<?php

  /**
   * interface for all the products
   */
  interface Product
  {
    public function __construct($db);
    public function getArgs();
    // public function create();
    public function read();
    public function create();
  }
