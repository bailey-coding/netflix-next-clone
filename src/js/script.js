import { ItemArray } from "../classes/ItemArray.js";


const { createApp } = window.Vue;
const SIGNED_IN_KEY = "logged-in-user-storage-key";
const filterComingSoon = (value, itemList) =>
  itemList.filter((item) => item.comingSoon === value);
const filterGenre = (key, itemList) =>
  itemList.filter((item) => item.genre === key);

const Component = {
  data() {
    return {
      itemList: ItemArray,
      userArray: [],
      username: "",
    };
  },

  // filter function
  computed: {
    comingSoonList() {
      return filterComingSoon(true, this.itemList);
    },
    availableList() {
      return filterComingSoon(true, this.itemList);
    },
    actionList() {
      return filterGenre("Action", this.itemList);
    },
    comedyList() {
      return filterGenre("Comedy", this.itemList);
    },
    romanceList() {
      return filterGenre("Romance", this.itemList);
    },
    horrorList() {
      return filterGenre("Horror", this.itemList);
    },
  },

  // html template
  template: /* html */ `
    <div>
    <header id="myHeader">
    <a href="#" class="netflix-logo"><img src="/src/images/netflix.png" alt="Netflix logo"/></a>
    <ul class="navigation-list">
      <li>Home</li>
      <li><a href="./my-list.html">My List</a></li>
    </ul>
    <div class="search">
      <input type="search" placeholder="Titles, people, genres" id="search"/>
      <i class="fa fa-search"></i>
    </div>
    <p>{{ username }}</p>
  </header>

  <main id="myMain">
    <section class="banner" v-for="item in comingSoonList.slice(0, 1)">
      <video class="bg" autoplay muted loop>
      <source :src="item.preview" type="video/mp4">
      </video>
      <div class="content">
        <img :src="item.poster" class="movieTitle" :alt="item.name" />
        <p>{{ item.description }}</p>
        <div class="buttons">
          <button class="button play"><a :href="item.trailer" target="_blank"><i class="fa fa-play"></i> Play</a></button>
          <button class="button info" id="myBtn"><i class="fa fa-plus"></i> More Info</button>
          
          <!-- Modal -->
          <div id="myModal" class="modal">
          <div class="modal-content">
            <div class="modal-banner">
              <span class="close">&times;</span>
              <video class="banner-video" autoplay muted loop>
              <source :src="item.preview" type="video/mp4">
              </video>
              <div class="modal-header-content">
              <span><img :src="item.poster" class="modalMovieTitle" :alt="item.name" /><span>
              <div class="modal-buttons">
              <button class="button modal-play"><a :href="item.trailer" target="_blank"><i class="fa fa-play"></i> Play</a></button>
              <button class="modal-add"><i class="fa fa-plus"></i></button>
              </div>
              </div>
            </div>
            <h3>About {{ item.name }}</h3>
            <div class="modal-body">
            <div class="modal-description">
              <p>{{ item.description }}</p>
            </div>
            <div class="modal-meta">
            <p>Release: {{ item.releaseDate }}</p>
            <p>Runtime: {{ item.runtime }}</p>
            <p>Rating: {{ item.rating }}</p>
            </div>
            </div>
          </div>
        
        </div>
        </div>
      </div>
    </section>

    <section id="content-grid">
      <div class="container-heading">Action</div>
      <div class="container">
        <div class="box hover-button-display" v-for="item in actionList.slice(0, 6)" :id="item.id" :class="item.name" :alt="item.name">
          <img class="bg" :src="item.poster" />
          <button type="button" class="hover-button"><i class="fa fa-plus"></i></button>
        </div>
      </div> 
      <div class="container-heading">Comedy</div>
      <div class="container">
        <div class="box hover-button-display" v-for="item in comedyList.slice(0, 6)" :id="item.id" :class="item.name" :alt="item.name">
          <img class="bg" :src="item.poster" />
          <button type="button" class="hover-button"><i class="fa fa-plus"></i></button>
        </div>
      </div>
      <div class="container-heading">Romance</div>
      <div class="container">
        <div class="box hover-button-display" v-for="item in romanceList.slice(0, 6)" :id="item.id" :class="item.name" :alt="item.name">
          <img class="bg" :src="item.poster" />
          <button type="button" class="hover-button"><i class="fa fa-plus"></i></button>
        </div>
      </div>
      <div class="container-heading">Horror</div>
      <div class="container">
        <div class="box hover-button-display" v-for="item in horrorList.slice(0, 6)" :id="item.id" :class="item.name" :alt="item.name">
          <img class="bg" :src="item.poster" />
          <button type="button" class="hover-button"><i class="fa fa-plus"></i></button>
        </div>
      </div>
    </section>
  </main>

  <footer id="myFooter">
    <div class="social-links">
      <a href="https://www.instagram.com/oliver.vermeulen/" class="social-link" target="_blank"><i class="fab fa-instagram icon" alt="Instagram"></i></a>
      <a href="https://github.com/OliverVermeulen" class="social-link" target="_blank"><i class="fab fa-github icon" alt="GitHub"></i></a>
      <a href="https://www.linkedin.com/in/oliver-vermeulen-311221222/" class="social-link" target="_blank"><i class="fab fa-linkedin-in icon" alt="Linkedin"></i></a>
    </div>
    <ul class="footer-grid">
      <li class="footer-grid-item">Audio and Subtitles</li>
      <li class="footer-grid-item">Audio Description</li>
      <li class="footer-grid-item">Help Centre</li>
      <li class="footer-grid-item">Gift Cards</li>
      <li class="footer-grid-item">Media Centre</li>
      <li class="footer-grid-item">Investor Relations</li>
      <li class="footer-grid-item">Jobs</li>
      <li class="footer-grid-item">Terms of Use</li>
      <li class="footer-grid-item">Privacy</li>
      <li class="footer-grid-item">Legal Notices</li>
      <li class="footer-grid-item">Cookie Preferences</li>
      <li class="footer-grid-item">Corporate Information</li>
    </ul>
    <p>© 2022-2022 Viswinkel, Ltd.</p>
  </footer>
</div>
  `,
  mounted() {
    this.userArray = JSON.parse(localStorage.getItem(SIGNED_IN_KEY));
    this.username = this.userArray[0]._username;
  },
};

// mounting app
window.addEventListener("DOMContentLoaded", () => {
  const app = createApp(Component);
  app.mount("#app");
  // sticky header
  let header = document.getElementById("myHeader");
  let sticky = header.offsetTop;

  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  window.onscroll = function () {
    myFunction();
  };

  // // modal
  // let modal = document.querySelector(".myModal");
  // let btn = document.querySelector(".myBtn");
  // let span = document.querySelector(".close");

  // btn.onclick = function () {
  //   modal.style.display = "block";
  // };
  // span.onclick = function () {
  //   modal.style.display = "none";
  // };
  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // };

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
