import React,{ Component } from "react";
import {Link} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

class Cart extends Component{
    constructor(){
        super();
        this.removeCart = this.removeCart.bind(this);
        var carts = JSON.parse(localStorage.getItem("carts"));
        if(!carts){
            carts = [];
        }
        this.state = {
            cart: carts,
            total:0
        }
    }
    
    removeCart(key){
        return (event)=>{
            var newArr = JSON.parse(localStorage.getItem("carts"));
            newArr.splice(key, 1);
            localStorage.setItem("carts",JSON.stringify(newArr));
            this.setState({
              cart: newArr,
            });
            
            this.props.setCountCart();     
        }
       
      }
    minusQty(item,key){
        return (event)=>{
            var cart = JSON.parse(localStorage.getItem("carts"));
            var oldItem = cart.find((el)=>(el.id === item.id));
            oldItem.quantity  = oldItem.quantity-1 ;
            if(oldItem.quantity == 0){
                cart.splice(key,1);
            }
            localStorage.setItem("carts",JSON.stringify(cart));          
            this.props.setCountCart();
            this.setState({cart: cart});
        }
    }
    plusQty(item){
        return (event)=>{
            var cart = JSON.parse(localStorage.getItem("carts"));
            var oldItem = cart.find((el)=>(el.id === item.id));
            oldItem.quantity  = oldItem.quantity+1 ;
            localStorage.setItem("carts",JSON.stringify(cart));
            this.setState({cart: cart});
        }
    }
    render(){
        return(
   <div className="container mb-4">
    <div className="row">
        <div className="col-12">
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Product</th>
                            <th scope="col" className="text-center">Quantity</th>
                            <th scope="col" className="text-right">Price</th>
                            <th></th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.cart.map((item,key)=>(
                                <tr>
                                    <td><img src={item.image} height="50px" width="50px" /> </td>
                                    <td>{item.name}</td>      
                                    <td className="qty-cart">
                                        <button onClick={this.minusQty(item,key)} className="btn btn-danger">-</button> 
                                        <input style={{width: "100px"}} disabled  className="form-control" type="text" value={item.quantity} /> 
                                        <button onClick={this.plusQty(item)} className="btn btn-danger">+</button></td>
                                    <td className="text-right"><CurrencyFormat value={item.price*item.quantity} displayType={'text'} thousandSeparator={true} /> VND</td>
                                    <td className="text-right"><button onClick={this.removeCart(key)} className="btn btn-sm btn-danger">Remove</button> </td>
                                    <td></td>
                                </tr>   
                            ))
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>Total</strong></td>
                    <td className="text-right"><strong><CurrencyFormat value={this.props.getTotal()} displayType={'text'} thousandSeparator={true} /> VND</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="col mb-2">
            <div className="row">
                <div className="col-sm-12  col-md-6">
                    <button className="btn btn-block btn-light">Continue Shopping</button>
                </div>
                <div className="col-sm-12 col-md-6 text-right">
                <Link className="btn btn-lg btn-block btn-success text-uppercase"  to="/check-out">Checkout</Link>
                   
                </div>
            </div>
        </div>
    </div>
</div>
        );
    }
}export default Cart;