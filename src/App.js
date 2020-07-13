import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Product from './components/Product';
import Checkout from './components/Checkout';
import Bill from './components/Bill';
import NavBar from './page/NavBar';
import Detail from './components/Detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class App extends Component {
  constructor(){
    super();
    this.addProductToCart = this.addProductToCart.bind(this);
    this.createBill = this.createBill.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.onUpdateProduct = this.onUpdateProduct.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);
    this.onEditProduct = this.onEditProduct.bind(this);
    this.setValue = this.setValue.bind(this);
    var product = JSON.parse(localStorage.getItem("products"));
    if(!product){
      product = [];
    }
    var bills = JSON.parse(localStorage.getItem("bills"));
    if(!bills){
      bills = [];
    }
    var cart = JSON.parse(localStorage.getItem("carts"));
    if(!cart){
      cart = [];
    }
    this.state = {
      products : product,
      bill: bills,
      formValue: [],
      isEdit : false,
      countCartItem : cart.length 
    }
  }
  //----------SHOPPING CART---------//
  addProductToCart(item){
    return (event)=>{
      var cart = JSON.parse(localStorage.getItem("carts"));
      if(!cart){
        cart = [];
      }
      var oldItem = cart.find((el)=>(el.id === item.id));
      if(oldItem){
        oldItem.quantity  +=1;
      }else{
        item.quantity =1;
        cart.push(item);
      }
      this.setState({countCartItem:cart.length})
      localStorage.setItem("carts",JSON.stringify(cart));
    }
  }
  setCountCart(){
    var cart = JSON.parse(localStorage.getItem("carts"));
    this.setState({
       countCartItem:cart.length
    })
  }
  
  //----------DETAIL PRODUCT---------//
  showDetailProduct(item){
    return (event)=>{
      this.setState({
        detail: item
      })
    }
  }
  //----------BILL PRODUCT---------//
  createBill(event){
    event.preventDefault();
    var billname = event.target['bill-name'].value;
    var billphone = event.target['bill-phone'].value;
    var billadress = event.target['bill-address'].value;
    var billemail = event.target['bill-email'].value;
    var bill = {
      billname: billname,
      billphone: billphone,
      billadress: billadress,
      billemail: billemail,
      products: localStorage.getItem("carts"),
      billtotal:11111,
      billdate: new Date().toLocaleString()
    }

    var bills = JSON.parse(localStorage.getItem("bills"));
    if(!bills){
      bills = [];
    }
    bills.push(bill);
    localStorage.setItem("bills",JSON.stringify(bills));
    localStorage.removeItem('carts');
    alert('Thanh toán thành công! Bạn có thể xem lại đơn hàng trong bill');
    this.setState({
      bill:bills
    })
  }

  //----------SEARCH PRODUCT---------//
  searchProduct(event){
    event.preventDefault();
    var products = this.state.products;
    var txt_search = event.target['txt-search'].value;
    const result = products.filter(product => product.name.includes(txt_search));
    this.setState({
      products: result
    })
  }

  //----------SORT PRODUCT---------//
  sortByPriceAsc=()=>{

    var sortedProductsAsc;
    sortedProductsAsc= this.state.products.sort((a,b)=>{
       return parseInt(a.price)  - parseInt(b.price);
    })

    this.setState({
        products:sortedProductsAsc
    })
  }
  sortByPriceDsc=()=>{

      var sortedProductsDsc;
      sortedProductsDsc= this.state.products.sort((a,b)=>{
        return parseInt(b.price)  - parseInt(a.price);
      })

      this.setState({
          products:sortedProductsDsc
      })



  }

  //----------CRUD PRODUCT---------//
  onAddProduct(event){
    event.preventDefault();
    var name = event.target['name'].value;
    var price = event.target['price'].value;
    var image = event.target['image'].value;
    var category = event.target['category'].value;
    //  var imageFile = event.target['imageFile'].files;
    // alert(imageFile);
    var products = JSON.parse(localStorage.getItem("products"));
    if(!products){
      products = [];
    }
    var product = {
      id: products.length+1,
      name:name,
      price:price,
      image:image,
      category:category
    }
    products.push(product);
    localStorage.setItem("products",JSON.stringify(products));
    this.setState({
        products:products
    });
  
  }

  onUpdateProduct(event){
      event.preventDefault();
      var id = event.target['id'].value;
      var name = event.target['name'].value;
      var price = event.target['price'].value;
      var image = event.target['image'].value;
      var category = event.target['category'].value;
      var products = JSON.parse(localStorage.getItem("products"));
      var oldItem = products.find((el)=>(el.id == id));
      oldItem.name = name;
      oldItem.price = price;
      oldItem.image  = image;
      oldItem.category  = category;
      localStorage.setItem("products",JSON.stringify(products));
      this.setState({products: products});
  }
  onRemoveProduct(key){
    return (event)=>{
      var newArr = JSON.parse(localStorage.getItem("products"));
      newArr.splice(key, 1);
      localStorage.setItem("products",JSON.stringify(newArr));
      this.setState({products: newArr});
    }
  }
  setValue(e){
     this.setState({ formValue : e.target.value });
  }
  onEditProduct(item){
    return (event)=>{
        this.setState({
            isEdit : true,
            formValue : item
        })
    }
  }
  render(){
    return (
      <Router>
      <div className="App">
          <NavBar countCartItem={this.state.countCartItem} searchProduct={this.searchProduct} />
         
            <Switch>
            <Route path="/detail">
                <Detail item={this.state.detail}  addToCart={this.addProductToCart(this.state.detail)} />
              </Route>
            <Route path="/bill">
              {
                this.state.bill.map((item)=>(
                <Bill item={item} />
                ))
              }
              </Route>
             <Route path="/check-out">
                <Checkout onAddBill={this.createBill} />
              </Route>
              <Route path="/cart">
                <Cart setCountCart={this.setCountCart} />
              </Route>
              <Route path="/addproduct">
                <AddProduct
                setValue = {this.setValue} 
                isEdit ={this.state.isEdit}
                formValue ={this.state.formValue}
                products={this.state.products} 
                onAddProduct={this.onAddProduct} 
                onRemoveProduct={this.onRemoveProduct} 
                onUpdateProduct={this.onUpdateProduct} 
                onEditProduct={this.onEditProduct} 
                />
              </Route>
              <Route path="/">
              <div className="Arrange">
              <button onClick={this.sortByPriceAsc} className="btn btn-danger">Giá tăng dần</button>
              <button onClick={this.sortByPriceDsc} className="btn btn-warning">Giá giảm dần</button>
              </div>
              <div className="container" id="prd-container">
              <button className="btn-icon"><FontAwesomeIcon className="iconCirleLeft" icon={faChevronCircleLeft} /></button>
              <button className="btn-icon"><FontAwesomeIcon  className="iconCirleRight" icon={faChevronCircleRight} /></button>
                {        
                this.state.products.map((item)=>(                 
                  <Product item={item} showDetail={this.showDetailProduct(item)} addToCart={this.addProductToCart(item)}  />
                ))
                }
                </div>
                
              </Route>
          </Switch>         
      </div>
      </Router>
    );
  }
}

export default App;
