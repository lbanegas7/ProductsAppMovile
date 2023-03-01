import {LoadingController} from '@ionic/angular';
import {ProductsService} from './../services/products.service';
import {FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  viewSelectLowStock = false;

  formNewProduct = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.maxLength(50)]],
    imagen: ['', [Validators.required]],
    unidadMedida: ['', [Validators.required, Validators.maxLength(2)]],
    cantidadStock: ['', [Validators.required]],
    notificarBajoStock: [''],
  });

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private loadingProduct: LoadingController) { }

  ngOnInit() {
  }

  //Guardado del nuevo producto ingresado
  saveProduct(){

    if(this.formNewProduct.valid && this.isStockValid()){
      // console.log(this.formNewProduct.value);
      this.LoadingAddProduct();
      const newProduct = {...this.formNewProduct.value!, estado: 'ACTIVO'}
      !this.viewSelectLowStock && delete newProduct.notificarBajoStock
      this.productsService.createProduct(newProduct)
      .then(res => {
        this.formNewProduct.reset();
        this.formNewProduct.clearValidators();
        this.loadingProduct.dismiss();
      })
      .catch(error => {
        console.log('Error => ', error);
        this.loadingProduct.dismiss();
        this.formNewProduct.reset();
      })
    }
  }

  // Componente loader que se muestra mientras la peticion asincrona de guardado de producto se realiza
  async LoadingAddProduct(){
    const loading = await this.loadingProduct.create({
      message: 'Guardando producto',
      spinner: 'circles',
      mode: "ios"
    });

    return await loading.present();
  }

  // Captura de la imagen subida y conversion a base64 de la misma
  cargarImagenProducto(event:any){
    if(this.isValidSizeImg(event.target.files[0]?.size)){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = () => { 
        this.formNewProduct.get('imagen')?.setValue(reader.result!.toString())    
      };
    }else{
      console.log('Size no valid');
    }
  }
  
  // Validamos que se ingreso una cantidad adecuada en stock
  isStockValid():boolean{
    return this.viewSelectLowStock ? this.cantidadStock?.value! > this.notificarBajoStock?.value! : true
  }

  selectStock(){
    this.viewSelectLowStock && this.formNewProduct.get('notificarBajoStock')?.setValue('')
    
    this.viewSelectLowStock = !this.viewSelectLowStock
  }

  // Tamaño maximo permitido de imagen del producto: 600kb
  isValidSizeImg(size:number){
    return size < 600000
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
    return this.formNewProduct.get('imagen')?.value
  }

  get unidadMedida(){
    return this.formNewProduct.get('unidadMedida')
  }

  get cantidadStock(){
    return this.formNewProduct.get('cantidadStock')
  }

  get notificarBajoStock(){
    return this.formNewProduct.get('notificarBajoStock')
  }

}
