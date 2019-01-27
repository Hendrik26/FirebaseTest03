import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { CustomerService } from '../customer.service';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: any;
  customersCount = -1;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    console.log('ngOnInit CustomersListComponent');
      console.log('-------------------------');
    this.getCustomersList();
  }

  getCustomersList() {
    // Use snapshotChanges().map() to store the key
    this.customerService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(customers => {
      this.customers = customers;
    });
    // this.customersCount = this.customers.length;
  }

  deleteCustomers() {
    this.customerService.deleteAll();
  }

}
