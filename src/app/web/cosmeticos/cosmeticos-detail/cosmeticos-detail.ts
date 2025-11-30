import {Component, inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CosService} from '../../../services/cos-service';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {CurrencyPipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-cosmeticos-detail',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    FaIconComponent
  ],
  templateUrl: './cosmeticos-detail.html',
  styleUrl: './cosmeticos-detail.css',
})
export class CosmeticosDetail implements OnInit {
  @Input('id') idCosmetico!: string;
  private readonly dataService: CosService = inject(CosService);
  private readonly router: Router = inject(Router);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  loaded = false;

  formCosmetico: FormGroup = this.formBuilder.group({
    _id: [''],
    name: [''],
    image: [''],
    type: [''],
    brand: [''],
    price: [0]
  });

  get _id(): any {return this.formCosmetico.get('_id')!;}
  get name(): any {return this.formCosmetico.get('name')!;}
  get image(): any {return this.formCosmetico.get('image')!;}
  get type(): any {return this.formCosmetico.get('type')!;}
  get brand(): any {return this.formCosmetico.get('brand')!;}
  get price(): any {return this.formCosmetico.get('price')!;}

  ngOnInit(): void {
    this.loadCosmetico();
  }

  private loadCosmetico() {
    if (this.idCosmetico) {
      // editar
      this.dataService.getOneCosmetico(this.idCosmetico).subscribe(
        {
          next: data => {
            this.formCosmetico.setValue(data);
            this.loaded = true;
          },
          error: error => {
            console.error(error);
          }
        }
      )
    } else {
      // nuevo
      this.formCosmetico.reset();
      this.loaded = true;
    }
  }


  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;

  onSubmit() {
//    if (this.formCosmetico.invalid) {
//      this.formCosmetico.markAllAsTouched();
//      return;
//   }
    if (this.idCosmetico) {
      // Patch
      this.dataService.patchCosmetico(this.formCosmetico.value).subscribe(
        {
          next: value => {
            alert(value.message);
            this.router.navigateByUrl('/cosmeticos/list');
          },
          error: error => {
            console.error(error);
          }
        }
      )
    } else {
      // Post
      this.dataService.postCosmetico(this.formCosmetico.value).subscribe(
        {
          next: value => {
            alert(value.message);
            this.router.navigateByUrl('/cosmeticos/list');
          },
          error: error => {
            console.error(error);
          }
        }
      )
    }
  }
}
