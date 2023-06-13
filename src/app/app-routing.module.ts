import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ListareservasComponent } from './listareservas/listareservas.component';
import { MenuComponent } from './menu/menu.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AcercaComponent } from './acerca/acerca.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'reservas', component: ReservasComponent},
  {path: 'addproductos', component: AddProductComponent},
  {path: 'listaproductos', component: ProductListComponent},
  { path: 'listareservas',component: ListareservasComponent},
  {path: 'menu', component:MenuComponent},
  {path: 'contacto', component:ContactoComponent},
  {path: 'acerca',component: AcercaComponent},
  {path: 'galeria',component: GaleriaComponent},
  {path: 'addempleados', component: AddEmpleadosComponent},
  {path: 'listaempleados', component: EmpleadoListComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
