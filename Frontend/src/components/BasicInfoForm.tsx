import { useState, useCallback } from 'react'
import type { OnboardingFormData } from '../types'

interface BasicInfoFormProps {
  onSubmit: (data: Partial<OnboardingFormData>) => void
  isLoading: boolean
}

export function BasicInfoForm({ onSubmit, isLoading }: BasicInfoFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [citizenship, setCitizenship] = useState<string>('')
  const [employmentStatus, setEmploymentStatus] = useState<string>('')

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit({
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        age: age.trim() || undefined,
        citizenship: citizenship || undefined,
        employmentStatus: employmentStatus || undefined,
      })
    },
    [firstName, lastName, age, citizenship, employmentStatus, onSubmit]
  )

  return (
    <div className="screen screen-form animate-slide-up">
      <div className="screen-form__card">
        <h2 className="screen-form__title">Collect Basic Info</h2>
        <p className="screen-form__subtitle">
          Please provide your basic information. The next steps will be determined by your answers.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__row">
            <label className="form__label" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              className="form__input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              placeholder="First name"
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              className="form__input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              placeholder="Last name"
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="text"
              inputMode="numeric"
              className="form__input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="citizenship">
              Citizenship
            </label>
            <select
              id="citizenship"
              className="form__select"
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
              required
            >
              <option value="">Select…</option>
              <option value="citizen">Citizen</option>
              <option value="noncitizen">Non-citizen</option>
            </select>
          </div>
          <div className="form__row">
            <label className="form__label" htmlFor="employmentStatus">
              Employment status
            </label>
            <select
              id="employmentStatus"
              className="form__select"
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
              required
            >
              <option value="">Select…</option>
              <option value="employed">Employed</option>
              <option value="unemployed">Unemployed</option>
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
