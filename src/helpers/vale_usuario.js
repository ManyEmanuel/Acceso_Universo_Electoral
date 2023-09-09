import { api } from "src/boot/axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { storeToRefs } from "pinia";
import { useRegistroStore } from "../store/registro_store";

const registroStore = useRegistroStore();

const { usuario } = storeToRefs(registroStore);

const Reporte = async (pass, user) => {
  try {
    let img = new Image();
    img.src = require("../assets/IEEN300.png");
    const doc = new jsPDF();
    doc.addImage(img, "png", 10, 8, 35, 20);
    doc.rect(10, 30, 190, 100);
    doc.setFontSize(9);
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(
      "INSTITUTO ESTATAL ELECTORAL DE NAYARIT \n" +
        "FORMATO DE GENERACIÓN DE USUARIO",
      105,
      35,
      null,
      null,
      "center"
    );
    doc.setDrawColor(0);
    doc.setFillColor(236, 231, 230);
    doc.rect(40, 45, 130, 7, "F");
    doc.rect(40, 60, 130, 7, "F");
    doc.rect(40, 75, 130, 7, "F");
    doc.rect(40, 90, 130, 7, "F");
    doc.text(
      usuario.value.nombres +
        " " +
        usuario.value.apellido_Paterno +
        " " +
        usuario.value.apellido_Materno,
      105,
      50,
      null,
      null,
      "center"
    );
    doc.text("Titular", 105, 56, null, null, "center");
    doc.text(user, 105, 65, null, null, "center");
    doc.text("Nombre de usuario", 105, 71, null, null, "center");
    doc.text(pass, 105, 80, null, null, "center");
    doc.text("Contraseña", 105, 86, null, null, "center");
    doc.text(
      "http://sistema.ieenayarit.org:9471/",
      105,
      95,
      null,
      null,
      "center"
    );
    doc.text("Dirección de acceso al sistema", 105, 101, null, null, "center");
    doc.setFontSize(8);
    doc.text(
      "Le informamos que la Unidad Técnica de Informática y Estadística, así como las demás áreas del Instituto \n" +
        "nunca le solicitarán su contraseña por teléfono o por correo electrónico. \n" +
        "Ratifico entender y acepto las políticas de uso de la cuenta de acceso al sistema asignado.",
      105,
      115,
      null,
      null,
      "center"
    );
    /*
        doc.rect(40, 55, 130, 7, "F");
    doc.rect(40, 70, 130, 7, "F");
    doc.text(user, 105, 60, null, null, "center");
    doc.text("Nombre de usuario", 105, 67, null, null, "center");
    doc.text(pass, 105, 75, null, null, "center");
    doc.text("Contraseña", 105, 82, null, null, "center");
    */
    doc.save(
      usuario.value.apellido_Paterno +
        "_" +
        usuario.value.apellido_Materno +
        ".pdf"
    );
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
    };
  }
};
export default Reporte;

/*const ReporteUsuario = async(usr,psw, tipo) =>{
  let now = moment().format("DD/MM/YYYY");
  let nombre = null
  if(tipo == ""){
    const{label} = NombreEmpleado.value
    nombre = label
  }else{
    nombre = tipo
  }

  let resp = await cargaImagen()
  const doc = new jsPDF();
  doc.addImage(resp, 'png', 10, 3, 35, 20)
  doc.addImage(resp, 'png', 10, 138, 35, 20)
    doc.rect(10, 25, 190, 90);
    doc.rect(10, 160, 190, 110);
    doc.setFont("times", "normal");
    doc.setFontSize(15)
    doc.text("ACUSE DE RECIBO DE LA CUENTA DE ACCESO AL \n" + "UNIVERSO IEEN", 105, 30, null, null, "center");
    doc.text("DATOS DE LA CUENTA DE ACCESO AL \n" + "UNIVERSO IEEN", 105, 165, null, null, "center");
    //doc.rect(10, 130, 190, 110);
    doc.setDrawColor(0);
    doc.setFillColor(236, 231, 230);
    doc.rect(40, 45, 130, 7, "F");
    doc.rect(40, 65, 130, 7, "F");
    doc.setFontSize(12)
    doc.setFont("times", "normal");
    doc.text(nombre, 105, 49, null, null, "center");
    doc.text("Nombre", 105, 55, null, null, "center");
    doc.text(usr, 105, 69, null, null, "center");
    doc.text("Nombre de usuario", 105, 75, null, null, "center");
    doc.setFontSize(8)
    doc.text("Le informamos que la Unidad Técnica de Informática y Estadística, así como las demás áreas del Instituto \n"
    + "nunca le solicitarán su contraseña por teléfono o por correo electrónico. \n" +
    "Ratifico entender y acepto las políticas de uso de la cuenta de acceso al sistema asignado.", 105, 85, null, null, "center");
    doc.setFontSize(12)
    doc.text("Firma", 15, 110);
    doc.line(30, 110, 90, 110);
    doc.text("Fecha " + now, 195, 110, null, null, "right");
    doc.setDrawColor(0);
    doc.setFillColor(236, 231, 230);
    doc.rect(40, 180, 130, 7, "F");
    doc.rect(40, 195, 130, 7, "F");
    doc.rect(40, 210, 130, 7, "F");
    doc.rect(40, 225, 130, 7, "F");
    doc.setFontSize(12)
    doc.setFont("times", "normal");
    doc.text(nombre, 105, 184, null, null, "center");
    doc.text("Titular", 105, 190, null, null, "center");
    doc.text(usr, 105, 199, null, null, "center");
    doc.text("Nombre de usuario", 105, 205, null, null, "center");
    doc.text(psw, 105, 214, null, null, "center");
    doc.text("Contraseña", 105, 220, null, null, "center");
    doc.text("http://sistema.ieenayarit.org:9271/", 105, 229, null, null, "center");
    doc.text("Dirección de acceso al sistema", 105, 235, null, null, "center");
    doc.setFontSize(8)
    doc.text("Para realizar el cambio de contraseña: \n" +"Le informamos que la Unidad Técnica de Informática y Estadística, así como las demás áreas del Instituto \n"
    + "nunca le solicitarán su contraseña por teléfono o por correo electrónico. \n" +
    "Ratifico entender y acepto las políticas de uso de la cuenta de acceso al sistema asignado.", 105, 250, null, null, "center");
    doc.setLineDash([2.5]);
    doc.line(5, 130, 205, 130);

    doc.save( nombre +".pdf");
    console.log("Si entro al reporte")
}*/
