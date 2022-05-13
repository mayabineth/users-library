import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { openModalAdd } from "../features/modal/modalSlice";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);

  return (
    <section className="cart">
      <footer>
        <button
          className="btn add-btn"
          onClick={() => dispatch(openModalAdd())}
        >
          add user
        </button>
      </footer>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};
export default CartContainer;
