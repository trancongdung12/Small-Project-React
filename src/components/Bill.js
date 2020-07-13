import React, {Component} from 'react';

class Bill extends Component{   
    render(){
        var {item} = this.props;
        return(
            <div id="bill-container" className="container">
                <div className="row">
                    <div className="col-3">
                        <h5>Địa chỉ nhận hàng</h5>
                        <p><b>Tên:</b> {item.billname}</p>
                        <p><b>SĐT:</b> {item.billphone}</p>
                        <p><b>Địa chỉ:</b> {item.billaddress}</p>
                        <p><b>Email:</b> {item.billemail}</p>
                        <p><b>Ngày mua:</b> {item.billdate}</p>
                        <p><b>Tổng tiền</b> {item.billtotal} VND</p>
                    </div>
                    <div className="col-9">
                    <table className="table">
                    <thead >
                        <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Số lượng</th>
                        </tr>
                    </thead>
                        <tbody>
                         {
                             JSON.parse(item.products).map((el)=>(
                                <tr>
                                <td>{el.name}</td>
                                <td>{el.price} VND</td>
                                <td><img src={el.image} height="50px" width="50px" /></td>
                                <td>{el.quantity}</td>
                                </tr>   
                             ))
                         }
                            
                        </tbody>
                </table>
                    </div>
                </div>
            </div>
        );
    }
}export default Bill;