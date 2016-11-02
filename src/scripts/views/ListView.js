import React from 'react'
import Header from './header'

var ListView = React.createClass({
    render: function() {
        // console.log('list view component', this.props.listColl.models)
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
    render: function() {
        var articleModel = this.props.articleModel
        return(
            <div className = 'article'>
                <h3 className = 'title'>{articleModel.get('headline').main}</h3>
                <p className = 'description'>{articleModel.get('snippet')}</p>
            </div>
        )
    }
})

export default ListView