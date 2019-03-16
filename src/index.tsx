import * as React from 'react';

interface IProps {
  renderTitle?: (title: any) => void;
  labels?: string[];
  action?: string;
  actionRegister?: string;
  onSubmit?: (formData: any) => void;
}

// tslint:disable-next-line
const Mode = {
  LOGIN: 'Login',
  REGISTER: 'Sign Up'
};

export default class extends React.Component<IProps> {
  state = {
    mode: Mode.LOGIN, // this.props.mode || Mode.LOGIN,
    username: '',
    password: '',
    name: '',
    error: ''
  };
  form: any = null;
  usernameLabel = this.props.labels ? this.props.labels[0] : 'Username';
  passwordLabel = this.props.labels ? this.props.labels[1] : 'Password';

  componentWillMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps: any) {
    this.init(nextProps);
  }

  init = (props: any) => {
    // switch to Register mode if URL includes '/register'
    if (window.location.href.includes('/register')) {
      this.setState({ mode: Mode.REGISTER });
    }
    if (props) {
    }
  };

  submitForm = (formData: any) => {
    const { action, onSubmit } = this.props;
    if (action) {
      // call onSubmit (optional) & check its return value:
      if (onSubmit) {
        const result: any = onSubmit(formData);
        if (result) {
          // only submit if returned true
          this.form.submit(); // html-form.submit()
        }
      } else {
        this.form.submit(); // html-form.submit()
      }
    } else {
      // form without action => just call onSubmit (it should have fetch POST function)
      onSubmit(formData);
    }
  };

  validateLogin = () => {
    const { username, password } = this.state;
    return username && password;
  };

  validateRegister = () => {
    const { username, password, name } = this.state;
    return username && password && name;
  };

  onLoginClick = () => {
    const { mode, username, password, name } = this.state;
    let error = '';
    if (mode === Mode.LOGIN && !this.validateLogin()) {
      error = `Please enter ${this.usernameLabel} and ${this.passwordLabel}.`;
      this.setState({ error });
    } else if (mode === Mode.REGISTER && !this.validateRegister()) {
      error = `Please enter ${this.usernameLabel}, ${this.passwordLabel} and Name.`;
      this.setState({ error });
    } else {
      this.setState({ error: '' }, () => {
        // clear error (preact setState callback doesn't work => use setTimeout)
        setTimeout(() => {
          // clear error & call props.onSubmit
          this.submitForm({ username, password, name });
        }, 0);
      });
    }
  };

  onRegisterClick = () => {
    this.setState({ mode: Mode.REGISTER });
  };

  onInputChange = (ev: any, field: string) => this.setState({ [field]: ev.target.value });

  onKeyUpPassword = (ev: any) => {
    if (ev.keyCode === 13) {
      this.onLoginClick();
    }
  }

  switchMode = (mode: string) => {
    this.setState({ mode, error: '' });
  };

  render() {
    const { action, actionRegister, renderTitle } = this.props;
    const { mode, username, password, name, error } = this.state;

    let formAction = mode === Mode.LOGIN && action ? action : '';
    formAction = mode === Mode.REGISTER && actionRegister ? actionRegister : formAction;
    // const buttonType = action ? 'submit' : 'button';

    let actionProp = {};
    if (formAction) {
      actionProp = { action: formAction, method: 'post' };
    }

    return (
      <form ref={ref => (this.form = ref)} {...actionProp} className="pxlogin-main">
        {renderTitle && renderTitle(mode)}

        {this.props.children}

        <label>{this.usernameLabel}</label>
        <input id="email" name="email" value={username} onChange={ev => this.onInputChange(ev, 'username')} />

        <label>{this.passwordLabel}</label>
        <input
          id="password"
          name="password"
          value={password}
          onChange={ev => this.onInputChange(ev, 'password')}
          onKeyUp={this.onKeyUpPassword}
          type="password"
        />

        {mode === Mode.REGISTER && <label>Full Name</label>}
        {mode === Mode.REGISTER && (
          <input id="name" name="name" value={name} onChange={ev => this.onInputChange(ev, 'name')} />
        )}

        {mode === Mode.LOGIN && (
          <footer>
            <button type="button" onClick={this.onLoginClick}>
              {mode}
            </button>
            <a onClick={() => this.switchMode(Mode.REGISTER)}>Sign Up?</a>
          </footer>
        )}
        {mode === Mode.REGISTER && (
          <footer>
            <button type="button" onClick={this.onLoginClick}>
              {mode}
            </button>
            <a onClick={() => this.switchMode(Mode.LOGIN)}>Back to Login</a>
          </footer>
        )}

        {error ? <div data-error={true}>{error}</div> : ''}
      </form>
    );
  }
}