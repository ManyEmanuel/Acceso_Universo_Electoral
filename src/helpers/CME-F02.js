import { api } from "src/boot/axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { storeToRefs } from "pinia";
//import { useRegistroStore } from "../store/registro_store";

//const registroStore = useRegistroStore();

//const { usuario } = storeToRefs(registroStore);

const ReporteCME02 = async () => {
  try {
    let doc = new jsPDF();
    let bodyUltimo = [["Preparatoria", "Conalep 169", "Titulo"]];
    let headUltimo = [
      "Último grado de estudios",
      "Nombre de la institución",
      "Documento Obtenido",
    ];
    let bodyPosgrado = [
      ["Maestria", "Instituto Estatal Electoral de Nayarit", "Titulo"],
      ["Doctorado", "Instituto Estatal Electoral de Nayarit", "Titulo"],
      ["Diplomado", "Instituto Estatal Electoral de Nayarit", "Titulo"],
    ];
    let headPosgrado = [
      "Estudios de posgrado",
      "Nombre de la institución",
      "Documento Obtenido",
    ];
    let bodyLaboral = [];
    let headLaboral = ["Cargo", "Institución", "Periodo"];
    let bodyActividad = [];
    let headActividad = [
      "Foro/Institución",
      "Titulo de la participación",
      "Fecha de impartición",
    ];
    let bodyPublicacion = [];
    let headPublicacion = [
      "Titulo de la publicación",
      "Autor",
      "Coautor",
      "Medio de publicación",
      "Fecha",
    ];
    let bodyParticipación = [];
    let headParticipacion = [
      "Nombre de la organización",
      "Cargo o actividad",
      "Integrante desde",
    ];

    jsPDF.autoTableSetDefaults({
      headStyles: { fillColor: [161, 55, 147], halign: "center" },
      styles: {
        halign: "center",
        valign: "middle",
        fontSize: 10,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
    });
    function createHeader() {
      let img = new Image();
      img.src = require("../assets/banner.png");
      let logo = new Image();
      logo.src = require("../assets/IEEN300.png");

      doc.addImage(img, "png", 0, 0, 210, 25);
      doc.addImage(logo, "png", 15, 20, 32, 18);

      doc.setFillColor(161, 55, 147);
      doc.rect(170, 25, 25, 7, "F");
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("CME-F02", 183, 30, null, null, "center");
    }

    function createFooter() {
      let pelo = new Image();
      pelo.src = require("../assets/Pelo2024.png");
      doc.addImage(pelo, "png", 160, 285, 45, 6);
    }

    //-----------------------------------------------------------------------------------------
    doc.setFillColor(161, 55, 147);
    doc.rect(0, 45, 210, 2, "F");
    doc.rect(0, 127, 210, 2, "F");
    //------------------------------------------------------------------------------------------/
    doc.setFillColor(255, 255, 255);
    doc.rect(75, 44, 60, 4, "F");
    doc.rect(75, 126, 60, 4, "F");
    doc.setFontSize(11);
    doc.setTextColor(161, 55, 147);
    doc.setFont("helvetica", "bold");
    doc.text("FORMATO CURRICULAR", 105, 47, null, null, "center");
    doc.text("FORMACIÓN ACADÉMICA", 105, 129, null, null, "center");

    //-------------------------------------------------------------------------------------------------/
    doc.setFillColor(161, 55, 147);
    doc.rect(35, 52, 140, 5, "F");
    doc.rect(35, 87, 140, 5, "F");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("DATOS PERSONALES", 105, 56, null, null, "center");
    doc.text("DATOS DE RESIDENCIA", 105, 91, null, null, "center");

    //---------------------------DATOS PERSONALES-------------------------------------------------------------------------------/
    doc.setFillColor(161, 55, 147);
    doc.setDrawColor(0);
    doc.rect(15, 62, 30, 5, "FD");
    doc.rect(105, 62, 30, 5, "FD");
    doc.rect(15, 67, 30, 5, "FD");
    doc.rect(105, 67, 30, 5, "FD");
    doc.rect(15, 72, 30, 5, "FD");
    doc.rect(105, 72, 30, 5, "FD");
    doc.rect(15, 77, 30, 5, "FD");
    doc.rect(105, 77, 30, 5, "FD");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(9);
    doc.text("Apellido paterno", 16, 66);
    doc.text("Apellido materno", 106, 66);
    doc.text("Nombre(s)", 16, 71);
    doc.text("CURP", 106, 76);
    doc.text("RFC", 16, 81);
    doc.text("Género", 106, 81);
    doc.setFontSize(8);
    doc.text("Lugar de nacimiento", 106, 71);
    doc.text("Fecha de nacimiento", 16, 76);

    //-----------------------------DATOS PERSONALES--------------------------------------------------------------------------------/
    doc.setFillColor(255, 255, 255);
    doc.rect(45, 62, 60, 5);
    doc.rect(135, 62, 60, 5);
    doc.rect(45, 67, 60, 5);
    doc.rect(135, 67, 60, 5);
    doc.rect(45, 72, 60, 5);
    doc.rect(135, 72, 60, 5);
    doc.rect(45, 77, 60, 5);
    doc.rect(135, 77, 60, 5);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Variable apellido paterno", 46, 66);
    doc.text("Variable apellido materno", 136, 66);
    doc.text("Variable Nombres", 46, 71);
    doc.text("Variable lugar de nacimiento", 136, 71);
    doc.text("Variable fecha de nacimiento", 46, 76);
    doc.text("Variable curp", 136, 76);
    doc.text("Variable rfc", 46, 81);
    doc.text("Variable genero", 136, 81);

    //----------------------------DATOS DE RESIDENCIA---------------------------------------------------------------------//
    doc.setFillColor(161, 55, 147);
    doc.setDrawColor(0);
    doc.rect(15, 97, 30, 5, "FD");
    doc.rect(105, 97, 30, 5, "FD");
    doc.rect(15, 102, 30, 5, "FD");
    doc.rect(105, 102, 30, 5, "FD");
    doc.rect(15, 107, 30, 5, "FD");
    doc.rect(105, 107, 30, 5, "FD");
    doc.rect(15, 112, 30, 5, "FD");
    doc.rect(105, 112, 30, 5, "FD");
    doc.rect(15, 117, 30, 5, "FD");
    doc.rect(105, 117, 30, 5, "FD");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(9);
    doc.text("Calle", 16, 101);
    doc.text("Municipio", 106, 101);
    doc.text("Número exterior", 16, 106);
    doc.text("Entidad Federativa", 106, 106);
    doc.text("Número interior", 16, 111);
    doc.text("Correo electrónico", 106, 111);
    doc.text("Colonia", 16, 116);
    doc.text("Teléfono particular", 106, 116);
    doc.text("C.P.", 16, 121);
    doc.text("Teléfono celular", 106, 121);

    //-----------------------------DATOS DE RESIDENCIA--------------------------------------------------------------------------------/
    doc.setFillColor(255, 255, 255);
    doc.rect(45, 97, 60, 5);
    doc.rect(135, 97, 60, 5);
    doc.rect(45, 102, 60, 5);
    doc.rect(135, 102, 60, 5);
    doc.rect(45, 107, 60, 5);
    doc.rect(135, 107, 60, 5);
    doc.rect(45, 112, 60, 5);
    doc.rect(135, 112, 60, 5);
    doc.rect(45, 117, 60, 5);
    doc.rect(135, 117, 60, 5);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Variable calle", 46, 101);
    doc.text("Variable municipio", 136, 101);
    doc.text("Variable numero exterior", 46, 106);
    doc.text("Variable entidad federativa", 136, 106);
    doc.text("Variable numero interior", 46, 111);
    doc.text("Variable correo electronico", 136, 111);
    doc.text("Variable colonia", 46, 116);
    doc.text("Variable telefono particular", 136, 116);
    doc.text("Variable c.p.", 46, 121);
    doc.text("Variable telefono celular", 136, 121);

    //----------------------------------------------------------------------------------------------------------------/
    autoTable(doc, {
      theme: "grid",
      startY: 135,
      head: [headUltimo],
      body: bodyUltimo,
      bodyStyles: { fontSize: 9 },
      willDrawPage: function (data) {
        createHeader();
      },
      didDrawPage: function () {
        createFooter();
      },
      margin: { top: 40 },
    });

    let finalY = doc.lastAutoTable.finalY;
    if (finalY >= 265) {
      doc.addPage();
      finalY = 30;
    }
    autoTable(doc, {
      theme: "grid",
      startY: finalY + 10,
      head: [headPosgrado],
      body: bodyPosgrado,
      bodyStyles: { fontSize: 9 },
      willDrawPage: function (data) {
        createHeader();
      },
      didDrawPage: function () {
        createFooter();
      },
      margin: { top: 40 },
    });

    finalY = doc.lastAutoTable.finalY;
    if (finalY >= 265) {
      doc.addPage();
      finalY = 30;
    } else {
      finalY = finalY + 10;
    }
    //_--------------------------------------------------------------------------------------------------------------------------//
    doc.setFillColor(161, 55, 147);
    doc.rect(0, finalY, 210, 2, "F");
    doc.setFillColor(255, 255, 255);
    doc.rect(50, finalY - 1, 110, 4, "F");
    doc.setFontSize(11);
    doc.setTextColor(161, 55, 147);
    doc.setFont("helvetica", "bold");
    doc.text(
      "TRAYECTORIA LABORAL/PROFESIONAL/EMPRESARIAL\nEN EL SECTOR PÚBLICO Y/O PRIVADO",
      105,
      finalY - 1,
      null,
      null,
      "center"
    );

    autoTable(doc, {
      theme: "grid",
      startY: finalY + 10,
      head: [headLaboral],
      body: bodyLaboral,
      bodyStyles: { fontSize: 9 },
      willDrawPage: function (data) {
        createHeader();
      },
      didDrawPage: function () {
        createFooter();
      },
      margin: { top: 40 },
    });
    finalY = doc.lastAutoTable.finalY;
    if (finalY >= 265) {
      doc.addPage();
      finalY = 30;
    } else {
      finalY = finalY + 10;
    }

    //-------------------------------------------------------------------------------------------------------------------------------//

    doc.setFillColor(161, 55, 147);
    doc.rect(0, finalY, 210, 2, "F");
    doc.setFillColor(255, 255, 255);
    doc.rect(45, finalY - 1, 120, 4, "F");
    doc.setFontSize(11);
    doc.setTextColor(161, 55, 147);
    doc.setFont("helvetica", "bold");
    doc.text(
      "ACTIVIDAD DOCENTE, PARTICIPACIONES EN CONFERENCIAS,\nPONENCIAS, SIMILARES",
      105,
      finalY - 1,
      null,
      null,
      "center"
    );
    doc.setDrawColor(0);
    doc.setFillColor(161, 55, 147);
    doc.rect(155, finalY + 10, 30, 10, "FD");
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(0);
    doc.rect(185, finalY + 10, 11, 10, "FD");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Ninguno", 157, finalY + 16);

    autoTable(doc, {
      theme: "grid",
      startY: finalY + 20,
      head: [headActividad],
      body: bodyLaboral,
      bodyStyles: { fontSize: 9 },
      willDrawPage: function (data) {
        createHeader();
      },
      didDrawPage: function () {
        createFooter();
      },
      margin: { top: 40 },
    });
    finalY = doc.lastAutoTable.finalY;
    if (finalY >= 255) {
      doc.addPage();
      finalY = 30;
    } else {
      finalY = finalY + 10;
    }

    //--------------------------------------------------------------------------------------
    doc.setFillColor(161, 55, 147);
    doc.rect(0, finalY, 210, 2, "F");
    doc.setFillColor(255, 255, 255);
    doc.rect(80, finalY - 1, 50, 4, "F");
    doc.setFontSize(11);
    doc.setTextColor(161, 55, 147);
    doc.setFont("helvetica", "bold");
    doc.text("PUBLICACIONES", 105, finalY + 1, null, null, "center");
    finalY = finalY + 10;
    if (finalY >= 255) {
      doc.addPage();
      finalY = 30;
    }

    doc.setDrawColor(0);
    doc.setFillColor(161, 55, 147);
    doc.rect(155, finalY + 10, 30, 10, "FD");
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(0);
    doc.rect(185, finalY + 10, 11, 10, "FD");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Ninguno", 157, finalY + 16);
    autoTable(doc, {
      theme: "grid",
      startY: finalY + 20,
      head: [headPublicacion],
      body: bodyPublicacion,
      bodyStyles: { fontSize: 9 },
      willDrawPage: function (data) {
        createHeader();
      },
      didDrawPage: function () {
        createFooter();
      },
      margin: { top: 40 },
    });
    finalY = doc.lastAutoTable.finalY;
    if (finalY >= 255) {
      doc.addPage();
      finalY = 30;
    } else {
      finalY = finalY + 10;
    }
    //------------------------------------------------------------------------------
    doc.setFillColor(161, 55, 147);
    doc.rect(0, finalY, 210, 2, "F");
    doc.setFillColor(255, 255, 255);
    doc.rect(40, finalY - 1, 130, 4, "F");
    doc.setFontSize(11);
    doc.setTextColor(161, 55, 147);
    doc.setFont("helvetica", "bold");
    doc.text(
      "PARTICIPACIÓN COMUNITARIA O CIUDADANA, ORGANIZACIONES\nSOCIALES A LAS QUE PERTENEZCA O PERTENECIERA\nY EL CARÁCTER DE PARTICIPACIÓN",
      105,
      finalY - 2,
      null,
      null,
      "center"
    );
    finalY = finalY + 10;
    if (finalY >= 255) {
      doc.addPage();
      finalY = 30;
    }
    doc.setDrawColor(0);
    doc.setFillColor(161, 55, 147);
    doc.rect(155, finalY + 10, 30, 10, "FD");
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(0);
    doc.rect(185, finalY + 10, 11, 10, "FD");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Ninguno", 157, finalY + 16);
    autoTable(doc, {
      theme: "grid",
      startY: finalY + 20,
      head: [headParticipacion],
      body: bodyParticipación,
      bodyStyles: { fontSize: 9 },
      willDrawPage: function (data) {
        createHeader();
      },
      didDrawPage: function () {
        createFooter();
      },
      margin: { top: 40 },
    });
    finalY = doc.lastAutoTable.finalY;
    if (finalY >= 255) {
      doc.addPage();
      finalY = 40;
    } else {
      finalY = finalY + 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text(
      "Estado: Nayarit, Municipio: ____________________________________ a ______ de ______________________ del 2023",
      25,
      finalY
    );
    doc.line(25, finalY + 25, 184, finalY + 25);
    doc.setFontSize(9);
    doc.text(
      "Nombre y firma del aspirante a Consejera/o Municipal Electoral.",
      105,
      finalY + 30,
      null,
      null,
      "center"
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Variable del Nombre de aspirante",
      105,
      finalY + 23,
      null,
      null,
      "center"
    );
    doc.text("Variable Municipio", 90, finalY, null, null, "center");
    doc.text("DD", 127, finalY, null, null, "center");
    doc.text("Variable mes", 153, finalY, null, null, "center");

    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    doc.save("Prueba-CME-F02.pdf");
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
    };
  }
};
export default ReporteCME02;
