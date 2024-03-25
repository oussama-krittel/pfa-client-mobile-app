import * as Location from "expo-location";
import store from "../context/store";
import { locationSet } from "../context/location";

store.subscribe(() => {
  console.log("store changed");
});

export const getPermissions = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Please grant permissions");
  } else {
    fetchLocation();
  }
};

const fetchLocation = async () => {
  try {
    let currentLocation = await Location.getCurrentPositionAsync({});

    try {
      let currentAddress = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (currentAddress && currentAddress.length > 0) {
        store.dispatch(
          locationSet({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            address: {
              street: currentAddress[0].street,
              district: currentAddress[0].district,
              city: currentAddress[0].city,
              region: currentAddress[0].region,
              country: currentAddress[0].country,
              formattedAddress: currentAddress[0].formattedAddress,
            },
          })
        );
      } else {
        console.log("No address found");
      }
    } catch (error) {
      console.error("Error dispatching locationSet action:", error);
    }

    console.log(currentLocation);
  } catch (error) {
    console.error("Error fetching location and address:", error);
  }
};

const formatAddress = (address) => {
  console.log(address);
  return `${address.street},${address.district}, ${address.city}, ${address.region}, ${address.country}`;
};
