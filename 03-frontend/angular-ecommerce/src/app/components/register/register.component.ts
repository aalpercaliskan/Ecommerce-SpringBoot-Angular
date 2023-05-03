import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { FormService } from 'src/app/services/form.service';
import { CustomValidators } from 'src/app/validators/custom-validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup!: FormGroup;
  isRegistered : boolean = false;
  isSubmit: boolean = false;
  storage: Storage = sessionStorage;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {

    this.registerFormGroup = this.formBuilder.group({
    customer: this.formBuilder.group({
        firstName: new FormControl('',
                                  [Validators.required,
                                   CustomValidators.minLength(2),
                                   CustomValidators.onlyWhitespace]),
        lastName: new FormControl('',
                                  [Validators.required,
                                  CustomValidators.minLength(2),
                                  CustomValidators.onlyWhitespace]),
        email: new FormControl('',
                              [Validators.required,
                              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password: new FormControl('',
                                  [Validators.required,
                                  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z].{8,}')]),
       
    })
    
  });

  }

  get firstName() { return this.registerFormGroup.get('customer.firstName'); }
  get lastName() { return this.registerFormGroup.get('customer.lastName'); }
  get email() { return this.registerFormGroup.get('customer.email'); }
  get password() { return this.registerFormGroup.get('customer.password'); }

  onSubmit(){

    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }

    //set up customer
    let customer = this.registerFormGroup.controls['customer'].value;

    this.customerService.register(customer).subscribe(
      {
        next: (response: any) => {
          sessionStorage.setItem("isRegistered", "true");
          this.isRegistered = true;
          this.registerFormGroup.reset();
          this.router.navigateByUrl("/login");
          
          
        },
        error: (err: any) => {
          this.isSubmit = true;
        }
        
      }
    );

  }


  
  

  



}
