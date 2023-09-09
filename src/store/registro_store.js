import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useRegistroStore = defineStore("registro", {
  state: () => ({
    usuario: {
      foto: null,
      nombres: null,
      apellido_Paterno: null,
      apellido_Materno: null,
      municipio_Id: null,
      clave_Elector: null,
      sexo: null,
      sa: null,
      userName: null,
      email: null,
      phoneNumber: null,
      id: null,
    },
  }),
  actions: {
    initUsuario() {
      this.usuario.foto = null;
      this.usuario.nombres = null;
      this.usuario.apellido_Paterno = null;
      this.usuario.apellido_Materno = null;
      this.usuario.municipio_Id = null;
      this.usuario.clave_Elector = null;
      this.usuario.sexo = null;
      this.usuario.sa = null;
      this.usuario.userName = null;
      this.usuario.email = null;
      this.usuario.phoneNumber = null;
      this.usuario.id = null;
    },

    async createUsuario(usuario) {
      try {
        let resp = await api.post(`/Usuarios`, usuario, {
          headers: {
            "Content-Type": `"multipart/form-data";
              `,
          },
        });
        if (resp.status == 200) {
          const { success, data, password } = resp.data;
          if (success === true) {
            return { success, data, password };
          } else {
            return { success, data };
          }
        } else {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      } catch (error) {
        console.error(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
  },
});
