import React from 'react';
import { Component } from 'react';

class Title extends Component {
    state = {}
    render() {
        return (
            <h1> {this.props.titulo} </h1>
        );
    }
}

export default Title;