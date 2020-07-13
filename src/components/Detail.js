import React,{ Component } from "react";


class Detail extends Component{
    render(){
        var {item,addToCart} = this.props;
        return(
            <div id="detail" className="container">
                <div className="row">
                <div className="col-6">
                    <img src={item.image} height="400px" width="400px" />
                </div>
                <div className="col-6">
                    <h4>{item.name}</h4>
                    <p>{item.price} VND</p>
                    <button onClick={addToCart} className="btn btn-danger">Add to cart</button>
                </div>
                </div>
            </div>
        );
    }
}
export default Detail;