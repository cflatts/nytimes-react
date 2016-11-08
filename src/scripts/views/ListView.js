import React from 'react'
import Header from './header.js'

var ListView = React.createClass({

    getInitialState: function() {
        return {
            listColl: this.props.listColl,
            isLoaded: false
        }
    },

    componentWillMount: function() {
        this._listenToCollection(this.props.listColl)
    },

    componentWillReceiveProps: function(newProps) {
        this._listenToCollection(newProps.listColl)
    },

    _listenToCollection: function(coll) {
        var currentMeaningOfThis = this
        var updateState = function() {
            currentMeaningOfThis.setState({
                listColl: currentMeaningOfThis.props.listColl,
                isLoaded: true
            })
        }
        coll.on('sync', updateState)
    },

    _filterForNews: function() {
        // var decider = function(singleModel) {
        //     if(singleModel.get('type_of_material') === 'News') {
        //         return true
        //     }
        //     return false
        // }
        // var newsOnly = this.props.listColl.filter(decider)
        var newsOnly = this.props.listColl.filter(singleModel => singleModel.get('type_of_material') === 'News')
        this.setState({
            listColl: newsOnly
        })
    },

    _filterForAll: function() {
        this.setState({
            listColl: this.props.listColl
        })
    },

    render: function() {
        return(
            <div className = 'listView'>
                <Header />
                <div className = 'butts'>
                    <button onClick = {this._filterForNews}>News Only</button>
                    <button onClick = {this._filterForAll}>All</button>
                </div>
                <ArticleContainer
                    loaded = {this.state.isLoaded}
                    articleColl = {this.state.listColl}
                />
            </div>
        )
    }
})

var ArticleContainer = React.createClass({

    // _makeArticles: function() {
    //     var jsxArray = []
    //     var propsArr = this.props.articleColl.models

    //     propsArr.forEach(function(articleModel) {
    //         jsxArray.push(<Article articleModel = {articleModel} key = {articleModel.cid}/>)
    //     })
    //     return jsxArray
    // },

    _makeArticle: function(singleModel) {
        //takes in a single el of the arr and returns a transformed component
        return(<Article articleModel = {singleModel} key = {singleModel.cid} />)

    },

    render: function() {

        var loadedObj = {
            display: this.props.loaded ? 'block':'none'
        }

        return(
            <div className = 'articleContainer'>
                {this.props.articleColl.map(this._makeArticle)}
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