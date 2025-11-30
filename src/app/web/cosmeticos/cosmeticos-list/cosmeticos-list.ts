import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CosService} from '../../../services/cos-service';
import {Cosmetico} from '../../../common/interfaces';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-cosmeticos-list',
  imports: [
    NgbPagination,
    CurrencyPipe,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './cosmeticos-list.html',
  styleUrl: './cosmeticos-list.css',
})
export class CosmeticosList implements OnInit{
  private readonly cService: CosService = inject(CosService);
  cosmeticos: WritableSignal<Cosmetico[]> = signal([]);
  currentPage: number = 1;
  total: number = 0;
  editar = false;
  loaded = false;

  ngOnInit () {
    this.loadCosmeticos();
  }

  loadCosmeticos() {
    this.cService.getByPage(this.currentPage).subscribe(
      {
        next: data => {
          this.cosmeticos.set(data.cosmeticos.cosmeticos);
          this.total = data.cosmeticos.info.total;
          this.loaded = true;
        },
        error: error => {
          console.error(error);
        }
      })
  }
  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;

  protected changePage(event: number) {
    this.currentPage = event;
    this.loadCosmeticos();
  }

  protected deleteCosmetico(cosmetico: Cosmetico) {
    if (confirm('¿Desea borrar ' + cosmetico.name + '?')) {
      this.cService.deleteCosmetico(cosmetico._id).subscribe(
        {
          next: value => {
            alert(value.message)
            this.loadCosmeticos();
          },
          error: error => {
            console.error(error);
          }
        }
      )
    }
  }
}
