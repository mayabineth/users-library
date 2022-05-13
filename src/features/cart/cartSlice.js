import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://randomuser.me/api/?results=10";

const initialState = {
  cartItems: [],
  amount: 10,
  isLoading: true,
  alertMsg: "none",
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);

      const data = resp.data.results;
      const newData = data.map((item) => {
        const { name, email, picture, location, login } = item;
        const newItem = {
          fullName: name.title + " " + name.first + " " + name.last,
          fullLocation:
            location.street.name +
            " " +
            location.street.number +
            ", " +
            location.city +
            ", " +
            location.state,
          image: picture.medium,
          id: login.uuid,
          email,
        };
        return newItem;
      });
      return newData;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
    },
    addItem: (state, { payload }) => {
      const tempFullName = payload.fullName.replace(" ", "");
      if (tempFullName.length < 3) {
        state.alertMsg = "invalid name length";
      } else if (payload.email.indexOf("@") === -1) {
        state.alertMsg = "invalid email format";
      } else if (
        !payload.fullName ||
        !payload.fullLocation ||
        !payload.image ||
        !payload.id ||
        !payload.email
      ) {
        state.alertMsg = "please fill all values";
      } else {
        state.alertMsg = "none";
        const newCartItems = state.cartItems;
        state.cartItems = [...newCartItems, payload];
      }
    },

    editItem: (state, { payload }) => {
      const tempFullName = payload.fullName.replace(" ", "");
      if (tempFullName.length < 3) {
        state.alertMsg = "invalid name length";
      } else if (payload.email.indexOf("@") === -1) {
        state.alertMsg = "invalid email format";
      } else if (!payload.fullName || !payload.fullLocation || !payload.email) {
        state.alertMsg = "please fill all values";
      } else {
        state.alertMsg = "none edit";
        const newCartItems = state.cartItems.map((item) => {
          if (item.id === payload.id) {
            return {
              ...item,
              fullName: payload.fullName,
              fullLocation: payload.fullLocation,
              email: payload.email,
            };
          }
          return item;
        });
        state.cartItems = newCartItems;
      }
    },

    calculateAmount: (state) => {
      let amount = state.cartItems.length;
      state.amount = amount;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

export const {
  addItem,
  editItem,
  removeItem,
  increase,
  decrease,
  calculateAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
