import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-caja',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  campoTextos: string[] = []

  constructor(private fb: FormBuilder) {
    this.crear_Formulario();
  }

  crear_Formulario(): void {
    this.form = this.fb.group({
      cajaGuargar: [''],
      caja: this.fb.array([[]]),
    })
  }

  ngOnInit(): void {
  }

  get campoContenido() {
    return this.form.get('caja') as FormArray
  }

  agregarCampo(): void {
    this.campoContenido.push(this.fb.control('', Validators.required))
  }

  borrar(i: number): void {
    this.campoContenido.removeAt(i);
  }

  limpiar(): void {
    this.campoTextos = ['']
    this.form.reset
  }

  guardar(): void {
    this.campoTextos = this.form.value.caja
    console.log(this.campoTextos);
  }

  limpiarCaja(): void {
    this.campoTextos = ['']
  }
}
