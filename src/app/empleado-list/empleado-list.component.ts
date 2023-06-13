import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


const DATOS_STORAGE = 'empleado';

interface Empleado {
  nombre: string;
  id:string,
  edad: number;
  sexo: string;
}

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent {
  nombre!: string ;
  edad!: number ;
  historial: any;
  sexo!: string;


  private productosCollection: AngularFirestoreCollection<Empleado>;
  productos: Observable<Empleado[]>;
  id: any;


  constructor(private firestore: AngularFirestore) {
    this.productosCollection = firestore.collection<Empleado>('productos');
    this.productos = this.productosCollection.valueChanges();
  }

  eliminarRenglon(index: number): void {
    const producto = this.historial[index];

    if (producto) {
      const id = producto.id;

      this.productosCollection.doc(id).delete().then(() => {
        console.log('Empleado eliminado de Firestore');

        // Eliminar el elemento del historial en el local storage
        this.historial.splice(index, 1);
        localStorage.setItem(DATOS_STORAGE, JSON.stringify(this.historial));
      }).catch((error: any) => {
        console.error('Error al eliminar el producto:', error);
      });
    }
  }





  ngOnInit() {
    // Cargar datos guardados del localStorage al iniciar el componente
    const empleado = localStorage.getItem(DATOS_STORAGE);
    if (empleado) {
      this.historial = JSON.parse(empleado);
    }
  }


  guardardatos1() {
    const empleados = {
      id: this.id,
      nombreempleado: this.nombre,
      edad: this.edad,
      sexo: this.sexo,
    };

    this.firestore.collection('empleados').add(empleados)
      .then((docRef) => {
        const id = docRef.id; // Obtenemos el ID asignado por Firestore
        empleados.id = id; // Asignamos el ID al objeto productos

        // Guardar en el historial del localStorage
        const empleado = localStorage.getItem(DATOS_STORAGE);
        if (empleado) {
          const historial = JSON.parse(empleado);
          historial.push(empleados);
          localStorage.setItem(DATOS_STORAGE, JSON.stringify(historial));
        } else {
          localStorage.setItem(DATOS_STORAGE, JSON.stringify([empleados]));
        }

        console.log('Datos guardados en Firestore y localStorage');
        // Puedes realizar alguna acción adicional después de guardar los datos
      })
      .catch((error: any) => {
        console.error('Error al guardar los datos:', error);
      });

    // Limpiar los campos del formulario
    this.nombre = '';
    this.edad = 0;
    this.id = '';
  }


}
