const express = require('express');
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');
const fs = require('fs');

const app = express();
const client = new Client({
    authStrategy: new LocalAuth()
});

let qrCodeData = '';

client.on('qr', (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return;
        }
        qrCodeData = url;
        fs.writeFileSync(path.join(__dirname, 'bot.html'), `<html><body><img src="${qrCodeData}" alt="QR Code"></body></html>`);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bot.html'));
});

client.on('ready', () => {
    console.log('Client is ready!');
});

const sentMessages = new Set();

client.on('message', message => {
    // Imprimir en consola el mensaje y el cliente que lo envía
    console.log(`Mensaje recibido de ${message.from}: ${message.body}`);
    
    // Respuesta automatica CUMMINS
    if (message.body.toLowerCase().includes('me interesa el curso de diesel  cummins insite y calterm quiero más información.')) {
        message.reply('Hola 👋 ¡Gracias por contactarnos!\n\nLe saluda cordialmente Tech Motors, espero se encuentre muy bien 🤝 con gusto atenderé su solicitud de información');
        setTimeout(() => {
            message.reply('El curso de programación Insite y Calterm Cummins cubre una amplia gama de funciones y herramientas que permiten realizar diagnósticos precisos, ajustes de rendimiento y modificaciones en los sistemas de control del motor, incluidas funciones específicas como la eliminación del EGR y el DPF, así como la reprogramación de parámetros críticos.');
            setTimeout(() => {
                message.reply('Desde este enlace podrá ver el temario y una clase de muestra del curso de Cummins en nuestra página web 👇\n\nhttps://autoteched360.online/cursos-diesel/curso-de-diagnostico-y-programacion-cummins-insite-y-calterm/');
                setTimeout(() => {
                    message.reply('El curso se encuentra en videos ya grabados que se envian por medio de enlaces de descarga a su correo electronico\n\nUna vez lo descargue, podra verlo las veces que desee sin necesidad de utilizar Internet \n\nPodra estudiarlo a su propio ritmo,  en el horario y lugar que usted disponga.');
                }, 2000)
                setTimeout(() => {
                    message.reply('Si el contenido del temario y la clase de muestra son de su interés y desea adquirir el curso,  desde Chile puede realizar su compra por Paypal,  tarjeta de débito,  crédito y transferencias vía Banco Estado\n\nEl curso tiene un valor de 38,000CLP');
                }, 2000)
                setTimeout(() => {
                    message.reply('Estoy a su orden cualquier cosa, indiqueme si tiene alguna pregunta con la que pueda ayudarle, quedo atento a sus comentarios!')
                }, 2000)
            }, 1000)
        }, 1000)

    } else if(message.body.toLowerCase().includes('comprar' || 'comprar.' || '"comprar"' || '"comprar".')) {
        // Mensaje de Datos de pago
        message.reply('Si le gustaria adquirir los cursos,  puede realizar su compra a cualquiera de las siguientes cuentas:\n\nPaypal\n\nkelvinleninrb@gmail.com\n\nTransferencia\nKARLHA PATRICIA JOSEFINA NAVARRO REQUIZ\n27.355.849-7\nBci / Banco Crédito e Inversiones\nCuenta Vista\n777027355849\npatricia183001@gmail.com')
        setTimeout(() => {
            message.reply('*NOTA:* Una vez realice el pago envie el comprobante de pago y el correo electronico donde se enviara el material del curso')
        }, 2000)
    } else if (message.body.toLowerCase().includes('cursos' || 'cursos.' || '"cursos"' || '"cursos".')) {
        // Mensaje de Todos los Cursos
        message.reply('1 Common Rail en general\n\n2 Common Rail Bosh\n\n3 Reprogramación de Motores Detroit\n\n4 Ecus volvo-Detroit\n\n5 Cummins (insite/calterm)\n\n6 Caterpillar\n\n7 Diagnóstico Camiones Mercedes\n\n8 Camiones Volvo - Renault\n\n9 Camiones Scania \n\n10 Navistar Internacional\n\n11 Volvo Mack techtool\n\n12 Common raíl Denso \n\n13 Common raíl Siemens\n\n14 Common raíl Delphi')
    } else if (message.body.toLowerCase().includes('gracias' || 'gracias.')) {
        // Mensaje de agradecimiento
        message.reply('¡De nada! Estoy a su orden cualquier cosa, indiqueme si tiene alguna pregunta con la que pueda ayudarle, quedo atento a sus comentarios!');
    } else if (message.body.toLowerCase().includes('listo')) {
        // Mensaje de listo
        message.reply('Perfecto, uno de nuestros asesores va a procesar su compra.\n\n*Recuerda enviar tu correo electronico para enviarte la informacion del curso*');
    } else{
        if (!sentMessages.has(message.from)) {
            //Mensaje automatico 
            message.reply('Este es un mensaje automático, por favor espere a que un asesor se ponga en contacto con usted.');
            setTimeout(() => {
                message.reply('Si desea comprar nuestros cursos envie la palabra "Comprar"')
                setTimeout(() => {
                    message.reply('Tenemos tambien una variedad de cursos Diesel extensa. Envia la palabra "Cursos" y te enviaremos el listado completo')
                }, 1000)
            }, 3000)
            sentMessages.add(message.from);
        }
    }
});

client.initialize();

app.listen(3000, () => {
    console.log('Servidor web escuchando en http://localhost:3000');
});
