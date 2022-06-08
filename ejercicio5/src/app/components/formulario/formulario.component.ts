import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  form!: FormGroup;
  mostrarListaNombre!: string;
  listaCheckbox: string[] = [];
  mensaje: boolean = false;


  constructor( private fb: FormBuilder ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }


  /* Validación de componentes del formulario */
  get nombreNoValido() {
    return this.form.get('nombre')?.invalid && this.form.get('nombre')?.touched;
  }

  // Para obtener nombre
  get getNombre() {
    return this.form.get('nombre');
  }

  // obtenemos los checkBoxes como array
  get checkBoxesNames() {
    return this.form.get('checkBoxes') as FormArray;
  }
  

  // Construimos el formulario
  buildForm(): void {
    this.form = this.fb.group({
      nombre: ['', [ Validators.required,Validators.pattern(/^[a-zA-zñÑ\s]+$/) ]],
      checkBoxes: this.fb.array([]),
    })
  }

  /* Métodos */
  // Método para adicionar el nombre en el checkbox
  addNameCheck(): void {

    if (this.getNombre?.valid) {
      const nuevoCheck = this.fb.group({
        check: [null],
        nombreCheck: [this.form.get('nombre')?.value]
      });
  
      console.log(nuevoCheck.get('check')?.value);
      // ingresaamos cada valor del nombre a la lista de arrays de checkBoxesNames
      this.checkBoxesNames.push(nuevoCheck);
      
    } else {
      return;
    }

  }

    // Adiciona los nombres al textArea
    addNamesTextArea(): void {
      this.listaCheckbox = [];
      for (let i = 0; i < this.checkBoxesNames.length; i++) {
        if (this.checkBoxesNames.at(i).get('check')?.value == true) {
          // console.log(this.checkBoxesNames.at(i).get('check'));
  
          this.listaCheckbox.push(`id: ${i+1} - Nombre: ${this.checkBoxesNames.at(i).get('nombreCheck')?.value}`);
  
          console.log( this.listaCheckbox);
          this.mostrarListaNombre = this.listaCheckbox.join('\n');
        } 
      }

      if (this.listaCheckbox.length === 0) {
        this.mensaje = true;
      } else {
        this.mensaje = false;
      }
    }
  

  // Elimina el checkbox
  deleteNameCheck(id: number): void {
    this.checkBoxesNames.removeAt(id)
  }

  

  // Para limpiar el textarea
  clearNames(): void {
    this.listaCheckbox = [];
    this.mostrarListaNombre = this.listaCheckbox.toString();
  }
}
