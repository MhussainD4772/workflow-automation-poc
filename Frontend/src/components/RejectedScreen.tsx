export function RejectedScreen() {
  return (
    <div className="screen screen-outcome animate-slide-up">
      <div className="screen-outcome__card screen-outcome__card--rejected">
        <div className="screen-outcome__icon" aria-hidden>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </div>
        <h2 className="screen-outcome__title">Application Rejected</h2>
        <p className="screen-outcome__message">
          User not eligible for onboarding path.
        </p>
      </div>
    </div>
  )
}
