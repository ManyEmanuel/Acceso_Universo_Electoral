<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <div class="row items-start">
          <div
            v-for="item in listSistemas"
            :key="item.id"
            class="col-lg-4 col-md-6 col-sm-6 col-xs-12"
          >
            <q-card
              class="q-pa-lg text-white no-shadow items-stretch"
              transition-show="jump-down"
              transition-hide="jump-up"
              style="width: 100%; max-width: 80vw; height: 230px"
            >
              <q-card-actions style="object-fit: cover; height: 100%">
                <q-btn
                  class="col-12 col-xs-12 q-ma-sm full-height bg-pink"
                  :href="
                    item.url +
                    token +
                    '&sistema=' +
                    item.sistema_Id +
                    '&userNameL=' +
                    usr
                  "
                  no-caps
                >
                  <q-card-section horizontal>
                    <q-card-section class="col-10">
                      <div class="absolute-center text-h6">
                        {{ item.sistema }}
                      </div>
                    </q-card-section>
                    <q-card-section class="col-2 text-right">
                      <div class="">
                        <!-- <q-avatar size="80px" square>
                          <q-img
                            :src="require('../assets/' + items.logo + '.png')"
                          >
                          </q-img>
                        </q-avatar> -->
                      </div>
                    </q-card-section>
                  </q-card-section>
                  <div
                    class="absolute-bottom text-subtitle2 text-left q-pl-sm"
                    style="opacity: 0.5"
                  >
                    Versión 1.1
                  </div>
                  <div
                    class="absolute-bottom text-h6 text-right q-pr-sm"
                    style="opacity: 0.8"
                  >
                    <q-icon name="help" size="sm">
                      <q-tooltip>Descripción del sistema</q-tooltip>
                    </q-icon>
                  </div>
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useAccesoStore } from "../store/acceso_store";
import { EncryptStorage } from "storage-encryption";
const accesoStore = useAccesoStore();
const encryptStorage = new EncryptStorage("SECRET_KEY", "sessionStorage");
const usr = encryptStorage.decrypt("userNameL");
const token = encryptStorage.decrypt("tokenE");
const { listSistemas } = storeToRefs(accesoStore);
</script>
