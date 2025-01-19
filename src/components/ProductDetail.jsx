import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch product details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4">
      <Link to="/" className="btn btn-secondary mb-4">Back to Products</Link>
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="card-text">
                <strong>Category:</strong> {product.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
