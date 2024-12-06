import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateProduct } from '../slices/productSlice';

const ProductView = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.products.find((prod) => prod.id === parseInt(id))
  );
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [comment, setComment] = useState('');

  const handleEditProduct = () => {
    if (updatedProduct.name) {
      dispatch(updateProduct(updatedProduct));
      setEditModalOpen(false);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        description: comment,
        date: new Date().toLocaleString(),
      };
      const updatedComments = updatedProduct.comments ? [...updatedProduct.comments, newComment] : [newComment];
      dispatch(updateProduct({ ...updatedProduct, comments: updatedComments }));
      setComment('');
    }
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = updatedProduct.comments.filter(
      (c) => c.id !== commentId
    );
    dispatch(updateProduct({ ...updatedProduct, comments: updatedComments }));
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Count: {product.count}</p>
      <p>Weight: {product.weight}</p>
      <button onClick={() => setEditModalOpen(true)}>Edit</button>
      {editModalOpen && (
        <div className="modal">
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Count"
            value={updatedProduct.count}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, count: +e.target.value })}
          />
          <button onClick={handleEditProduct}>Save</button>
          <button onClick={() => setEditModalOpen(false)}>Cancel</button>
        </div>
      )}

      <div>
        <h2>Comments</h2>
        <ul>
          {product.comments.map((c) => (
            <li key={c.id}>
              {c.description} ({c.date})
              <button onClick={() => handleDeleteComment(c.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default ProductView;