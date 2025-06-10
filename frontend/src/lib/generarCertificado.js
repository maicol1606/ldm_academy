import { jsPDF } from "jspdf";

export default function generarCertificado(nombre, apellido, identificacion) {
    const doc = new jsPDF();
    const marginLeft = 20;
    let currentHeight = 20;

    // Título principal
    doc.setFontSize(20);
    doc.setTextColor(0, 40, 85); // color #002855
    doc.setFont("helvetica", "bold");
    doc.text("¡Certificado Generado Exitosamente!", marginLeft, currentHeight);

    currentHeight += 20;

    // Subtítulo
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102); // color #003366
    doc.text("Certificado de Servicio Social", marginLeft, currentHeight);

    currentHeight += 20;

    // Cuerpo del certificado
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51); // color #333
    doc.setFont("helvetica", "normal");

    const texto1 = `Este certificado acredita que el estudiante identificado con documento N° ${identificacion}: ${nombre} ${apellido} ha completado satisfactoriamente SU SERVICIO SOCIAL en la institución educativa Fernando Gonzalez Ochoa.`;
    const texto2 = `Se ha validado su presencia y participación de manera correcta, es por eso que este certificado es entregado a usted:`;
    const texto3 = `• Cumplimiento en su servicio social`;
    const texto4 = `¡Felicidades por completar tu servicio social y continuar con tu formación!`;

    const splitText1 = doc.splitTextToSize(texto1, 170);
    const splitText2 = doc.splitTextToSize(texto2, 170);
    const splitText3 = doc.splitTextToSize(texto3, 170);
    const splitText4 = doc.splitTextToSize(texto4, 170);

    doc.text(splitText1, marginLeft, currentHeight);
    currentHeight += splitText1.length * 10;

    doc.text(splitText2, marginLeft, currentHeight);
    currentHeight += splitText2.length * 10;

    doc.text(splitText3, marginLeft + 10, currentHeight); // sangría para la lista
    currentHeight += splitText3.length * 10;

    doc.text(splitText4, marginLeft, currentHeight);

    // Guardar el PDF
    doc.save("certificado_servicio_social.pdf");
}
