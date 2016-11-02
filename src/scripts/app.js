import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ListView from './views/ListView'

const app = function() {

    var ArticleModel = Backbone.Model.extend({
        url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        '_key': 'a30a58a6e722476eb77532b42ca43c9b'
    })

    var ArticleCollection = Backbone.Collection.extend({
        url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        '_key': 'a30a58a6e722476eb77532b42ca43c9b',

        parse: function(rawResponse) {
            var parsedResponse = rawResponse.response.docs
            // console.log(parsedResponse)
            return parsedResponse
        }

    })

	var Controller = Backbone.Router.extend({
        routes: {
            'home': '_handleHome',
            'search/:searchTerm': '_handleSearch',
            'detail/:inputID': '_handleDetail',
            '*default': '_handleDefault'
        },

        _handleHome: function() {
            var articleCollection = new ArticleCollection()
            var articlePromise = articleCollection.fetch({
                data: {
                    'api-key': articleCollection._key
                }
            }).then(function() {
                ReactDOM.render(<ListView listColl = {articleCollection}/>, document.querySelector('.container'))
            })
        },

        _handleSearch: function(searchTerm) {
            var articleCollection = new ArticleCollection(searchTerm)

            var articlePromise = articleCollection.fetch({
                data: {
                    'api-key': articleCollection._key,
                    'q': searchTerm
                }
            }).then(function() {
                console.log(articleCollection)
            })
        },

        _handleDetail: function(inputID) {
            console.log('handling detail', inputID)
        },

        _handleDefault: function() {
            location.hash = 'home'
        },

        initialize: function() {
            Backbone.history.start()
        }
    })
    var controller = new Controller()
}

app()