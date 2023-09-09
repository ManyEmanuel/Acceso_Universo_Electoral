<template>
  <q-layout>
    <img src="~assets/FondoNuevo.png" class="wave" />
    <div class="row" style="height: 98vh">
      <div class="col-0 col-md-6 flex justify-center content-center q-pa-xl">
        <img
          :src="
            $q.dark.mode == false
              ? require('../../../assets/LogoUniverso.png')
              : require('../../../assets/LogoUniversoBlanco.png')
          "
          class="responsive"
          alt="Logo institucional"
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
            <div class="q-pt-lg">
              <div class="col text-h6 ellipsis flex justify-center">
                <h2
                  class="text-h6 text-uppercase q-my-none text-weight-regular"
                >
                  Registro<br />
                </h2>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form ref="ResetRegistro" class="q-gutter-md" @submit="onSubmit">
              <div class="row">
                <div class="col-12" id="nombreTour">
                  <q-input
                    v-model="usuario.nombres"
                    label="Nombre(s)"
                    color="accent"
                    :rules="[(val) => !!val || 'Por favor ingrese su nombre']"
                  >
                  </q-input>
                </div>
                <div class="col-12" id="apellidoPTour">
                  <q-input
                    v-model="usuario.apellido_Paterno"
                    label="Apellido paterno"
                    color="accent"
                    :rules="[
                      (val) => !!val || 'Por favor ingrese su apellido paterno',
                    ]"
                  >
                  </q-input>
                </div>
                <div class="col-12" id="apellidoMTour">
                  <q-input
                    v-model="usuario.apellido_Materno"
                    label="Apellido materno"
                    color="accent"
                    :rules="[
                      (val) => !!val || 'Por favor ingrese su apellido materno',
                    ]"
                  >
                  </q-input>
                </div>
                <div class="col-12" id="fotoTour">
                  <q-file
                    color="purple-12"
                    v-model="fotoFile"
                    label="Fotografía"
                    hint="Si desea, puede agregar su fotografía"
                    accept="image/jpeg,image/png, image/jpg"
                  >
                    <template v-slot:prepend>
                      <q-icon name="photo_camera" />
                    </template>
                  </q-file>
                </div>
                <div class="col-12" id="telefonoTour">
                  <q-input
                    v-model="usuario.phoneNumber"
                    label="Teléfono"
                    color="accent"
                    mask="(###) ### - ####"
                    unmasked-value
                    :rules="[(val) => !!val || 'El télefono es requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12" id="emailTour">
                  <q-input
                    v-model="usuario.email"
                    label="Correo electrónico"
                    type="email"
                    color="accent"
                    bottom-slots
                    :rules="[validateEmail]"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-12" id="emailVTour">
                  <q-input
                    bottom-slots
                    v-model="correoVerificacion"
                    label="Confirmar correo electrónico"
                    color="accent"
                    type="email"
                    :rules="[
                      (val) =>
                        !!val || 'Por favor verificar correo electrónico',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon
                        v-if="correoVerificacion != ''"
                        :name="verificacionEstatus == false ? 'close' : 'check'"
                        :class="
                          verificacionEstatus == false
                            ? 'cursor-pointer text-red'
                            : 'cursor-pointer text-green'
                        "
                      />
                    </template>

                    <template v-slot:hint>
                      <div v-if="correoVerificacion != ''">
                        {{
                          verificacionEstatus == false
                            ? "Los correos no coinciden"
                            : "Los correos coinciden"
                        }}
                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="col-12" id="electorTour">
                  <q-input
                    v-model="usuario.clave_Elector"
                    label="Clave de elector"
                    color="accent"
                    counter
                    maxlength="18"
                    mask="XXXXXXXXXXXXXXXXXX"
                  ></q-input>
                </div>
                <div class="col-12" id="generoTour">
                  <q-select
                    v-model="usuario.sexo"
                    :options="genero"
                    label="Género"
                    :rules="[
                      (val) => !!val || 'Por favor especifique su género',
                    ]"
                  >
                  </q-select>
                </div>
              </div>
              <div class="q-gutter-md q-pa-xs" id="guardarTour">
                <q-btn
                  class="col-6"
                  color="accent"
                  label="Guardar"
                  type="submit"
                ></q-btn>
                <q-btn
                  class="col-6"
                  color="accent"
                  label="Cancelar"
                  @click="actualizarModal()"
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
    <q-dialog v-model="confirmacionDatosDialog">
      <div id="confirmacionTour">
        <q-card style="width: 500px">
          <q-toolbar class="bg-purple-6 text-white text-center">
            <q-avatar>
              <img src="../../../assets/perfilieen.jpg" />
            </q-avatar>
            <q-toolbar-title> Verifique sus datos </q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <div class="text-justify text-subtitle2">
              ¿Sus datos son correctos?. Recuerde que estos serán parte de su
              registro de postulación, y su correo electrónico el medio de
              acceso y notificación del sistema.
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn
              color="negative"
              label="Cancelar"
              @click="confirmacionDatosDialog = false"
            />
            <q-btn color="positive" label="Guardar" @click="guardarDatos()" />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
  </q-layout>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useQuasar, QSpinnerBall } from "quasar";
import { useRegistroStore } from "../../../store/registro_store";
import Reporte from "../../../helpers/vale_usuario";
import introJs from "intro.js";
import "intro.js/introjs.css";
//import ReporteHotel from "../../../helpers/ListadoHotel";

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
        element: "#nombreTour",
        intro: "Ingrese su nombre o nombres",
      },
      {
        element: "#apellidoPTour",
        intro:
          "Ingrese su apellido paterno, en caso de no tener uno registrado, coloque una X como en su credencial de elector",
      },
      {
        element: "#apellidoMTour",
        intro:
          "Ingrese su apellido materno, en caso de no tener uno registrado, coloque una X como en su credencial de elector",
      },
      {
        element: "#fotoTour",
        intro: "Cargue una foto en formato JEPG, JPG o PNG",
      },
      {
        element: "#telefonoTour",
        intro: "Registre su número celular a 10 dígitos",
      },
      {
        element: "#emailTour",
        intro:
          "Registre su correo electrónico, considere que este será su acceso a su cuenta",
      },
      {
        element: "#emailVTour",
        intro:
          "Verificación del correo electrónico, tiene que coincidir con el anterior para continuar",
      },
      {
        element: "#electorTour",
        intro: "Ingrese los 18 caracteres de su Clave de Elector",
      },
      {
        element: "#generoTour",
        intro: "Seleccione la opción deseada",
      },
      {
        element: "#guardarTour",
        intro:
          "Botón guardar, para confirmar datos y registrar su cuenta de usuario",
      },
      // Add more steps as needed
    ],
  });
  intro.start();
};
const registroStore = useRegistroStore();
const router = useRouter();
const $q = useQuasar();
const { usuario } = storeToRefs(registroStore);
const genero = ref(["Masculino", "Femenino", "No binario"]);
const correoVerificacion = ref("");
const verificacionEstatus = ref(false);
const confirmacionDatosDialog = ref(false);
const ResetRegistro = ref();
const fotoFile = ref(null);

watch(correoVerificacion, (val) => {
  if (val != null) {
    if (val == usuario.value.email) {
      verificacionEstatus.value = true;
    } else {
      verificacionEstatus.value = false;
    }
  }
});

const validateEmail = (value) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(value)) {
    return "Ingrese un formato de correo válido";
  }
};

const actualizarModal = () => {
  registroStore.initUsuario();
  confirmacionDatosDialog.value = false;
  correoVerificacion.value = "";
  verificacionEstatus.value = false;
  $q.loading.show({
    spinner: QSpinnerBall,
    spinnerColor: "white",
    spinnerSize: 140,
    message: "Redireccionando al login",
    messageColor: "white",
  });
  router.push({ name: "login" });
  $q.loading.hide();
};

const onSubmit = async () => {
  confirmacionDatosDialog.value = true;
};

const guardarDatos = async () => {
  confirmacionDatosDialog.value = false;
  let resp = null;
  $q.loading.show({
    spinner: QSpinnerBall,
    spinnerColor: "white",
    spinnerSize: 140,
    message: "Generando usuario",
    messageColor: "white",
  });
  usuario.value.email.trim();

  if (verificacionEstatus.value == true) {
    if (usuario.value.nombres != null) {
      usuario.value.nombres.trim();
    }
    if (usuario.value.apellido_Paterno != null) {
      usuario.value.apellido_Paterno.trim();
    }
    if (usuario.value.apellido_Materno != null) {
      usuario.value.apellido_Materno.trim();
    }
    let bodyFormData = new FormData();
    bodyFormData.append("Foto", fotoFile.value);
    bodyFormData.append("nombres", usuario.value.nombres);
    bodyFormData.append("apellido_Paterno", usuario.value.apellido_Paterno);
    bodyFormData.append("apellido_Materno", usuario.value.apellido_Materno);
    if (usuario.value.clave_Elector == null) {
      bodyFormData.append("clave_Elector", null);
    } else {
      bodyFormData.append("clave_Elector", usuario.value.clave_Elector);
    }
    bodyFormData.append("sexo", usuario.value.sexo);
    bodyFormData.append("userName", usuario.value.email);
    bodyFormData.append("email", usuario.value.email);
    bodyFormData.append("phoneNumber", usuario.value.phoneNumber);
    resp = await registroStore.createUsuario(bodyFormData);
    if (resp.data.length == 1) {
      resp.data = "Correo electronico ya registrado a otro usuario";
    }
    if (resp.success) {
      await generarVale(resp.password, usuario.value.email);
      $q.notify({
        type: "positive",
        message: resp.data,
      });
      actualizarModal();
      ResetRegistro.value.resetValidation();
    } else {
      $q.notify({
        type: "negative",
        message: resp.data,
      });
      //loading.value = false;
    }
  } else {
    $q.notify({
      type: "negative",
      message: "Los correos no coinciden",
    });
  }

  $q.loading.hide();
};

const generarVale = async (pass, user) => {
  Reporte(pass, user);
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
