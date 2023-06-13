import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from '@coreui/angular';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';


import { ReservasComponent } from './reservas/reservas.component';
import { ListareservasComponent } from './listareservas/listareservas.component';
import { MenuComponent } from './menu/menu.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AcercaComponent } from './acerca/acerca.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GaleriaComponent } from './galeria/galeria.component';
import { DomsegurpPipe } from './acerca/domsegurp.pipe';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';








@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ReservasComponent,
    ListareservasComponent,
    MenuComponent,
    ContactoComponent,
    AcercaComponent,
    GaleriaComponent,
    DomsegurpPipe,
    ProductListComponent,
    AddProductComponent,
    AddEmpleadosComponent,
    EmpleadoListComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    AlertModule,
    MatTabsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
