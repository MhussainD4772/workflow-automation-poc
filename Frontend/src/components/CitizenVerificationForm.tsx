import { useState, useCallback } from 'react'
import type { OnboardingFormData } from '../types'

interface CitizenVerificationFormProps {
  onSubmit: (data: Partial<OnboardingFormData>) => void
  isLoading: boolean
}

export function CitizenVerificationForm({
  onSubmit,
  isLoading,
}: CitizenVerificationFormProps) {
  const [idNumber, setIdNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [hasProofOfResidency, setHasProofOfResidency] = useState('')

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit({
        idNumber: idNumber.trim() || undefined,
        dateOfBirth: dateOfBirth.trim() || undefined,
        hasProofOfResidency: hasProofOfResidency || undefined,
      })
    },
    [idNumber, dateOfBirth, hasProofOfResidency, onSubmit]
  )

  return (
    <div className="screen screen-form animate-slide-up">
      <div className="screen-form__card">
        <h2 className="screen-form__title">Citizen Verification</h2>
        <p className="screen-form__subtitle">
          Because you are an unemployed citizen, we need to verify your eligibility for this
          onboarding path.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__row">
            <label className="form__label" htmlFor="idNumber">
              Government ID number
            </label>
            <input
              id="idNumber"
              type="text"
              autoComplete="off"
              className="form__input"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="National ID / government-issued ID"
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="dateOfBirth">
              Date of birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className="form__input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="hasProofOfResidency">
              Do you have valid proof of residency?
            </label>
            <select
              id="hasProofOfResidency"
              className="form__select"
              value={hasProofOfResidency}
              onChange={(e) => setHasProofOfResidency(e.target.value)}
              required
            >
              <option value="">Select…</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
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

