import React, { Component } from "react";
import { Container,Col } from 'reactstrap';
import './AddProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
  
class AddProduct extends Component{
    
    render(){
                var {onUpdateProduct,onAddProduct,products,onRemoveProduct,onEditProduct,formValue,isEdit,setValue} = this.props;
        return(
            <div>
                <Container>
                 <Col sm="6">
                        <h1>Thêm sản phẩm</h1>
                
                        <form  onSubmit={isEdit  ? onUpdateProduct : onAddProduct }>
                        <input type="text" name="id" value={formValue.id} hidden />     
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Tên sản phẩm</label>
                            <input type="text" name="name" onChange={setValue} value={formValue.name} className="form-control"/>      
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Giá sản phẩm</label>
                            <input type="text" name="price" onChange={setValue} value={formValue.price} className="form-control"/>      
                        </div>
                        <label htmlFor="exampleInputEmail1">Loại sản phẩm</label>
                        <select name="category" onChange={setValue} value={formValue.category} class="form-control">
                        <option>Điện thoại</option>
                        <option>Laptop</option>
                        </select>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Link hình ảnh</label>
                            <input type="text" name="image" onChange={setValue} value={formValue.image} className="form-control"/>      
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Hình ảnh</label>
                            <input type="file" name="imageFile" class="form-control-file" id="exampleFormControlFile1"/>
                        </div>                     
                        {isEdit  ? <button  className="btn btn-danger">Cập nhật</button> : <button  className="btn btn-danger">Thêm</button> }
                        
                    </form>
                 </Col>
                 <table id="table-x" className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Loại</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                        <tbody>
                         {
                          products.map((item,key)=>(
                                <tr>
                                <th scope="row">{key}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td><img src={item.image} height="50px" width="50px"/></td>
                                <td>{item.category}</td>
                                <td>
                                    <button className="btn-icon" onClick={onEditProduct(item)}><FontAwesomeIcon  icon={faEdit} /></button>
                                    <button className="btn-icon" onClick={onRemoveProduct(key)}><FontAwesomeIcon  icon={faTrash} /></button>
                                </td>
                                </tr>   
                             ))
                         }
                            
                        </tbody>
                </table>


                </Container> 
            </div>
        );
    }
}
export default AddProduct