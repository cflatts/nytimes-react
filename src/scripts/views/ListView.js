import React from 'react'
import Header from './header'

var ListView = React.createClass({
    render: function() {
        return(
            <div className = 'listView'>
                <Header />
                <ArticleContainer />
            </div>
        )
    }
})

var ArticleContainer = React.createClass({
    render: function() {
        return(
            <div className = 'articleContainer'>

            </div>
        )
    }
})

export default ListView