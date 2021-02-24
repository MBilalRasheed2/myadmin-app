import {
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_FAILURE,
  ADD_CATEGORIES_FAILURE,
  ADD_CATEGORIES_SUCCESS,
  ADD_CATEGORIES_REQUEST,
  UPDATE_CATEGORIES_FAILURE,
  UPDATE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_FAILURE,
  DELETE_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_REQUEST
} from "../actions/categoryAction";

const initialState = {
  categories: [],
  error: "",
  loading: false,
};
const updateCategoryList = (id, categories, category) => {
  if (id === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type:category.type,
        children: [],
      },
    ];
  }

  let myCategory = [];
  for (let cat of categories) {
    if (cat._id === id) {
      myCategory.push({
        ...cat,
        children: cat.children
          ? updateCategoryList(
              id,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  type:category.type,
                  parentId: category.parentId,
                  children: category.children,
                },
              ],
              category
            )
          : [],
      });
    } else {
      myCategory.push({
        ...cat,
        children: cat.children
          ? updateCategoryList(id, cat.children, category)
          : [],
      });
    }
  }
  return myCategory;
};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      {
        state = {
          ...state,
          loading: true,
        };
      }
      break;
    case GET_ALL_CATEGORIES_SUCCESS:
      {
        state = {
          ...state,
          categories: action.payload.categories,
          loading: false,
        };
      }
      break;
    case GET_ALL_CATEGORIES_FAILURE:
      {
        state = {
          ...state,
          error: action.payload.error,
          loading: false,
        };
      }
      break;
    case ADD_CATEGORIES_REQUEST:
      {
        state = {
          ...state,
          loading: true,
        };
      }
      break;
    case ADD_CATEGORIES_SUCCESS:
      {
        const category = action.payload.category;
        const update = updateCategoryList(
          category.parentId,
          state.categories,
          category
        );

        state = {
          ...state,
          categories: update,
          loading: false,
        };
      }
      break;
    case ADD_CATEGORIES_FAILURE:
      {
        state = {
          ...initialState,
        };
      }
      break;

    case UPDATE_CATEGORIES_REQUEST:
      {
        state = {
          ...state,
          loading: true,
        };
      }
      break;
    case UPDATE_CATEGORIES_SUCCESS:
      {
        state = {
          ...state,
          loading: false,
        };
      }
      break;
    case UPDATE_CATEGORIES_FAILURE:
      {
        state = {
          ...state,
          error: action.payload.error,
          loading: false,
        };
      }
      break;
      case DELETE_CATEGORIES_REQUEST:
      {
        state = {
          ...state,
          loading: true,
        };
      }
      break;
      case DELETE_CATEGORIES_SUCCESS:
      {
        state = {
          ...state,
          loading: false,
        };
      }
      break;
      case DELETE_CATEGORIES_FAILURE:
      {
        state = {
          ...state,
          loading: false,
          error:action.payload.error
        };
      }
      break;
  }

  return state;
};

export default categoryReducer;
