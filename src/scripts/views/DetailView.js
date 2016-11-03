import React from 'react'
import Header from './header'

var DetailView = React.createClass({
    render: function() {
        return (
            <div className = 'detailView'>
                <Header/>
                <FullArticle />
            </div>
        )
    }
})

var FullArticle = React.createClass({
    render: function() {
        return (
            <div className = 'fullArticle'>
            </div>
        )
    }
})

export default DetailView