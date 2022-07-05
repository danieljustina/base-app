import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.initForm();
  visibilityPassword = true;

  constructor(private _formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
  }

  private initForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    // this._loginService.loginUser()
    // .subscribe((res: ILoginResponse[]) => {
    //   if (res.find(user => user.email === this.email.value && user.password === this.password.value)) {
    //     this._toastr.success('Login efetuado com sucesso!', environment["titleMessage"]);
    //     this._router.navigate(['list-payments']);
    //     return;
    //   }
    //   this._toastr.warning('Usuário ou senha incorretos!', environment["titleMessage"]);
    // },
    // (erro) => {
    //   this._toastr.error('Erro ao buscar registros!');
    // })        
  }

  public modifyVisibilityPassword() {
    this.visibilityPassword = !this.visibilityPassword;
  }

  get typeInput(): string {
    return this.visibilityPassword ? 'password' : 'text';
  }

  get iconPassword(): string {
    return this.visibilityPassword ? 'visibility_off' : 'visibility';
  }

  get tolltip(): string {
    return this.visibilityPassword ? 'Mostrar Senha' : 'Ocultar Senha';
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }
}
