import { useDispatch } from "react-redux";
import { removeItem } from "../features/cart/cartSlice";
import { closeModalRemove } from "../features/modal/modalSlice";
import { useSelector } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();
  const { clickedItemRemove } = useSelector((store) => store.modal);

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove this item from users library?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(removeItem(clickedItemRemove));
              dispatch(closeModalRemove());
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
              dispatch(closeModalRemove());
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
