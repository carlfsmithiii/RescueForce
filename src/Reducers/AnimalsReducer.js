import {
  GET_ANIMALS_LIST,
  UPDATE_ANIMAL,
  UPDATE_ANIMAL_FAILURE,
  UPDATE_ANIMAL_SUCCESS,
  UPDATE_ANIMAL_PHOTOS,
  ADD_ANIMAL,
  ADD_ANIMAL_FAILURE,
  ADD_ANIMAL_SUCCESS
} from "../ActionCreators";
const initState = [];

export const AnimalsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ANIMALS_LIST:
      return action.payload;

    //     case UPDATE_ANIMAL:
    //       return [...state];

    case UPDATE_ANIMAL_SUCCESS:
      // const index = state.findIndex(animal => {
      //   return animal._id === action.animalData.id;
      //   // lines above look for a single animal and returns an animal when that animal's id matches the animalData.id that was updated. you've already updated that animal's info successfully; reconciling our data.
      // });
      // const newAnimals = state.slice().splice(index, 1, action.animalData);
      return [...state, action.animalData]

    case UPDATE_ANIMAL_FAILURE:
      return [...state];
    // use objects for error messages because it's easier to add in properties.

    // case ADD_ANIMAL:
    //   return [...state];

    // case ADD_ANIMAL_SUCCESS:
    //   const index = state.findIndex((animal) =>{
    //       return animal.id === action.animalData.id
    //   })
    //   const newAnimals = state.slice().splice(index, 1, action.animalData)
    //   return newAnimals;

    // case ADD_ANIMAL_FAILURE:
    //   return [...state];

    case UPDATE_ANIMAL_PHOTOS:
      const { id, data } = action.payload;
      return state.map(animal => (animal._id === id ? data : animal));

    default:
      return state;
  }
};
