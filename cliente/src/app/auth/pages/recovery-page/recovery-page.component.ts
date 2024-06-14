import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-recovery-page',
  templateUrl: './recovery-page.component.html',
  styleUrl: './recovery-page.component.css'
})
export class RecoveryPageComponent {

  public recoveryForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorSrv.emailPattern)]],
    password: ['', [Validators.required]],
    question: ['', [Validators.required]]
  })

  constructor(
    private validatorSrv: ValidatorsService,
    private fb: FormBuilder
  ){}

  isValidField( field:string ){
    return this.validatorSrv.isValidField( this.recoveryForm, field)
  }

  onSubmit(){
    this.recoveryForm.markAllAsTouched();
  }
}
