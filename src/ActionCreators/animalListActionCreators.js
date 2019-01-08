import axios from "axios";
import { push } from "connected-react-router";
import { API_DOMAIN } from "../Constants";

export const GET_ANIMALS_LIST = "get_animals_list";
export const UPDATE_ANIMAL_PHOTOS = "update_animal_photos";
// export const UPDATE_ANIMAL = "update_animal";

// update animal actions
export const UPDATE_ANIMAL = "UPDATE_ANIMAL";
export const UPDATE_ANIMAL_SUCCESS = "UPDATE_ANIMAL_SUCCESS";
export const UPDATE_ANIMAL_FAILURE = "UPDATE_USER_FAILURE";

// ADD animal actions
export const ADD_ANIMAL = "UPDATE_ANIMAL";
export const ADD_ANIMAL_SUCCESS = "UPDATE_ANIMAL_SUCCESS";
export const ADD_ANIMAL_FAILURE = "UPDATE_USER_FAILURE";


export const getAnimals = filter => (dispatch, getState) => {
  const token = getState().auth.user.token;
  const filterString = JSON.stringify(filter);
  return axios
    .get(API_DOMAIN + "/api/animals", {
      headers: {
        Authorization: "Bearer " + token
      },
      params: {
        filter: filterString
      }
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: GET_ANIMALS_LIST,
          payload: res.data.data
        });
      } else {
        console.log(res);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateAnimalPhotos = (animalId, photos) => (
  dispatch,
  getState
) => {
  axios
    .patch(
      `${API_DOMAIN}/api/animals/${animalId}`,
      { photos },
      { headers: { Authorization: `Bearer ${getState().auth.user.token}` } }
    )
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: UPDATE_ANIMAL,
          payload: {
            id: animalId,
            data: res.data.data
          }
        });
      }
    })
    .catch(err => console.err(err));
};

export const uploadAnimalPhotos = (animalId, photos) => (
  dispatch,
  getState
) => {
  const formData = new FormData();
  for (let photo of photos) {
    formData.append("images", photo);
  }

  axios
    .patch(`${API_DOMAIN}/api/animals/${animalId}/photos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getState().auth.user.token
      }
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: UPDATE_ANIMAL,
          payload: {
            id: animalId,
            data: res.data.data
          }
        });
      }
    })
    .catch(err => console.error(err));
};

export const updateAnimal = updateAnimalData => (dispatch, getState) => {
  const token = getState().auth.user.token;
    dispatch({
      type: UPDATE_ANIMAL
    });
  
    return fetch(`${API_DOMAIN}/api/animals/${updateAnimalData.id}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateAnimalData)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw err;
          });
        }
        return res.json();
      })
      .then(data => {
        // dispatch here on success -- data is everything server sent back in its response
        dispatch({
          type: UPDATE_ANIMAL_SUCCESS,
          animalData: data
          // 'animalData' is the name we're going to call it in the redux state?
        });
        dispatch(push(`/animal/${updateAnimalData.id}`));
      })
      .catch(err => {
        // dispatch here on fail --
        dispatch({
          type: UPDATE_ANIMAL_FAILURE,
          updateResult: "sorry, no can do."
        });
      });
  };

  // add animal action creator
export const addAnimal = addAnimalData => (dispatch, getState) => {
//   const token = getState().auth.user.token;
//     dispatch({
//       type: ADD_ANIMAL
//     });
  
  //   return fetch(`${API_DOMAIN}/api/animals/${updateAnimalData.id}`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + token,
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(addAnimalData)
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         return res.json().then(err => {
  //           throw err;
  //         });
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       dispatch({
  //         type: ADD_ANIMAL_SUCCESS,
  //         animalData: data
  //       });
  //       dispatch(push(`/animal/${addAnimalData.id}`));
  //     })
  //     .catch(err => {
  //       dispatch({
  //         type: ADD_ANIMAL_FAILURE,
  //         updateResult: "FAILED TO ADD A NEW ANIMAL.  IN YOUR FACE."
  //       });
  //     });
  };
