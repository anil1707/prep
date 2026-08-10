import { useDispatch } from "react-redux";
import "../styles/productCard.css"
import { addToCart } from "../redux/slice/cartSlice";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    // console.log(product)
    const handleAddToCard = (product) => {
      console.log(product)
        dispatch(addToCart(product))
    }
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />

      <div className="product-content">
        <span className="category">{product.category}</span>

        <h2>{product.title}</h2>

        <p className="description">{product.description}</p>

        <div className="price-stock">
          <h3>${product.price}</h3>
          <span>{product.stock} in stock</span>
        </div>

        <div className="brand">
          <strong>Brand:</strong> {product.brand}
        </div>

        <div className="specs">
          <p>
            <strong>Color:</strong> {product.specs.color}
          </p>

          <p>
            <strong>Storage:</strong> {product.specs.storage}
          </p>

          <p>
            <strong>Weight:</strong> {product.specs.weight}
          </p>
        </div>

        <div className="rating">
          ⭐ {product.rating.rate} ({product.rating.count} Reviews)
        </div>

        <button onClick={() => handleAddToCard(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;