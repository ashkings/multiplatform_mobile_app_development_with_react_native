import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function RenderHistory(){
    return(
        <Card title='Our History'>
                    <View>
                        <Paragraph style={{fontWeight:'bold'}}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon
                        par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found
                        nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of
                        the best three-star Michelin chefs in the world, you never know what will arrive on your plate
                        the next time you visit us.
                        </Paragraph>
                        <Paragraph style={{fontWeight:'bold'}}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain
                        started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines 
                        in a pan.
                        </Paragraph>
                    </View>
        </Card>
    )
}
class About extends Component{

    static navigationOptions = {
        title: 'About',
    }
    render(){
        if(this.props.leaders.isLoading){
            return(
                <ScrollView>
                    <RenderHistory />
                    <Card title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>    
            )
        }
        else if(this.props.leaders.errMess){
            return(
                <ScrollView>
                    <RenderHistory />
                    <Card title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>    
            )
        }
        else{
            return(
                <ScrollView>
                    <RenderHistory />
                    <Card title='Corporate Leadership'>
                        <FlatList data={this.props.leaders.leaders}
                        keyExtractor={item=>item.id}
                        renderItem={({item}) => (
                            <ListItem containerStyle={{borderBottomWidth: 0}}
                            hideChevron={true}
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{source:{uri: baseUrl+item.image }}}/>
                        )}/>
                    </Card>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 50/2, 
        height: 50, 
        width: 50,
        borderColor:'rgba(0,0,0,0.1)',
        borderWidth:2,
        margin:10
    }
})

export default connect(mapStateToProps)(About);