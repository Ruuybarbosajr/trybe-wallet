import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setValue from '../../helpers/setValue';
import logo from './logo.png';
import './index.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <section className="header__container">
        <div className="header__container--logo">
          <img
            src={ logo }
            alt="trybewallet-logo"
            className="container__logo"
          />
        </div>
        <div className="header__container--data">
          <div
            data-testid="email-field"
            className="container__data--email"
          >
            <h4>Email:</h4>
            <p>{ email || 'alguem@email.com' }</p>
          </div>
          <div className="container__data--total">
            <p data-testid="total-field">
              { setValue(expenses) }
            </p>
            <h4 data-testid="header-currency-field">BRL</h4>
          </div>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => (
  { email, expenses });

export default connect(mapStateToProps)(Header);
