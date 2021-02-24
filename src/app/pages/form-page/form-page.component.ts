import { Component, Input, OnDestroy, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterPageComponent } from '../master-page/master-page.component';
import { PageService } from '../services/page.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
  providers: [DialogService, MessageService]
})
export class FormPageComponent implements OnInit, OnDestroy {

  @Input() PAGE_INFO: any;       // Informacion Recibida de MasterPage
  PAGE_CONFIG : any;             // Configuracion de la Pagina
  registPage !: string[];        // Registros de la Pagina
  formGroup  !: FormGroup;       // Formulario Reactivo
  ilDevMode   : boolean = true; // Modo de Desarrollo
  showRegDev  : boolean = false; // Mostrar Registros json
  styleWidth  : number = 95;     // Ancho de Pagina
  nuPagina: string = '';
  datatypeInfo: any ={};
  /** datos para cargar solo el ngprime **/
  date3!: Date;

  ref!: DynamicDialogRef;
  
  selectedCity!: City;
  selectedCountry: any;
  /********************************************/



  constructor(
    public pageService: PageService,
    public formBuilder: FormBuilder,
    public messageService: MessageService,
    public dialogService: DialogService,
    public dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.getPaginaData();

    // Recargar Pagina
    this.pageService.enviarParamsObservable.subscribe( (res: any) =>{
      if (res.pages_to_refresh) {
        if (res.pages_to_refresh.includes(this.PAGE_CONFIG.id_page)){
          this.getPaginaData();
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

  showAlert(title: any, body: any, type: any) {
    this.messageService.add({severity:type, summary: title, detail: body});
  }

  public ejecutarBoton( btn_type: string, btn_id: any, btn_conten: number): void {
    // Validar si debe ejecutarse el propag (buscar btn_exepag = true)
    let btn_info = this.PAGE_CONFIG.page_button.find((item: { btn_id: any; }) => item.btn_id === btn_id);

    // Ejecutar Propag si esta habilitado (true)
    if (btn_info.btn_exepag){
      // Mensaje Info Consola
      console.log("====> Procesando Progag:", this.PAGE_CONFIG.id_page);

      this.pageService.propag(this.PAGE_CONFIG.id_page, btn_id, this.formGroup.value).subscribe( (result: any) => {
        // console.log("====> Completando la ejecucion del Progag:", result) // Mensaje Consola
        // // Validar Si Existe Redireccion a Otra Pagina
        // if (result['page_redirect']){
        //   if (Object.keys(this.dialogRef).length > 0) {
        //     this.dialogRef.close();
        //   };

        //   this._router.navigate(['/home/system'], {queryParams: {nu_conten: result['page_redirect']}})
        // };

        // Validar si Existen Alertas a Mostrar
        if (result.msg_alert){
          this.showAlert(result.msg_alert.msg_title, result.msg_alert.msg_body, result.msg_alert.msg_type);
        };
        
        // Validar Si Existe Parametros para agregar al contenedor
        if (result.page_params){
          let params: object = result.page_params;

          this.pageService.addParam(params);
        };

        // Validar Si Existe Paginas a Recargar
        if (result.pages_to_refresh){
          // Agregar Paginas a Refrescar
          this.pageService.addPageRefresh(result.pages_to_refresh);
        };

        // Validar Si existe cerrar Dialog
        if (result.close_dialog){
          
          if (this.pageService.contenedorDialog) {
            console.log("entro close dialog", this.dialogRef)
            this.dialogRef.close(true);
          };
        };
        
        // Si hay Popup Abrirlo
        if (btn_conten) {
          this.pageService.contenedorDialog = btn_conten;
          
          if (btn_conten != null){
            console.log( '====> Open popup - Button:', btn_id, ' - Container:', btn_conten);
            this.ref = this.dialogService.open(MasterPageComponent, {
              // header: 'Choose a Product',
              // data:{hola: "dato nuevo", parametro: 123},
              // width: '100%',
              showHeader: true,
              closable: true,
              contentStyle: {"height": "100vp", "min-width": "450px", "padding":"0", "overflow": "auto"},
              baseZIndex: 10000
            });
    
            this.ref.onClose.subscribe((car:any ) => {
              this.pageService.contenedorDialog = null;
              console.log("'The dialog was closed'", this.pageService.contenedorDialog);
            });
          };
        };
      }, err => {
        console.log("error", err.error.valid);
        if (err.error.valid === false) {
          // this.openSnackBar("Mensaje de Error", err.error.error_stack, 'danger');
          console.log("error");
          this.showAlert("Mensaje de Error", err.error.error_stack, 'error');
        };
      });
    };
  };


  log(val: any){
    console.log("valor:", val)
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

      this.nuPagina = this.ilDevMode ? ' - ' + this.PAGE_CONFIG.id_page : '';

      // Obtener los nombres de los registros (Keys del Objeto)
      this.registPage = Object.keys(this.PAGE_CONFIG.regist_title);

      // Crear el Formulario con los Registros de la Pagina
      this.crearFormulario();
    }, err => {
      console.log("error", err.error.valid);
      if (err.error.valid === false) {
        // this.openSnackBar("Mensaje de Error", err.error.error_stack, 'danger');
        console.log("error");
        this.showAlert("Mensaje de Error", err.error.error_stack, 'error');
      };
    });
  };

  public crearFormulario(): void {
    // Objeto para Configurar el FormGroup
    let formObj: any = {};
    
    // Crear cada registro
    this.registPage.forEach( regist => {
      formObj[regist] = new FormControl(this.PAGE_CONFIG.data_page[0][regist]);
    });
    
    // Crear la Data para el Typo de Dato
    this.registPage.forEach( regist_name => {
      // Informacion para Configurar el Tipo de Dato
      let getType   : string = regist_name + "_type";
      let getEst    : string = regist_name + "_est";
      let getColor  : string = regist_name + "_color";
      let getIco    : string = regist_name + "_ico";
      let getConte  : string = regist_name + "_conten";
      let getDatsel : string = regist_name + "_datsel";
      let getPagRef : string = regist_name + "_pagref";

      this.datatypeInfo[regist_name] = {
        regist_name       : regist_name,
        regist_value      : this.PAGE_CONFIG.data_page[0][regist_name],
        regist_datatype   : this.PAGE_CONFIG.data_page[0][getType],
        regist_status     : this.PAGE_CONFIG.data_page[0][getEst],
        regist_color      : this.PAGE_CONFIG.data_page[0][getColor],
        regist_icon       : this.PAGE_CONFIG.data_page[0][getIco],
        regist_conten     : this.PAGE_CONFIG.data_page[0][getConte],
        regist_opcselect  : this.PAGE_CONFIG.data_page[0][getDatsel],
        regist_pagref     : this.PAGE_CONFIG.data_page[0][getPagRef],
        regist_title      : this.PAGE_CONFIG.regist_title[regist_name],
      };
    });
    
    // Crear el FormGroup con Ayuda del FormBuilder
    this.formGroup = this.formBuilder.group(formObj);
    
    // Agregar Validaciones a los Campos
    this.registPage.forEach(regist => {  
      this.formGroup.controls[regist].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(20)]);
    });

    
  };
  /**********************************************/  

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
}
