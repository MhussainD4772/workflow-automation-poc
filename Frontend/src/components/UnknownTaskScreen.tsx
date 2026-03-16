interface UnknownTaskScreenProps {
  taskName: string | null
}

export function UnknownTaskScreen({ taskName }: UnknownTaskScreenProps) {
  return (
    <div className="screen screen-outcome animate-slide-up">
      <div className="screen-outcome__card screen-outcome__card--unknown">
        <h2 className="screen-outcome__title">Unknown step</h2>
        <p className="screen-outcome__message">
          Backend returned an unexpected task: “{taskName}”
        </p>
      </div>
    </div>
  )
}
