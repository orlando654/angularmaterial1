import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { IDataNode } from 'src/app/interfaces/tree.interfaces';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  form!: FormGroup;
  errorNivel = "valor minimo 1, valor maximo 100"
  mensaje1 = ""
  mensaje2 = ""

  nestedDataSource = new MatTreeNestedDataSource<IDataNode>()
  nestedTreeControl = new NestedTreeControl<IDataNode>(node => node.children)

  constructor(fb: FormBuilder,private _nodeService: NodeService) {
    this.form = fb.group({
      niveles: [1, [Validators.min(1), Validators.max(100), Validators.required]],
      repeticiones: [1, [Validators.min(1), Validators.max(100), Validators.required]],
    valor1: ['', [Validators.required/*, Validators.minLength(3)*/]],
    valor2: ['', [Validators.required/*, Validators.minLength(3)*/]],
    valor3: ['', [Validators.required/*, Validators.minLength(3)*/]],
    valor4: ['', [Validators.required/*, Validators.minLength(3)*/]],
    });
  }

  testNivel() {}

  ngOnInit(): void {
  }

  get validarNivel(){
    if (this.form.get("niveles")?.value == null) {
      this.mensaje1 = "Debe ingresar un valor"
    } else if(this.form.get("niveles")?.value < 1){
      this.mensaje1 = "Valor Minimo 1"
    } else {
      this.mensaje1 = "Valor Maximo 100"
    }
    return this.form.get('niveles')?.invalid && this.form.get('niveles')?.touched;
  }

  get validarRepeticion(){
    if (this.form.get("repeticiones")?.value == null) {
      this.mensaje2 = "Debe ingresar un valor"
    } else if(this.form.get("repeticiones")?.value < 1){
      this.mensaje2 = "Valor Minimo 1"
    } else {
      this.mensaje2 = "Valor Maximo 100"
    }
    return this.form.get('repeticiones')?.invalid && this.form.get('repeticiones')?.touched;
  }

  agregar() {
    //console.log(this.form.value);
    this.form.valid? this.generarDatos(): ""
  }

  hasNestedChild(i: number, node: IDataNode) {
    if(node?.children?.length == undefined ){
      return false
    } else if(node?.children?.length > 0 ){
      return true
    }else {
      return false
    }
  }

  generarDatos() {
    let {niveles, repeticiones, valor1, valor2, valor3, valor4} = this.form.value
    var values =[valor1, valor2, valor3, valor4]
    var result:IDataNode[] = []
    var primeraVez = true

    //console.log(values);

    while (niveles > 0) {
      let value = this.getValue(niveles,values)

        result = this.anidacion(result, repeticiones, value)
      
      niveles--
    }
    //console.log(result);
    this.nestedDataSource.data = result;
  }

  getValue(num: number, values: string[]): string {
    if (num > 4) {
      return this.getValue(num-4, values)
    } else {
      return values[num-1]
    }
  }

  anidacion(res:IDataNode[], rep:number, value:string): IDataNode[] {
    var listHelp: IDataNode[] = []

    for (let i = 0; i < rep; i++) {
      let pattern: IDataNode={
        name: value,
        children: res
      }
      listHelp.push(pattern)
    }
    return listHelp
  }

}
