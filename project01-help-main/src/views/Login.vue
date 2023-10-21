<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log In</h2>
    </div>

    <!-- username-->
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div class="mt-2">
            <input id="username" v-model="formData.username" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- password -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" v-model="formData.password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- Login button -->
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have an account?
        {{ ' ' }}
        <RouterLink to="/Register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    sendPost() {
      // Create a payload object from formData
      const postData = {
        username: this.formData.username,
        password: this.formData.password,
      };

      axios.post("http://localhost:8080/api/v1/auth/authenticate", postData)
        .then(res => {
          // Handle the API response, e.g., store access token in local storage
          localStorage.setItem('access_token', res.data.access_token);
        })
        .catch(error => {
          // Handle API errors here
          console.error('Error:', error);
        });
    },
    login() {
      if (!this.formData.username || !this.formData.password) {
        alert('Please fill in both the username and password fields.');
      } else {
        this.sendPost(); // Call the sendPost function to send data to the API
        this.$router.push('/');
      }
    },
  },
};
</script>
