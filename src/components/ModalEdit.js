import { useDispatch } from "react-redux";
import { closeModalEdit } from "../features/modal/modalSlice";
import { editItem } from "../features/cart/cartSlice";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

const Modal = () => {
  const dispatch = useDispatch();
  const { clickedItemEdit } = useSelector((store) => store.modal);
  const [name, setName] = useState(clickedItemEdit.fullName);
  const [location, setLocation] = useState(clickedItemEdit.fullLocation);
  const [mail, setEmail] = useState(clickedItemEdit.email);
  const [alert, setAlert] = useState(false);
  const { alertMsg } = useSelector((store) => store.cart);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);
  const checkIsValid = () => {
    const tempName = name.replace(" ", "");
    if (
      tempName.length < 3 ||
      mail.indexOf("@") === -1 ||
      !name ||
      !location ||
      !mail
    ) {
      return false;
    }
    return true;
  };
  return (
    <aside className="modal-container">
      <div className="modal big-modal">
        <h4>edit user</h4>
        {alert && <p className="alert alert-danger">{alertMsg}</p>}
        <div className="edit-item">
          <img src={clickedItemEdit.image} alt={clickedItemEdit.id} />

          <div className="form-control">
            <input
              type="text"
              className="input-item"
              placeholder="Set Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Set Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Set Email"
              value={mail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              const editExistItem = {
                fullName: name,
                fullLocation: location,
                image: clickedItemEdit.image,
                id: clickedItemEdit.id,
                email: mail,
              };
              setAlert("true");

              if (checkIsValid()) {
                dispatch(editItem(editExistItem));
                dispatch(closeModalEdit());
              } else {
                dispatch(editItem(editExistItem));
              }
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
              dispatch(closeModalEdit());
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
