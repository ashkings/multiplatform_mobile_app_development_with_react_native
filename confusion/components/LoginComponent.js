import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import {AsyncStorage} from 'react-native';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('userinfo')
            .then((userdata) => {
                console.log(userdata+'hello')
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    static NavigationOption = {
        title: 'Login'
    }

    handleLogin(){
        console.log(JSON.stringify(this.state))
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            AsyncStorage.setItem('userinfo', JSON.stringify({username: this.state.username, 
                password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        else
            AsyncStorage.removeItem('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
    }

    render(){
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#512DA8"
                        />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default Login