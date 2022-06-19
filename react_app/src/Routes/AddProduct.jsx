import {React, useState} from 'react';
import "../CSS/AddProduct.css";
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AddProduct = () => {

  const [type, setType] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const props = {
    Book: "weight",
    DISC: "size",
    Furniture: "dimensions"
  };

  const [warning, setWarning] = useState({
    message: "",
    exist: false
  });

  const [Args, setArgs] = useState({
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  })

  const [request, setRequest] = useState({
    type: "",
    price: "",
    sku: "",
    name: "",
    lastArg: ""
  });

  //variable contains the elements that will be used in the form
  const elements = {
    DISC: 
      [
        <label htmlFor="size" key='size'>
          <p>Size(MB)</p>
          <input name='size' type='number' id='size' required value={Args.size} onChange={(e)=>{
            setArgs({
              size: e.target.value,
              weight: "",
              height: "",
              width: "",
              length: ""
            });
            setRequest(request => ({...request, ...{lastArg: e.target.value}}));
            console.log(request);
          }}/>
        </label>,
        <p>Please provide size in MegaBytes</p>
      ],
    Book: 
      [
        <label htmlFor='weight' key="weight">
          <p>Weight(KG)</p>
          <input name="weight" type="number" id="weight" required value={Args.weight} onChange={e=>{
            setArgs(()=>({
              size:"",
              weight: e.target.value,
              height: "",
              width: "",
              length: ""
            }));
            setRequest(request=> ({...request, ...{lastArg: e.target.value}}));
            console.log(request);
          }}/>
        </label>,
        <p>Please provide weight in Kilograms </p>
      ],
    Furniture: [
      <label htmlFor="height" key="height">
        <p>Height(CM)</p>
        <input type="number" name="height" id="height" required value={Args.height} onChange={e=>{
          setArgs(() => ({
            size: "",
            weight: "",
            height: e.target.value,
            width: Args.width | "",
            length: Args.length | ""
          }));
          if(Args.width && Args.length){
            setRequest(request=>({
              ...request, 
              ...{lastArg: `${e.target.value}x${Args.width}x${Args.length}`}
            }));
            console.log(request);
          }
        }}/>
      </label>, 
      <label htmlFor="width" key='width'>
        <p>Width(CM)</p>
        <input type="number" name="width" id="width" required value={Args.width} onChange={e=>{
          setArgs(() => ({
            size: "",
            weight: "",
            height: Args.height | "" ,
            width: e.target.value,
            length: Args.length | ""
          }));
          if(Args.height && Args.length){
            setRequest(request=>({
              ...request, 
              ...{lastArg: `${Args.height}x${e.target.value}x${Args.length}`}
            }));
            console.log(request);
          }
        }}/>
      </label>,
      <label htmlFor="length" key='length'>
        <p>Length(CM)</p>
        <input type="number" name="length" id="length" required value={Args.length} onChange={e=>{
          setArgs(() => ({
            size: "",
            weight: "",
            height: Args.height | "" ,
            width: Args.width | "" ,
            length: e.target.value | ""
          }));
          if(Args.width && Args.length){
            setRequest(request=>({
              ...request, 
              ...{lastArg: `${Args.height}x${Args.width}x${e.target.value}`}
            }));
            console.log(request);
          }
        }}/>
      </label>,
      <p key={"dimensions Alert"}>Please provide dimensions in HxWxL format</p>
    ]
  }

  function handleTypeSwitch(e){ //dealing with type switching
    let switcher = e.target.value;
    setType(switcher);
  }

  function handleChange(key, event){
    setRequest(request=>(
      {...request, ...{[key]: event.target.value}}
    ))

    console.log(request);
  }

  function checkCompliting(type){
    setWarning({
      message: `Please provide ${props[type]}`,
      exist: true
    })
  }

  function onSubmit(){

    if(request.lastArg == "" && request.type=="Book"){
      checkCompliting(request.type);
      return;
    }else if(request.name=="" || request.type=="" || request.price=="" || request.sku==""){
      setWarning({
        message: "Please provide the missing data",
        exist: true
      });
      return;
    }

    axios.post("https://phpapimaster.000webhostapp.com/routes/create.php", {
      type:request.type,
      name: request.name,
      price: request.price,
      sku: request.sku,
      lastArg: request.lastArg
    }).then(res=>{

      console.log(res);

      if(res.data.result){
        deleteInfo();
        setRedirect(true);
      }
    }).catch(res=>{
      console.log(res.response.data);
      if(res.response.data.result ==false && res.response.data.reason==1062){
        setWarning({
          message: "Please choose another SKU, your's already taken...",
          exist: true
        });
      }
    })
  }

  function deleteInfo(){
    setArgs({
      size: "",
      weight: "",
      height: "",
      width: "",
      length: "",
    });
    setRequest({
      type: "",
      price: "",
      sku: "",
      name: "",
      lastArg: ""
    });
    setType(false);
  }

  function onCancel(){
    deleteInfo();
    setRedirect(true);
  }

  return (
    <div className='addProductBody'>
      <div className="container2">
          
        <nav className='navbar'>
          <h1>Product Add</h1>
          <div className='buttons'>
            <button onClick={onSubmit}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </nav>

        {warning.exist && <p className='warning'>{warning.message}</p>}

        <form method="post" id='product_form'>

          <label htmlFor="sku" className='label'>
            <p>SKU</p> 
            <input type="text" name="sku" id="sku" required value={request.sku} onChange={(event)=>handleChange("sku", event)}/>
          </label>

          <label htmlFor="name" className='label'>
            <p>Name</p> 
            <input type="text" name="name" id="name" required value={request.name} onChange={event => handleChange("name", event)}/>
          </label>

          <label htmlFor="price" className='label'>
            <p>Price($)</p> 
            <input type="number" name="price" id="price" required value={request.price} onChange={event=> handleChange("price", event)}/>
          </label>

          <label htmlFor="productType" onChange={(event)=>{
              handleChange("type", event);
              handleTypeSwitch(event);
            }}>
            <select name="type" id="productType" required value={request.type}>
              <option value="" defaultChecked>Type Switcher</option>
              <option value="DISC" id='DVD'>DVD</option>
              <option value="Furniture" id='Furniture'>Furniture</option>
              <option value="Book" id="Book">Book</option>
            </select>
          </label>

          
          {
            //check if the type is switched from its default value
            type ?
              elements[type].map(element => {
                return element
              })
            : <></>
            
          }
        </form>
      </div>

      <div className="footer">
        <hr />

        <footer>Scandiweb Test assignment</footer>
      </div>
      {
        redirect && <Navigate replace to="/" />
      }

    </div>
  )
}

export default AddProduct