import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from 'src/app/common/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-advertisement-detail',
  templateUrl: './advertisement-detail.component.html',
  styleUrls: ['./advertisement-detail.component.css']
})
export class AdvertisementDetailComponent implements OnInit {

  advertisement!: Advertisement;
  advertisementFormGroup!: FormGroup;
  storage: Storage = sessionStorage;
  speciesStr!: string;
  genusList: string[] = [];
  speciesList: string[] = ["Dog", "Cat"];

  constructor(private advertisementService: AdvertisementService,
              private formBuilder: FormBuilder,
             private route: ActivatedRoute,
             private router: Router) { }

  ngOnInit(): void {
    
    const advertisementId: number = +this.route.snapshot.paramMap.get('id')!;
   
    this.advertisementService.getAdvertisement(advertisementId).subscribe(
      (data: Advertisement) => {
        console.log("data: " + JSON.stringify(data));
        this.advertisement = data;
        console.log(this.advertisement.species);  
        this.advertisementFormGroup = this.formBuilder.group({
      
         
          species: new FormControl(this.advertisement.species, [Validators.required]),
          gender: new FormControl(this.advertisement.gender, [Validators.required]),
          genus: new FormControl(this.advertisement.genus, [Validators.required]),
          age: new FormControl(this.advertisement.age, [Validators.required, Validators.pattern('[0-9]{1,2}')]),
          description: new FormControl(this.advertisement.description, [Validators.required, Validators.pattern('[0-9]{10}')]),
          
          
      
      });
      this.getGenus();
      }
  );

  }
/*
  handleAdvertisementDetails() {
    
    const advertisementId: number = +this.route.snapshot.paramMap.get('id')!;
    console.log(advertisementId);
    this.advertisementService.getAdvertisement(advertisementId).subscribe(
      data => {
        this.advertisement = data;
      }
    )
  }*/

  get species() { return this.advertisementFormGroup.get('species'); }
  get gender() { return this.advertisementFormGroup.get('gender'); }
  get genus() { return this.advertisementFormGroup.get('genus'); }
  get age() { return this.advertisementFormGroup.get('age'); }
  get description() { return this.advertisementFormGroup.get('description'); }

  onSubmit(){
    console.log("Handling the submit button");

    if (this.advertisementFormGroup.invalid) {
      this.advertisementFormGroup.markAllAsTouched();
      return;
    }

    
    
    
    this.advertisement.species = this.advertisementFormGroup.get('species')?.value;
    this.advertisement.gender = this.advertisementFormGroup.get('gender')?.value;
    this.advertisement.genus = this.advertisementFormGroup.get('genus')?.value;
    this.advertisement.age = this.advertisementFormGroup.get('age')?.value;
    this.advertisement.description = this.advertisementFormGroup.get('description')?.value;
    this.advertisement.customerId = this.storage.getItem("customerId")!;
    const name = `${this.advertisement.genus} ${this.advertisement.gender} ${this.advertisement.age} Age`;
    this.advertisement.name = name;

    this.advertisement.imageUrl =  `assets/images/animal/${this.advertisement.species.toLowerCase()}.png`;
    //call REST API via the CheckoutService
    console.log(this.advertisement);

    this.advertisementService.saveAdvertisement(this.advertisement).subscribe(() => {
      this.router.navigateByUrl("/advertisement-history");
    });

  }

  getGenus() {
    const species = this.advertisementFormGroup.get('species')?.value;

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
                        this.advertisementFormGroup.get('genus')?.setValue(this.genusList[0]);
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

        this.advertisementFormGroup.get('genus')?.setValue(this.genusList[0]);
    }
  }
}
