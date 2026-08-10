import { useDispatch } from "react-redux";
import "../styles/./cartItemCard.css";
import { removeCartItem } from "../redux/slice/cartSlice";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const handleRemove = (id) =>{
    dispatch(removeCartItem(id))
  }
  return (
    <div className="cart-card">
      <img
        src={item.image}
        alt={item.title}
        className="cart-image"
      />

      <div className="cart-details">
        <h3>{item.title}</h3>

        <p className="description">{item.description}</p>

        <p>
          <strong>Brand:</strong> {item.brand}
        </p>

        <p>
          <strong>Category:</strong> {item.category}
        </p>

        <div className="price-qty">
          <span className="price">${item.price}</span>

          <div className="quantity">
            <button>-</button>
            <span>{item.quantity}</span>
            <button>+</button>
          </div>
        </div>

        <div className="rating">
          ⭐ {item.rating.rate} ({item.rating.count})
        </div>

        <button className="remove-btn" onClick={() => handleRemove(item?.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;