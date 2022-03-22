import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchForExpenses } from '../../actions';
import './index.css';

class ExpenseForm extends Component {
  constructor({ expenseForEdit }) {
    super();
    this.state = expenseForEdit;
  }

  // fix Warning: Can't perform a React state update on an unmounted component
  // auxílio do summer Rod
  componentWillUnmount() {
    this.setState = () => { };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { savingExpense, isEditing, expenses } = this.props;
    if (isEditing) {
      const { expenseForEdit: { id } } = this.props;
      this.setState({ id }, () => savingExpense(this.state, false));
    } else this.setState({ id: expenses.length }, () => savingExpense(this.state, true));
    setTimeout(() => this.setState({ value: '', description: '' }), 1);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, typeButton, isEditing } = this.props;
    return (
      <section className="form__container">
        <form
          className="container__form"
          onSubmit={ this.handleSubmit }
        >
          <label htmlFor="value-input">
            Valor
            <input
              className="container__form--value"
              data-testid="value-input"
              type="number"
              name="value"
              id="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição
            <input
              className="container__form--description"
              data-testid="description-input"
              type="text"
              name="description"
              id="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              value={ currency }
              className="container__form--currency"
              data-testid="currency-input"
              name="currency"
              id="currency-input"
              onChange={ this.handleChange }
            >
              {
                currencies.map((itsCurrency) => (
                  <option
                    data-testid={ itsCurrency }
                    key={ itsCurrency }
                    value={ itsCurrency }
                  >
                    { itsCurrency }
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <br />
            <select
              value={ method }
              className="container__form--method"
              data-testid="method-input"
              name="method"
              id="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag
            <br />
            <select
              value={ tag }
              className="container__form--tag"
              data-testid="tag-input"
              name="tag"
              id="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            className={ `container__form--button 
            ${isEditing ? 'form__button--edit' : 'form__button--add'}` }
            type="submit"
          >
            { typeButton }
          </button>
        </form>
      </section>);
  }
}

ExpenseForm.defaultProps = {
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

ExpenseForm.propTypes = {
  savingExpense: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired),
  sentEdit: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  savingExpense: (state, isBool) => dispatch(actionFetchForExpenses(state, isBool)),
});

const mapStateToProps = (
  { wallet: { currencies, isEditing, expenses, expenseForEdit } },
) => (
  { currencies, isEditing, expenses, expenseForEdit });

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
