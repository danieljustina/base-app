import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ILoginResponse } from './models/login-response';
import { MaterialModule } from 'material.module';
import { MatToolbarModule } from '@angular/material/toolbar';

const iLoginResponseMock:  ILoginResponse[] = [
  {
    id: 0,
    name: '',
    email: '',
    password: '',
  }
];

class ComponentRouter {};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let toastrService: ToastrService;
  let fixture: ComponentFixture<LoginComponent>;

  const loginServiceMock = <LoginService>(<unknown>{
    loginUser: jest.fn(() => of(iLoginResponseMock))
  })

  const toastrServiceMock = <ToastrService>(<unknown>{
    success: jest.fn(() => null)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'list-payments', component: ComponentRouter}
        ]),
        ToastrModule.forRoot(),
        FormsModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule 
      ],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: LoginService, useValue: loginServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    toastrService = fixture.debugElement.injector.get(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login success', () => {
    component.login();
    expect(toastrService.success).toBeCalled()
  });

  it('modifyVisibilityPassword ', () => {
    component.modifyVisibilityPassword();
    expect(component.visibilityPassword).toBeFalsy();
  });

  it('modify VisibilityPassword typeInput ', () => {
    component.modifyVisibilityPassword();
    expect(component.typeInput).toBe('text');
    expect(component.iconPassword).toBe('visibility');
    expect(component.tolltip ).toBe('Ocultar Senha');
  }); 
});
