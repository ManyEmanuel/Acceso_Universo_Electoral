import { api } from "src/boot/axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { storeToRefs } from "pinia";
//import { useRegistroStore } from "../store/registro_store";

//const registroStore = useRegistroStore();

//const { usuario } = storeToRefs(registroStore);

const ReporteCME01 = async () => {
  try {
    let img = new Image();
    img.src = require("../assets/banner.png");
    let logo = new Image();
    logo.src = require("../assets/IEEN300.png");
    let pelo = new Image();
    pelo.src = require("../assets/Pelo2024.png");
    const doc = new jsPDF();
    doc.addImage(img, "png", 0, 0, 210, 25);
    doc.addImage(logo, "png", 25, 20, 32, 18);
    doc.addImage(pelo, "png", 160, 285, 45, 6);
    doc.roundedRect(160, 20, 24, 28, 3, 3);
    doc.setFillColor(161, 55, 147);
    doc.rect(160, 50, 24, 7, "F");
    doc.rect(0, 72, 210, 2, "F");
    doc.rect(0, 130, 210, 2, "F");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("CME-F01", 172, 55, null, null, "center");
    //------------------------------------------------------------------------------
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Solicitud de registro para el procedimiento de designación de las consejerías municipales de\nlos Consejos Municipales Electorales para el Proceso Electoral Local Ordinario 2024.",
      25,
      62
    );
    //---------------------------------------------------------------------------------
    doc.setFillColor(255, 255, 255);
    doc.rect(65, 71, 80, 4, "F");
    doc.rect(80, 129, 50, 4, "F");
    doc.setFontSize(11);
    doc.setTextColor(161, 55, 147);
    doc.setFont("helvetica", "bold");
    doc.text(
      "IDENTIFICACIÓN DE EL O LA ASPIRANTE",
      105,
      74,
      null,
      null,
      "center"
    );
    doc.text("DOMICILIO ACTUAL", 105, 132, null, null, "center");
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
    doc.setDrawColor(0);
    doc.rect(25, 80, 40, 5, "FD");
    doc.rect(25, 85, 40, 5, "FD");
    doc.rect(25, 90, 40, 5, "FD");
    doc.rect(25, 95, 40, 5, "FD");
    doc.rect(80, 95, 40, 5, "FD");
    doc.rect(25, 100, 40, 12, "FD");
    doc.rect(80, 100, 40, 12, "FD");
    doc.rect(25, 112, 40, 12, "FD");
    doc.rect(80, 112, 40, 12, "FD");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bolditalic");
    doc.text("Apellido Paterno", 27, 84);
    doc.text("Apellido Materno", 27, 89);
    doc.text("Nombre(s)", 27, 94);
    doc.text("Edad", 27, 99);
    doc.text("Género", 82, 99);
    doc.setFontSize(8);
    doc.text(
      "Se auto describe como\nintegrante de alguno de los\npueblos originarios",
      27,
      103
    );
    doc.text("Indique a cuál etnia\nindígena pertenece", 82, 103);
    doc.text("¿Eres persona con\ndiscapacidad?", 27, 115);
    doc.text("¿Cuál?", 82, 118);

    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    doc.rect(65, 80, 119, 5);
    doc.rect(65, 85, 119, 5);
    doc.rect(65, 90, 119, 5);
    doc.rect(65, 95, 15, 5);
    doc.rect(120, 95, 64, 5);
    doc.rect(65, 100, 15, 12);
    doc.rect(120, 100, 64, 12);
    doc.rect(65, 112, 15, 12);
    doc.rect(120, 112, 64, 12);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Variable apellido paterno", 67, 84);
    doc.text("Variable apellido materno", 67, 89);
    doc.text("Variable nombre", 67, 94);
    doc.text("##", 70, 99);
    doc.text("Variable Genero", 122, 99);
    doc.text("S/N", 70, 107);
    doc.text("Variable etnia", 122, 107);
    doc.text("S/N", 70, 119);
    doc.text("Variable discapacidad", 122, 119);

    //-----------------------------------------------------------------------------------------------------------------------------
    doc.setFillColor(161, 55, 147);
    doc.rect(25, 140, 40, 5, "FD");
    doc.rect(25, 145, 40, 5, "FD");
    doc.rect(105, 145, 40, 5, "FD");
    doc.rect(25, 150, 40, 5, "FD");
    doc.rect(25, 155, 40, 5, "FD");
    doc.rect(25, 160, 40, 5, "FD");
    doc.rect(25, 165, 40, 5, "FD");
    doc.rect(25, 170, 40, 5, "FD");
    doc.rect(105, 170, 40, 5, "FD");
    doc.rect(25, 175, 40, 5, "FD");
    doc.rect(25, 180, 80, 5, "FD");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bolditalic");
    doc.text("Calle", 27, 144);
    doc.text("Número exterior", 27, 149);
    doc.text("Número interior", 107, 149);
    doc.text("Colonia", 27, 154);
    doc.text("Municipio", 27, 159);
    doc.text("Entidad", 27, 164);
    doc.text("C.P.", 27, 169);
    doc.text("Teléfono particular", 27, 174);
    doc.text("Teléfono celular", 107, 174);
    doc.text("Correo electrónico", 27, 179);
    doc.text("Municipio en el que desea postularse", 27, 184);

    //---------------------------------------------------------------------------------------------------------------------------
    doc.rect(65, 140, 119, 5);
    doc.rect(65, 145, 40, 5);
    doc.rect(145, 145, 39, 5);
    doc.rect(65, 150, 119, 5);
    doc.rect(65, 155, 119, 5);
    doc.rect(65, 160, 119, 5);
    doc.rect(65, 165, 119, 5);
    doc.rect(65, 170, 40, 5);
    doc.rect(145, 170, 39, 5);
    doc.rect(65, 175, 119, 5);
    doc.rect(105, 180, 79, 5);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Variable calle", 67, 144);
    doc.text("Variable exterior", 67, 149);
    doc.text("Variable interior", 147, 149);
    doc.text("Variable colonio", 67, 154);
    doc.text("Variable municipio", 67, 159);
    doc.text("Variable entidad", 67, 164);
    doc.text("Variable c.p.", 67, 169);
    doc.text("Variable particular", 67, 174);
    doc.text("Variable celular", 147, 174);
    doc.text("Variable correo electronico", 67, 179);
    doc.text("Variable municipio", 107, 184);

    //----------------------------------------------------------------------------------------------------------------------

    doc.setFont("helvetica", "italic");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(
      "Solicito ser considerada (o) como aspirante para ocupar el cargo de Consejera o Consejero Municipal\nElectoral del Instituto Estatal Electoral del Estado de Nayarit conforme a las bases publicadas en la\nconvocatoria correspondiente",
      25,
      195
    );
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text(
      "Estado: Nayarit, Municipio: ____________________________________ a ______ de ______________________ del 2023",
      25,
      215
    );
    doc.line(25, 240, 184, 240);
    doc.setFontSize(9);
    doc.text(
      "Nombre y firma del aspirante a Consejera/o Municipal Electoral.",
      105,
      245,
      null,
      null,
      "center"
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Variable del Nombre de aspirante",
      105,
      238,
      null,
      null,
      "center"
    );
    doc.text("Variable Municipio", 90, 215, null, null, "center");
    doc.text("DD", 127, 215, null, null, "center");
    doc.text("Variable mes", 153, 215, null, null, "center");

    doc.save("CME-F01.pdf");
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
    };
  }
};
export default ReporteCME01;
