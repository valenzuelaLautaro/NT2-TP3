new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [],
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos = []
        },
        atacar: function () {
            let daño = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -= daño
            this.registrarEvento({
                esJugador: true,
                texto: 'El jugador golpea al mounstro por: ' + daño
            })
            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            let daño = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -= daño

            this.registrarEvento({
                esJugador: true,
                texto: 'El jugador ataca al mounstro por: ' + daño
            })
            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo()
        },

        curar: function () {
            if(this.saludJugador <= 90){
                this.saludJugador += 10   
            } else {
                this.saludJugador = 100
            }
            this.registrarEvento({
                esJugador: true,
                texto: 'El jugador se curó'
            })
        },

        registrarEvento(evento) {
            this.turnos.unshift(evento)
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo: function () {
            let daño = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador -= daño
            this.registrarEvento({
                esJugador: false,
                texto: 'El mounstro ataca al jugador por: ' + daño            
            })
            this.verificarGanador()
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.trunc(Math.random() * rango[1]) + 1, rango[0])
        },
        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
                if(confirm('GANASTE!!!')){
                    this.empezarPartida()
                } else {
                    this.hayUnaPartidaEnJuego = false
                }
            } else if (this.saludJugador <= 0) {
                if(confirm('GAME OVER!')){
                    this.empezarPartida()
                } else {
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});