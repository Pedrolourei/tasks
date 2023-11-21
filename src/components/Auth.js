import { Auth, firebase } from "firebase";

class Auth extends Provider {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    Auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.user}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}