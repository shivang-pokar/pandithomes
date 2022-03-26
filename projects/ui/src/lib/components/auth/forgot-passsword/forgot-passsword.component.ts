import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService, AuthService } from '@realestate/services';
import { UiService } from '../../../ui.service';

@Component({
  selector: 'ui-forgot-passsword',
  templateUrl: './forgot-passsword.component.html',
  styleUrls: ['./forgot-passsword.component.scss']
})
export class ForgotPassswordComponent implements OnInit {

  login: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ForgotPassswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public authService: AuthService,
    private uiService: UiService,
  ) {

    this.login = this.formBuilder.group({
      usernameOrEmail: ['', Validators.compose([Validators.maxLength(70), Validators.email, Validators.required])],
    });

  }

  ngOnInit(): void {
  }

  async resetPassword() {
    if (this.login.valid) {
      try {
        const reset = await this.authService.resetPassword(this.login.get('usernameOrEmail')?.value);
        this.alertService.success('Password reset link sent');
        this.login.reset();
        this.dialogRef.close();
      } catch (e: any) {
        this.alertService.error(e.message)
      }
    } else {
      this.alertService.error('Please send valid email');
    }



  }

}
