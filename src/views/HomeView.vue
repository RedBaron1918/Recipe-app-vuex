<template>
  <div class="home">
    <h1>Recipe App</h1>
    <button @click="togglePopup">Add New Recipe</button>
    <div class="recipes">
      <div
        class="card"
        v-for="recipe in $store.state.recipes"
        :key="recipe.slug"
      >
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <router-link :to="`/recipe/${recipe.slug}`">
          <button>View Recipe</button>
        </router-link>
      </div>
    </div>
    <div class="add-recipe-popup" v-if="popupOpen">
      <div class="popup-content">
        <h2>Add new Recipe</h2>
        <form @submit.prevent="addNewRecipe">
          <div class="group">
            <label>Title</label>
            <input type="text" v-model="newRecipe.title" />
          </div>

          <div class="group">
            <label>Description</label>
            <textarea v-model="newRecipe.description"></textarea>
          </div>

          <div class="group">
            <label>Ingredients</label>
            <div
              class="ingredient"
              v-for="i in newRecipe.ingredientRows"
              :key="i"
            >
              <input type="text" v-model="newRecipe.ingredients[i - 1]" />
            </div>
            <button type="button" @click="addNewINgerdient">
              Add Ingredient
            </button>
          </div>

          <div class="group">
            <label>Method</label>
            <div class="method" v-for="i in newRecipe.methodRows" :key="i">
              <textarea v-model="newRecipe.method[i - 1]"></textarea>
            </div>
            <button type="button" @click="addNewstep">Add method</button>
          </div>

          <button type="submit">Add Recipe</button>
          <button @click="togglePopup" type="button">Close</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "HomeView",

  data() {
    return {
      newRecipe: {
        title: "",
        description: "",
        ingredients: [],
        method: [],
        ingredientRows: 1,
        methodRows: 1,
      },
      popupOpen: false,
      store: useStore(),
    };
  },
  methods: {
    togglePopup() {
      this.popupOpen = !this.popupOpen;
    },
    addNewINgerdient() {
      this.newRecipe.ingredientRows++;
    },
    addNewstep() {
      this.newRecipe.methodRows++;
    },
    addNewRecipe() {
      this.newRecipe.slug = this.newRecipe.title
        .toLowerCase()
        .replace(/\s/g, "-");
      console.log(this.newRecipe);
      if (!this.newRecipe.slug) {
        alert("Please enter a title");
        return;
      }
      this.store.commit("ADD_RECIPE", { ...this.newRecipe });
      this.newRecipe = {
        title: "",
        description: "",
        ingredients: [],
        method: [],
        ingredientRows: 1,
        methodRows: 1,
      };
      this.togglePopup();
    },
  },
};
</script>

<style>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-size: 3rem;
  margin-bottom: 32px;
}
.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.recipes .card {
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem;
  background-color: #081c33;
}
.recipes .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.recipes .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}
.add-recipe-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-recipe-popup .popup-content {
  background-color: #081c33;
  padding: 2rem;
  border-radius: 1rem;
  width: 70%;
  max-width: 420px;
}
.popup-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.popup-content .group {
  margin-bottom: 1rem;
}
.popup-content .group label {
  display: block;
  margin-bottom: 0.5rem;
}
.popup-content .group input,
.popup-content .group textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
.popup-content .group textarea {
  height: 70px;
  resize: none;
}
.popup-content button[type="submit"] {
  margin-right: 1rem;
}
</style>
