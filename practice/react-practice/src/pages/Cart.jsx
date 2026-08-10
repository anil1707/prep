import { useSelector } from "react-redux"
import CartItemCard from "../commponents/CartItemCard";

const Cart = () => {
    const cartData = useSelector(state => state.cart);
    console.log("cartData", cartData)
    return (
        <>
            {Array.isArray(cartData?.items) && cartData?.items?.length > 0 ? (
                cartData?.items?.map(item => {
                    return (
                        <CartItemCard item={item}  key={item?.id}/>
                    )
                })
            ) : "No Item aded into cart, please add!"}
        </>
    )
}

export default Cart