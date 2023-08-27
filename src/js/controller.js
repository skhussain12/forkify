import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log('TEST');
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    //update result view to mark selected search result
    resultsView.update(model.getsearchResultPage());
    //updating bookmarks
    bookmarksView.update(model.state.bookmarks);
    recipeView.renderSpinner();
    //Loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;
    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // console.log(model.state.search.results);
    resultsView.renderSpinner();
    //1.Get search query
    const query = searchView.getQuery();
    // console.log(query);
    // if (!query) return;
    //2. search load result
    await model.loadSearchResults(query);
    //3. render search results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getsearchResultPage(3));
    //4. render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  // console.log('Page Controller');
  //3. render new search result
  resultsView.render(model.getsearchResultPage(goToPage));
  //4. render pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServigs) {
  //Upadate recipe servings (In state)
  model.updateServings(newServigs);
  //Update the recipe view
  recipeView.update(model.state.recipe);
};
const controladdBookmark = function () {
  //add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  // update recipe
  recipeView.update(model.state.recipe);
  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
// controlSearchResults();
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmarks(controladdBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  // controlServings();
};
init();
