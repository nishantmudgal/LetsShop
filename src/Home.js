import React, { Component } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import { db } from './config/Firebase';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartInfo : null,
            explorePage : true
        }
    }

    componentDidMount() {
    }

    getCartInfo = uid => {
        db.collection('users').doc(uid).get()
          .then( snapshot => {
              this.setState({
                  cartInfo : snapshot.data().cart
              });
          })
          .catch( error => console.log(error));
    }

    addItemToCart = id => {
        if(this.state.cartInfo.includes(id))
        {
            return;
        }

        var newCartInfo = this.state.cartInfo;
        newCartInfo.push(id);

        db.collection('users').doc(this.props.userID).update({ cart : newCartInfo})
        .then( snapshot => {
            this.setState({
                cartInfo : newCartInfo
            });
        })
        .catch( error => console.log(error));
    }

    removeItemFromCart = id => {

        var newCartInfo = this.state.cartInfo;
        const index = newCartInfo.indexOf(id);

        if (index > -1) {
           newCartInfo.splice(index, 1);
        }

        db.collection('users').doc(this.props.userID).update({ cart : newCartInfo})
        .then( snapshot => {
            this.setState({
                cartInfo : newCartInfo
            });
        })
        .catch( error => console.log(error));
    }

    shufflePage = () => {
        var currentState = this.state.explorePage;
        this.setState({
            explorePage : !currentState
        });
    }

    render() {
        
        if (this.props.userID && !this.state.cartInfo) {
            this.getCartInfo(this.props.userID);
        }


        return (
            <div>
                    <Header changePage = {this.shufflePage} currentPage = {this.state.explorePage}/>
                    <Dashboard userCart = {this.state.cartInfo} 
                               currentPage = {this.state.explorePage} 
                               addItem = {this.addItemToCart} 
                               removeItem = {this.removeItemFromCart}/>
            </div>
        );
    }
}

export default Home;