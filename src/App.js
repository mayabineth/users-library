import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";

import { useDispatch, useSelector } from "react-redux";
import { calculateAmount, getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import ModalRemove from "./components/ModalRemove";
import ModalEdit from "./components/ModalEdit";
import ModalAdd from "./components/ModalAdd";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpenEdit, isOpenRemove, isOpenAdd } = useSelector(
    (store) => store.modal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateAmount());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems("random"));
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpenRemove && <ModalRemove />}
      {isOpenEdit && <ModalEdit />}
      {isOpenAdd && <ModalAdd />}

      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
