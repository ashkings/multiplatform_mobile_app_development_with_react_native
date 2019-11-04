import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

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
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                    </Animatable.View>
                </ScrollView>    
            )
        }
        else{
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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
                    </Animatable.View>
                </ScrollView>
            );
        }
    }
}


export default connect(mapStateToProps)(About);