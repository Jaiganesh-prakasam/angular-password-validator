import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorService } from '../validator.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      mailId: ['', [
        Validators.required,
        ValidatorService.patternMatch(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          , { invalidEmail: true })
        ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        ValidatorService.patternMatch(/\d/, { hasNoNumber: true }),
        ValidatorService.patternMatch(/[A-Z]/, { hasNoCapitalCase: true }),
        ValidatorService.patternMatch(/[a-z]/, { hasNoSmallCase: true }),
        ValidatorService.patternMatch(/[*@!#%&()^~{}]+/, { hasNoSpecialCharacters: true }),
        ValidatorService.patternMatch(/^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*$/ , { otherThanAsci: true })
        ]
      ]
    });
    this.form.setValidators(ValidatorService.passwordPattern());
  }
  ngOnInit(): void {
  }
  submit(): void {
    console.log('is form valid', this.form.valid);
  }

}
