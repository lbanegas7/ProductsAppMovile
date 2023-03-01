import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

  createProduct(newProduct:any){
    return this.firestore.collection('Producto').add(newProduct)
  } 

  getAllProducts(){
    return this.firestore.collection('Producto').valueChanges()
  }
}
