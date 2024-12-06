import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../slices/productSlice';
import { Link } from 'react-router-dom';

const ProductListView = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: Date.now(),
    name: '',
    count: 0,
    size: { width: 0, height: 0 },
    weight: '',
    comments: []
  });

  const handleAddProduct = () => {
    if (newProduct.name) {
      dispatch(addProduct(newProduct));
      setModalOpen(false);
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={() => setModalOpen(true)}>Add Product</button>
      {modalOpen && (
        <div className="modal">
          <h2>Add Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Count"
            value={newProduct.count}
            onChange={(e) => setNewProduct({ ...newProduct, count: +e.target.value })}
          />
          <button onClick={handleAddProduct}>Save</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      )}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListView;