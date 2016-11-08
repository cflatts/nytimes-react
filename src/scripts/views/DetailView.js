import React from 'react'
import Header from './header'

var DetailView = React.createClass({

    getInitialState: function() {
        return {
            articleModel: this.props.articleModel
        }
    },

    componentWillMount: function() {

        var currentMeaningOfThis = this

        var updateState = function() {
            currentMeaningOfThis.setState({
                articleModel: currentMeaningOfThis.props.articleModel
            })
        }
        this.props.articleModel.on('sync', updateState)
    },

    render: function() {
        console.log(this.props.articleModel)
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

        return (
            <div className = 'fullArticle'>{this.props.model.get('snippet')}</div>
        )
    }
})

export default DetailView