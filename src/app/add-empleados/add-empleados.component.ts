import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const DATOS_STORAGE = 'empleado';

@Component({
  selector: 'app-add-empleados',
  templateUrl: './add-empleados.component.html',
  styleUrls: ['./add-empleados.component.css']
})
export class AddEmpleadosComponent {
  nombre!: string ;
  edad!: number ;
  id: any;
  sexo!: string;
  historial: any;


  constructor(private firestore: AngularFirestore) {}


  ngOnInit() {
    // Cargar datos guardados del localStorage al iniciar el componente
    const empleado = localStorage.getItem(DATOS_STORAGE);
    if (empleado) {
      this.historial = JSON.parse(empleado);
    }
  }

  guardardatos1() {


    const empleados = {
      nombre: this.nombre,
      edad: this.edad,
      id: this.id,
      sexo: this.sexo,

    };

    const empleado = localStorage.getItem(DATOS_STORAGE);
    if (empleado) {
      const historial = JSON.parse(empleado);
      historial.push(empleados);
      localStorage.setItem(DATOS_STORAGE, JSON.stringify(historial));
      this.firestore.collection('empleado').add(empleados)
      .then(() => {
        console.log('Datos guardados en Firestore');
        // Puedes realizar alguna acción adicional después de guardar los datos
      })
      .catch((error: any) => {
        console.error('Error al guardar los datos:', error);
      });
    } else {
      localStorage.setItem(DATOS_STORAGE, JSON.stringify([empleados]));
    }

    // Limpiar los campos del formulario
    this.nombre  = '';
    this.edad = 0;
    this.sexo = '';
    this.id = 0;
  }
}
