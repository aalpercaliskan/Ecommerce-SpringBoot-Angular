import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from 'src/app/common/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { FormService } from 'src/app/services/form.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.css']
})
export class AdvertisementFormComponent implements OnInit {

  advertisementFormGroup!: FormGroup;
  isDisabled: boolean = false;
  storage: Storage = sessionStorage;
  genusList: string[] = [];
  speciesList: string[] = ["Dog", "Cat"];

  constructor(private formBuilder: FormBuilder,
    private advertisementService: AdvertisementService,
    private router: Router) { }

  ngOnInit(): void {

    this.advertisementFormGroup = this.formBuilder.group({

        advertisement: this.formBuilder.group({
        species: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        genus: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}')]),
        description: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),

      })

    });

  }

  get species() { return this.advertisementFormGroup.get('advertisement.species'); }
  get gender() { return this.advertisementFormGroup.get('advertisement.gender'); }
  get genus() { return this.advertisementFormGroup.get('advertisement.genus'); }
  get age() { return this.advertisementFormGroup.get('advertisement.age'); }
  get description() { return this.advertisementFormGroup.get('advertisement.description'); }


  onSubmit(){
    console.log("Handling the submit button");

    if (this.advertisementFormGroup.invalid) {
      this.advertisementFormGroup.markAllAsTouched();
      return;
    }

    const advertisement = new Advertisement();
    
    advertisement.species = this.advertisementFormGroup.get('advertisement.species')?.value;
    advertisement.gender = this.advertisementFormGroup.get('advertisement.gender')?.value;
    advertisement.genus = this.advertisementFormGroup.get('advertisement.genus')?.value;
    advertisement.age = this.advertisementFormGroup.get('advertisement.age')?.value;
    advertisement.description = this.advertisementFormGroup.get('advertisement.description')?.value;
    advertisement.customerId = this.storage.getItem("customerId")!;
    const name = `${advertisement.genus} ${advertisement.gender} ${advertisement.age} Age`;
    advertisement.name = name;

    advertisement.imageUrl =  `assets/images/animal/${advertisement.species.toLowerCase()}.png`;
   
    //call REST API via the CheckoutService
    console.log(advertisement);

    this.advertisementService.saveAdvertisement(advertisement).subscribe(() => {
      this.router.navigateByUrl("/advertisement-history");
    });

  }

  getGenus() {
    const species = this.advertisementFormGroup.get('advertisement.species')?.value;

    if(species == 'Dog') {
      this.genusList = ["Labrador Retriever", 
                        "German Shepherd",
                        "Bulldog",
                        "Poodle",
                        "Golden Retriever",
                        "Boxer",
                        "Rottweiler",
                        "Beagle",
                        "Dachshund",
                        "Yorkshire Terrier",
                        "Siberian Husky",
                        "Great Dane",
                        "Doberman Pinscher",
                        "Shih Tzu",
                        "Chihuahua",
                        "Border Collie",
                        "Cocker Spaniel",
                        "Bichon Frise",
                        "Australian Shepherd",
                        "Bernese Mountain Dog",
                        "Saint Bernard",
                        "English Mastiff",
                        "French Bulldog",
                        "Jack Russell Terrier",
                        "Shetland Sheepdog",
                        "Welsh Corgi",
                        "Weimaraner",
                        "Shar Pei",
                        "Irish Setter",
                        "Chow Chow"];
                        this.advertisementFormGroup.get('advertisement.genus')?.setValue(this.genusList[0]);
    }
    else {
      this.genusList = ["Siamese",
                        "Persian",
                        "Bengal",
                        "Scottish Fold",
                        "Sphynx",
                        "British Shorthair",
                        "Maine Coon",
                        "Ragdoll",
                        "Abyssinian",
                        "American Shorthair",
                        "Burmese",
                        "Devon Rex",
                        "Egyptian Mau",
                        "Himalayan",
                        "Norwegian Forest Cat"];

        this.advertisementFormGroup.get('advertisement.genus')?.setValue(this.genusList[0]);
    }
  }

}
