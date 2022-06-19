import React from 'react';
import "../CSS/Product.css";

const Product = (props) => {
  return (
    <div className='productBody'>
      <p>{props.sku}</p>
      <p>{props.name}</p>
      <p>{props.price} $</p>
      <p>{props.property}: {props.value} {props.property == 'Dimensions'? "" : props.unit}</p>
    </div>
  )
}

export default Product