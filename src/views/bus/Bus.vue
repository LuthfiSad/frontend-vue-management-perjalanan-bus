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
          :to="{ name: 'bus.add' }"
          class="inline-block shadow-sm py-2 px-4 text-blue-500 bg-blue-100 rounded-t-md text-sm border-blue-200 border"
          >Buat baru</router-link
        >
      </div>
      <div v-if="typeof buses.data != 'undefined'">
        <div class="flex items-center justify-center space-x-1 mx-auto">
          <button
            :disabled="buses.prev_page_url == null"
            :class="{
              'cursor-not-allowed': buses.prev_page_url == null,
              'hover:bg-blue-400 hover:text-white': buses.prev_page_url != null,
            }"
            @click="page -= 1"
            class="border-l border-t border-b border-gray-200 flex items-center px-4 py-1 text-gray-500 bg-gray-100 rounded-l-md"
          >
            &#10094;
          </button>
          <button
            :disabled="buses.next_page_url == null"
            :class="{
              'cursor-not-allowed': buses.next_page_url == null,
              'hover:bg-blue-400 hover:text-white': buses.next_page_url != null,
            }"
            @click="page += 1"
            class="border-r border-t border-b border-gray-200 px-4 py-1 text-gray-500 bg-gray-100 rounded-r-md"
          >
            &#10095;
          </button>
        </div>
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
                      Nomor Plat
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nomor Bus
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Distributor
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ukuran
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                  <tr v-if="show_search">
                    <th colspan="6">
                      <div class="flex">
                        <div class="flex-1">
                          <input
                            v-model="search"
                            type="text"
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
                      typeof buses.data != 'undefined' && !buses.data.length > 0
                    "
                  >
                    <td class="px-6 py-4 whitespace-nowrap" colspan="6">
                      <div class="text-sm text-gray-900">
                        Data tidak ditemukan...
                      </div>
                    </td>
                  </tr>
                  <tr v-for="(bus, index) in buses.data" :key="bus.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ buses.from + index }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ bus.plat_number }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ bus.bus_number }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ bus.distributor }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ bus.ukuran }} Kursi
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <router-link
                        :to="{ name: 'bus.edit', params: { id: bus.id } }"
                        class="text-xs shadow-sm bg-gray-200 py-1 px-4 rounded-md text-gray-700 hover:text-indigo-900 mr-1"
                        >Edit</router-link
                      >
                      <button
                        @click="_deleteBusData(bus.id)"
                        class="inline-block text-xs shadow-sm bg-gray-200 py-1 px-4 text-gray-700 rounded-md hover:text-indigo-900"
                      >
                        Hapus
                      </button>
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
    ...mapState("bus", ["buses"]),
    page: {
      get() {
        return this.$store.state.bus.page;
      },
      set(val) {
        this.$store.commit("bus/_set_page", val);
      },
    },
  },
  methods: {
    ...mapActions("bus", ["fetchDataBuses", "deleteBusData"]),
    async _fetchDataBuses() {
      try {
        await this.fetchDataBuses(this.search);
      } catch (e) {
        alert(e);
      }
    },
    async _deleteBusData(busId) {
      try {
        if (!confirm("Anda ingin menghapus bus ini?")) {
          return false;
        }
        await this.deleteBusData(busId);

        this._fetchDataBuses();
      } catch (e) {
        alert(e);
      }
    },
  },
  created() {
    this._fetchDataBuses();
  },
  watch: {
    page() {
      this._fetchDataBuses();
    },
    search: _.debounce(function (value) {
      this._fetchDataBuses();
    }, 500),
  },
};
</script>
