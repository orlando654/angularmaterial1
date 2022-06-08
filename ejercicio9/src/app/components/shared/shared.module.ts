import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';  


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule

  ],
  exports:[
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }
