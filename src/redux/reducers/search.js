const initialState = {
  userCoordinates: "",
  words: "",
  searchItems: [],
  category: "",
  category_id: "",
  min_price: "",
  max_price: "",
  free: false,
  status: false,
  delivery: false,
  insurance: false,
  contract: false,
  pledge: false,
  distance: false,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_WORDS":
      return {
        ...state,
        words: action.payload,
      };

    case "SET_SEARCH_ITEMS":
      return {
        ...state,
        searchItems: action.payload,
      };

    case "SET_SEARCH_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "SET_MIN_PRICE":
      return {
        ...state,
        min_price: action.payload,
      };

    case "SET_MAX_PRICE":
      return {
        ...state,
        max_price: action.payload,
      };

    case "SET_USER_COORDS":
      return {
        ...state,
        userCoordinates: action.payload,
      };

    case "SET_FREE":
      return {
        ...state,
        free: action.payload,
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };

    case "SET_DELIVERY":
      return {
        ...state,
        delivery: action.payload,
      };

    case "SET_INSURANCE":
      return {
        ...state,
        insurance: action.payload,
      };

    case "SET_CONTRACT":
      return {
        ...state,
        contract: action.payload,
      };

    case "SET_PLEDGE":
      return {
        ...state,
        pledge: action.payload,
      };

    case "SET_DISTANCE":
      return {
        ...state,
        distance: action.payload,
      };

    case "SET_CATEGORY_ID":
      return {
        ...state,
        category_id: action.payload,
      };

    default:
    //nothing
  }
  return state;
};
export default search;
