import {CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageModel } from '../../../models/page.model';
import { PetModel } from '../../../models/pet.model';
import { WebService } from '../../services/web.service';


@Component({
    selector: 'app-home',
    imports: [
        CommonModule
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

