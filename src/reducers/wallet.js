// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_EXPENSE,
  CURRENCY_LIST, DELETE_EXPENSE, SET_EDITING, EDITING_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
  expenseForEdit: {
    id: '',
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  },
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses
        .filter(({ id }) => id !== payload.id), payload].sort((a, b) => a.id - b.id),
      isEditing: false,
      expenseForEdit: {
        id: '',
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
    };
  case CURRENCY_LIST:
    return {
      ...state,
      currencies: Object.keys(payload).filter((currency) => currency !== 'USDT'),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== payload.id)],
    };
  case SET_EDITING:
    return {
      ...state,
      isEditing: true,
    };
  case EDITING_EXPENSE:
    return {
      ...state,
      expenseForEdit: payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
