<template>
  <div class="max-w-7xl px-4">
    <div class="w-full mx-auto flex justify-between">
      <div>
        <router-link
          :to="{ name: 'Home' }"
          class="inline-block shadow-sm py-2 px-4 text-gray-500 bg-gray-100 rounded-t-md text-sm border-gray-200 border"
          >Home</router-link
        >
        <router-link
          :to="{ name: 'jadwal.add' }"
          class="inline-block shadow-sm py-2 px-4 text-blue-500 bg-blue-100 rounded-t-md text-sm border-blue-200 border"
          >Buat baru</router-link
        >
      </div>
    </div>
    <div class="w-full mx-auto">
      <div class="flex flex-col">
        <div class="overflow-x-auto">
          <div class="py-2 align-middle inline-block min-w-full">
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr v-if="!show_search">
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <button @click="show_search = true">
                        &#10061; Cari...
                      </button>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bus
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Supir
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rute
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Berangkat
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                  <tr v-if="show_search">
                    <th colspan="7">
                      <div class="flex">
                        <div class="flex-1">
                          <input
                            v-model="search"
                            type="date"
                            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm rounded-md"
                            placeholder="Cari berdasarkan plat number | bus number | distributor..."
                          />
                        </div>
                        <div class="flex justify-center items-center">
                          <button
                            @click="show_search = false"
                            class="h-5 w-5 rounded-full text-white bg-gray-400 flex justify-center items-center"
                          >
                            <p>&#10005;</p>
                          </button>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-if="
                      typeof jadwals.data != 'undefined' &&
                      !jadwals.data.length > 0
                    "
                  >
                    <td class="px-6 py-4 whitespace-nowrap" colspan="6">
                      <div class="text-sm text-gray-900">
                        Data tidak ditemukan...
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-for="(jadwal, index) in jadwals.data"
                    :class="getBackgroundRow(jadwal.status)"
                    :key="jadwal.id"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ jadwals.from + index }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ jadwal.bus_number }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        [{{ jadwal.supir_no_reg }}]
                        {{ jadwal.supir_nama_lengkap }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        [{{ jadwal.rute_kode }}] <br />
                        {{ convertToJamAndMinute(jadwal.rute_waktu_tempuh) }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ jadwal.berangkat }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ jadwal.status }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <router-link
                        :to="{ name: 'jadwal.edit', params: { id: jadwal.id } }"
                        class="text-xs shadow-sm bg-gray-200 py-1 px-4 rounded-md text-gray-700 hover:text-indigo-900 mr-1"
                        >Edit</router-link
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import _ from "lodash";
export default {
  data: () => ({
    show_search: false,
    search: "",
  }),
  computed: {
    ...mapState("jadwal", ["jadwals"]),
    page: {
      get() {
        return this.$store.state.jadwal.page;
      },
      set(val) {
        this.$store.commit("jadwal/_set_page", val);
      },
    },
  },
  methods: {
    ...mapActions("jadwal", ["fetchDataJadwals"]),
    async _fetchDataJadwals() {
      try {
        await this.fetchDataJadwals(this.search);
      } catch (e) {
        alert(e);
      }
    },
    getBackgroundRow(status) {
      if (status == "CANCEL") {
        return "bg-red-100";
      } else if (status == "AAD") {
        return "bg-green-100";
      }
      return "";
    },
    convertToJamAndMinute(waktu) {
      let jam = Math.floor(waktu / 60);
      let menit = waktu - jam * 60;
      if (jam > 0) {
        return `${jam} jam ${menit} menit`;
      }
      return `${menit} menit`;
    },
  },
  created() {
    this._fetchDataJadwals();
  },
  watch: {
    page() {
      this._fetchDataJadwals();
    },
    search: _.debounce(function () {
      this._fetchDataJadwals();
    }, 500),
  },
};
</script>
