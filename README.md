# *App 4 - Scrapper de imágenes de Instagram*
# InstagramScraper

## TP6 Dockerizando (o eso intentamos)
bueno, primero que nada, DONDE ESTÁ LO FÁCIL DE DOCKER, porque nosotras no lo encontramos :)
segundo francia.

## Comiezo del proyecto. Etapa color de rosas (podridas)
Lo primero que hicimos armar una carpeta nueva en la compu de Jime (Mac, aca ya viene la parte de tenerno piedad)
En ella clonamos el TP3 (con el nombre de Backend) y el TP4 (donde desde el principio tuvimos errores, pensando que era por los permisos)
La instancia de clonar repos fue la única exitosa de entrada (aplausos a ese conocimiento de GitHub)
PEEEEERO, lo que no sabíamos era que git no nos quería, era todo una trampa. Pasamos a la etapa...

## GIT TE ODIAMOS
Minimamente hicimos unas 3 veces los pasos de git clone, debido a que cuando queriamos pushearlo a un repo nuestro, no nos dejaba.
Gracias al cielo (osea Diego) entendimos que primero debíamos eliminar el .gitignore, porque sino el tp lo entregábamos en diciembre. 
Eliminamos el Gitignore, y funciono todo correctamente.

## Etapa Dockerizacion, Ballena ojalá que te ahoges.
Para escribir los archivos, primero fuimos siguiendo las clases y luego empezamos a chatgpterizar el código. Estos fueron los pasos:
1- Instalamos Docker
2- Jime tuvo problemas con la contraseña
3- Jime cambió la contraseña (Una muy segura, CLARAMENTE QUE NO ES 1234)
4- Jime se dió cuenta que en verdad pedía otra contraseña (por suerte se la acordaba)
5- Cuando tuvimos docker instalado empezamos a hacer las imágenes de back y front (una imagen-dockerfile por cada carpeta)
nos fuimos guiando con ChatGPT para poner los parámetros necesarios (hasta acá todo bien porque no estaba buildeado, en si, éramos felices)
6- Despues de tener las Imagenes hechas, hicimos el docker-compose.yaml para conectar front y back en la carpeta principal (misma dinamica Chatgpteando)
Dato curioso: en la vida de la Mac nunca había pasado, pero Docker la dejó en terapia intensiva (unas 6 veces la reiniciamos porq se le trababa el paty)

## AWSRIZANDO y llorando en el intento (mentira esa es Noe)
- Creamos la instancia (esta explicación la obviamos ya que fue explicada en el TP3, no me hagas escribir de más)
- Hubo un par de complicaciones con el .pem, y A QUIEN SE LE OCURRE HACER DOS BARRAS DISTINTAS, cuando nos dimos cuenta pudimos entrar al servidor, todo ok hasta aca.
- Clonamos el repo, instalamos todas las dependencias.
- Hicimos el paso a paso para dockerizar nuestro servidor.
- quisimos levantar la orquesta, te juro que quisimos

## Acá todo se fue en picada
De acá hasta el final de este viaje *Lo unico que anda es el frontend* :)
Dirás *Chicas ¿Y el backend?* NI IDEA
Intentamos de todo, cada error lo tirabamos al chat pero cada vez era mas falopa la respuesta (esto minimamente nos viene llevando una semana de llantos/enojo/frustracion/ganas de dejar la carrera, etc) 

## BACKEND TU ME ESCUCHAS??
- Probamos con de todo en la compu de Jime, pero lo que nos dimos cuenta, es que el backend no funciona desde la entrega final del cuatri pasado, Coincidencia? NO LO CREO.
- Al principio hacíamos los cambios en la consola de AWS, pero Diego sugirió que lo probáramos primero en el visual.
- Cuando nos rendimos, empezamos a probar todo desde la compu de Belu --> inserte las etapas anteriores pero en un Windows + que al principio docker no me dejaba instalarlo, ni idea pero se solucionó.

## A BELU TAMPOCO LE ANDA EL BACKEND
Probamos varias cosas que le fuimos preguntando al chat, pero nada funcionaba. Le mandamos al gurú (Diego) nos tiró un par de centros pero ninguno fue gol.

## Fin?
Hasta aca llegó nuestro amor, en teoría aprendimos un montooooooon de Docker, la enseñaza que voy a transmitir a mis nietos será:
- "NO ESTUDIEN PROGRAMACIÓN"
- eliminen los .gitignore 
- no clonen un repo adentro de otro
- aprendan a diferenciar las barritas del teclado / \
- para dockerizar hace falta crear las imagenes, y el docker compose
- para buildear hace falta ir a harvard

# GRACIAS POR TANTO PERDÓN POR TAN POCO

PD: Quién te hará tan buen reporte? #LoIntentamos #FracasamosEnElIntento #NoNosEchesDeLaMateriaLaCuotaEstaCaraNoQueremosOtroAñoDeSufrimiento #SiEsNecesarioHayCoima