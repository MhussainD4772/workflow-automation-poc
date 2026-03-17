/**
 * App-level state and API types.
 * Backend owns workflow; frontend only stores what backend returns and form data.
 */

/** Accumulated form data across all steps (path-dependent fields optional) */
export interface OnboardingFormData {
  // Basic Info
  firstName?: string
  lastName?: string
  age?: string
  citizenship?: string
  employmentStatus?: string
  // Citizen path
  ssn?: string
  state?: string
  // Citizen verification path
  idNumber?: string
  dateOfBirth?: string
  hasProofOfResidency?: string
  // Non-citizen path
  passportNumber?: string
  visaType?: string
}

/** POST /onboarding/start response */
export interface StartResponse {
  processId: string
  currentTask: string
}

/** POST /onboarding/next response */
export interface NextResponse {
  nextTask: string
}

/** App-level state — single source of truth for UI */
export interface OnboardingState {
  processId: string | null
  currentTask: string | null
  formData: OnboardingFormData
  isLoading: boolean
  error: string | null
}
