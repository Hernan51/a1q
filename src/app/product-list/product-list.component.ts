import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import * as QRCode from 'qrcode';

const DATOS_STORAGE = 'product';

interface Producto {
  nombreprod: string;
  id:string,
  precioprod: number;
  codigobarras: string;
  cantidad: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productName!: string ;
  productPrice!: number ;
  historial: any;
  codigo!: string;

  private productosCollection: AngularFirestoreCollection<Producto>;
  productos: Observable<Producto[]>;
  id: any;


  constructor(private firestore: AngularFirestore) {
    this.productosCollection = firestore.collection<Producto>('productos');
    this.productos = this.productosCollection.valueChanges();
  }

  eliminarRenglon(index: number): void {
    const producto = this.historial[index];

    if (producto) {
      const id = producto.id;

      this.productosCollection.doc(id).delete().then(() => {
        console.log('Producto eliminado de Firestore');

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
    const product = localStorage.getItem(DATOS_STORAGE);
    if (product) {
      this.historial = JSON.parse(product);
    }
  }


  guardardatos1() {
    const productos = {
      id: this.id,
      nombreprod: this.productName,
      precioprod: this.productPrice,
      codigobarras: this.codigo,
      cantidad: 0 // Inicializamos la cantidad en 0, ya que no tenemos el ID aún
    };

    this.firestore.collection('productos').add(productos)
      .then((docRef) => {
        const id = docRef.id; // Obtenemos el ID asignado por Firestore
        productos.id = id; // Asignamos el ID al objeto productos

        // Guardar en el historial del localStorage
        const product = localStorage.getItem(DATOS_STORAGE);
        if (product) {
          const historial = JSON.parse(product);
          historial.push(productos);
          localStorage.setItem(DATOS_STORAGE, JSON.stringify(historial));
        } else {
          localStorage.setItem(DATOS_STORAGE, JSON.stringify([productos]));
        }

        console.log('Datos guardados en Firestore y localStorage');
        // Puedes realizar alguna acción adicional después de guardar los datos
      })
      .catch((error: any) => {
        console.error('Error al guardar los datos:', error);
      });

    // Limpiar los campos del formulario
    this.productName = '';
    this.productPrice = 0;
    this.codigo = '';
  }

  actualizarCantidad(index: number, nuevaCantidad: number): void {
    const item = this.historial[index];
  item.cantidad = nuevaCantidad;

  // Actualizar en localStorage
  localStorage.setItem(DATOS_STORAGE, JSON.stringify(this.historial));

  // Actualizar en Cloud Firestore
  const productoRef = this.productosCollection.doc(item.id);
  productoRef.update({ cantidad: nuevaCantidad })
    .then(() => {
      console.log('Cantidad actualizada en Firestore');
      // Puedes realizar alguna acción adicional después de actualizar la cantidad
    })
    .catch((error: any) => {
      console.error('Error al actualizar la cantidad:', error);
    });
  }

  public qrCodeText: string = '';
  public qrCodeImageUrl: string = '';

  dataObjects = [
    { name: 'Agua_Ciel', fechaCaducidad: '21/04/2024', stock: '20' },
    { name: 'Camaron Ahumado en Lata', fechaCaducidad: '31/07/2023', stock: '10' },
    { name: 'Ensalada Atun Preparada', fechaCaducidad: '15/08/2023', stock: '19' },
    { name: 'Crema de Almendras', fechaCaducidad: '30/12/2023', stock: '453'},
    { name:  'Cafe Puro', fechaCaducidad: '4/06/2024', stock: '321'},
    { name:  'Leche de Almendra', fechaCaducidad: '19/06/2023', stock: '553'},
    { name:  'Aceite de Oliva', fechaCaducidad: '12/08/2025', stock: '234'},
    { name:  'Harina de Almendra', fechaCaducidad: '27/11/2023', stock: '654'},
    { name:  'Toallas para bebe', fechaCaducidad: '1/01/2025', stock: '1243'},
    { name:  'Ajo picado', fechaCaducidad: '19/08/2023', stock: '946'},
    { name:  'Bolsas para basura', fechaCaducidad: 'N/A', stock: '823'},
    { name:  'Vasos para fiesta', fechaCaducidad: 'N/A', stock: '747'},
    { name:  'Jugo de Arandano', fechaCaducidad: '01/11/2023', stock: '635'},
    { name:  'Pollo enlatado', fechaCaducidad: '02/07/2023', stock: '673'},
    { name:  'Latas de Atun', fechaCaducidad: '20/12/2023', stock: '682'},

  ];


  generateQRCode() {
    const randomIndex = Math.floor(Math.random() * this.dataObjects.length);
    const randomObject = this.dataObjects[randomIndex];
    const qrCodeText = JSON.stringify(randomObject);


    QRCode.toDataURL(qrCodeText)
      .then((url: any) => {
        this.qrCodeImageUrl = url;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}



