import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, TextInput } from 'react-native';
import { Card, Icon, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite : (dishId) => (dispatch(postFavorite(dishId))),
    postComment : (dishId, rating, author, comment) => (dispatch(postComment(dishId, rating, author, comment)))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            />
                        <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512da7'
                        onPress={() => props.toggleModal()}
                        />
                        </View>
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10, flexDirection: 'column'}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating readonly style={{right: 130}} startingValue={item.rating} imageSize={15}/>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id}
                />
            </Card>
        </Animatable.View> 
    );
}

class DishDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            showModal: false,
            rating: 5,
            comment: '',
            author: ''
        }
    }
    //Title for the page in navigation bar
    
    static navigationOptions = {
        title: 'Dish Details'
    };

    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    Completed(rating){
        console.log("Rating" + rating)
        this.setState({
            rating: rating
        })
    }

    hanleSubmit(dishId){
        this.props.postComment(dishId, this.state.rating,this.state.author,this.state.comment)
        this.resetForm()
        this.toggleModal()
    }

    resetForm(){
        this.setState({
            rating: 5,
            author: '',
            comment: ''
        })
        this.toggleModal()
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        
        //[+dishId] here + is used to convert into integer

        return(
             <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    id={dishId}
                    onDismiss = {() => this.toggleModal }
                    onRequestClose = {() => this.toggleModal }>
                    <View style = {styles.modal}>
                        <Rating showRating startingValue={this.state.rating}
                         onFinishRating={(rating) => this.Completed(rating)}/>
                    </View>
                    <View style={styles.modal}>
                        <View style={{flexDirection: 'row', borderBottomWidth:1, alignItems:'center'}}>
                            <Icon name='user-o' type='font-awesome' style={{padding:10}} />
                            <TextInput style={styles.modalTextIput} 
                            placeholder='Author'
                            value={this.state.author}
                            onChangeText={(text) => this.setState({author: text}) }></TextInput>
                        </View>
                        <View style={{flexDirection: 'row', borderBottomWidth:1, alignItems:'center'}}>
                            <Icon name='comment-o' type='font-awesome' style={{padding:10}} />
                            <TextInput style={styles.modalTextIput} 
                            placeholder='Comment'
                            value={this.state.comment}
                            onChangeText={(text) => this.setState({comment: text}) }></TextInput>
                        </View>
                    </View>
                    <View style={styles.modal}>
                        <Button 
                            onPress = {() => this.hanleSubmit(+dishId)}
                            color="#512DA8"
                            title="Submit"/>
                        </View>
                        <View style={styles.modal}>
                        <Button 
                            onPress = {() =>this.resetForm()}
                            color="gray"
                            title="Cancel"/>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTextIput: {
        flex: 1,
        padding: 10,
        justifyContent:'center', 
        alignContent:'center',
        fontSize: 20
     },
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);