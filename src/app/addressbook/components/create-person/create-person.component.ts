
import { PeopleService } from '../../services/people.service';
import { People } from '../../model/people.model';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PeopleStore } from '../../store/people.store';

@Component({
  selector: 'app-create-person',
  templateUrl: 'create-person.component.html'
})
export class CreatePersonComponent {

  createPersonSub: Subscription;

  constructor(private store: PeopleStore, private personService: PeopleService, private router: Router) { }


  onSubmit(submittedForm: { value: { lastname: any; firstname: any; phone: any; }; invalid: any; }) {
    if (submittedForm.invalid) {
      return;
    }
    const person: People = { id: uuid.v4(), lastname: submittedForm.value.lastname, firstname: submittedForm.value.firstname, phone: submittedForm.value.phone };
    this.createPersonSub = this.personService.createPerson(person).subscribe(result => {
      this.router.navigateByUrl('/people');
    });
  }
}
