import {Component, inject, Input, OnInit} from '@angular/core';
import {JugService} from '../../../services/jug-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {Router} from '@angular/router';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {Toast} from '../../../common/interfaces';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {FormValidators} from '../../../Validators/FormValidators';


@Component({
  selector: 'app-juguetes-detail',
  imports: [
    CurrencyPipe,
    FaIconComponent,
    ReactiveFormsModule,
    NgbToast
  ],
  templateUrl: './juguetes-detail.html',
  styleUrl: './juguetes-detail.css',
})
export class JuguetesDetail implements OnInit {
  @Input('id') idJuguete!: string;
  private readonly jugService: JugService = inject(JugService);
  private readonly router: Router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  loaded = false;
  show = false;

  toast: Toast = {
    text: '',
    className: ''
  };

  formJuguete: FormGroup = this.formBuilder.group({
    _id: [''],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), FormValidators.notOnlySpaces, FormValidators.forbiddenWord('sex')]],
    imagen: ['', [Validators.minLength(10), Validators.maxLength(200)]],
    categoria: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    edadMinima: [0, [Validators.required, Validators.min(0), Validators.max(120)]],
    precio: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
  });

  get nombre(): any {return this.formJuguete.get('nombre')!;}
  get imagen(): any {return this.formJuguete.get('imagen')!;}
  get categoria(): any {return this.formJuguete.get('categoria')!;}
  get edadMinima(): any {return this.formJuguete.get('edadMinima')!;}
  get precio(): any {return this.formJuguete.get('precio')!;}

  ngOnInit(): void {
    this.loadJuguete();
  }

  private loadJuguete() {
    if (this.idJuguete) {
      // editar
      this.jugService.getOneJuguete(this.idJuguete).subscribe(
        {
          next: data => {
            this.formJuguete.setValue(data)
            this.loaded = true;
            this.toast.text = 'Juguete cargado correctamente';
            this.toast.className = 'bg-success text-light';
            this.show = true;
          },
          error: error => {
            console.error(error);
          }
        }
      )
    } else {
      // nuevo
      this.formJuguete.reset();
      this.loaded = true;
    }

  }

  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;

  onSubmit() {
    if (this.formJuguete.invalid) {
      this.formJuguete.markAllAsTouched();
      return;
    }
    if (this.idJuguete) {
      // Patch
      this.jugService.patchJuguete(this.formJuguete.value).subscribe(
        {
          next: value => {
            this.toast.text = value.message;
            this.toast.className = 'bg-success text-light';
            this.show = true;
            setTimeout(() => {
              this.show = false;
              this.router.navigateByUrl('/juguetes/list');
            }, 1000)

          },
          error: error => {
            this.toast.text = error.message;
            this.toast.className = 'bg-success text-light';
            this.show = true;
          }
        }
      )
    } else {
      // Post
      this.jugService.postJuguete(this.formJuguete.value).subscribe(
        {
          next: value => {
            this.toast.text = value.message;
            this.toast.className = 'bg-success text-light';
            this.show = true;
            setTimeout(() => {
              this.show = false;
              this.router.navigateByUrl('/juguetes/list');
            }, 1000);

          },
          error: error => {
            this.toast.text = error.message;
            this.toast.className = 'bg-success text-light';
            this.show = true;
            console.error(error);
          }
        }
      )
    }
  }

  protected readonly faExclamationTriangle = faExclamationTriangle;

}
