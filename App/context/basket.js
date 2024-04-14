import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    products: [],
    pointsProducts: [],
    totalPrice: 0,
    totalBonusPoints: 0,
    totalPoints: 0,
    selectedItemsCount: 0,
  },
  reducers: {
    itemAdded: (state, action) => {
      const { product, quantity } = action.payload;
      if (product.price) {
        const existingProductIndex = state.products.findIndex(
          (p) => p.id === product.id
        );
        if (existingProductIndex !== -1) {
          state.products[existingProductIndex].quantity += quantity;
        } else {
          state.products.push({ ...product, quantity });
        }
        state.totalPrice += product.price * quantity;
        state.totalBonusPoints += product.bonusPoints * quantity;
      }
      state.selectedItemsCount += quantity;
    },
    itemRemoved: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProductIndex = state.products.findIndex((p) => p.id === id);
      if (existingProductIndex !== -1) {
        if (state.products[existingProductIndex].quantity <= quantity) {
          state.products.splice(existingProductIndex, 1);
        } else {
          state.products[existingProductIndex].quantity -= quantity;
        }
        state.totalPrice -=
          state.products[existingProductIndex].price * quantity;
        state.selectedItemsCount -= quantity;
      }
    },
    basketCleared: (state) => {
      state.products = [];
      state.pointsProducts = [];
      state.totalPrice = 0;
      state.totalBonusPoints = 0;
      state.totalPoints = 0;
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
        state.totalPrice -= state.products[existingProductIndex].price;
        state.selectedItemsCount -= 1;
        state.totalBonusPoints -=
          state.products[existingProductIndex].bonusPoints;
        //   state.pointsProducts[existingPointProductIndex].bonusPoints
      }
    },

    //  reducers for point products

    pointItemAdded: (state, action) => {
      const { product, quantity, points } = action.payload;
      const existingProductIndex = state.pointsProducts.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex !== -1) {
        state.pointsProducts[existingProductIndex].quantity += quantity;
      } else {
        state.pointsProducts.push({ ...product, quantity, points });
      }
      // state.totalBonusPoints += product.bonusPoints * quantity;
      state.totalPoints += points * quantity;
      state.selectedItemsCount += quantity;
    },
    pointItemRemoved: (state, action) => {
      const { id, quantity } = action.payload;
      const existingPointProductIndex = state.pointsProducts.findIndex(
        (p) => p.id === id
      );
      if (existingPointProductIndex !== -1) {
        if (
          state.pointsProducts[existingPointProductIndex].quantity <= quantity
        ) {
          state.pointsProducts.splice(existingPointProductIndex, 1);
        } else {
          state.pointsProducts[existingPointProductIndex].quantity -= quantity;
        }
        state.totalBonusPoints -=
          state.pointsProducts[existingPointProductIndex].bonusPoints *
          quantity;
        state.totalPoints -=
          state.pointsProducts[existingPointProductIndex].points * quantity;
        state.selectedItemsCount -= quantity;
      }
    },
    reducePointProduct: (state, action) => {
      const { id } = action.payload;
      const existingPointProductIndex = state.pointsProducts.findIndex(
        (p) => p.id === id
      );
      if (existingPointProductIndex !== -1) {
        if (state.pointsProducts[existingPointProductIndex].quantity === 1) {
          state.totalPoints -=
            state.pointsProducts[existingPointProductIndex].points;
          state.selectedItemsCount -= 1;
          state.pointsProducts.splice(existingPointProductIndex, 1);
        } else {
          state.pointsProducts[existingPointProductIndex].quantity -= 1;
          state.totalPoints -=
            state.pointsProducts[existingPointProductIndex].points;
          state.selectedItemsCount -= 1;
        }
        // state.totalBonusPoints -=
        //   state.pointsProducts[existingPointProductIndex].bonusPoints;
      }
    },
  },
});

export const {
  itemAdded,
  itemRemoved,
  basketCleared,
  reduceProduct,
  pointItemAdded,
  pointItemRemoved,
  reducePointProduct,
} = basketSlice.actions;
export default basketSlice.reducer;
