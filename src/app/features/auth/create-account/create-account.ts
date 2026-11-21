import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  maxLength,
  minLength,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { AuthShell } from '../auth-shell/auth-shell';

interface CreateAccountModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

const registerSchema = schema<CreateAccountModel>((path) => {
  required(path.firstName, { message: 'First name is required.' });
  required(path.lastName, { message: 'Last name is required.' });
  required(path.phoneNumber, { message: 'Phone number is required.' });
  minLength(path.phoneNumber, 9, { message: 'Phone number must be at least 9 characters.' });
  maxLength(path.phoneNumber, 10, { message: 'Phone number cannot exceed 10 characters.' });
  required(path.email, { message: 'Email is required.' });
  email(path.email, { message: 'Enter a valid email address.' });
  required(path.password, { message: 'Password is required.' });
  required(path.confirmPassword, { message: 'Confirm your password.' });

  validate(path.password, ({ value }) => {
    const password = value();

    if (!password) {
      return undefined;
    }

    const errors = [];

    if (password.length < 8) {
      errors.push({
        kind: 'passwordTooShort',
        message: 'Password must be at least 8 characters.',
      });
    }

    if (!/[A-Z]/.test(password)) {
      errors.push({
        kind: 'missingUppercase',
        message: 'Password must include an uppercase letter.',
      });
    }

    if (!/[a-z]/.test(password)) {
      errors.push({
        kind: 'missingLowercase',
        message: 'Password must include a lowercase letter.',
      });
    }

    if (!/\d/.test(password)) {
      errors.push({
        kind: 'missingNumber',
        message: 'Password must include a number.',
      });
    }

    if (!/[^A-Za-z0-9\s]/.test(password)) {
      errors.push({
        kind: 'missingSpecialCharacter',
        message: 'Password must include a special character.',
      });
    }

    return errors.length > 0 ? errors : undefined;
  });

  validate(path.confirmPassword, ({ value, valueOf }) => {
    const confirmPassword = value();

    if (!confirmPassword || confirmPassword === valueOf(path.password)) {
      return undefined;
    }

    return {
      kind: 'passwordsMismatch',
      message: 'Passwords do not match.',
    };
  });
});

@Component({
  selector: 'app-create-account',
  imports: [RouterLink, AuthShell, FormField, FormRoot],
  templateUrl: './create-account.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccount {
  private registerModel = signal<CreateAccountModel>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  readonly registerForm = form(this.registerModel, registerSchema, {
    submission: {
      action: async () => undefined,
    },
  });

  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);

  readonly passwordRequirements = computed<PasswordRequirement[]>(() => {
    const password = this.registerModel().password;

    return [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
      { label: 'One lowercase letter', met: /[a-z]/.test(password) },
      { label: 'One number', met: /\d/.test(password) },
      { label: 'One special character', met: /[^A-Za-z0-9\s]/.test(password) },
    ];
  });

  readonly passwordsMatch = computed(() => {
    const { password, confirmPassword } = this.registerModel();

    return confirmPassword.length > 0 && password === confirmPassword;
  });

  readonly canSubmit = computed(() => this.registerForm().valid());
}
