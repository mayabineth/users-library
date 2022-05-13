import { useDispatch } from "react-redux";
import { openModalRemove, openModalEdit } from "../features/modal/modalSlice";

const CartItem = ({ fullName, fullLocation, image, id, email }) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={image} alt={id} />
      <div>
        <h4 className="item-name">{fullName}</h4>
        <h4>{id}</h4>
        <h4>{fullLocation}</h4>
        <h4>{email}</h4>
      </div>
      <div>
        <button
          className="remove-btn"
          onClick={() => {
            dispatch(openModalRemove({ id }));
          }}
        >
          remove
        </button>

        <button
          className="edit-btn"
          onClick={() => {
            dispatch(
              openModalEdit({ fullName, fullLocation, image, id, email })
            );
          }}
        >
          edit
        </button>
      </div>
    </article>
  );
};
export default CartItem;
