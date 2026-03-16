import { useState, useCallback } from 'react'
import { getScreenKey, SCREEN_KEYS } from './screenMap'
import type { OnboardingFormData } from './types'
import { startOnboarding, submitStep } from './services/onboardingApi'
import {
  StartScreen,
  BasicInfoForm,
  CitizenDetailsForm,
  NonCitizenDetailsForm,
  ReviewScreen,
  RejectedScreen,
  CompletedScreen,
  UnknownTaskScreen,
} from './components'

/**
 * App is the central controller for UI state only.
 * Renders exactly one screen based on backend currentTask (via getScreenKey).
 */
function App() {
  const [processId, setProcessId] = useState<string | null>(null)
  const [currentTask, setCurrentTask] = useState<string | null>(null)
  const [formData, setFormData] = useState<OnboardingFormData>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const screenKey = getScreenKey(currentTask)

  const handleStart = useCallback(async () => {
    setError(null)
    setIsLoading(true)
    try {
      const res = await startOnboarding()
      setProcessId(res.processId)
      setCurrentTask(res.currentTask)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSubmitStep = useCallback(
    async (data: Partial<OnboardingFormData>) => {
      if (!processId) return
      setError(null)
      setIsLoading(true)
      try {
        setFormData((prev) => ({ ...prev, ...data }))
        const res = await submitStep(processId, data)
        setCurrentTask(res.nextTask)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to submit')
      } finally {
        setIsLoading(false)
      }
    },
    [processId]
  )

  const handleRestart = useCallback(() => {
    setProcessId(null)
    setCurrentTask(null)
    setFormData({})
    setError(null)
  }, [])

  return (
    <div className="app">
      {error && <div className="app-error" role="alert">{error}</div>}
      {isLoading && (
        <div className="app-loading-overlay" aria-live="polite" aria-busy="true">
          <div className="app-loading-overlay__spinner" aria-hidden />
        </div>
      )}
      <main className="app-main">
        {screenKey === SCREEN_KEYS.START && (
          <StartScreen onStart={handleStart} isLoading={isLoading} />
        )}
        {screenKey === SCREEN_KEYS.BASIC_INFO && (
          <BasicInfoForm onSubmit={handleSubmitStep} isLoading={isLoading} />
        )}
        {screenKey === SCREEN_KEYS.CITIZEN_DETAILS && (
          <CitizenDetailsForm onSubmit={handleSubmitStep} isLoading={isLoading} />
        )}
        {screenKey === SCREEN_KEYS.NON_CITIZEN_DETAILS && (
          <NonCitizenDetailsForm onSubmit={handleSubmitStep} isLoading={isLoading} />
        )}
        {screenKey === SCREEN_KEYS.REVIEW && (
          <ReviewScreen
            formData={formData}
            onSubmit={handleSubmitStep}
            isLoading={isLoading}
          />
        )}
        {screenKey === SCREEN_KEYS.REJECTED && <RejectedScreen />}
        {screenKey === SCREEN_KEYS.COMPLETED && (
          <CompletedScreen onRestart={handleRestart} />
        )}
        {screenKey === SCREEN_KEYS.UNKNOWN && (
          <UnknownTaskScreen taskName={currentTask} />
        )}
      </main>
    </div>
  )
}

export default App
