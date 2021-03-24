import React, {Component} from 'react'
import axios from 'axios'


class ProductList extends Component {
	constructor(state) {
		super(state);
		this.state = {
		products:[]
		};
	  }

	  componentDidMount = () => {
		this.fetchData()

		  
	  }

	  fetchData = () => {
	  axios.get('/api/products').then((response) => {
		  console.log(response.data)
		this.setState({products : response.data})
	  }).catch((error) => {console.log(error)})

	}
	
render() {

	const products = this.state.products.map(product => (
		<div key={product._id}>
	   <h1>{product.product_name}</h1>
		<p>{product.price}</p>
		  <h1>Products</h1>
		</div>

	));

	  return (
		<div>
		  {products}
		</div>


	  )

	  };

}

export default ProductList;