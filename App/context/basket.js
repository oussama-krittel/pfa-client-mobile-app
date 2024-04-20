import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    products: [],
    pointsProducts: [],
    discountProducts: [], // Add discounts array
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
      state.discountProducts = []; // Clear discounts array
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
      }
    },

    // Reducers for point products

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
      }
    },

    // Reducers for discount products

    discountItemAdded: (state, action) => {
      const { product, quantity, discountPercentage } = action.payload;
      const existingProductIndex = state.discountProducts.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex !== -1) {
        state.discountProducts[existingProductIndex].quantity += quantity;
      } else {
        state.discountProducts.push({
          ...product,
          quantity,
          discountPercentage,
        });
      }
      const discountedPrice = product.price * (1 - discountPercentage / 100);
      state.totalPrice += discountedPrice * quantity;
      state.selectedItemsCount += quantity;
    },
    discountItemRemoved: (state, action) => {
      const { id, quantity } = action.payload;
      const existingDiscountProductIndex = state.discountProducts.findIndex(
        (p) => p.id === id
      );
      if (existingDiscountProductIndex !== -1) {
        if (
          state.discountProducts[existingDiscountProductIndex].quantity <=
          quantity
        ) {
          state.discountProducts.splice(existingDiscountProductIndex, 1);
        } else {
          state.discountProducts[existingDiscountProductIndex].quantity -=
            quantity;
        }
        const discountedPrice =
          state.discountProducts[existingDiscountProductIndex].price *
          (1 -
            state.discountProducts[existingDiscountProductIndex]
              .discountPercentage /
              100);
        state.totalPrice -= discountedPrice * quantity;
        state.selectedItemsCount -= quantity;
      }
    },
    reduceDiscountProduct: (state, action) => {
      const { id } = action.payload;
      const existingDiscountProductIndex = state.discountProducts.findIndex(
        (p) => p.id === id
      );
      if (existingDiscountProductIndex !== -1) {
        if (
          state.discountProducts[existingDiscountProductIndex].quantity === 1
        ) {
          const discountedPrice =
            state.discountProducts[existingDiscountProductIndex].price *
            (1 -
              state.discountProducts[existingDiscountProductIndex]
                .discountPercentage /
                100);
          state.totalPrice -= discountedPrice;
          state.selectedItemsCount -= 1;
          state.discountProducts.splice(existingDiscountProductIndex, 1);
        } else {
          const discountedPrice =
            state.discountProducts[existingDiscountProductIndex].price *
            (1 -
              state.discountProducts[existingDiscountProductIndex]
                .discountPercentage /
                100);
          state.totalPrice -= discountedPrice;
          state.discountProducts[existingDiscountProductIndex].quantity -= 1;
          state.selectedItemsCount -= 1;
        }
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
  discountItemAdded, // Add discount reducers to exports
  discountItemRemoved,
  reduceDiscountProduct,
} = basketSlice.actions;
export default basketSlice.reducer;
