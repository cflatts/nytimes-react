import React from 'react'
import Header from './header'

var DetailView = React.createClass({

    getInitialState: function() {
        return {
            model: this.props.model
        }
    },

    componentWillMount: function() {

    },

    render: function() {
        return (
            <div className = 'detailView'>
                <Header/>
                <FullArticle model = {this.state.articleModel}/>
            </div>
        )
    }
})

var FullArticle = React.createClass({
    render: function() {
        console.log(this.props.model)
        return (
            <div className = 'fullArticle'>
                <p>{this.props.model.get('snippet')}</p>
            </div>
        )
    }
})

export default DetailView