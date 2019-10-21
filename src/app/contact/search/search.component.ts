import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactListSearchBindingService } from 'src/app/services/component/contact-list-search-binding.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  
  constructor(
    private contactListSearchBindingService: ContactListSearchBindingService
  ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      emailOrPhone: new FormControl('', null),
    });
  }

  search() {
    this.contactListSearchBindingService.searchContacts(this.searchForm.get('emailOrPhone').value);
  }
}
