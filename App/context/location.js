import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    latitude: null,
    longitude: null,
    street: null,
    district: null,
    city: null,
    region: null,
    country: null,
    formattedAddress: null,
  },
  reducers: {
    // setLocation (command) - locationSet (event)
    locationSet: (state, action) => {
      const { latitude, longitude, address } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
      state.street = address.street;
      state.city = address.city;
      state.region = address.region;
      state.district = address.district;
      state.country = address.country;
      state.formattedAddress = address.formattedAddress;
    },
  },
});

export const { locationSet } = locationSlice.actions;
export default locationSlice.reducer;
