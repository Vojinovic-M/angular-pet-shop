import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { PageModel } from '../../models/page.model';
import { PetModel } from '../../models/pet.model';
import { SafePipe } from '../pipes/safe.pipe';
import { RouterLink } from '@angular/router';
import { WebService } from '../services/web.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    CommonModule,
    SafePipe
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
    this.webService.getRecommendedPets().subscribe((res) => (this.pets = res));
  }
}

