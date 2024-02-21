<template>
  <form @submit.prevent="_storeDataJadwal" class="max-w-sm px-4 mx-auto">
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Tanggal</label>
      <input
        v-model="jadwal.berangkat_date"
        type="date"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Kode"
      />
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Jam</label>
      <input
        v-model="jadwal.berangkat_time"
        type="time"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Kode"
      />
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Bus</label>
      <select
        class="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        v-model="jadwal.bus_id"
      >
        <option v-for="bus in busesAll" :value="bus.id" :key="bus.id">
          {{ bus.bus_number }} - {{ bus.distributor }}
        </option>
      </select>
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Supir</label>
      <select
        class="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        v-model="jadwal.supir_id"
      >
        <option v-for="supir in supirsAll" :value="supir.id" :key="supir.id">
          {{ supir.no_reg }} - {{ supir.nama_lengkap }}
        </option>
      </select>
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Rute</label>
      <select
        class="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        v-model="jadwal.rute_id"
      >
        <option v-for="rute in rutesAll" :value="rute.id" :key="rute.id">
          {{ rute.kode }} - Waktu tempuh {{ rute.waktu_tempuh }} menit
        </option>
      </select>
    </div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700">Rute</label>
      <select
        class="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        v-model="jadwal.status"
      >
        <option v-for="(status, i) in status" :value="status.value" :key="i">
          {{ status.literal }}
        </option>
      </select>
    </div>
    <div class="mt-2 flex space-x-1">
      <router-link
        :to="{ name: 'jadwal.index' }"
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
      jadwal: {},
      status: [
        { value: "NGY", literal: "Belum Berangkat" },
        { value: "OTW", literal: "Sedang Dalam Perjalanan" },
        { value: "AAD", literal: "Tiba di tujuan" },
        { value: "CANCEL", literal: "Dibatalkan" },
      ],
    };
  },
  computed: {
    ...mapState("bus", ["busesAll"]),
    ...mapState("supir", ["supirsAll"]),
    ...mapState("rute", ["rutesAll"]),
  },
  methods: {
    ...mapActions("bus", ["fetchDataBusesAll"]),
    ...mapActions("supir", ["fetchDataSupirsAll"]),
    ...mapActions("rute", ["fetchDataRutesAll"]),
    ...mapActions("jadwal", [
      "storeDataJadwal",
      "getDataJadwal",
      "updateDataJadwal",
    ]),
    async _fetchDataBusesAll() {
      try {
        await this.fetchDataBusesAll();
      } catch (e) {
        alert(e);
      }
    },
    async _fetchDataSupirsAll() {
      try {
        await this.fetchDataSupirsAll();
      } catch (e) {
        alert(e);
      }
    },
    async _fetchDataRutesAll() {
      try {
        await this.fetchDataRutesAll();
      } catch (e) {
        alert(e);
      }
    },
    async _storeDataJadwal() {
      try {
        this.jadwal.berangkat =
          this.jadwal.berangkat_date + " " + this.jadwal.berangkat_time;

        await this.updateDataJadwal(this.jadwal);
        this.$router.replace({ name: "jadwal.index" });
      } catch (e) {
        alert(e);
      }
    },
    async _getDataJadwal() {
      try {
        let network = await this.getDataJadwal(this.$route.params.id);
        let berangkat = network.data.berangkat.split(" ");
        this.jadwal = network.data;
        this.jadwal.berangkat_date = berangkat[0];
        this.jadwal.berangkat_time = berangkat[1];
      } catch (e) {
        alert(e);
      }
    },
  },
  created() {
    this._fetchDataBusesAll();
    this._fetchDataSupirsAll();
    this._fetchDataRutesAll();
    this._getDataJadwal();
  },
};
</script>
