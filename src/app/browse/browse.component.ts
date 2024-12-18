import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {WebService} from "../services/web.service";
import {PageModel} from "../../models/page.model";
import {PetModel} from "../../models/pet.model";
import { PaginationService } from "../services/pagination.service";
import {first, last} from "rxjs";

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  public webService!: WebService;
  public pets: PageModel<PetModel> | undefined = undefined;

  constructor(webService: WebService) {
    this.webService = webService;
  }

  ngOnInit(): void {
    this.webService.getRecommendedPets().subscribe((res) => {
      if (res && res.content) {
        this.pets = { ...res, content: res.content,}
      }
    });
  }
}
