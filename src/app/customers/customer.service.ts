import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Customer} from './customer';
import {query} from '@angular/animations';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private dbPath = '/customers';
    private dbOrder = 'name';

    customersRef: AngularFireList<Customer> = null;
    customersRefOne: AngularFireList<Customer> = null;

    constructor(private db: AngularFireDatabase) {
    }

    queryAllCustomers(): void {
        this.customersRef = this.db.list(this.dbPath, ref => ref.orderByChild(this.dbOrder));
    }

    queryCustomerByKey(key): void {
        this.customersRef = this.db.list(this.dbPath, ref => ref.orderByKey().equalTo(key));
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

    getCustomerByKey(key: string): AngularFireList<Customer> {
        // let retCustomer: Customer;
        console.log('customereService getCustomerByKey() Part 001');
        this.customersRefOne = this.db.list(this.dbPath, ref => ref.orderByChild('key').equalTo(key));
        console.log('customereService getCustomerByKey() Part 002');
        console.log('------------------------------------------------------------------------------');
        // return retCustomer;
        return this.customersRefOne;
    }

    deleteAll(): void {
        this.customersRef.remove().catch(error => this.handleError(error));
    }

    private handleError(error) {
        console.log(error);
    }
}
