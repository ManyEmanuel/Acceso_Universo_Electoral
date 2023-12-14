<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-purple">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />
        <q-toolbar-title> Universo Electoral </q-toolbar-title>
        <div>
          <q-btn
            flat
            label="Cerrar Sesión"
            text-color="white"
            @click="LogOut"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="300"
      :breakpoint="1024"
      class="text-black"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="~assets/FondoIEEN.png"
        style="height: 150px"
      >
        <div class="bg-transparent">
          <div class="text-weight-bold text-black text-center">
            <br />
            Bienvenido(a)
          </div>
        </div>
      </q-img>
    </q-drawer>
    <q-footer reveal bordered class="bg-purple">
      <q-toolbar>
        <q-toolbar-title
          ><div>&#169; Unidad Técnica de Informática y Estadística</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import { useAccesoStore } from "../store/acceso_store";
import { useRouter, useRoute } from "vue-router";
import { api } from "../boot/axios.js";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const $q = useQuasar();
    const accesoStore = useAccesoStore();
    const { listSistemas } = storeToRefs(accesoStore);
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      CargaSistemas();
    });
    const CargaSistemas = async () => {
      await accesoStore.loadSistema();
    };
    const LogOut = async () => {
      $q.dialog({
        title: "¿Que acción desea realizar?",
        icon: "Warning",
        ok: {
          color: "purple-6",
          label: "Cerrar sesión",
        },
        cancel: {
          color: "purple-6",
          label: "Cancelar",
        },
        persistent: true,
      }).onOk(() => {
        accesoStore.removeToken();
        router.push({ name: "login" });
      });
    };
    return {
      drawer: ref(false),
      LogOut,
    };
  },
});
</script>
