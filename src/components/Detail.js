import React,{ Component } from "react";
import CurrencyFormat from 'react-currency-format';
import { withRouter} from "react-router-dom";
class Detail extends Component{
        
    render(){
        
         var {addToCart} = this.props;

          var id = this.props.match.params.id;
        return(
            <div id="detail" className="container">
                {
                   <h3>{id}</h3> 
                // <div className="row">
                // <div className="col-6">
                //     <img src={products.image} height="400px" width="400px" />
                // </div>
                // <div className="col-6">
                //     <h4>{products.name}</h4>
                //     <p><CurrencyFormat value={products.price} displayType={'text'} thousandSeparator={true} /> VND</p>
                //     <button onClick={addToCart} className="btn btn-danger">Add to cart</button>
                // </div>
                // </div>
                }
            </div>
        );
    }
}
export default withRouter(Detail);