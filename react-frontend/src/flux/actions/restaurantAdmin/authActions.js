import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_RESTAURANT_SUCCESS,
  REGISTER_RESTAURANT_FAIL,
  REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_SUCCESS,
  REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_FAIL
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('http://localhost:4000/userprofile/restaurantadmin/restaurantadmin', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ name, username, email, phonenumber, password, restownername, restname, restlocation, restlogo }) => async (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
  const body = JSON.stringify({ name, username, email, phonenumber, password });
  let restAdminId = '';
  await axios
    .post('http://localhost:4000/userprofile/restaurantadmin/registerrestaurantadmin', body, config)
    .then(res => {
      console.log(res)
      restAdminId = res.data.user.id

    })
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
  const body1 = JSON.stringify({ ownername: restownername, name: restname, location: restlocation, logo: restlogo});
  let restId = '';
  await axios
    .post('http://localhost:4000/superadmin/restaurant/addrestaurant', body1, config)
    .then(res => {
      restId = res.data._id;
      console.log(res)
    })
    .then(res =>
      dispatch({
        type: REGISTER_RESTAURANT_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err, 'REGISTER_RESTAURANT_FAIL')
      );
      dispatch({
        type: REGISTER_RESTAURANT_FAIL
      });
    });
  // const body = JSON.stringify({ restId, restAdminId });
  await axios
    .put('http://localhost:4000/superadmin/restaurant/restaurant/' + restId + '/restaurantadmin/' + restAdminId, config)
    .then(res =>
      dispatch({
        type: REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_FAIL')
      );
      dispatch({
        type: REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_FAIL
      });
    });
};

// const register_restaurant = ({ restname, restlocation }) => async (
//   dispatch
// ) => {
//   // Headers
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   // Request body
//   const body = JSON.stringify({ restname, restlocation });
//   var restId = '';
//   await axios
//     .post('http://localhost:4000/superadmin/restaurant/addrestaurant', body, config)
//     .then(res =>
//       dispatch({
//         type: REGISTER_RESTAURANT_SUCCESS,
//         payload: res.data,
//         restId: res.data._id
//       })
//     )
//     .catch(err => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, 'REGISTER_RESTAURANT_FAIL')
//       );
//       dispatch({
//         type: REGISTER_RESTAURANT_FAIL
//       });
//     });
//     return restId;
// };

// const assign_admin =  ({ restId, restAdminId}) => (
//   dispatch
// ) => {
//   // Headers
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   // Request body
//   const body = JSON.stringify({ restId, restAdminId });
//    axios
//     .get('http://localhost:4000/superadmin/restaurant/restaurant/'+restId+'/restaurantadmin/'+restAdminId , config)
//     .then(res =>
//       dispatch({
//         type: REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_SUCCESS,
//         payload: res.data,
//       })
//     )
//     .catch(err => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, 'REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_FAIL')
//       );
//       dispatch({
//         type: REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_FAIL
//       });
//     });
// };

// Login User
export const login = ({ email, password }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('http://localhost:4000/userprofile/restaurantadmin/loginrestaurantadmin', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
