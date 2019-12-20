/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


Vue.component('chat', require('./components/Chat.vue').default);
Vue.component('onlineuser', require('./components/OnlineUser.vue').default);
// Vue.component('chat-composer', require('./components/ChatComposer.vue'));
// Vue.component('chat', require('./components/Chat').default);


const app = new Vue({
    el: '#app',
    data: {
        chats: '',
        onlineUsers: ''
    },
    created() {
        const userId = $('meta[name="userId"]').attr('content');
        const friendId = $('meta[name="friendId"]').attr('content');

        if (friendId !== undefined) {
            axios.post('/chat/getChat/' + friendId).then((response) => {
                this.chats = response.data;
            });

            // swap userId and friendId
            Echo.private('Chat.' + friendId + '.' + userId)
                .listen('BroadcastChat', (e) => {
                    document.getElementById('ChatAudio').play();
                    this.chats.push(e.chat);
                });
        }
        if (userId != 'null'){
            Echo.join('Online')
                .here((users)=>{
                    this.onlineUsers = users;
                })
                .joining((user)=>{
                    this.onlineUsers.push(user);
                })
                .leaving((user)=>{
                    this.onlineUsers = this.onlineUsers.filter((u)=> {
                        u != user
                    });
                });
        }
    }
});


// Bulma NavBar Burger Script
document.addEventListener('DOMContentLoaded', function () {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {

                // Get the target from the "data-target" attribute
                let target = $el.dataset.target;
                let $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});


require('./bulma-extensions');
