import React, { Component } from 'react';
import Header from './Header';
import AgregarCita from './AgregarCita';
import ListaCitas from './ListaCitas';
import PropTypes from 'prop-types';
import Cita from './Cita';


class App extends Component {

     state = {
      citas: []
  }


  // Esta funcion espera que se monte el componente y luego se hace verdadera
  //Luego utilizamos getItem para traer lo que esta almacenado en LocalStorage
  //y como esta en formato string utilizamos JSON.parse que convierte los string en
  //un objeto o array.
componentDidMount() {
  const citasLS = localStorage.getItem('citas');
  if(citasLS){
    this.setState({
      citas: JSON.parse(citasLS)
    })
  }
}

//Almacenamos los datos en localStorage, pero solo pueden almacenarse datos en formato
//string, por ello llamamos a la funcion JSON.stringify. (Transforma el obj en string)
componentDidUpdate() {
  localStorage.setItem(
    'citas',
    JSON.stringify(this.state.citas)
  )
}


  crearCita = (nuevaCita) => {
    /*
    Como ya sabemos no se puede modificar directamente el state asi que
    con el spread operator creamos una copia del array
    */
   const citas =   [...this.state.citas, nuevaCita]

   console.log(citas);

   this.setState({
     citas
   })
  }


  borrarCita = id => {
      //Obtener copia del state

      const citasActuales = [...this.state.citas];


      //Borrar el elemento del state
      const citas = citasActuales.filter(cita=>cita.id !== id);

      //Actualizar el state

      this.setState({
        citas
      })
  }


  render() {
    return (
      <div className="container">
        <Header 
          titulo={'Administrador de Pascientes de Veterinaria'}
        />
        <div className="row">
            <div className="col-md-6">
              <AgregarCita 
                crearCita={this.crearCita}
              />
            </div>
            <div className="col-md-6">
              <ListaCitas 
                citas={this.state.citas}
                borrarCita={this.borrarCita}
              />
            </div>
        </div>
      </div>
    );
  }
}


Cita.propTypes = {
  info: PropTypes.shape({
    fecha: PropTypes.string.isRequired,
    hora: PropTypes.string.isRequired,
    mascota: PropTypes.string.isRequired,
    propietario: PropTypes.string.isRequired,
    sintomas: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
  borrarCita: PropTypes.func.isRequired
}
export default App;
