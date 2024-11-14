import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  totalItemCount: 0, // Added total item count
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.title === action.payload.title
      );
      if (existingItem) {
        // Increase the quantity if the item already exists
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
        state.totalItemCount += 1; // Update total item count
      } else {
        // Add the item to the cart if it's not already there
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalAmount += action.payload.price;
        state.totalItemCount += 1; // Update total item count
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.title === action.payload.title
      );
      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
        state.totalItemCount += 1; // Update total item count
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.title === action.payload.title
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount -= item.price;
        state.totalItemCount -= 1; // Update total item count
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.title === action.payload.title
      );
      if (itemIndex !== -1) {
        state.totalAmount -=
          state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.totalItemCount -= state.items[itemIndex].quantity; // Update total item count
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
