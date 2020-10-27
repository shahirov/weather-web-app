import { createEvent, createStore, guard, merge, sample } from 'effector'

import { DefaultValues, FormConfig, FormProps, ValidationErrors } from './types'

/**
 * factory creates stores and events of the form
 * and binds them by provided configuration
 * @param config - configuration options for factory
 */
export const createForm = <FormValues extends DefaultValues>(
  config: FormConfig<FormValues>,
): FormProps<FormValues> => {
  const { initialValues, errors, resolver, validateOn = 'submit' } = config

  const submit = createEvent()
  const validate = createEvent<FormValues>()
  const formValidated = createEvent<FormValues>()
  const setField = createEvent<{ name: string; value: string }>()
  const resetValues = createEvent()
  const clearErrors = createEvent()
  const reset = merge([resetValues, clearErrors])

  const $values = createStore(initialValues)
    .on(setField, (fields, { name, value }) => ({
      ...fields,
      [name]: value,
    }))
    .reset([resetValues, reset])

  const $errors = createStore<ValidationErrors<FormValues>>(
    errors || initialValues,
  )
    .on(setField, (errs, { name }) => ({ ...errs, [name]: '' }))
    .reset([clearErrors, reset])

  const $isValid = $errors.map((errs) =>
    // eslint-disable-next-line unicorn/prevent-abbreviations
    Object.values(errs).every((e) => e.length === 0),
  )

  if (resolver !== undefined) {
    $errors.on(validate, resolver)
  }

  if (validateOn === 'submit') {
    sample({ source: $values, clock: submit, target: validate })
  }

  const validateWithFormData = sample($values, validate)

  guard({
    source: validateWithFormData,
    filter: $isValid,
    target: formValidated,
  })

  return {
    $values,
    $errors,
    resetValues,
    clearErrors,
    reset,
    validate,
    formValidated,
    $isValid,
    handleChange: setField.prepend<React.ChangeEvent<HTMLInputElement>>(
      (event) => ({
        name: event.currentTarget.name,
        value: event.currentTarget.value.trim(),
      }),
    ),
    handleSubmit: submit.prepend<React.FormEvent<HTMLFormElement>>((event) =>
      event.preventDefault(),
    ),
  }
}
