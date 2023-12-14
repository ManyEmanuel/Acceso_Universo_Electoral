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
          console.log("Esta es la respuesta", resp.data);
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

    async createAcceso(id) {
      try {
        let resp = await api.post("/SistemasUsuarios", {
          sistema_Id: 7,
          perfil_Id: 4,
          usuario_Id: id,
          accede: true,
        });
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            let crearPermiso = await this.createPermiso(7, 4, id);
            let { successP, dataP } = crearPermiso;
            return { successP, dataP };
          } else {
            return {
              success: false,
              data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
            };
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

    async createPermiso(sistema, perfil, id) {
      try {
        let resp = await api.get("/Modulos");
        let { data } = resp.data;
        let filtroModulos = data.filter((x) => x.sistema_Id == sistema);
        let respP = await api.get(
          `/PermisosModulosPerfiles/ByPerfil/${perfil}`
        );
        let modulosPermisos = respP.data.data;

        let listadoPermisosModulo = modulosPermisos.filter((item) => {
          return filtroModulos.some((a) => a.id == item.modulo_Id);
        });
        let bandera = 0;

        if (listadoPermisosModulo.length > 0) {
          for (let permiso of listadoPermisosModulo) {
            let reg = await api.post(`/PermisosModulosUsuarios`, {
              modulo_Id: permiso.modulo_Id,
              usuario_Id: id,
              registrar: permiso.registrar,
              actualizar: permiso.actualizar,
              eliminar: permiso.eliminar,
              leer: permiso.leer,
            });
            if (reg.status == 200) {
              let succe = reg.data.success;
              if (succe === true) {
                bandera = bandera + 1;
              }
            }
          }
          if (bandera > 0) {
            if (bandera == listadoPermisosModulo.length) {
              return { successP: true, dataP: "Todos los permisos guardados" };
            } else {
              return {
                successP: true,
                dataP: "Algunos permisos no fueron guardados",
              };
            }
          } else {
            return { successP: false, dataP: "Error al guardar los permisos" };
          }
        } else {
          return { successP: false, dataP: "Sistema sin modulos registrados" };
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
