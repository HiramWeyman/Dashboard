import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, 
         MatDividerModule, 
         MatCardModule, 
         MatPaginatorModule, 
         MatTableModule,
         MatFormFieldModule,
         MatSelectModule,
         MatButtonModule,
         MatBadgeModule,
         MatIconModule,
         MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReceiptComponent } from '../receipt/receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { PAGES_ROUTES } from './default.routes';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    ReceiptComponent
  ],
  exports: [
    DefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatToolbarModule,
    PAGES_ROUTES,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    
  ]
})
export class DefaultModule { }
