import { useState, useEffect} from 'react';
import '../CSS/Home.css';
import axios from 'axios';
import Product from '../components/Product';
import {Link} from 'react-router-dom';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState({});

  //fetch data
  useEffect(()=>{
    const loadProduct = async ()=>{
      setLoading(true);
      const res = await axios.get(
        "https://phpapimaster.000webhostapp.com/routes/read.php", 
        {
          params:{
            type:["DISC", "Book", "Furniture"]
          }
        }
      )

      setProducts(res.data);
      console.log(res.data);
      setLoading(false);
      res.data.map((product)=> {
        setChecked(checked=>{
          return {...checked, ...{[product.sku]: false}}
        })
      })
    }
    loadProduct();
  }, []);

  function deleteItems(){
    let toBeDeleted= [];
    products.forEach(product => {
      if(checked[product.sku]){
        toBeDeleted.push(product.sku)
      }
    })

    axios.delete('https://phpapimaster.000webhostapp.com/routes/delete.php', 
    {
      data:{
        selectedItems: toBeDeleted
      }
    }
    ).then(res=>{
      console.log(res);
      if(res.data.result==true){
        let newArray=products.filter((product, i)=>{
          if(!toBeDeleted.includes(product.sku)){
            return product;
          }
        })
        setProducts(newArray)
      }
    })
  }

  return (
    <div className='container'>

      <div className='container1'>
        <nav className='navbar'>
          <h1>Product List</h1>
          <div className='homeButtons'>
            <Link to="/addproduct" className='Button' id='add-product-btn'><button className='Button'>ADD</button></Link>
            <button onClick={deleteItems} id="delete-product-btn" className='Button'>MASS DELETE</button>
          </div>
        </nav>

        <div className='body'>
          { loading ? <h1>loading</h1> : 
            products.map((product)=>{
              
              return (
                <div className='product' key={product.sku}>
                  <input type="checkbox" name="select" id="select" value={product.sku} checked={checked[product.sku]} onChange={(()=>{
                    console.log(checked);
                    setChecked(checked=>{
                      return {...checked, ...{[product.sku]: !checked[product.sku]}}
                    })
                  }) }
                  className="delete-checkbox"/>
                  <Product 
                    sku={product.sku} 
                    name={product.name} 
                    price={product.price} 
                    property={product.lastArg} 
                    value={product.value} 
                    unit={product.unit}
                  />
                </div>
              )
            })
          } 
        </div>
      </div>
      <div className="footer">
        <hr />
        <footer>Scandiweb Test assignment</footer>
      </div>
    </div>
  )
}

export default Home