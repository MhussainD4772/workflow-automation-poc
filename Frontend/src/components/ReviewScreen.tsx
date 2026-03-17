import type { OnboardingFormData } from '../types'

interface ReviewScreenProps {
  formData: OnboardingFormData
  onSubmit?: (data: Partial<OnboardingFormData>) => void
  isLoading: boolean
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

export function ReviewScreen({ formData, onSubmit, isLoading }: ReviewScreenProps) {
  const isCitizenPath = formData.citizenship === 'citizen'
  const hasAnyData =
    formData.firstName != null ||
    formData.lastName != null ||
    formData.age != null ||
    formData.citizenship != null ||
    formData.employmentStatus != null ||
    formData.ssn != null ||
    formData.state != null ||
    formData.idNumber != null ||
    formData.dateOfBirth != null ||
    formData.hasProofOfResidency != null ||
    formData.passportNumber != null ||
    formData.visaType != null

  return (
    <div className="screen screen-form animate-slide-up">
      <div className="screen-form__card">
        <h2 className="screen-form__title">Review Application</h2>
        <p className="screen-form__subtitle">
          Please review your information. Submit to complete or continue as required by the workflow.
        </p>
        <dl className="review-summary">
          {formData.firstName != null && (
            <>
              <dt>First name</dt>
              <dd>{formData.firstName}</dd>
            </>
          )}
          {formData.lastName != null && (
            <>
              <dt>Last name</dt>
              <dd>{formData.lastName}</dd>
            </>
          )}
          {formData.age != null && (
            <>
              <dt>Age</dt>
              <dd>{formData.age}</dd>
            </>
          )}
          {formData.citizenship != null && (
            <>
              <dt>Citizenship</dt>
              <dd>{formatLabel(formData.citizenship)}</dd>
            </>
          )}
          {formData.employmentStatus != null && (
            <>
              <dt>Employment status</dt>
              <dd>{formatLabel(formData.employmentStatus)}</dd>
            </>
          )}
          {isCitizenPath && formData.ssn != null && (
            <>
              <dt>SSN</dt>
              <dd>{formData.ssn}</dd>
            </>
          )}
          {isCitizenPath && formData.state != null && (
            <>
              <dt>State</dt>
              <dd>{formData.state}</dd>
            </>
          )}
          {isCitizenPath && formData.idNumber != null && (
            <>
              <dt>Government ID number</dt>
              <dd>{formData.idNumber}</dd>
            </>
          )}
          {isCitizenPath && formData.dateOfBirth != null && (
            <>
              <dt>Date of birth</dt>
              <dd>{formData.dateOfBirth}</dd>
            </>
          )}
          {isCitizenPath && formData.hasProofOfResidency != null && (
            <>
              <dt>Has proof of residency</dt>
              <dd>{formatLabel(formData.hasProofOfResidency)}</dd>
            </>
          )}
          {!isCitizenPath && formData.passportNumber != null && (
            <>
              <dt>Passport number</dt>
              <dd>{formData.passportNumber}</dd>
            </>
          )}
          {!isCitizenPath && formData.visaType != null && (
            <>
              <dt>Visa type</dt>
              <dd>{formData.visaType}</dd>
            </>
          )}
          {!hasAnyData && (
            <dd className="review-summary__empty">No data to display.</dd>
          )}
        </dl>
        {onSubmit && (
          <button
            type="button"
            className="btn btn-primary form__submit"
            onClick={() => onSubmit({})}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="btn__loading">
                <span className="btn__dot" />
                <span className="btn__dot" />
                <span className="btn__dot" />
              </span>
            ) : (
              'Submit'
            )}
          </button>
        )}
      </div>
    </div>
  )
}
