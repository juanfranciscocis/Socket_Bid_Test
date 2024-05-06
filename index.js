
const socket = require('socket.io-client')('http://localhost:2000');

socket.on('connect', () => {
    console.log('Connected to server');
    console.log('Socket id: ' + socket.id);


    //Ejemplo 1:
    //De esta manera obtenemos todas las pinturas que se encuentran en la base de datos
    //Emitimos el evento 'get-paintings' y recibimos el payload que contiene todas las pinturas
    socket.emit('get-paintings',()=>{
        console.log('get-paintings');
    });
    socket.on('get-paintings', (payload) => {
        console.log(payload);
    });

    //Ejemplo 2:
    //Una persona hace un nuevo bid, se envía el nuevo bid y se recibe el nuevo bid
    //En caso de que pasen 5 segundos y no se reciba el nuevo bid, se envía un mensaje de error automáticamente por parte del servidor
    //el type de error es 'bid-timeout'

    //Enviar un nuevo precio
    socket.emit('new-bid', {id: 1, price: 2000000014, client_id:socket.id}, () => {
        console.log('new-bid');
    });
    //Escuchar el nuevo precio o error de timeout
    socket.on('new-bid', (payload) => {
        console.log(payload);
    });

    //Ejemplo 3:
    //Necesitamos obtner los datos de un painting en específico
    //Emitimos el evento 'get-painting' y recibimos el payload que contiene los datos del painting
    socket.emit('get-painting', {id: 1}, () => {
        console.log('get-painting');
    });
    //Escuchar los datos del painting
    socket.on('get-painting', (payload) => {
        console.log(payload);
    });







});