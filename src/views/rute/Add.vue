<template>
  <form @submit.prevent="_storeNewRute" class="max-w-sm px-4 mx-auto">
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Kode</label>
      <input
        v-model="rute.kode"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Kode"
      />
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Asal</label>
      <select
        class="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        v-model="rute.asal"
      >
        <option
          v-for="terminal in terminalsAll"
          :value="terminal.id"
          :key="terminal.id"
        >
          {{ terminal.kode }} - {{ terminal.nama }}
        </option>
      </select>
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Tujuan</label>
      <select
        class="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        v-model="rute.tujuan"
      >
        <option
          v-for="terminal in terminalsAll"
          :value="terminal.id"
          :key="terminal.id"
        >
          {{ terminal.kode }} - {{ terminal.nama }}
        </option>
      </select>
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700"
        >Waktu tempuh</label
      >
      <input
        v-model.number="rute.waktu_tempuh"
        type="number"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Waktu tempuh dalam menit"
      />
    </div>
    <div class="mb-2">
      <label for="country" class="block text-sm font-medium text-gray-700"
        >Checkpoints</label
      >
      <div
        class="flex items-center"
        v-for="(ruteIterate, i) in rute.checkpoints"
        :key="i"
      >
        <input
          v-model.number="rute.checkpoints[i].code"
          type="text"
          class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
          placeholder="Kode"
        />
        <select
          class="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          v-model="rute.checkpoints[i].id"
        >
          <option
            v-for="terminal in terminalsAll"
            :value="terminal.id"
            :key="terminal.id"
          >
            {{ terminal.kode }} - {{ terminal.nama }}
          </option>
        </select>
        <input
          v-model.number="rute.checkpoints[i].waktu"
          type="number"
          class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
          placeholder="Waktu menit"
        />
      </div>

      <div class="flex justify-end mt-1">
        <button
          type="button"
          class="bg-red-400 text-white block py-1 px-4 rounded-md mr-1"
          @click="_removeCheckpoints"
        >
          Hapus
        </button>
        <button
          type="button"
          class="bg-blue-400 text-white block py-1 px-4 rounded-md"
          @click="_addCheckpoints"
        >
          Tambah
        </button>
      </div>
    </div>
    <div class="mt-2 flex space-x-1">
      <router-link
        :to="{ name: 'rute.index' }"
        class="border-2 border-gray-800 text-gray-800 text-center block w-full py-2 rounded-md"
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
      rute: {
        kode: "",
        asal: "",
        tujuan: "",
        waktu_tempuh: 30,
        checkpoints: [{ id: "", code: "", waktu: 30 }],
      },
    };
  },
  computed: {
    ...mapState("terminal", ["terminalsAll"]),
  },
  methods: {
    ...mapActions("terminal", ["fetchDataTerminalsAll"]),
    ...mapActions("rute", ["storeNewRute"]),
    async _storeNewRute() {
      try {
        await this.storeNewRute(this.rute);
        this.$router.replace({ name: "rute.index" });
      } catch (e) {
        alert(e);
      }
    },
    async _fetchDataTerminalsAll() {
      try {
        await this.fetchDataTerminalsAll("");
      } catch (e) {
        alert(e);
      }
    },
    _addCheckpoints() {
      this.rute.checkpoints.push({
        id: "",
        code: "",
        waktu: 30,
      });
    },
    _removeCheckpoints() {
      this.rute.checkpoints.pop();
    },
  },
  created() {
    this._fetchDataTerminalsAll();
  },
};
</script>
