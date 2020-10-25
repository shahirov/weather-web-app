import { Event, Store } from 'effector'

export type DefaultValues = Record<string, string>

export type ValidationEvent = 'submit'

export type ValidationErrors<T> = {
  [K in keyof T]: string
}

export type Resolver<FormValues> = (
  validationErrors: ValidationErrors<FormValues>,
  values: FormValues,
) => ValidationErrors<FormValues>

export type FormConfig<Values> = {
  initialValues: Values
  errors?: ValidationErrors<Values>
  resolver?: Resolver<Values>
  validateOn?: ValidationEvent
}

export type FormProps<Values> = {
  $values: Store<Values>
  $errors: Store<ValidationErrors<Values>>
  $isValid: Store<boolean>
  resetValues: Event<void>
  clearErrors: Event<void>
  reset: Event<void>
  validate: Event<Values>
  formValidated: Event<Values>
  handleSubmit: Event<React.FormEvent<HTMLFormElement>>
  handleChange: Event<React.ChangeEvent<HTMLInputElement>>
}
