import {FormBuilder, Validators} from '@angular/forms';
import {Product} from './../models/product';
import {ProductsService} from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  isModalOpen = false;

  formProduct = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    precio: [0, [Validators.required]],
    descripcion: ['', [Validators.required, Validators.maxLength(50)]],
    imagen: ['', [Validators.required]],
    unidadMedida: ['', [Validators.required, Validators.maxLength(2)]],
    cantidadStock: [0, [Validators.required]],
  });

  constructor(private productService: ProductsService, private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.productService.getAllProducts()
    .subscribe((Allproducts: any) => {
      this.products = Allproducts
    })

    // this.productService.updateProduct()
  }
  
  setOpen(isOpen: boolean, indexProduct:number) {
    this.isModalOpen = isOpen;
    this.formProduct.patchValue(this.products[indexProduct])
  }

  loadNewImage(event:any){
    if(this.isValidSizeImg(event.target.files[0]?.size)){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = () => { 
        this.formProduct.get('imagen')?.setValue(reader.result!.toString())    
      };
    }else{
      console.log('Tamaño de imagen no valido');
    }
  }

  isValidSizeImg(size:number){
    return size < 600000
  }

  updateProduct(){
    if(this.formProduct.valid){
      console.log(this.formProduct.value);
    }else{
      console.log('Formulario invalido')
    }
  }

  get imagen(){
    return this.formProduct.get('imagen')?.value
  }

  get nombre(){
    return this.formProduct.get('nombre')
  }

  get precio(){
    return this.formProduct.get('precio')
  }

  get descripcion(){
    return this.formProduct.get('descripcion')
  }

  get unidadMedida(){
    return this.formProduct.get('unidadMedida')
  }

  get cantidadStock(){
    return this.formProduct.get('cantidadStock')
  }

  get notificarBajoStock(){
    return this.formProduct.get('notificarBajoStock')
  }
}
