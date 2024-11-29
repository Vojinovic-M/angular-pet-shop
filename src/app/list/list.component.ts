import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebService } from '../web.service';
import { PageModel } from '../../models/page.model';
import { PetModel } from '../../models/pet.model';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, NgIf, HttpClientModule, RouterLink, NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  public webService!: WebService;
  public data: PageModel<PetModel> | null = null;

  // @ts-ignore
  constructor(webService: WebService) {
    this.webService = webService;
    this.getPetData();
  }

  public getPetData(page = 0) {
    this.webService.getPets(page).subscribe((rsp) => (this.data = rsp));
  }

  public first() {
    this.getPetData();
  }

  public previous() {
    if (this.data == null || this.data.first) return;
    this.getPetData(this.data.number - 1);
  }

  public next() {
    if (this.data == null || this.data.last) return;
    this.getPetData(this.data.number + 1);
  }

  public last() {
    if (this.data == null || this.data.last) return;
    this.getPetData(this.data.totalPages - 1);
  }
}

