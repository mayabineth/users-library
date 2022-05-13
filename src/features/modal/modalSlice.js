import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenEdit: false,
  isOpenRemove: false,
  isOpenAdd: false,
  clickedItemRemove: "none",
  clickedItemEdit: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalEdit: (state, { payload }) => {
      state.isOpenEdit = true;
      state.clickedItemEdit = payload;
    },
    closeModalEdit: (state) => {
      state.isOpenEdit = false;
    },
    openModalRemove: (state, { payload }) => {
      state.isOpenRemove = true;
      state.clickedItemRemove = payload;
    },
    closeModalRemove: (state) => {
      state.isOpenRemove = false;
    },
    openModalAdd: (state) => {
      state.isOpenAdd = true;
    },
    closeModalAdd: (state) => {
      state.isOpenAdd = false;
    },
  },
});

export const {
  openModalEdit,
  closeModalEdit,
  openModalRemove,
  closeModalRemove,
  openModalAdd,
  closeModalAdd,
} = modalSlice.actions;

export default modalSlice.reducer;
