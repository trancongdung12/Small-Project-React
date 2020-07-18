import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
class Checkout extends Component{
      constructor(){
        super();
        var cart = JSON.parse(localStorage.getItem('carts'));
        if(!cart){
          cart = []
        }
        this.state={
          cart: cart,
        }
      }
    
      
    render(){
        var {getTotal,onAddBill,renderRedirect} = this.props;
    return(
    <div class="container">
      <div class="py-5 text-center">
        <h2>Thanh toán</h2>
      </div>

      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Giỏ hàng</span>
            <span class="badge badge-secondary badge-pill">{this.state.cart.length}</span>
          </h4>
          <ul class="list-group mb-3">
              { 
              this.state.cart.map((item)=>(
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                     <h6 class="my-0">{item.name}</h6>
              <small class="text-muted">x {item.quantity}</small>
                    </div>
                    <span class="text-muted"><CurrencyFormat value={item.quantity*item.price} displayType={'text'} thousandSeparator={true} /> VND</span>
                </li>
              ))
              }
            
            <li class="list-group-item d-flex justify-content-between">
              <span>Tổng (VND)</span>
              <strong><CurrencyFormat value={getTotal()} displayType={'text'} thousandSeparator={true} /> VND</strong>
            </li>
          </ul>
        </div>
        <div class="col-md-8 order-md-1">
          <h4 class="mb-3">Địa chỉ giao hàng</h4>
          <form class="needs-validation" onSubmit={onAddBill} novalidate>

            <div class="mb-3">
              <label for="email"> Tên người nhận</label>
              <input type="text" class="form-control" name="bill-name" required/>
            </div>

            <div class="mb-3">
              <label for="text"> Số điện thoại</label>
              <input type="text" class="form-control" name="bill-phone" value="0123456789" required/>
            </div>

            <div class="mb-3">
              <label for="email">Email </label>
              <input type="text" class="form-control" name="bill-email" value="you@example.com" required/>
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="mb-3">
              <label for="address">Địa chỉ</label>
              <input type="text" class="form-control" name="bill-address" value="101b Lê Hữu Trác" required/>
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <hr class="mb-4"/>
            {renderRedirect()}
           <button  class="btn btn-success btn-lg btn-block" > Thanh toán</button>
          </form>
        </div>
      </div>
      </div>
            );
        }
}
export default Checkout ;