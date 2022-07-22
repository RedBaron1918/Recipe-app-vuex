import { createStore } from 'vuex'

export default createStore({
  state: {
    recipes: [
      {
        slug: 'Irish potato cakes',
        title: 'Irish potato cakes',
        description: 'This makes a delicious and simple starter or light lunch!',
        ingredients: [
          'potatoes',
          'butter',
          
        ],
        method: [
          'Preheat the oven to 200C/180C fan/gas mark.',
          'Mix the butter and salt together in a bowl.',
          'Add the potatoes and mix well.',
          
        ],

      },
      {
        slug: 'roast chicken',
        title: 'Roast chicken',
        description: 'This makes a delicious and simple starter or light lunch!',
        ingredients: [
          'chicken',
          'butter',
        
        ],
        method: [
          'Preheat the oven to 200C/180C fan/gas mark.',
          'Mix the butter and salt together in a bowl.',
          'Add the chicken and mix well.',
          

        ],
        
      }
    ],

  },
  getters: {
  },
  mutations: {
    ADD_RECIPE(state, recipe) {
      state.recipes.push(recipe)
    }
  },
  actions: {

  },
  modules: {
  }
})
