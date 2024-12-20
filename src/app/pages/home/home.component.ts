import {CommonModule, NgFor, NgIf, NgOptimizedImage} from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { PageModel } from '../../../models/page.model';
import { PetModel } from '../../../models/pet.model';
import { RouterLink } from '@angular/router';
import { WebService } from '../../services/web.service';


@Component({
    selector: 'app-home',
    imports: [
        RouterLink,
        NgIf,
        NgFor,
        CommonModule,
        NgOptimizedImage
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public webService!: WebService;
  public pets: PageModel<PetModel> | undefined = undefined;

  constructor(webService: WebService) {
    this.webService = webService;
  }

  ngOnInit(): void {
    this.webService.getRecommendedPets().subscribe((res) => {
      if (res && res.content) {
        this.pets = { ...res, content: res.content.slice(-3),}
      }
    });
  }
}

