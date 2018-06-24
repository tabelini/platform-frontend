import {Component, OnInit} from '@angular/core';
import {EndPointService} from '../end-point.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {EndPoint} from 'platform-domain';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'fuse-end-point-edit',
  templateUrl: './end-point-edit.component.html',
  styleUrls: ['./end-point-edit.component.scss']
})
export class EndPointEditComponent implements OnInit {

  actualObj = new BehaviorSubject<EndPoint>(new EndPoint('', ''));

  isNew$ = new BehaviorSubject<boolean>(true);

  isSaving$ = new BehaviorSubject<boolean>(false);

  form: FormGroup;
  formErrors: any;

  constructor(private fb: FormBuilder, public router: Router, public route: ActivatedRoute, private eps: EndPointService) {
  }


  ngOnInit() {
    this.resetForm();
    console.log(`${this.route.params}`);
    this.route.params.switchMap((params: Params) => {
      const id = params['id'];
      if (id === 'new') {
        this.isNew$.next(true);
        return Observable.of(new EndPoint('', '', ''));
      } else {
        this.isNew$.next(false);
        return this.eps.get(id);
      }
    }).subscribe((obj: EndPoint) => {
      console.log(`received obj: ${JSON.stringify(obj)}`);
      this.actualObj.next(obj);
    }, (error) => {
      console.log(`Got Error: ${JSON.stringify(error)}`);
      this.router.navigateByUrl('/');
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });

    this.formErrors = {
      name: {},
      location: {},
      type: {}
    };

    this.actualObj.subscribe(obj => {
      this.form.get('name').patchValue(obj.name);
      this.form.get('location').patchValue(obj.location);
      this.form.get('type').patchValue(obj.type);
    })

  }

  resetForm() {
    // Endpoint Form
    this.form = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  remove() {
    if (!this.isNew$.getValue()) {
      this.eps.delete(this.actualObj.getValue().id).subscribe(result => {
        console.log(`Removed: ${JSON.stringify(result)}`);
        this.router.navigateByUrl('/endpoints');
      });
    } else {
      this.router.navigateByUrl('/endpoints');
    }
  }

  save() {
    if (this.form.invalid || this.isSaving$.getValue()) {
      console.log(`saving disabled...`);
      return;
    }
    this.isSaving$.next(true);
    const obj = new EndPoint(this.form.get('name').value, this.form.get('location').value, this.form.get('type').value);
    this.eps.save(obj).subscribe((res) => {
      console.log(`Received: ${JSON.stringify(res)}`);
      this.isSaving$.next(false);
      this.router.navigateByUrl('/endpoints');
    });
  }

  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }
}
