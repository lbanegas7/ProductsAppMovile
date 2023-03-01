import {FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  formNewProduct = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    precio: [ [Validators.required]],
    descripcion: ['', [Validators.required, Validators.maxLength(20)]],
    imagen: ['', [Validators.required]],
    unidadMedida: ['', [Validators.required, Validators.maxLength(2)]],
    cantidadStock: ['', [Validators.required]],
    notificarBajoStock: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  cargarImagenProducto(event:any){

  }
  get nombre(){
    return this.formNewProduct.get('nombre')
  }
  get precio(){
    return this.formNewProduct.get('precio')
  }
  get descripcion(){
    return this.formNewProduct.get('descripcion')
  }
  get imagen(){
    return this.formNewProduct.get('imagen')
  }
  get unidadMedida(){
    return this.formNewProduct.get('nombre')
  }
  get cantidadStock(){
    return this.formNewProduct.get('nombre')
  }
  get notificarBajoStock(){
    return this.formNewProduct.get('nombre')
  }
  

}
