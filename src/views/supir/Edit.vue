<template>
  <form class="max-w-sm px-4 mx-auto" @submit.prevent="_updateNewDataSupir">
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700"
        >Nomor Registrasi</label
      >
      <input
        v-model="supir.no_reg"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Nomor registrasi supir"
      />
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Nama</label>
      <input
        v-model="supir.nama_lengkap"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Nama lengkap supir"
      />
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Alamat</label>
      <input
        v-model="supir.alamat"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Alamat supir"
      />
    </div>
    <div class="mb-2">
      <label for="country" class="block text-sm font-medium text-gray-700"
        >JK</label
      >
      <select
        v-model="supir.jk"
        class="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="L">Laki-laki</option>
        <option value="P">Perempuan</option>
      </select>
    </div>
    <div class="mt-4 flex space-x-2">
      <router-link
        :to="{ name: 'supir.index' }"
        class="border-gray-800 border text-gray-800 text-center block w-full py-2 rounded-md"
        >Cancel</router-link
      >
      <button
        type="submit"
        class="bg-gray-800 text-white block w-full py-2 rounded-md"
      >
        Simpan
      </button>
    </div>
  </form>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      supir: {
        id: "",
        no_reg: "",
        nama_lengkap: "",
        alamat: "",
        jk: "L",
      },
    };
  },
  methods: {
    ...mapActions("supir", ["updateNewDataSupir", "findDataSupir"]),
    _clearnForm() {
      this.supir = {
        no_reg: "",
        nama_lengkap: "",
        alamat: "",
        jk: "L",
      };
    },
    _validateData() {
      if (
        this.supir.no_reg != "" &&
        this.supir.nama_lengkap != "" &&
        this.supir.alamat != "" &&
        this.supir.jk != ""
      ) {
        return true;
      }
      return false;
    },
    async _updateNewDataSupir() {
      try {
        if (!this._validateData()) {
          return false;
        }
        await this.updateNewDataSupir(this.supir);

        this._clearnForm();
        this.$router.replace({ name: "supir.index" });
      } catch (e) {
        alert(e);
      }
    },
    async _findDataSupir() {
      try {
        let data = await this.findDataSupir(this.$route.params.id);
        this.supir = data;
      } catch (e) {
        alert(e);
      }
    },
  },
  created() {
    this._findDataSupir();
  },
};
</script>
