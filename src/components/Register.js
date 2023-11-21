import { Auth, firebase } from 'firebase';
class Register extends View {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={text => this.setState({email: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={this.state.password}
          onChangeText={text => this.setState({password: text})}
        />
        <Button onPress={() => this.register()} title="Cadastrar" />
      </View>
    );
  }

  register() {
    Auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        
      })
      .catch(error => {
     
      });
  }
}
