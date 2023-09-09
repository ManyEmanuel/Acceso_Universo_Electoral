<template>
  <q-layout>
    <img src="~assets/FondoNuevo.png" class="wave" />
    <div class="row" style="height: 98vh">
      <div class="col-0 col-md-6 flex justify-center content-center q-pa-xl">
        <img
          :src="
            $q.dark.mode == false
              ? require('../assets/LogoUniverso.png')
              : require('../assets/LogoUniversoBlanco.png')
          "
          class="responsive"
          alt="Logo
        institucional"
          style="width: 70%"
        />
      </div>
      <div
        v-bind:class="{
          'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
        }"
        class="col-12 col-md-6 flex content-center text-center items-center"
      >
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="~assets/perfilieen.jpg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="q-pt-lg" id="myElement">
              <div class="col text-h6 ellipsis flex justify-center">
                <h2
                  class="text-h6 text-uppercase q-my-none text-weight-regular"
                >
                  Acceso a registro <br />
                  de Aspirantes
                </h2>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <div id="usuarioTour">
                <q-input
                  v-model="acceso.usuario"
                  label="Usuario"
                  color="accent"
                ></q-input>
              </div>
              <div id="passwordTour">
                <q-input
                  v-model="acceso.password"
                  label="Contraseña"
                  type="password"
                  color="accent"
                >
                </q-input>
              </div>
              <div id="registroTour">
                <q-item-label
                  >¿Aún no estas registrado?
                  <router-link to="/Registro"
                    >Registrese aquí</router-link
                  ></q-item-label
                >
              </div>

              <!-- <q-item-label
                >¿Haz olvidado tu contraseña?
                <router-link to="/">Click aquí</router-link></q-item-label
              >-->
              <div></div>
              <div id="accesoTour">
                <q-btn
                  class="full-width"
                  color="accent"
                  label="Acceder"
                  rounded
                  @click="accesoSistema()"
                ></q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
        <q-page-container>
          <q-page padding>
            <q-page-sticky position="bottom-right" :offset="[20, 20]">
              <q-btn
                round
                icon="question_mark"
                color="blue"
                text-color="white"
                size="md"
                @click="startIntro"
              >
                <q-tooltip class="text-body1">Visita guiada</q-tooltip>
              </q-btn>
            </q-page-sticky>
          </q-page>
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useQuasar, QSpinnerBall } from "quasar";
import { onBeforeMount, ref } from "vue";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { useAccesoStore } from "../store/acceso_store";
const accesoStore = useAccesoStore();
const router = useRouter();
const { acceso } = storeToRefs(accesoStore);
const $q = useQuasar();

const startIntro = () => {
  const intro = introJs();
  intro.setOptions({
    nextLabel: "Siguiente",
    prevLabel: "Anterior",
    doneLabel: "Hecho",
    steps: [
      {
        intro: "👋 Bienvenido al asistente 🤖 de Universo Electoral",
      },
      {
        element: "#registroTour",
        intro:
          "En caso de no contar con usuario, dar clic aquí en 'Registrese aquí'",
      },
      {
        element: "#usuarioTour",
        intro: "Ingrese el usuario que el sistema le generó",
      },
      {
        element: "#passwordTour",
        intro: "Ingrese la contraseña que el sistema le generó",
      },

      {
        element: "#accesoTour",
        intro: "Botón para acceder al sistema",
      },
      // Add more steps as needed
    ],
  });
  intro.start();
};

const accesoSistema = async () => {
  $q.loading.show({
    spinner: QSpinnerBall,
    spinnerColor: "white",
    spinnerSize: 140,
    message: "Ingresando al sistema",
    messageColor: "white",
  });
  let resp = await accesoStore.doLogin(acceso.value);

  if (resp.success) {
    $q.notify({
      type: "positive",
      message: resp.data,
    });
    window.location =
      "http://sistema.ieenayarit.org:9472/#/?tokenE=" +
      localStorage.getItem("tokenE") +
      "&userNameL=" +
      localStorage.getItem("userNameL") +
      "&is_empleado=" +
      resp.empleado;
    /*window.location =
      "http://localhost:8081/#/?tokenE=" +
      localStorage.getItem("tokenE") +
      "&userNameL=" +
      localStorage.getItem("userNameL") +
      "&is_empleado=" +
      resp.empleado;*/
    //router.push({ name: "Principal" });
  } else {
    $q.notify({
      type: "negative",
      message: resp.data,
    });
  }

  $q.loading.hide();
};
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
