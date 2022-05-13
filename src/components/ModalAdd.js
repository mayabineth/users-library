import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { closeModalAdd } from "../features/modal/modalSlice";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [mail, setEmail] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
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
      !mail ||
      !image ||
      !id
    ) {
      return false;
    }
    return true;
  };
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>add new user</h4>
        {alert && <p className="alert alert-danger">{alertMsg}</p>}
        <div className="edit-item">
          <div className="form-control">
            <input
              type="text"
              className="input-item"
              placeholder="Add Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Add Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Add Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Add Email"
              value={mail}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="input-item"
              placeholder="Add Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              const addNewItem = {
                fullName: name,
                fullLocation: location,
                image: image,
                id: id,
                email: mail,
              };
              setAlert("true");
              if (checkIsValid()) {
                dispatch(addItem(addNewItem));
                dispatch(closeModalAdd());
              } else {
                dispatch(addItem(addNewItem));
              }
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
              dispatch(closeModalAdd());
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
