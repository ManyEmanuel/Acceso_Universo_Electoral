import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useRoute } from "vue-router";
import { EncryptStorage } from "storage-encryption";
const route = useRoute();
const encryptStorage = new EncryptStorage("SECRET_KEY", "sessionStorage");

export const isAuthenticatedGuard = async (to, from, next) => {
  const token = encryptStorage.decrypt("tokenE");
  if (token != null && token != "") {
    const resp = await api.get("/Accesos/ValidarToken?token=" + token);
    let { success } = resp.data;
    if (success == true) {
      let acceso = await checkToken();
      await removeToken();
      next({ name: "login" });
      /*if (acceso == true) {
        next({ name: "Principal" });
      } else {
        await removeToken();
        next({ name: "login" });
      }*/
    } else {
      await removeToken();
    }
  } else {
    next();
  }
};

export const checkToken = async () => {
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  const regreso = urlParams.get("return");
  if (regreso != null) {
    if (regreso == "false") {
      return false;
    } else if (regreso == "true") {
      return true;
    }
  } else {
    return true;
  }
};

export const removeToken = async () => {
  encryptStorage.remove("tokenE");
  encryptStorage.remove("userNameL");
};

export const useAccesoStore = defineStore("acceso", {
  state: () => ({
    acceso: {
      usuario: null,
      password: null,
    },
    listSistemas: [],
  }),
  actions: {
    async doLogin(acceso) {
      try {
        let resp = await api.post("/Accesos", acceso);
        if (resp.status == 200) {
          console.log("Este es el resp.data del usuario", resp.data);
          let {
            token,
            userName,
            is_Empleado,
            usuario_Id,
            candidato_Id,
            empleado_Id,
          } = resp.data;
          if (token != undefined && token != "") {
            await this.setToken(token, userName);
            //localStorage.setItem("tokenE", token);
            return {
              success: true,
              data: "Bienvenido al universo IEEN",
              empleado: is_Empleado,
              usuario_Id: usuario_Id,
              candidato_Id: candidato_Id,
              empleado_Id: empleado_Id,
            };
          } else {
            return {
              success: false,
              data: "Error al iniciar sesión, intente de nuevo",
            };
          }
        } else {
          return {
            success: false,
            data: "Usuario/Contraseña incorrectos",
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadSistema() {
      try {
        let resp = await api.get("/SistemasUsuarios/ByUSuario");
        let { data } = resp.data;
        let listaSistemas = data.map((sistema) => {
          return {
            id: sistema.id,
            sistema_Id: sistema.sistema_Id,
            sistema: sistema.sistema,
            accede: sistema.accede,
            //url: "http://192.168.0.139:8082/#/?key=",
            url: sistema.url + "#/?key=",
          };
        });
        this.listSistemas = listaSistemas;
      } catch (error) {
        console.log(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async loadPermisos() {
      try {
        let resp = await api.get("/SistemasUsuarios/ByUSuario");
        let { data } = resp.data;
        if (data.length > 0) {
          return { success: true };
        } else {
          return { success: false };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async createAcceso(id) {
      try {
        let resp = await api.post("/SistemasUsuarios", {
          sistema_Id: 3,
          perfil_Id: 5,
          usuario_Id: id,
          accede: true,
        });
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success === true) {
            let crearPermiso = await this.createPermiso(3, 5, id);
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

    async setToken(token, userName) {
      encryptStorage.encrypt("tokenE", token);
      encryptStorage.encrypt("userNameL", userName);
      //localStorage.setItem("tokenE", token);
      //localStorage.setItem("userNameL", userName);
    },

    async removeToken() {
      encryptStorage.remove("tokenE");
      encryptStorage.remove("userNameL");

      /*localStorage.removeItem("tokenE");
      localStorage.removeItem("userNameL");*/
    },
  },
});
