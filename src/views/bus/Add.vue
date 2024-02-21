<template>
  <form class="max-w-sm px-4 mx-auto" @submit.prevent="_storeNewDataBus">
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Plat Nomor</label
      >
      <input
        v-model="bus.plat_number"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Nomor Plat Bus"
      />
    </div>
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Bus Nomor</label
      >
      <input
        v-model="bus.bus_number"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Nomor Bus"
      />
    </div>
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Distributor</label
      >
      <input
        v-model="bus.distributor"
        type="text"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Distributor"
      />
    </div>
    <div class="mb-2">
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Jumlah Kursi</label
      >
      <input
        v-model="bus.ukuran"
        type="number"
        class="border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
        placeholder="Jumlah kursi"
      />
    </div>
    <div class="mt-2 flex space-x-2">
      <router-link
        :to="{ name: 'bus.index' }"
        class="text-center border border-gray-800 text-gray-800 block w-full py-2 rounded-md"
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
      bus: {
        plat_number: "",
        bus_number: "",
        distributor: "",
        ukuran: 0,
      },
    };
  },
  methods: {
    ...mapActions("bus", ["storeNewDataBus"]),
    _resetForm() {
      this.bus = {
        plat_number: "",
        bus_number: "",
        distributor: "",
        ukuran: 0,
      };
    },
    _validateForm() {
      if (
        this.bus.plat_number != "" &&
        this.bus.bus_number != "" &&
        this.bus.distributor != "" &&
        this.bus.ukuran != 0
      ) {
        return true;
      }
      return false;
    },
    async _storeNewDataBus() {
      try {
        if (!this._validateForm()) {
          return false;
        }
        await this.storeNewDataBus(this.bus);
        this._resetForm();

        this.$router.replace({ name: "bus.index" });
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>
