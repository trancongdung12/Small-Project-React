import React,{ Component } from "react";
import './AddProduct.css';
import {Link} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

class Product extends Component{
    render(){
        var {item,addToCart,showDetail} = this.props;
        return(
        
                    <div className="card">
                        <Link to={"/detail/"+item.id}><img className="card-img-top" src={item.image} alt="Card image cap"/></Link>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            
                            <p className="card-text"><CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} /> VND</p>
                            <button onClick={addToCart} className="btn btn-danger">Add to cart</button>
                        </div>
                    </div>               
      
        );
    }
}export default Product;