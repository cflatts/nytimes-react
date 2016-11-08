import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ListView from './views/ListView'
import DetailView from './views/DetailView'

const app = function() {

    var ArticleModel = Backbone.Model.extend({
        url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        '_key': 'a30a58a6e722476eb77532b42ca43c9b',

        parse: function(rawResponse) {
            var parsedResponse = rawResponse.response.docs[0]
            // console.log(parsedResponse)
            return parsedResponse
        }
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

            var renderIt = function() {
                ReactDOM.render(<ListView listColl = {articleCollection}/>, document.querySelector('.container'))
            }

            articleCollection.fetch({
                data: {
                    'api-key': articleCollection._key
                }
            }).then(renderIt)
        },

        _handleSearch: function(searchTerm) {
            var searchColl = new ArticleCollection()
            searchColl.fetch({
                data: {
                    'api-key': searchColl._key,
                    'q': searchTerm
                }
            })
            ReactDOM.render(<ListView listColl = {searchColl} />, document.querySelector('.container'))
        },

        _handleDetail: function(inputID) {
            var articleModel = new ArticleModel()

            articleModel.fetch({
                data: {
                    'api-key': articleModel._key,
                    'fq': `_id:${inputID}`
                }
            })
            ReactDOM.render(<DetailView articleModel = {articleModel}/>, document.querySelector('.container'))
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