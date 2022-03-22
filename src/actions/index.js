// Coloque aqui suas actions
import fetchCurrency from '../services/fetch';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const CURRENCY_LIST = 'CURRENCY_LIST';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const SET_EDITING = 'SET_EDITING';

export const savingEmail = (payload) => ({ type: SAVE_EMAIL, payload });

const savingExpense = (payload) => ({ type: SAVE_EXPENSE, payload });

const currencyList = (payload) => ({ type: CURRENCY_LIST, payload });

export const deletingExpense = (payload) => ({ type: DELETE_EXPENSE, payload });

export const editingExpense = (payload) => ({ type: EDITING_EXPENSE, payload });

export const setingEdit = () => ({ type: SET_EDITING });

export const actionFetchForCurrency = () => async (dispatch) => {
  dispatch(currencyList(await fetchCurrency()));
};

export const actionFetchForExpenses = (state, isBool) => async (dispatch) => {
  if (isBool) {
    const response = await fetchCurrency();
    state.exchangeRates = response;
    dispatch(savingExpense(state));
  } else dispatch(savingExpense(state));
};
