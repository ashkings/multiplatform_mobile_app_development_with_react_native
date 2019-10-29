import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, PickerItem } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

class Reservation extends Component{
    constructor(props){
        super(props)
        this.state={
            guests: 1,
            smoking: false,
            date: ''
        }
    }
    static navigationOptions = {
        title : 'Reservation Table'
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.formRow} />
                <Text style={styles.formLabel}>Number of guests</Text>
                <Picker 
                selectedValue={this.state.guests}
                onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item value='1' label = '1'/>
                    <Picker.Item value='2' label = '2'/>
                    <Picker.Item value='3' label = '3'/>
                    <Picker.Item value='4' label = '4'/>
                    <Picker.Item value='5' label = '5'/>
                    <Picker.Item value='6' label = '6'/>
                </Picker>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                value={this.state.smoking} 
                onValueChange={(value) => this.setState({smoking: value}) }/>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                style={{width: 200}}
                date={this.state.date}
                placeholder='Select Date'
                mode='date'
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  onDateChange = { (date) => this.setState({ date: date})}/>
                  <Button></Button>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation