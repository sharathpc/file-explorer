import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fileForm: FormGroup = new FormGroup({
    prefix: new FormControl('FIRSTHAND_STAGE', [Validators.required]),
    token: new FormControl(null, [Validators.required]),
  })

  constructor(private router: Router) {
  }

  submitData(): void {
    this.fileForm.markAllAsTouched();
    if (this.fileForm.valid) {
      const prefix = `${this.fileForm.get('prefix').value}/`;
      const token = this.fileForm.get('token').value;
      this.router.navigate(['explorer'], {
        queryParams: { prefix, token }
      });
    }
  }
}
