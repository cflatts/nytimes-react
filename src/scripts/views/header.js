import React from 'react'

var Header = React.createClass({
    render: function() {
        return (
            <header className = 'header'>
                <a href = '#home'><h1>New York Times</h1></a>
                <input placeholder = 'Search articles' type = 'text' />
            </header>
        )
    }
})

export default Header