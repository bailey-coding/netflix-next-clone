const SIGNED_IN_KEY = "logged-in-user-storage-key";
const WATCH_LIST_KEY = "watch-list-key";


const {createApp} = window.Vue

const component = {

  data() {
    return {
      userArray: [],
      username: "",
      search: "",
      watchListArray: [],
    };
  },

  methods: {
    removeFromWatchList(index) {
      this.watchListArray = JSON.parse(
        localStorage.getItem(WATCH_LIST_KEY)
      );
      this.watchListArray.splice(index, 1);
      localStorage.setItem(
        WATCH_LIST_KEY,
        JSON.stringify(this.watchListArray)
      );
    },

    logout() {
      localStorage.removeItem(SIGNED_IN_KEY);
      window.location.href = "../../index.html";
    },
  },

  mounted() {
    this.userArray = JSON.parse(localStorage.getItem(SIGNED_IN_KEY));
    this.username = this.userArray[0]._username;

    if (!localStorage.getItem(WATCH_LIST_KEY)) {
      let initArray = [];
      localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(initArray));
    }

    this.watchListArray = JSON.parse(localStorage.getItem(WATCH_LIST_KEY));
  },


  template: /* html */
  `
    <header id="myHeader">
  <a href="#" class="netflix-logo"><img src="/src/images/netflix.png" alt="Netflix logo"/></a>

  <ul class="navigation-list">
    <li><a href="./home.html">Home</a></li>
    <li>My List</li>
  </ul>

    <div class="dropdown">
      <button class="pfp-button"><img src="/src/images/pfp.png" alt="profile picture" class="pfp"></button>
      <div class="dropdown-content">
        <p>{{ username }}</p>
        <p @click="logout">Log out</p>
      </div>
    </div>
</header>

<section class="main">
  <h1 class="list-heading">My List</h1>

  <ul class="movie-list">
    <li class="movie-item" v-for="(movie, index) in watchListArray" :key="movie.id"> 
      <span class="movie-name">{{ movie.name }}</span>
      <br/>
      <img class="movie-img" v-bind:src="movie.thumbnail">
      <br/>
      <span class="movie-info">{{ movie.genre }}</span>
      <br/>
      <span class="movie-info">{{ movie.availDate }}</span>
      <br/>
      
      <div class="buttons">
        <button class="preview-btn">
        <a :href="movie.preview">
        <img class="preview-icon" src="/src/images/preview-icon.png"/>
        </a>
        </button>
        <button class="remove-btn" @click="removeFromWatchList(index)">
        <img class="remove-icon" src="/src/images/cancel-icon.png">
        </button>
        </div>   
    </li>
  </ul>
</section>
  `,
}

window.addEventListener('DOMContentLoaded',  () => {
    const app = createApp(component)
    app.mount("#app")
} )