const GET_ALL_LOCATIONS = "GET_ALL_LOCATION";

const ADD_LOCATION_IMAGE = "ADD_LOCATION_IMAGE";

const GET_SINGLE_LOCATION = "GET_SINGLE_LOCATION";

const GET_FAVORITE_LOCATIONS = "GET_FAVORITE_LOCATIONS";

export const gotAllLocations = locations => ({
  type: GET_ALL_LOCATIONS,
  locations
});

export const getAllLocations = () => {
  return dispatch => {
    fetch("https://pheed-test.firebaseio.com/locations.json")
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        const locations = parsedRes;
        dispatch(gotAllLocations(locations));
        console.log("dispatch!", locations);
      });
  };
};

export const gotSingleLocation = location => ({
  type: GET_SINGLE_LOCATION,
  location
});

export const getSingleLocation = index => {
  return dispatch => {
    fetch(`https://pheed-test.firebaseio.com/locations/${index}.json`)
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        const singleLocation = parsedRes;
        dispatch(gotSingleLocation(singleLocation));
        console.log("Single", singleLocation);
      });
  };
};

// export const addedLocationImage = (locationName, image) => {
//   return dispatch => {
//     const placeData = {
//       name: locationName
//     };
//     fetch("https://pheed-test.firebaseio.com/images.json", {
//       method: "POST",
//       body: JSON.stringify(placeData)
//     })
//       .catch(err => console.log(err))
//       .then(res => res.json())
//       .then(parsedRes => {
//         console.log(parsedRes);
//       });
//   };
// };

// export const addedLocationImage = (locationId, image) => ({
//   type: ADD_LOCATION_IMAGE,
//   locationId,
//   image
// });

export const gotFavoriteLocations = locations => ({
  type: GET_FAVORITE_LOCATIONS,
  location
});

const initialState = {
  locations: [],
  singleLocation: {},
  favoriteLocations: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOCATIONS:
      // console.log("in reducer", action.locations);
      return { ...state, locations: action.locations };
    case GET_SINGLE_LOCATION:
      // console.log("in reducer", action.location);
      return { ...state, singleLocation: action.location };

    default:
      return state;
  }
};

export default reducer;
