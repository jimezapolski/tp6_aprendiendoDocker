# *App 4 - Scrapper de imágenes de Instagram*
# InstagramScraper

## Consigna
Quiero ver y descargar todas las imágenes de Instagram de mi ex. Me acaba de dejar y en cualquier momento me puede bloquear o poner el perfil en privado!

Además necesito saber que esta triste sin mi. Así que necesito que cada vez que sube una nueva foto, la aplicación la descargue y me notifique.

Ahora que lo pienso, tengo mucha gente a la que quiero ~stalkear~ saber si andan bien en su vida. Así que quiero poder hacer lo mismo con cualquier perfil o perfiles.

A la hora de ver las fotos de cierto usuario, me gastaría verlas en alguna suerte de galería. Parecido a Instagram.

> Pueden cambiar Instagram por Twitter, Facebook o hasta LinkedIn.

## ¿Qué es un scrapper?
Es un programa de software diseñado para extraer automáticamente información de sitios web de manera sistemática. Funciona mediante la solicitud y recuperación de datos de páginas web, ya sea siguiendo enlaces o buscando específicamente ciertos elementos en el código HTML de una página. Este tipo de herramientas son utilizadas para diversas finalidades, como recopilación de datos para análisis, monitoreo de precios, generación de bases de datos, entre otros. En resumen, un scrap extrae el contenido HTML para filtrar la información que necesito y almacenarla. 
Sin embargo, es importante tener en cuenta que el scraping de sitios web puede estar sujeto a restricciones legales y políticas de los sitios web objetivo.

## Investigación:
### Extracción y descarga de datos:
Buscamos diferentes librerías como Playwright, request, urllib, Beautifulsoup, Scrapy, entre otras. 
Por otro lado, investigamos también la API de Instagram, la Meta for Developers. 
En la mayoría de los casos, tanto las librerías como la API, solamente extraía los datos, y era necesario utilizar otra para descargarlos. Esto es porque las políticas de privacidad de Instagram no permiten descargar los datos. 

Por eso, llegamos a la conclusión de que vamos a utilizar *[Instagram Private API](https://www.npmjs.com/package/instagram-private-api)*. Esta librería le pide a la API oficial de Instagram los datos y, a su vez, permite descargarlos. Por eso la elegimos, para tener que utilizar solamente una herramienta. Esta librería permite scrapear o automatizar, cosa que no deja hacer normalmente. Lo que si hay que tener en cuenta es que Instagram suele banear IPs por hacer este tipo de cosas asi que lo mejor es no hacerlo seguido (se recomienda poner un delay entre cada descarga asi no se bajan todas juntas y evitamos el baneo). 

## Modelado:
Las entidades que encontramos fueron: usuario (el acosador), perfil (el acosado) y notificación.
La interfaz de usuario se compone de un nombre y contraseña ya que la librería te pide un usuario de instagram para usar la API. >*IMPORTANTE*: no usen sus usuarios reales de instagram, prueben con uno vacío o que no utilicen por las dudas. 
La interfaz de perfil se compone de un usuario (que es al que vamos a acosar).
La interfaz de notificación va a tener un mensaje, es un string. 
La función extraerFotosPerfil recibe un parámetro que es el nombre del acosado y va a devolver un array de string. En ese array van a estar las urls de cada foto a descargar. Adentro de esta función van a tener que declarar ese array, que es el mismo que va a recibir la siguiente función (descargarFotosPerfil).
La función descargarFotosPerfil recibe el array creado en la función anterior (extraerFotosPerfil) y devuelve un array de strings.
La función avisoPosteo recibe el perfil de nuestro acosado. Esta función lo que va a hacer es mandarle una notificación al acosador avisandole que el acosado hizo un nuevo posteo. 

## API Instagram:
Para utilizar la api, lo primero que tenés que hacer es instalarla. Para eso, ejecutá en la terminal la siguiente línea:
npm install instagram-private-api.
La línea const ig = new IgApiClient(); inicializa el cliente de Instagram y lo prepara para realizar acciones utilizando la API de Instagram a través de la biblioteca instagram-private-api (o sea, se está conectando con la API privada de Instagram).
Para loguearse, hicimos un try/catch. Cuando accede el usuario (el acosador), se va a buscar el nombre del usuario acosado y se mostrará en pantalla el id (que luego les va a servir para el código). Si el usuario y contraseña del acosador no son correctos, le tirará un error.

## API Notificación:
Para la notificación vamos a usar *[NodeMailer](https://www.nodemailer.com/)*. Para usarla, tienen que instalarla también. Ejecuten en la terminal:
npm install nodemailer
Esta API te permite enviar un mail a través de un servidor creado en el código. Es bastante útil y permitirá que el acosador pueda mirar las imágenes incluso sin la computadora a mano. Esta librería primero te pide crear un objeto transportador, que sería el camino que recorre el mail cuando se envía. Se inicializa host y puerto que usará el mail. Después se ponen los datos del mail, de que dirección a qué dirección y contenido. Y por último utiliza el transportador para enviar el mail.
El auth es la credencial de autenticación que corresponde a un correo electrónico válido en Ethereal Email para poder mandar correos. 
Hay un auth de prueba que se puede utilizar pero decidimos crear uno nuevo para poder probar. El que nos daba de prueba es solamente para debuggear, no manda el mail. Con estos datos si podemos mandar un mail. Los datos de la cuenta de hotmail que creamos son:
Programación Cuatro
user: appinstagramprogra@hotmail.com
pass: programacion4
El auth nunca lo van a tener que cambiar, siempre va a quedar así. 
>*IMPORTANTE*: Lo único que van a cambiar es en la const info los datos (el mail al que lo van a mandar que va a ser el del acosador, el asunto, el texto, etc).

# Endpoints
## Perfiles
- POST /perfil/agregar  
    body:  
    {  
         "nombre": "leomessi"  
    }

- DELETE /perfil/borrar  
    body:  
    {  
         "id": 1  
    }

- GET /perfil (devuelve la lista de perfiles)

## Imagenes
- GET /imagen/:id

- GET /imagenesPorPerfil/:idPerfil
