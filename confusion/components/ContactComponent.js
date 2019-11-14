import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import email from 'react-native-email'

class Contact extends Component{

    static navigationOptions = {
        title: 'Contact',
    }

    sendMail(){
        const to = ['ashu.singla@hashedin.com'] // string or array of email addresses
        email(to, {
            subject: 'Show how to use',
            body: 'Some body right here'
        }).catch(console.error)
    }

    render(){
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>  
                    <Card title='Contact Information'>
                        <View>
                            <Text>121, Clear Water Bay Road</Text>
                            <Text>Clear Water Bay, Kowloon</Text>
                            <Text>HONG KONG</Text>
                            <Text>Tel: +852 1234 5678</Text>
                            <Text>Fax: +852 8765 4321</Text>
                            <Text>Email:confusion@food.net</Text>
                        </View>
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: "#512DA8", margin:10}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                            onPress={this.sendMail}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact