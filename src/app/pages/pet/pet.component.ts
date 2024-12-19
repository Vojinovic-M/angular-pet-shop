import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetModel } from '../../../models/pet.model';
import { WebService } from '../../services/web.service';
import { NgIf } from '@angular/common';
import {
  HlmBreadcrumbDirective,
  HlmBreadcrumbEllipsisComponent, HlmBreadCrumbImports,
  HlmBreadcrumbItemDirective,
  HlmBreadcrumbLinkDirective,
  HlmBreadcrumbListDirective,
  HlmBreadcrumbPageDirective,
  HlmBreadcrumbSeparatorComponent,
} from '@spartan-ng/ui-breadcrumb-helm';


@Component({
  selector: 'app-pet-shop',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    HlmBreadcrumbDirective,
    HlmBreadcrumbEllipsisComponent,
    HlmBreadcrumbItemDirective,
    HlmBreadcrumbLinkDirective,
    HlmBreadcrumbListDirective,
    HlmBreadcrumbPageDirective,
    HlmBreadcrumbSeparatorComponent,
    HlmBreadcrumbEllipsisComponent,
    HlmBreadCrumbImports,
    HlmBreadcrumbItemDirective,
    HlmBreadcrumbDirective,
  ],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent {
  public pet: PetModel | null = null;

  constructor(private route: ActivatedRoute, private webService: WebService) {
    route.params.subscribe((params) => {
      const id = params['id'];
      this.webService.getPetById(id).subscribe((rsp) => {
        this.pet = rsp
        console.log(this.pet);
      });
    });
  }
}
