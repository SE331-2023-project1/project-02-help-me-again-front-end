<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>
    </div>

    <!-- username -->
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="signup">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <div class="mt-2">
            <input id="firstname" v-model="formData.firstname" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <div class="mt-2">
            <input id="lastname" v-model="formData.lastname" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">User name</label>
          <div class="mt-2">
            <input id="username" v-model="formData.username" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- email -->
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" v-model="formData.email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- password -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" v-model="formData.password" type="password" autocomplete="new-password" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- repeat password -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          </div>
          <div class="mt-2">
            <input id="passwordRepeat" v-model="formData.passwordRepeat" type="password" autocomplete="new-password" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- Sign up button -->
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        {{ ' ' }}
        <RouterLink to="/Login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log in</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Make sure to import Axios

export default {
  data() {
    return {
      formData: {
        firstname: '',
        lastname:' ',
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
      },
    };
  },
  methods: {
    sendPost() {
      // Create a payload object from formData
      const postData = {
        firstname: this.formData.firstname,
        lastname: this.formData.lastname,
        email: this.formData.email,
        username: this.formData.username,
        password: this.formData.password,
      };

      axios.post("http://localhost:8080/api/v1/auth/register", postData)
        .then(res => {
          // Handle the API response, e.g., store access token in local storage
          localStorage.setItem('access_token', res.data.access_token);
        })
        .catch(error => {
          // Handle API errors here
          console.error('Error:', error);
        });
    },
    signup() {
      if (!this.formData.firstname || !this.formData.lastname || !this.formData.username || !this.formData.email || !this.formData.password || !this.formData.passwordRepeat) {
        alert('Please fill in all required fields.');
      } else if (this.formData.password !== this.formData.passwordRepeat) {
        alert('Passwords do not match. Please check and try again.');
      } else {
        this.sendPost(); // Call the sendPost function to send registration data to the API
        alert('Registration successful. You can now log in.');
        this.$router.push('/Login');
      }
    },
  },
};

</script>
