import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators,FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ignoreElements } from 'rxjs/operators';
import { Ipropiedadbase } from 'src/app/model/ipropiedadbase';
import { Propiedad } from 'src/app/model/propiedad';
import { AlertifyService } from 'src/app/servicios/alertify.service';
import { HousingService } from 'src/app/servicios/housing.service';
@Component({
  selector: 'app-add-propiedad',
  templateUrl: './add-propiedad.component.html',
  styleUrls: ['./add-propiedad.component.scss']
})
export class AddPropiedadComponent implements OnInit {
 // @ViewChild('Form') addPropiedadForm!: NgForm;
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  propiedadTypes: Array<string> =["Edificio","Terreno","Departamento"];
  furnishTypes: Array<string> =["Fully","Semi","Desamoblada"];
  addPropiedadForm!: FormGroup;
  nextClicked!: boolean;
  propiedad = new Propiedad();
  propiedadView:Ipropiedadbase={
    Id:0,
    Name:'',
    Price:0,
    SellRent:0,
    PType: '',
    FType: '',
    BHK: 0,
    BuiltArea: 0,
    City: '',
    RTM: 0,

  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private housingService: HousingService,
              private alertify: AlertifyService )
              { }

  ngOnInit() {
    this.CreateaddPropiedadForm();
  }

  onBack(){
    this.router.navigate(['/']);
  }

  onSubmit(){
    this.nextClicked= true;
    if(this.allTabsValid()){
      this.mappropiedad();
      this.housingService.addProperty(this.propiedad);
      this.alertify.success('Felicidades, ha sido publicada tu propiedad');
      console.log(this.addPropiedadForm);

      if(this.SellRent.value === '2') {
        this.router.navigate(['/rent-propiedad']);
      } else {
        this.router.navigate(['/']);
      }

    }else{
      this.alertify.error('Por favor revise el formulario y llene todos los campos');
    }
  }
  allTabsValid():boolean{
    if(this.BasicInfo.invalid){
      this.formTabs.tabs[0].active= true;
      return false;

    }
    if(this.PriceInfo.invalid){
      this.formTabs.tabs[1].active= true;
      return false;

    }
    if(this.AddressInfo.invalid){
      this.formTabs.tabs[2].active= true;
      return false;

    }
    if(this.OtherInfo.invalid){
      this.formTabs.tabs[3].active= true;
      return false;

    }
    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean){
    this.nextClicked=true;
    if(IsCurrentTabValid){
      this.formTabs.tabs[tabId].active=true;
    }

  }
  CreateaddPropiedadForm() {
    this.addPropiedadForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1' , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
      });
  }

 //#region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.addPropiedadForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfo() {
    return this.addPropiedadForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo() {
    return this.addPropiedadForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo() {
    return this.addPropiedadForm.controls.OtherInfo as FormGroup;
  }
// #endregion

//#region <Form Controls>
  get SellRent() {
    return this.BasicInfo.controls.SellRent as FormControl;
  }

  get BHK() {
    return this.BasicInfo.controls.BHK as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls.PType as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls.FType as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls.Name as FormControl;
  }

  get City() {
    return this.BasicInfo.controls.City as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls.Price as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls.BuiltArea as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls.CarpetArea as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls.Security as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls.Maintenance as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls.FloorNo as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls.TotalFloor as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls.Address as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls.LandMark as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls.RTM as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls.PossessionOn as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls.AOP as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls.Gated as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls.MainEntrance as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls.Description as FormControl;
  }

//#endregion
//#endregion
mappropiedad(): void {
  this.propiedad.SellRent = +this.SellRent.value;
  this.propiedad.BHK = this.BHK.value;
  this.propiedad.PType = this.PType.value;
  this.propiedad.Name = this.Name.value;
  this.propiedad.City = this.City.value;
  this.propiedad.FType = this.FType.value;
  this.propiedad.Price = this.Price.value;
  this.propiedad.Security = this.Security.value;
  this.propiedad.Maintenance = this.Maintenance.value;
  this.propiedad.BuiltArea = this.BuiltArea.value;
  this.propiedad.CarpetArea = this.CarpetArea.value;
  this.propiedad.FloorNo = this.FloorNo.value;
  this.propiedad.TotalFloor = this.TotalFloor.value;
  this.propiedad.Address = this.Address.value;
  this.propiedad.Address2 = this.LandMark.value;
  this.propiedad.RTM = this.RTM.value;
  this.propiedad.AOP = this.AOP.value;
  this.propiedad.Gated = this.Gated.value;
  this.propiedad.MainEntrance = this.MainEntrance.value;
  this.propiedad.Possession = this.PossessionOn.value;
  this.propiedad.Description = this.Description.value;
  this.propiedad.PostedOn = new Date().toString();
}
}
