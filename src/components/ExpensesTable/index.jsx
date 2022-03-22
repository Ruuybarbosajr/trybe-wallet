import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';
import { GoPencil } from 'react-icons/go';
import { deletingExpense, setingEdit, editingExpense } from '../../actions';
import './index.css';

class ExpensesTable extends Component {
  render() {
    const { expenses, deleteExpense, sentEdit, sendToEdit } = this.props;
    return (
      <section className="table__container">
        <table className="container__table">
          <thead className="container__table--head">
            <tr className="table__head--row">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="container__table--body">
            {expenses.length > 0 && expenses.map((expense, index) => (
              <tr
                key={ expense.id }
                className={ `table__body--row ${index % 2 !== 0
                  ? 'row-black' : 'row-white'}` }
              >
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>
                  {expense.exchangeRates[expense.currency].name.split('/')[0]}
                </td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(expense.exchangeRates[expense.currency]
                    .ask) * Number(expense.value)).toFixed(2)}

                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    className="body__button--edit"
                    onClick={ () => {
                      sentEdit();
                      sendToEdit(expense);
                    } }
                  >
                    <GoPencil />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="body__button--delete"
                    onClick={ () => deleteExpense(expense) }
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>);
  }
}

ExpensesTable.defaultProps = {
  expenses: [],
};

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
  deleteExpense: PropTypes.func.isRequired,
  sentEdit: PropTypes.func.isRequired,
  sendToEdit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

const mapDispatchToProps = (dispatch) => (
  { deleteExpense: (expense) => dispatch(deletingExpense(expense)),
    sentEdit: () => dispatch(setingEdit()),
    sendToEdit: (expense) => dispatch(editingExpense(expense)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
