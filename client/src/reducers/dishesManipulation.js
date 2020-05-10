import { filter } from 'react-icons-kit/feather';

const initialState = {
  dishes: {
    total: [],
    filtered: [],
  },
  restos: { total: [], filtered: [] },
  loaded: false,
  hover: { resto: '', item: '' },
  filters: {
    day: null,
    priceRange: {
      under10: false,
      between: false,
      over15: false,
    },
    portion: {
      appetizer: false,
      entree: false,
    },
    labels: {
      vegetarian: false,
      vegan: false,
      lowfat: false,
      meat: false,
    },
  },
};

const dishesManipulation = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DISHES': {
      return {
        ...state,
        dishes: { ...state.dishes, total: action.dishes },
      };
    }
    case 'SET_FILTERED_DISHES': {
      return { ...state, dishes: { ...state.dishes, filtered: action.dishes } };
    }
    case 'SET_RESTOS': {
      return {
        ...state,
        restos: { total: action.restos, filtered: action.restos },
      };
    }
    case 'RESET_RESTOS': {
      return {
        ...state,
        restos: { total: [], filtered: [] },
        dishes: { total: [], filtered: [] },
      };
    }
    case 'SET_INITIAL_LOAD': {
      return { ...state, loaded: true };
    }
    case 'SET_HOVER': {
      console.log(action);
      return { ...state, hover: { ...state.hover, resto: action.restoId } };
    }
    case 'SET_WEEKDAY': {
      return { ...state, filters: { ...state.filters, day: action.day } };
    }
    case 'SET_PRICE_RANGE': {
      return {
        ...state,
        filters: { ...state.filters, priceRange: action.ranges },
      };
    }
    case 'SET_PORTION': {
      return {
        ...state,
        filters: { ...state.filters, portion: action.portions },
      };
    }
    case 'SET_LABELS': {
      return {
        ...state,
        filters: { ...state.filters, labels: action.labels },
      };
    }
    default: {
      return state;
    }
  }
};

export default dishesManipulation;
