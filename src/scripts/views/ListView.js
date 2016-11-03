import React from 'react'
import Header from './header.js'

var ListView = React.createClass({

    getInitialState: function() {
        return {
            listColl: this.props.listColl
        }
    },

    render: function() {
        return(
            <div className = 'listView'>
                <Header />
                <ArticleContainer articleColl = {this.props.listColl}/>
            </div>
        )
    }
})

var ArticleContainer = React.createClass({

    _makeArticles: function() {
        var jsxArray = []
        var propsArr = this.props.articleColl.models

        propsArr.forEach(function(articleModel) {
            jsxArray.push(<Article articleModel = {articleModel} key = {articleModel.cid}/>)
        })
        return jsxArray
    },

    render: function() {
        // console.log('article container component', this.props.articleColl)
        return(
            <div className = 'articleContainer'>
                {this._makeArticles()}
            </div>
        )
    }
})

var Article = React.createClass({

    getInitialState: function() {
        return {
            snippetHeight: 0,
            buttSymbol: '+'
        }
    },

    _toggleSnippet: function() {
        this.setState({
            snippetHeight: this.state.buttSymbol === '+' ? 'auto': 0,
            buttSymbol: this.state.buttSymbol === '+' ? '-' : '+'
        })
    },

    _formatDate: function() {
        var articleModel = this.props.articleModel
        var date = new Date(articleModel.get('pub_date'))
        var formattedDate = date.toLocaleString()
        return formattedDate
    },

    render: function() {
        var articleModel = this.props.articleModel
        console.log(articleModel)
        var snippetStyle = {
            height: this.state.snippetHeight
        }

        return(
            <div className = 'article'>
                <a href = {'#detail/' + articleModel.get('_id')}><h3 className = 'title'>{articleModel.get('headline').main}</h3></a>
                <button onClick = {this._toggleSnippet}>{this.state.buttSymbol}</button>
                <p className = 'description' style = {snippetStyle}>{articleModel.get('snippet')}</p>
                <p className = 'publishedOn' style = {snippetStyle}>Published on: {this._formatDate()}</p>
            </div>
        )
    }
})

export default ListView