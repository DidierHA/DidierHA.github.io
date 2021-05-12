const contador = () => {

    const fechaDeseada = new Date('January 1, 2022 00:00:00').getTime();
    const fechaHoy = new Date().getTime();
    const diferencia = fechaDeseada - fechaHoy;

    const segundos = 1000;
    const minutos = segundos * 60;
    const horas = minutos * 60;
    const dias = horas * 24;

    document.querySelector('#dias').innerText = Math.floor(diferencia / dias);
    document.querySelector('#horas').innerText = Math.floor((diferencia % dias) / horas);
    document.querySelector('#minutos').innerText = Math.floor((diferencia % horas) / minutos);
    document.querySelector('#segundos').innerText = Math.floor((diferencia % minutos) / segundos);
}

setInterval(contador, 1000);
