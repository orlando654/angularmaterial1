import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {

  form!: FormGroup;
  listaUtiles: string[] = [];   


  constructor(private fb: FormBuilder) {
    this.cargarFormulario();
  }

  ngOnInit(): void {
  }

  get invalido() {
    return this.form.invalid;
  }

  get getUtiles() {
    return this.form.get("utiles") as FormArray;
  }

  cargarFormulario() {
    this.form = this.fb.group({
      utiles: this.fb.array([])
      
    })
    console.log(this.fb);
    
    
    this.getUtiles.push(this.fb.group({
      check: [null],
      utilNuevo: [null, Validators.pattern(/^[1-9-0-a-zA-zñÑ\s]+$/)]
    }));
  }

  
  eliminar_todo() {
    this.listaUtiles = [];
    this.getUtiles.clear()
  }


      adicionar(): void {
        const nuevo = this.fb.group({
        check: [null],
      utilNuevo: [null, Validators.pattern(/^[0-9a-zA-zñÑ\s]+$/)]
    })
    this.getUtiles.insert(0, nuevo);
  }

  eliminar(id: number) {
    this.getUtiles.removeAt(id);
  }

  guardar() {
    this.listaUtiles = [];
      for (let i = 0; i < this.getUtiles.length; i++) {
          if (this.getUtiles.at(i).get('check')?.value == true && this.getUtiles.at(i).get('utilNuevo')?.value != null) {
        this.listaUtiles.push(this.getUtiles.at(i).get("utilNuevo")?.value);
      }
    }
    console.log(this.listaUtiles);

  }

  limpiar(): void {
    for (let i = 0; i < this.getUtiles.length; i++) {
      this.getUtiles.at(i).get('utilNuevo')?.setValue(null);
      this.getUtiles.at(i).get('check')?.setValue(null);
    }
    this.form.get('utiles')?.reset;
  }
}
