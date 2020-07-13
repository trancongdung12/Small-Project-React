import React,{ Component } from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
class NavBar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Navbar</a>
            <button  className="navbar-toggler">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link"  to="/">Home</Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link"  to="/bill">Bill</Link>
                </li>
              </ul>
              <form onSubmit={this.props.searchProduct} className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" name="txt-search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" >Search</button>
              </form>
              <ul className="navbar-nav mr-right">
              <li className="nav-item">
                    <Link className="nav-link cart-item" to="/cart"><FontAwesomeIcon className="icon-cart" icon={faShoppingCart}/><div className="count-cart">{this.props.countCartItem}</div></Link>
                </li>
                
              <li className="nav-item ">
                    <Link className="nav-link"  to="/addproduct">Add</Link>
                </li>
              </ul>        
              
            </div>
          </nav>
        );
    }
}
export default NavBar;