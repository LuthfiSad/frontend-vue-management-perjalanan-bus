<template>
  <form @submit.prevent="_updateTerminal" class="max-w-sm px-4 mx-auto">
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Kode</label
      >
      <input
        v-model="terminal.kode"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Kode"
      />
    </div>
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Nama</label
      >
      <input
        v-model="terminal.nama"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Nama terminal"
      />
    </div>
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Alamat</label
      >
      <input
        v-model="terminal.alamat"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Alamat terminal"
      />
    </div>
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Provinsi</label
      >
      <input
        v-model="terminal.provinsi"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Provinsi"
      />
    </div>
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Kota</label
      >
      <input
        v-model="terminal.kota"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Kota"
      />
    </div>
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Kecamatan</label
      >
      <input
        v-model="terminal.kecamatan"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Kecamatan"
      />
    </div>
    <div class="mb-2">
      <label for="country" class="block text-sm font-medium text-gray-700"
        >Tipe</label
      >
      <select
        v-model="terminal.tipe"
        class="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="CHECKPOINT">Checkpoint</option>
        <option value="TERMINAL">Terminal</option>
        <option value="PUL">Pul</option>
      </select>
    </div>
    <div class="mt-2 flex space-x-2">
      <router-link
        :to="{ name: 'terminal.index' }"
        class="border text-center border-gray-800 text-gray-800 block w-full py-2 rounded-md"
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
      terminal: {
        kode: "",
        nama: "",
        alamat: "",
        provinsi: "",
        kota: "",
        kecamatan: "",
        tipe: "TERMINAL",
      },
    };
  },
  methods: {
    ...mapActions("terminal", ["findTerminal", "updateTerminal"]),
    _validate() {
      if (
        this.terminal.kode != "" &&
        this.terminal.nama != "" &&
        this.terminal.alamat != "" &&
        this.terminal.provinsi != "" &&
        this.terminal.kota != "" &&
        this.terminal.kecamatan != "" &&
        this.terminal.tipe != ""
      ) {
        return true;
      }
      return false;
    },
    _clearForm() {
      this.terminal = {
        kode: "",
        nama: "",
        alamat: "",
        provinsi: "",
        kota: "",
        kecamatan: "",
        tipe: "TERMINAL",
      };
    },
    async _updateTerminal() {
      try {
        if (!this._validate) {
          return false;
        }
        await this.updateTerminal(this.terminal);
        this._clearForm();

        this.$router.replace({ name: "terminal.index" });
      } catch (e) {
        alert(e);
      }
    },
    async _findTerminal() {
      try {
        let terminal = await this.findTerminal(this.$route.params.id);
        this.terminal = terminal;
      } catch (e) {
        alert(e);
      }
    },
  },
  created() {
    this._findTerminal();
  },
};
</script>
