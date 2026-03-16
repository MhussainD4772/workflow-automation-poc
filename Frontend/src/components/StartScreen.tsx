interface StartScreenProps {
  onStart: () => void
  isLoading: boolean
}

export function StartScreen({ onStart, isLoading }: StartScreenProps) {
  return (
    <div className="screen screen-start animate-slide-up">
      <div className="screen-start__card">
        <h1 className="screen-start__title">Onboarding</h1>
        <p className="screen-start__subtitle">
          Begin your onboarding flow. We’ll guide you step by step.
        </p>
        <button
          type="button"
          className="btn btn-primary screen-start__cta"
          onClick={onStart}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="btn__loading">
              <span className="btn__dot" />
              <span className="btn__dot" />
              <span className="btn__dot" />
            </span>
          ) : (
            'Start Onboarding'
          )}
        </button>
      </div>
    </div>
  )
}
