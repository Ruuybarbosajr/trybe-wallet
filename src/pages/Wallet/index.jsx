import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import ExpenseForm from '../../components/ExpenseForm';
import { actionFetchForCurrency } from '../../actions';
import ExpensesTable from '../../components/ExpensesTable';
import './index.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencys } = this.props;
    getCurrencys();
  }

  render() {
    const { isEditing } = this.props;
    return (
      <div>
        <Header />
        <div className="wallet__container">
          {isEditing && <ExpenseForm typeButton="Editar despesa" />}
          {!isEditing && <ExpenseForm typeButton="Adicionar despesa" />}
          <ExpensesTable />
        </div>
      </div>);
  }
}
Wallet.defaultProps = {
  isEditing: false,
};

Wallet.propTypes = {
  getCurrencys: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => (
  {
    getCurrencys: () => dispatch(actionFetchForCurrency()),
  });

const mapStateToProps = ({ wallet: { isEditing } }) => (
  { isEditing });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
