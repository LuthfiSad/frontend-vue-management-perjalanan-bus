<template>
  <div class="container mx-auto">
    <div class="mt-10">
      <form class="max-w-sm px-4 mx-auto" @submit.prevent="_login">
        <div class="mb-2">
          <label for="price" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" name="email" class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md" placeholder="Email">
        </div>
        <div class="mb-2">
          <label for="price" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="form.password" type="password" class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md" placeholder="Password">
        </div>
        <div class="mt-4 flex space-x-2">
          <button type="submit" class="bg-blue-500 text-white block w-full py-2 rounded-md">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters,  mapActions } from 'vuex'
export default {
  data: () => ({
    form: {
      email: "",
      password: ""
    }
  }),
  computed: {
    ...mapGetters(['isAuth']),
  },
  methods: {
    ...mapActions('auth', ['login']),
    async _login() {
      try {
        await this.login(this.form)
        this.$router.replace({ name: 'Home' })
      } catch (e) {
        alert(e)
      }
    }
  },
  created() {
    if(this.isAuth) {
      this.$router.replace({ name: 'Home' })
    }
  }
}
</script>