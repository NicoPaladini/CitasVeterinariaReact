import React, { Component } from 'react';
import Header from './Header';
import AgregarCita from './AgregarCita';
import ListaCitas from './ListaCitas';


class App extends Component {

     state = {
      citas: []
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

export default App;
