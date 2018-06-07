export default {
  state: {
    sections: [
      {
        title: 'Template Engine',
        icon: 'fab fa-html5',
        color: 'orange',
        check: true,
        cards: [
          { title: 'HTML5', src: 'images/html5-logo.png', check: true},
          { title: 'PUG', src: 'images/pug-logo.png', check: false},
        ] 
      },
      { 
        title: 'CSS Preprocessors', 
        color: 'blue',
        icon: 'fab fa-css3',
        check: true,
        cards: [
          { title: 'CSS', src: 'images/css3-logo.png', check: true},
          { title: 'SASS', src: 'images/sass-logo.png', check: false},
          { title: 'LESS', src: 'images/less-logo.png', check: false},
          { title: 'PostCSS', src: 'images/postcss-logo.png', check: false},
          { title: 'Stylus', src: 'images/stylus-logo.svg', check: false},
        ] 
      },
      { 
        title: 'CSS Frameworks', 
        color: 'blue',
        icon: 'fab fa-css3',
        check: false,
        cards: [
          { title: 'Bootstrap', src: 'images/bootstrap-logo.png', check: false},
          { title: 'Foundation', src: 'images/foundation-logo.png', check: false},
          { title: 'Materialize', src: 'images/materialize-logo.png', check: false},
          { title: 'Bulma', src: 'images/bulma-logo.png', check: false},
          { title: 'SemanticUI', src: 'images/semanticui-logo.png', check: false},
          { title: 'PureCSS', src: 'images/purecss-logo.png', check: false},
        ] 
      },
      { 
        title: 'JS Transpilers & Extension Languages', 
        color: 'yellow',
        icon: 'fab fa-js',
        check: false,
        cards: [
          { title: 'Babel', src: 'images/babel-logo.png', check: false},
          { title: 'TypeScript', src: 'images/typescript-logo.png', check: false},
          { title: 'CoffeScript', src: 'images/coffescript-logo.png', check: false},
        ] 
      },
      { 
        title: 'JS Library', 
        color: 'yellow',
        icon: 'fab fa-js',
        check: false,
        cards: [
          { title: 'jQuery', src: 'images/jquery-logo.png', check: false},
          { title: 'Lodash', src: 'images/lodash-logo.png', check: false},
          { title: 'Underscore', src: 'images/underscore-logo.png', check: false},
          { title: 'Backbone', src: 'images/backbone-logo.jpg', check: false},
        ] 
      },
      { 
        title: 'JS Framework ', 
        color: 'yellow',
        icon: 'fab fa-js',
        check: false,
        cards: [
          { title: 'React', src: 'images/react-logo.png', check: false},
          { title: 'Vue.js', src: 'images/vuejs-logo.png', check: false},
          { title: 'Angular', src: 'images/angular-logo.png', check: false},
          { title: 'Ember', src: 'images/ember-logo.png', check: false},
          { title: 'Polymer', src: 'images/polymer-logo.png', check: false},
        ] 
      },
      { 
        title: 'Fonts', 
        color: 'blue',
        icon: 'fas fa-font',
        check: false,
        cards: [
          { title: 'Google Fonts', src: 'images/googlefonts-logo.png', check: false},
          { title: 'Font Awesome', src: 'images/fontawesome-logo.jpg', check: false},
        ] 
      },
      { 
        title: 'Tools', 
        color: 'red',
        icon: 'fas fa-toolbox',
        check: false,
        cards: [
          { title: 'Modernizr', src: 'images/modernizr-logo.png', check: false},
          { title: 'PWA', src: 'images/pwa-logo.png', check: false},
        ] 
      }
    ]
  },
  mutations: {
    checkSections (state, title, value) {
      if (value !== true) {
        value = false
      }
      state.sections[title].check = value
    }
  }
}
