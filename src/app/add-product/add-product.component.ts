import { Component,OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const DATOS_STORAGE = 'product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})



export class AddProductComponent implements OnInit{
  productName!: string ;
  productPrice!: number ;
  historial: any;
  codigo!: string;
  cantidad!: number;


  constructor(private firestore: AngularFirestore) {}


  ngOnInit() {
    // Cargar datos guardados del localStorage al iniciar el componente
    const product = localStorage.getItem(DATOS_STORAGE);
    if (product) {
      this.historial = JSON.parse(product);
    }
  }

  guardardatos1() {


    const productos = {
      nombreprod: this.productName,
      precioprod: this.productPrice,
      codigobarras: this.codigo,
      cantidad: this.cantidad,

    };

    const product = localStorage.getItem(DATOS_STORAGE);
    if (product) {
      const historial = JSON.parse(product);
      historial.push(productos);
      localStorage.setItem(DATOS_STORAGE, JSON.stringify(historial));
      this.firestore.collection('productos').add(productos)
      .then(() => {
        console.log('Datos guardados en Firestore');
        // Puedes realizar alguna acción adicional después de guardar los datos
      })
      .catch((error: any) => {
        console.error('Error al guardar los datos:', error);
      });
    } else {
      localStorage.setItem(DATOS_STORAGE, JSON.stringify([productos]));
    }

    // Limpiar los campos del formulario
    this.productName = '';
    this.productPrice = 0;
    this.codigo = '';
    this.cantidad = 0;
  }
}



