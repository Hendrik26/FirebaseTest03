import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Customer } from './customer';
import {query} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private dbPath = '/customers';
  private dbOrder = 'name';

  customersRef: AngularFireList<Customer> = null;

  constructor(private db: AngularFireDatabase) {
    this.customersRef = db.list(this.dbPath, ref => ref.orderByChild(this.dbOrder));
  }

  createCustomer(customer: Customer): void {
    this.customersRef.push(customer);
  }

  updateCustomer(key: string, value: any): void {
    this.customersRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteCustomer(key: string): void {
    this.customersRef.remove(key).catch(error => this.handleError(error));
  }

  getCustomersList(): AngularFireList<Customer> {
    return this.customersRef;
  }

  deleteAll(): void {
    this.customersRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
