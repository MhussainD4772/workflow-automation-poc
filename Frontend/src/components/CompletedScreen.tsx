interface CompletedScreenProps {
  onRestart?: () => void
}

export function CompletedScreen({ onRestart }: CompletedScreenProps) {
  return (
    <div className="screen screen-outcome animate-slide-up">
      <div className="screen-outcome__card screen-outcome__card--success">
        <div className="screen-outcome__icon" aria-hidden>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </svg>
        </div>
        <h2 className="screen-outcome__title">Process completed</h2>
        <p className="screen-outcome__message">
          Onboarding completed successfully.
        </p>
        {onRestart && (
          <button
            type="button"
            className="btn btn-primary screen-outcome__action"
            onClick={onRestart}
          >
            Start again
          </button>
        )}
      </div>
    </div>
  )
}
