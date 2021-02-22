import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from '../services/page.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

  @Input() PAGE_INFO: any;    // Informacion Recibida de MasterPage
  PAGE_CONFIG: any;           // Configuracion de la Pagina
  registPage!: string[];      // Registros de la Pagina
  formGroup!: FormGroup;      // Formulario Reactivo
  showRegDev: boolean = false; // Modo de Desarrollo
  styleWidth: number = 95;    // Ancho de Pagina

  /** datos para cargar solo el ngprime **/
  date3!: Date;

  
  selectedCity!: City;
  selectedCountry: any;
  /********************************************/



  constructor(
    private pageService: PageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPaginaData();

  }

  filterCountry(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  showRegistDev(){
    this.showRegDev = !this.showRegDev;
  }

  /************** CALL TO SERVICES **************/
  getPaginaData() {
    // Consultar al Servicio la Informacion de la Pagina a Renderizar
    this.pageService.getPagina(this.PAGE_INFO.id_page).subscribe( result => {
      // Mensaje Consola
      console.log("====> Cargango Pagina", this.PAGE_INFO.id_page);
      
      // Guardar Datos de la Pagina
      this.PAGE_CONFIG = result;

      // Obtener los nombres de los registros (Keys del Objeto)
      this.registPage = Object.keys(this.PAGE_CONFIG.regist_title);

      // Crear el Formulario con los Registros de la Pagina
      this.crearFormulario();
    });
  };

  public crearFormulario(): void {
    // Objeto para Configurar el FormGroup
    let formObj: any = {};
    
    // Crear cada registro
    this.registPage.forEach( regist => {
      formObj[regist] = new FormControl(this.PAGE_CONFIG.data_page[0][regist]);
    });
    
    // Crear el FormGroup con Ayuda del FormBuilder
    this.formGroup = this.formBuilder.group(formObj);
    
    // Agregar Validaciones a los Campos
    this.registPage.forEach(regist => {  
      this.formGroup.controls[regist].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(20)]);
    });

    console.log("formGroup:", this.formGroup.controls.regist_10.pristine)
  };

  countries: any[] = [
    { name: "Afghanistan", code: "AF" },
    { name: "Åland Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Anguilla", code: "AI" },
    { name: "Antarctica", code: "AQ" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" }
  ];

  filteredCountries: any[] = [];

  log(val: any){
    console.log("valor:", val)
  }
}
