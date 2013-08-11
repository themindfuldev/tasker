# Tasker

*Tasker* is a sample web application, developed by [Tiago Romero Garcia](http://www.tgarcia.com.br)
 to illustrate some articles he wrote for [Java Magazine](http://www.devmedia.com.br/java) in Brazil about 
 using [Backbone.js](http://backbonejs.org) and [Handlebars.js](http://handlebarsjs.com) on the client-side and 
 [Play!](http://www.playframework.com) over Java on the server-side.

This application simulates a very simple Kanban board based on Agile methodologies. Basically, the board can
 have multiple projects, each project can have multiple stories and each story can have multiple issues,
 which can be either task, bug or enhancement.
 
The user can create and remove projects, stories and issues, and also move issues around 4 lanes 
 representing its possible status: Backlog, In Progress, Verify and Signed Off.
 
## Purpose

The main purpose of Tasker is to demonstrate important front-end concepts of nowadays about smart client-side
applications, such as:
 
### Client-side 
 
* MV* on the client-side with Backbone.js
  * REST-based models
  * views
  * routers
  * events
  * validation
* Templating with Handlebars.js
  * Custom helpers
* Using Bootstrap components
* Using Font Awesome fonts 
* Writing LESS css
* Building the front-end with Grunt
  * Concatenating files
  * JSHint
* Unit testing with Jasmine
  * Mocking with Sinon.JS
* Code coverage
* UI-level i18n 
* Responsive/adaptive layout
 
### Server-side
 
* Play! Framework as a modern, simple yet powerful back-end
  * models
  * views
  * controllers
  * REST-based routers
  * Google Clojure compilation and minification
* Ebean as a simple ORM approach
  * JPA-based mapping
  * simple query language
  * evolutions
* JSON manipulation with Flexjson
* Unit testing with TestNG
* Code coverage
* Setting production profile
* Deploying to Heroku

## Setup

* Install JDK 7 and make sure it is available from command-line
* Install Play! Framework and make sure it is available from command-line
* Checkout this project
* Enter Play! console by typing: ```play```

## Tasks on Play! console

* Compile: ```compile```
* Test: ```test```
* Run: ```run```

## License

Tasker from [Tiago Romero Garcia](http://www.tgarcia.com.br) is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/deed.en). 
Based on a work at [http://github.com/tiagorg/tasker](http://github.com/tiagorg/tasker). 
Permissions beyond the scope of this license may be available at [http://tgarcia.com.br/contato](http://tgarcia.com.br/contato).
