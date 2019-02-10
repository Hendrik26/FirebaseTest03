import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Customer} from './customer';
import {query} from '@angular/animations';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private dbPath = '/customers';
    private dbOrder = 'name';

    partialValue: Partial<any>;

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
        console.log('-------------');
        console.log('class CustomerService Method updateCustomer()');
        // this.customersRef.update(key, value).catch(error => this.handleError(error));
        const path = this.dbPath + '/' + key;
        // this.db.object(path).update(value);
        // Partial<any> partialValue = value;
        this.partialValue = value;
        this.db.object(path).update(this.partialValue);
    }

    deleteCustomer(key: string): void {
        this.customersRef.remove(key).catch(error => this.handleError(error));
    }

    getCustomersList(): Observable<any> {
        return this.customersRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    getCustomerObjectByKey(key: string): AngularFireObject<Customer> {
        const path = this.dbPath + '/' + key;
        return this.db.object(path);
    }

    deleteAll(): void {
        this.customersRef.remove().catch(error => this.handleError(error));
    }

    private handleError(error) {
        console.log(error);
    }
}
