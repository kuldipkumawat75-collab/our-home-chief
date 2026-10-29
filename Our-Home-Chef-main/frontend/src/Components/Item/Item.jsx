import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

const Item = (props) => {
  return (
   <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
      <div className='item'>
        <div className="card" >
          <Link to={`/product/${props.id}`} ><img src={`http://localhost:4000/image/${props.image}`} className="card-img-top" alt="..." /></Link>
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
           <div className="price">
            <p className="card-text">${props.price}</p>
           
           </div>
            <button
              className="add-cart-btn"
              onClick={() => props.addToCart(props.id)}
            >
              + Add to Cart
            </button>
            
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
         </div>
        </div>
      </div>
    </div>
  )
}

export default Item
