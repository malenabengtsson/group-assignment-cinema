<template>
  <div id="app">
    <nav class="nav-wrapper black">
      <div class="container">
        <router-link class="brand-logo" to="/">
          <div>
            <img class="logo responsive-img" src="@/assets/images/Cinemalogo.png" alt />
          </div>
        </router-link>
  

        <a href="#" data-target="slide-out" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>

        <ul class="right hide-on-med-and-down">
          <li>
            <router-link to="/">Dagens visningar</router-link>
          </li>
          <li>
            <router-link to="/allMovies">Alla Filmer</router-link>
          </li>
          <li>
            <router-link to="/contact">Kontakt</router-link>
          </li>
          <li v-if="user === null">
            <router-link to="/login">Logga in</router-link>
          </li>
          <li v-else>
            <router-link to="/secure">Min Sida</router-link>
          </li>
        </ul>
        

        <ul id="slide-out" class="sidenav sidenav-close black center">
          <img class="logo responsive-img sidebarlogo" src="@/assets/images/Cinemalogo.png" alt />

          <li class="sidenav-close">
            <router-link to="/">Dagens visningar</router-link>
          </li>
          <li class="sidenav-close">
            <router-link to="/allMovies">Alla Filmer</router-link>
          </li>
          <li class="sidenav-close">
            <router-link to="/contact">Kontakt</router-link>
          </li>
          <li v-if="user === null" class="sidenav-close">
            <router-link to="/login">Logga in</router-link>
          </li>
          <li v-else class="sidenav-close">
            <router-link to="/secure">Min Sida</router-link>
          </li>
        </ul>
        
      </div>
      <ul class="hide-on-large-only right">
           <li v-if="user === null">
            <router-link to="/login"><i class="material-icons white-text large">exit_to_app</i></router-link>
          </li>
          <li v-else>
            <router-link to="/"><i class="material-icons large" @click="logOut">arrow_back</i></router-link>
          </li>
        </ul>
    </nav>

    <div id="main">
      <router-view></router-view>
    </div>

    <footer class="page-footer black">
      <div class="container center">
        <div>
          <span class="logo-text">Filmvisarna AB</span>
        </div>
        <div class="footer-text">
          <i class="material-icons tiny">map</i>
          <span>Kalkstensvägen 3, 225 89 Småstad, Sverige</span>
        </div>
        <div class="footer-text">
          <i class="material-icons tiny">email</i>
          <span>info@filmvisarna.com</span>
        </div>
        <div class="footer-text">
          <i class="material-icons tiny">phone</i>
          <span>+46 70 12 346 789</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { auth } from "@/firebase/firebase";
export default {
  data() {
    return {
      user: {}
    };
  },
  computed: {
    logUser() {
      return auth.currentUser;
    }
  },
  methods:{
    logOut(){
       auth.signOut().then(this.$router.push("Login"));
    }
  },
  created() {
    this.$store.dispatch("getMovies");
    this.$store.dispatch("getScreenings");
    this.$store.dispatch("getAuditoriums");
    this.$store.dispatch("getUsers");

    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
}
#app {
  min-height: 100vh;
  background: #ececec;
  display: flex;
  flex-direction: column;
}
#main {
  flex: 1 0 auto;
  background-image: url("./assets/images/movie-background-picture.jpg");
  background-size: cover;
}
#slide-out {
  background-color: black;
}
.sidenav li > a {
  color: white !important;
  font-size: 1.3rem !important;
}
.logo {
  width: 11rem;
}
.logo-text {
  font-size: 1rem;
}
.sidebarlogo {
  margin: 1rem;
  margin-top: 5rem;
}
footer span {
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
}
footer i {
  margin-right: 0.5rem;
  display: inline-block;
  position: relative;
  bottom: -2px;
}
.page-footer {
  padding-bottom: 20px;
}
.dropdown-toggle{
  background-image: none !important;
  min-width: 10px !important;
  width: 9.8rem;
}
</style>
