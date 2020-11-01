import React, { Component } from 'react';
import './Dashboard.css';
import items from './res/items.json';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemData : {}
        }
    }

    render() {
        var userCartData = this.props.userCart;
        if(!userCartData)
        {
            userCartData = []
        }
        const newData = items.map( (item) => {
            if(this.props.currentPage || userCartData.includes(item.id))
            {
                return (
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <p><img className=" img-fluid" src={item.url} alt="card image"/></p>
                                <h4 className="card-title">{item.title}</h4>
                                <p className="card-text">{item.price}</p>
                                {this.props.currentPage ? ( 
                                    userCartData.includes(item.id) ? (
                                        <a className="btn btn-success btn-sm"><i className="fa fa-check"></i></a>
                                    ) : (
                                        <a onClick = {() => this.props.addItem(item.id)} className="btn btn-primary btn-sm"><i className="fa fa-plus"></i></a>
                                    )
                                ) : (
                                    <a onClick = {() => this.props.removeItem(item.id)} className="btn btn-danger btn-sm"><i className="fa fa-minus"></i></a>
                                )}
                            </div>
                        </div>
                    </div>
                );
            }
        });
        
        return (
            <div>
                <section id="team" class="pb-5">
                    <div className="container">
                        <div className="row">
                            {newData}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Dashboard;