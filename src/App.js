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
import Time from './components/Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChevronCircleRight,
   faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import {
  BrowserRouter as Router,
  Redirect,
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
    this.toggleNext = this.toggleNext.bind(this);
    this.togglePrev = this.togglePrev.bind(this);
    this.setCountCart = this.setCountCart.bind(this);
    var product = JSON.parse(localStorage.getItem("products"));
    if(!product){
      product = [
        {
          id: 0,
          name:'IPHONE X',
          price:10000000,
          image:'https://salt.tikicdn.com/ts/product/39/1f/f8/4512fe9898661b5f3746f91370a22158.jpg',
          category:'Điện thoại'
        },
        {
          id: 1,
          name:'IPHONE XR',
          price:20000000,
          image:'https://clickbuy.com.vn/uploads/2019/03/apple-iphone-xr-vang-600x600.png',
          category:'Điện thoại'
        },
        {
          id: 2,
          name:'MacBook Pro',
          price:30000000,
          image:'https://lh3.googleusercontent.com/proxy/ef1b8l-vddkKIQ9O0n84tION9qKcc3PBqhqUZtG-Y-298ymvw1ggugpj1wUJAmnm6pdl815O1-SmLBqpjjc9UlZOQHG_8OwWb-3XpffnNmjI-6WmXUjIUx_tzyn2ssyYTX-kS70PLSC7ds4yOJg',
          category:'Laptop'
        },
        {
          id: 3,
          name:'Gamming',
          price:40000000,
          image:'https://cdn.fado.vn/images/I/71VmlANJMOL.jpg',
          category:'Laptop'
        },
        {
          id: 4,
          name:'Gamming MSI',
          price:20000000,
          image:'https://laptopchinhhang.com/wp-content/uploads/2018/09/MSI-GP63-8RD-098VN-GAMING-LAPTOP-98925310914072018.png',
          category:'Laptop'
        },
      ];
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
      searchItem :null,
      formValue: [],
      isEdit : false,
      countCartItem : cart.length ,
      indexStart: 0,
      indexEnd: 4,
      disabledNext: false,
      disabledPrev: true,
      redirect: false
    }
  }
  //----------PAGINATION---------//


  togglePrev(e) {
    var indexStart = this.state.indexStart - 4;
    var indexEnd = this.state.indexEnd - 4;
    var disabledPrev = false;

    if (indexStart <= 0) {
    e.preventDefault()
    indexStart = 0;
    indexEnd = 4;  
    disabledPrev = true
    }

    this.setState({ indexStart: indexStart, indexEnd:indexEnd , disabledPrev: disabledPrev, disabledNext: false })
  }

  toggleNext(e) {
    var indexStart = this.state.indexStart + 4;
    var indexEnd = this.state.indexEnd + 4;
    var disabledNext = false
    if (indexEnd >= this.state.products.length) {
      e.preventDefault()
      disabledNext = true
    }else if(this.state.searchItem && indexEnd > this.state.searchItem.length){
      e.preventDefault()
      disabledNext = true
    }
    this.setState({indexStart: indexStart, indexEnd:indexEnd, disabledNext: disabledNext, disabledPrev: false })
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
  
  getTotal(){
    var total = 0;
    var cart = JSON.parse(localStorage.getItem("carts"));
    if(!cart){
      cart = []
    }
    cart.map((item)=>(
        total += parseInt(item.price)*parseInt(item.quantity)
      ));
    return total;
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
      billtotal:this.getTotal(),
      billdate: new Date().toLocaleString()
    }
    var bills = JSON.parse(localStorage.getItem("bills"));
    if(!bills){
      bills = [];
    }
    bills.push(bill);
    localStorage.setItem("bills",JSON.stringify(bills));
    alert('Thanh toán thành công!');
    localStorage.removeItem('carts')
    this.setState({ bill:bills,countCartItem:0, redirect: true })
    
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    } 
  }

  //----------SEARCH PRODUCT---------//


  searchProduct(event){
    event.preventDefault();
    var products = this.state.products;
    var txt_search = event.target['txt-search'].value;
    const result = products.filter(product => {
      return (
        product.name.toLowerCase().indexOf(txt_search.toLowerCase())  !== -1 ||
        product.category.toLowerCase().indexOf(txt_search.toLowerCase())  !== -1
      );
    });
    console.log(result.length);
    if(result.length == 0 ){
      alert('Not found');
    }
    else
    {
      this.setState({
        searchItem : result,
        indexStart : 0,
        indexEnd : 4,
        disabledPrev:true
      })
    }
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
          <Time />
            <Switch>
            <Route  path="/detail/:id">
              <Detail 
                item={this.state.detail}  
                addToCart={this.addProductToCart(this.state.detail)} 
                />
                
              </Route>
            <Route exact path="/bill">
              {
                this.state.bill.map((item)=>(
                <Bill item={item} />
                ))
              }
              </Route>
             <Route exact path="/check-out">
                <Checkout
                renderRedirect = {this.renderRedirect} 
                setValue = {this.setValue}  
                getTotal={this.getTotal} 
                onAddBill={this.createBill} />
              </Route>
              <Route exact path="/cart">
                <Cart 
                setCountCart={this.setCountCart} 
                getTotal={this.getTotal} />
              </Route>
              <Route exact path="/addproduct">
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
              <Route exact path="/">
                  <div className="Arrange">
                  <button onClick={this.sortByPriceAsc} className="btn btn-danger">Giá tăng dần</button>
                  <button onClick={this.sortByPriceDsc} className="btn btn-warning">Giá giảm dần</button>
                  </div>
                  <div className="container" id="prd-container" >            
                  <button className="btn-icon"  onClick={this.togglePrev}  disabled={this.state.disabledPrev}><FontAwesomeIcon className="iconCirleLeft" icon={faChevronCircleLeft} /></button>
                  <button className="btn-icon"  onClick={this.toggleNext}  disabled={this.state.disabledNext}><FontAwesomeIcon className="iconCirleRight" icon={faChevronCircleRight} /></button>
                {  
                (this.state.searchItem) ? 
                this.state.searchItem.slice(this.state.indexStart, this.state.indexEnd).map((item)=>(                 
                  <Product item={item} showDetail={this.showDetailProduct(item)} addToCart={this.addProductToCart(item)}  />
                ))
                :
                this.state.products.slice(this.state.indexStart, this.state.indexEnd).map((item)=>(                 
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
