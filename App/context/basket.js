import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    products: [],
    totalPrice: 0,
    selectedItemsCount: 0,
  },
  reducers: {
    // addToBasket (command) - itemAdded (event)
    itemAdded: (state, action) => {
      const { product, quantity } = action.payload;
      // Check if the product already exists in the basket
      const existingProductIndex = state.products.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex !== -1) {
        // If the product already exists, update its quantity
        state.products[existingProductIndex].quantity += quantity;
      } else {
        // If the product is new, add it to the basket
        state.products.push({ ...product, quantity });
      }
      // Update total price and selected items count
      state.totalPrice += product.price * quantity;
      state.selectedItemsCount += quantity;
    },
    // removeFromBasket (command) - itemRemoved (event)
    itemRemoved: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProductIndex = state.products.findIndex((p) => p.id === id);
      if (existingProductIndex !== -1) {
        // Decrease the quantity or remove the product from the basket
        if (state.products[existingProductIndex].quantity <= quantity) {
          // Remove the product if quantity becomes zero or negative
          state.products.splice(existingProductIndex, 1);
        } else {
          // Otherwise, decrease the quantity
          state.products[existingProductIndex].quantity -= quantity;
        }
        // Update total price and selected items count
        state.totalPrice -=
          state.products[existingProductIndex].price * quantity;
        state.selectedItemsCount -= quantity;
      }
    },
    // clearBasket (command) - basketCleared (event)
    basketCleared: (state) => {
      // Clear all items from the basket
      state.products = [];
      state.totalPrice = 0;
      state.selectedItemsCount = 0;
    },
    reduceProduct: (state, action) => {
      const { id } = action.payload;
      const existingProductIndex = state.products.findIndex((p) => p.id === id);
      if (existingProductIndex !== -1) {
        if (state.products[existingProductIndex].quantity === 0)
          state.products.splice(existingProductIndex, 1);
        else {
          state.products[existingProductIndex].quantity -= 1;
        }
        // Update total price and selected items count
        state.totalPrice -= state.products[existingProductIndex].price;
        state.selectedItemsCount -= 1;
      }
    },
  },
});

export const { itemAdded, itemRemoved, basketCleared, reduceProduct } =
  basketSlice.actions;
export default basketSlice.reducer;
