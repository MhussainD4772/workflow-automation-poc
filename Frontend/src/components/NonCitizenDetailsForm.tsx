import { useState, useCallback } from 'react'
import type { OnboardingFormData } from '../types'

interface NonCitizenDetailsFormProps {
  onSubmit: (data: Partial<OnboardingFormData>) => void
  isLoading: boolean
}

export function NonCitizenDetailsForm({ onSubmit, isLoading }: NonCitizenDetailsFormProps) {
  const [passportNumber, setPassportNumber] = useState('')
  const [visaType, setVisaType] = useState('')

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit({
        passportNumber: passportNumber.trim() || undefined,
        visaType: visaType.trim() || undefined,
      })
    },
    [passportNumber, visaType, onSubmit]
  )

  return (
    <div className="screen screen-form animate-slide-up">
      <div className="screen-form__card">
        <h2 className="screen-form__title">Collect Non-Citizen Details</h2>
        <p className="screen-form__subtitle">
          Please provide your passport and visa information.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__row">
            <label className="form__label" htmlFor="passportNumber">
              Passport number
            </label>
            <input
              id="passportNumber"
              type="text"
              autoComplete="off"
              className="form__input"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              placeholder="Passport number"
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="visaType">
              Visa type
            </label>
            <input
              id="visaType"
              type="text"
              className="form__input"
              value={visaType}
              onChange={(e) => setVisaType(e.target.value)}
              placeholder="Visa type"
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
