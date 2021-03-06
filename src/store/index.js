import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auditoriums: [],
    movies: [],
    screenings: [],
    users: [],
    bookings: [], 
    bookingObject: {
      adultTickets: 0,
      seniorTickets: 0,
      childTickets: 0,
      screeningId: null
    },
    navTexts: [
      'Hem',
      'Välj biljetter',
      'Välj platser',
      'Bekräfta',
      'Genomför bokning'
    ]
  },
  mutations: {
    setMovies(state, data) {
      state.movies = data
    }, 
    setScreenings(state, data) {
      state.screenings = data
    },

    setAuditoriums(state, data) {
      state.auditoriums = data
    },
    setBookingObject(state, data) {
      state.bookingObject = data
    },

    setUsers(state, data) {
      state.users = data
      
    },

    setBookings(state, data) {
      state.bookings = [...data]
    },


  },
  actions: {
    async getAuditoriums({ commit }) {
      let snapshot = await db.collection('auditoriums').get() //.onSnapshot?
      let auditoriums = []
      snapshot.forEach(auditorium => {
        let data = auditorium.data(); // alla egenskaper utom id:t
        data.id = auditorium.id; // lägg till id        
        auditoriums.push(data)
      })
      commit('setAuditoriums', auditoriums)
    },
    async getMovies({ commit }) {
      let snapshot = await db.collection('movies').get()
      let movies = []
      snapshot.forEach(movie => {
        let data = movie.data(); // alla egenskaper utom id:t
        data.id = movie.id; // lägg till id
        movies.push(data)
      })
      commit('setMovies', movies)
    },
    async getScreenings({ commit }) {
      let snapshot = await db.collection('screenings').get()
      let screenings = []
      snapshot.forEach(screening => {
        let data = screening.data(); // alla egenskaper utom id:t
        data.id = screening.id; // lägg till id
        screenings.push(data)
      })
      commit('setScreenings', screenings)
    },

    async getUsers({ commit }) {
      let snapshot = await db.collection('users').get()
      let users = []
      snapshot.forEach(user => {
        let data = user.data(); // alla egenskaper utom id:t
        data.id = user.id; // lägg till id
        users.push(data)
      })
      commit('setUsers', users)
    },

    async getBookings({ commit }) {
      let snapshot = await db.collection('bookings').get()
      let bookings = []
      snapshot.forEach(booking=> {
        let data = booking.data(); // alla egenskaper utom id:t
        data.id = booking.id; // lägg till id
        bookings.push(data)
      })
      commit('setBookings', bookings)
    },
    
  },
  modules: {
  }
})
