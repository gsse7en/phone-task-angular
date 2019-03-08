import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiClient } from './api-client';
import { AppSettings } from './models/config';
import { Country } from './models/country';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private apiClient: ApiClient;
  private toasterService: ToasterService;

  public countries: Country[];
  public dropdownControl: FormControl;

  constructor(apiClient: ApiClient,
              toasterService: ToasterService) {
    this.apiClient = apiClient;
    this.countries = [];
    this.dropdownControl = new FormControl();
    this.toasterService = toasterService;
  }

  public ngOnInit() {
    this.loadCountries();
  }

  public async loadCountries(): Promise<void> {
    try {
      this.countries = await this.apiClient.get<Country[]>({
        url: AppSettings.API_ENDPOINT
      });
    } catch (error) {
      this.toasterService.pop('error', 'Error fetching countries', error);
    }
  }

  public call() {
    this.toasterService.pop('success', 'Calling...', this.dropdownControl.value);
  }

}
