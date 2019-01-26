import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

    customer: Customer = new Customer();
    customerId: string;
    submitted = false;
    receivedCustomerIdError = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private customerService: CustomerService
    ) {
    }

    private hasReceivedCustomerId(): // can NOT be deleted
        boolean {
        console.log('private method hasReceivedCustomerId()');
        if (this.route.snapshot.paramMap.has('customerId')) {
            this.customerId = this.route.snapshot.paramMap.get('customerId');  // get customerId from URL
            console.log('if-Zweig');
            console.log('this.customerId===' + this.customerId);
            console.log('--------------');
            return true;
        } else {
            this.customerId = null; // stands for the creation of a new customer
            console.log('else-Zweig');
            console.log('--------------');
            return false;
        }
    }

    ngOnInit() {
        this.receivedCustomerIdError = !this.hasReceivedCustomerId();
        console.log('this.receivedCustomerIdError===' + this.receivedCustomerIdError);
        console.log('------------');
        if (this.receivedCustomerIdError) {
            this.customer = new Customer();
        } else {
            console.log('ngOnInit else');
            console.log('-------------');
            this.receiveCustomerByKey(this.customerId);
        }
    }

    newCustomer(): void {
        this.submitted = false;
        this.customer = new Customer();
    }

    private receiveCustomerByKey(key: string): void {
        let methCustomers: any;
        let retCustomer: Customer;
        console.log('createCustomer receiveCustomerByKey() Part 001');
        /* this.customerService.getCustomerByKey(key)
            .subscribe(customer => {
                // TODO remove this.invoice.....
                this.customer = customer;
            }); */
        // this.customer = this.customerService.getCustomerByKey(key);
        this.customerService.getCustomerByKey(key).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        ).subscribe(customers => {
            methCustomers = customers;
        });
        console.log('createCustomer receiveCustomerByKey() Part 002');
        retCustomer = methCustomers[0];
        console.log('createCustomer receiveCustomerByKey() Part 003');
        console.log('----------------------------------------------------------------------');
        this.customer = retCustomer;
    }

    save() {
        this.customerService.createCustomer(this.customer);
        this.customer = new Customer();
    }

    onSubmit() {
        this.submitted = true;
        this.save();
    }
}
