import {Component, inject, signal, WritableSignal} from '@angular/core';
import {JugService} from '../../../services/jug-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Juguete} from '../../../common/interfaces';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {RouterLink} from '@angular/router';
import {CurrencyPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-juguetes-list',
  imports: [
    FaIconComponent,
    RouterLink,
    NgClass,
    CurrencyPipe
  ],
  templateUrl: './juguetes-list.html',
  styleUrl: './juguetes-list.css',
})
export class JuguetesList {
  private readonly jService: JugService = inject(JugService);
  private readonly modalService: NgbModal = inject(NgbModal);
  juguetes: WritableSignal<Juguete[]> = signal([]);
  editar = false;
  loaded = false;

  ngOnInit () {
    this.loadJuguetes();
  }

  loadJuguetes() {
    this.jService.getAll().subscribe(
      {
        next: juguetes => {
          this.juguetes.set(juguetes.juguetes);
          this.loaded = true;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  deleteJuguete(id: any) {
    if (id) {
      this.jService.deleteJuguete(id).subscribe(
        {
          next: value => {
            console.log('Borrado OK: ', value.message);
            this.loadJuguetes();
          },
          error: error => {
            console.error(error);
          }
        })
    }
  }
  protected readonly faTrash = faTrashCan;
}
