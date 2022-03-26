import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService, AuthService, CrudServiceService } from '@realestate/services';
import { UiService } from '../../../ui.service';


@Component({
  selector: 'ui-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {
  propertyCollName: string = 'property';
  propertyForm: FormGroup;
  selectedFiles: any = [];
  imgSrc: any = [];
  currentUser: any;
  isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private crudServiceService: CrudServiceService,
    private angularFireAuth: AngularFireAuth,
    private uiService: UiService,
  ) {

    this.propertyForm = this.formBuilder.group({
      id: [''],
      attachments: [''],
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      propertieType: ['house', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      googleLocationLink: ['', Validators.compose([Validators.required])],
      bedroom: [''],
      bathroom: [''],
      deleteFlag: [''],
      landSize: ['', Validators.compose([Validators.required])],
    });

  }

  ngOnInit(): void {
    if (this.data) {
      this.propertyForm.patchValue(this.data);
      this.imgSrc = this.data.attachments;
    }

  }

  async createUpdateProperty() {
    this.currentUser = await this.angularFireAuth.currentUser;
    this.propertyForm.markAllAsTouched();
    /* this.propertyForm.markAsTouched(); */
    if (this.propertyForm.valid) {
      this.isLoading = true;

      if (!this.propertyForm.value.id) {
        try {
          const attachList = await this.crudServiceService.firebaseFileUpload(this.currentUser.uid + '/property', this.selectedFiles)
          this.propertyForm.get('attachments')?.setValue(attachList);
          const property = await this.crudServiceService.addWithCollName(this.propertyCollName, this.propertyForm.value);
          this.alertService.success('Property details created successfully');
          this.isLoading = false;
        }
        catch (e: any) {
          this.isLoading = false;
          this.alertService.error(e.message)
        }
      } else {
        this.update();
      }
    } else {
      this.alertService.error('Please fill all the fields');
    }
  }

  async changeUpload(event: any) {
    if (!this.propertyForm.value.id) {
      this.selectedFiles = event;
      if (event.target.files) {
        this.imgSrc = [];
        Array.prototype.forEach.call(event.target.files, (file, fileIndex) => {
          var reader = new FileReader();
          reader.onload = (eventItem: any) => {
            this.imgSrc.push({
              url: eventItem.target.result,
              type: file.type
            });
          }
          reader.readAsDataURL(file);
        });
      }
    } else {
      this.isLoading = true;
      this.currentUser = await this.angularFireAuth.currentUser;
      const attachList = await this.crudServiceService.firebaseFileUpload(this.currentUser.uid + '/property', event)
      console.log(attachList)
      let attachments: any = [];
      if (this.propertyForm.value.attachments) {
        attachments.push(...this.propertyForm.value.attachments)
      }
      attachments.push(...attachList);
      this.propertyForm.get('attachments')?.setValue(attachments);
      this.imgSrc = attachments;
      this.update();
      this.dialogRef.close()
    }

  }

  async update() {
    this.isLoading = false;
    try {
      console.log(this.propertyForm.value)
      const property = await this.crudServiceService.updateWithCollNamer(this.propertyCollName, this.propertyForm.value, this.propertyForm.value.id)
      this.alertService.success('Property details updated successfully')
    }
    catch (e: any) {
      this.alertService.error(e.message)
    }
  }

  getPropertieType() {
    return this.propertyForm.get('propertieType')?.value == 'house';
  }

  delete() {
    const model = this.uiService.deleteDiload();
    model.afterClosed().subscribe(async res => {
      if (res) {
        this.propertyForm.get('deleteFlag')?.setValue('Y');
        const property = await this.crudServiceService.delete(this.propertyCollName, this.propertyForm.value, this.propertyForm.value.id)
        this.alertService.success('Property details updated successfully')
        this.dialogRef.close();
      }
    })
  }

}
