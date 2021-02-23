import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PageService } from '../services/page.service';

export interface Product {
	id?: string;
	code?: string;
	name?: string;
	description?: string;
	price?: number;
	quantity?: number;
	inventoryStatus?: string;
	category?: string;
	image?: string;
	rating?: number;
}

@Component({
	selector: 'app-table-page',
	templateUrl: './table-page.component.html',
	styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {

	@Input() PAGE_INFO: any;    // Informacion Recibida de MasterPage
	PAGE_CONFIG: any;           // Configuracion de la Pagina
	registPage!: string[];      // Registros de la Pagina
	tableData: any;				// Data para la Tabla
	showRegDev  : boolean = false; // Modo de Desarrollo
	styleWidth  : number = 95;     // Ancho de Pagina
	statuses: SelectItem[] = [];
	@ViewChild('dt') dt: any;


	constructor(
		private pageService: PageService,
		private messageService: MessageService
	) { }

	ngOnInit(): void {
		this.getPaginaData();

		this.statuses = [{ label: 'In Stock', value: 'INSTOCK' }, { label: 'Low Stock', value: 'LOWSTOCK' }, { label: 'Out of Stock', value: 'OUTOFSTOCK' }]
	}

	/************** CALL TO SERVICES **************/
	getPaginaData() {
		// Consultar al Servicio la Informacion de la Pagina a Renderizar
		this.pageService.getPagina(this.PAGE_INFO.id_page).subscribe(result => {
			// Mensaje Consola
			console.log("====> Cargango Pagina", this.PAGE_INFO.id_page);

			// Guardar Datos de la Pagina
			this.PAGE_CONFIG = result;

			// Obtener los nombres de los registros (Keys del Objeto)
			this.registPage = Object.keys(this.PAGE_CONFIG.regist_title);

			// Recorrer los regist para ver cual se debe retirar y no hacer render
			this.registPage.forEach(regist => {
				// No Renderizar Columna - Modo Oculto
				if (this.PAGE_CONFIG.data_page[0][regist+"_est"] === 'O'){
					delete this.PAGE_CONFIG.regist_title[regist];
				};
			});

			// Data de la Tabla
			this.tableData = this.PAGE_CONFIG.data_page;
		});
	};

	showAlert(title: any, body: any, type: any) {
		this.messageService.add({severity:type, summary: title, detail: body});
	};
	
	public ejecutarBoton(btn_type: string, btn_id: any, btn_conten: number, row: any): void {
		let btn_info;
		let propagData;
	
		// Validar si debe ejecutarse el propag
		if (btn_type === 'E'){
		  	btn_info = this.PAGE_CONFIG.regist_button.find((item: { btn_id: any; }) => item.btn_id === btn_id);
		
			propagData = row;
		} else {
		  	btn_info = this.PAGE_CONFIG.page_button.find((item: { btn_id: any; }) => item.btn_id === btn_id);
		  	propagData = JSON.stringify(this.tableData);
		};

		if (btn_info.btn_exepag) { // Ejecutar Si esta Habilitado - true
			console.log("====> Procesando Progag:", this.PAGE_CONFIG.id_page) // Mensaje Consola
	  
			// Llamar al Servicio - Parametros(ID Pagina, ID Boton, Data de los Registros)
			this.pageService.propag(this.PAGE_CONFIG.id_page, btn_id, propagData).subscribe( (result: any) => {
				console.log("====> Completando la ejecucion del Progag:", this.PAGE_CONFIG.id_page) // Mensaje Consola

				// Validar si existe redireccion a otro contenedor
				if (result.page_redirect){
					// Si hay un dialog abierto, cerrarlo.
					// if (Object.keys(this.dialogRef).length > 0) {
					//   this.dialogRef.close();
					// };
					
					// Navegar a otro contenedor
					// this._router.navigate(['/home/system'], {queryParams: {nu_conten: result['page_redirect']}});
				};
		
				// Validar si Existen Alertas a Mostrar
				if (result.msg_alert){
					// this.openSnackBar(result['msg_alert'].msg_title, result['msg_alert'].msg_body, result['msg_alert'].msg_type);
					this.showAlert(result.msg_alert.msg_title, result.msg_alert.msg_body, result.msg_alert.msg_type);
				};
		
				// Validar Si Existe Parametros Contenedor
				if (result.page_params){
					let params: object = result.page_params;
		
					this.pageService.addParam(params);
				};
	  
				// Validar si existe paginas a recargar
				if (result.pages_to_refresh){
					// Agregar Paginas a Refrescar
					this.pageService.addPageRefresh(result.pages_to_refresh);
				};
			  
			//   // Validar Si existe cerrar Dialog
			//   if (result['close_dialog']){
			// 	if (Object.keys(this.dialogRef).length > 0) {
			// 	  this.dialogRef.close();
			// 	};
			//   };
	  
			//   // Si hay Popup Abrirlo
			//   if (btn_conten) {
			// 	console.log( '====> Open popup - Button:', btn_id, ' - Container:', btn_conten);
		  
			// 	if (btn_conten != null){
			// 	  const dialogRef = this.dialog.open(MasterPageComponent, {
			// 		width: '100vp',
			// 		height: '100vp',
			// 		data: {all_reg: row}
			// 	  });
		  
			// 	  // Enviar Parametro Numero de Contenedor
			// 	  dialogRef.componentInstance.CONTENT_DIALOG = btn_conten;
		  
			// 	  dialogRef.afterClosed().subscribe(result => {
			// 		console.log('The dialog was closed');
			// 	  });
			// 	};
			//   };
			}, err => {
			  // Mostrar los mensaje de error
			  if (err.error.valid === false) {
				// this.openSnackBar("Mensaje de Error", err.error.error_stack, 'danger');
			  };
			})
		  } else if (btn_conten) {
			console.log( 'Abriendo Popup Boton:', btn_id, ' - Contenedor:', btn_conten);
	  
			// if (btn_conten != null){
			//   const dialogRef = this.dialog.open(MasterPageComponent, {
			// 	width: '100vp',
			// 	height: '100vp',
			// 	data: {all_reg: row}
			//   });
	  
			//   // Enviar Parametro Numero de Contenedor
			//   dialogRef.componentInstance.CONTENT_DIALOG = btn_conten;
	  
			//   dialogRef.afterClosed().subscribe(result => {
			// 	console.log('The dialog was closed');
			//   });
			// };
		  };
	}

	applyFilterGlobal($event: Event) {
		this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
	}

	log(anydate: any) {
		console.log("Log===>", anydate);
	}

	showRegistDev(){
		this.showRegDev = !this.showRegDev;
	}
	
	returnZero() {
		return 0;
	}














	data: Product[] = [
		{
			id: '1000',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1001',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1002',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1003',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1004',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1000',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1001',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1002',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1003',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1004',
			code: 'f230fh0g3',
			name: 'zapato Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1000',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1001',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1002',
			code: 'f230fh0g3',
			name: 'Bamboo Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1003',
			code: 'f230fh0g3',
			name: 'reloj Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1004',
			code: 'f230fh0g3',
			name: 'camara Watch',
			description: 'Product Description',
			image: 'bamboo-watch.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},
	];
}
