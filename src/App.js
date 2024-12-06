import React, { useEffect } from 'react';
import { useDispatch, useSelector,Provider } from 'react-redux';
import { setProducts } from './slices/productSlice';
import ProductListView from './components/ProductListView';
import ProductView from './components/ProductView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data from JSON server
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => dispatch(setProducts(data)));
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductListView />} />
          <Route path="/product/:id" element={<ProductView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;