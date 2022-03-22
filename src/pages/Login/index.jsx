import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { savingEmail } from '../../actions';
import './index.css';

const MIN_LENGTH_PASSWORD = 6;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      isLogged: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.checkButton);
  }

  checkButton = () => {
    const { email, password } = this.state;
    const validEmail = email.includes('@') && email.endsWith('.com');
    const validPassword = password.length >= MIN_LENGTH_PASSWORD;
    if (validEmail && validPassword) this.setState({ isDisabled: false });
    else this.setState({ isDisabled: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({ isLogged: true });
  }

  render() {
    const { email, isDisabled, password, isLogged } = this.state;
    if (isLogged) return <Redirect to="/carteira" />;
    return (
      <div className="login__container">
        <form
          className="login__container--form"
          onSubmit={ this.handleSubmit }
        >
          <label htmlFor="email-input">
            <input
              className="form__input--email"
              placeholder="Email"
              data-testid="email-input"
              type="email"
              name="email"
              id="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            <input
              className="form__input--password"
              placeholder="Password"
              data-testid="password-input"
              type="password"
              name="password"
              id="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="form__button"
            type="submit"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  { saveEmail: (email) => dispatch(savingEmail(email)) });

export default connect(null, mapDispatchToProps)(Login);
