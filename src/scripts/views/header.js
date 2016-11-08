import React from 'react'

var Header = React.createClass({

    _search: function(evt) {
        if(evt.keyCode === 13) {
            location.hash = `search/${evt.target.value}`
        }
    },

    render: function() {
        return (
            <header className = 'header'>
                <a href = '#home'><h1>New York Times</h1></a>
                <input placeholder = 'Search articles' type = 'text' onKeyDown = {this._search}/>
            </header>
        )
    }
})

export default Header