import axios from "axios";

const fetchRestaurantData = async () => {
  try {
    // Fetch restaurant data
    const response = await axios.get("http://localhost:8080/api/restaurants");
    const restaurants = response.data;

    // Function to fetch image data
    const fetchImage = async (imageId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/restaurants/files/${imageId}`,
          {
            responseType: "blob",
          }
        );
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
      } catch (error) {
        console.error(`Error fetching image with ID ${imageId}:`, error);
        return null; // Return null if fetching image fails
      }
    };

    // Transform data
    const transformedRestaurants = await Promise.all(
      restaurants.map(async (restaurant) => {
        const coverImageUrl = await fetchImage(restaurant.coverImageUrl);
        const logoUrl = await fetchImage(restaurant.logoUrl);

        return {
          id: restaurant.id,
          name: restaurant.name,
          location: restaurant.location,
          coverImage: { uri: coverImageUrl },
          logo: { uri: logoUrl },
          cuisine: restaurant.cuisine,
          rating: restaurant.rating,
          description: restaurant.description,
          instagram: restaurant.instagram,
          phoneNumber: restaurant.phoneNumber,
          email: restaurant.email,
          likes: restaurant.likes,
          priceRange: restaurant.priceRange,
          points: 0, // Assuming you want to calculate this or fetch from somewhere else
        };
      })
    );

    return transformedRestaurants;
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return [];
  }
};

export default fetchRestaurantData;
