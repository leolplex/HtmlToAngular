import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
  info: InfoPage = {};
  cargada = false;

  equipo: any[] = [];


  constructor(private http: HttpClient) {
    // console.log('Servicio de InfoPagina Listo');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // leer archivo json
    this.http.get('assets/data/data-page.json').subscribe((resp: InfoPage) => {
      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarEquipo() {
      // leer archivo json
    this.http.get('https://angular-html-a6da9.firebaseio.com/equipo.json').subscribe((resp: any) => {
      this.equipo = resp;
    });
  }
}
