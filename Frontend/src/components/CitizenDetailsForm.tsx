import { useState, useCallback } from 'react'
import type { OnboardingFormData } from '../types'

interface CitizenDetailsFormProps {
  onSubmit: (data: Partial<OnboardingFormData>) => void
  isLoading: boolean
}

export function CitizenDetailsForm({ onSubmit, isLoading }: CitizenDetailsFormProps) {
  const [ssn, setSsn] = useState('')
  const [state, setState] = useState('')

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit({
        ssn: ssn.trim() || undefined,
        state: state.trim() || undefined,
      })
    },
    [ssn, state, onSubmit]
  )

  return (
    <div className="screen screen-form animate-slide-up">
      <div className="screen-form__card">
        <h2 className="screen-form__title">Collect Citizen Details</h2>
        <p className="screen-form__subtitle">
          Please provide your citizen details to continue.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__row">
            <label className="form__label" htmlFor="ssn">
              SSN
            </label>
            <input
              id="ssn"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              className="form__input"
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
              placeholder="Social Security Number"
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="state">
              State
            </label>
            <input
              id="state"
              type="text"
              className="form__input"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary form__submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="btn__loading">
                <span className="btn__dot" />
                <span className="btn__dot" />
                <span className="btn__dot" />
              </span>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
