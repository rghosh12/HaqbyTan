/** The HAQ timestamp — a recurring Easter egg, not a headline. */
export function Timestamp({
  day = "FRI",
  time = "7:43 PM",
  place,
  stacked = false,
  className = ""
}: {
  day?: string;
  time?: string;
  place?: string;
  stacked?: boolean;
  className?: string;
}) {
  return (
    <p className={`mono ${className}`} style={stacked ? { display: "grid", gap: 2 } : undefined}>
      {stacked ? (
        <>
          <span>{day}</span>
          <span>{time}</span>
          {place && <span>{place}</span>}
        </>
      ) : (
        <>
          {day} {time}
          {place && <> · {place}</>}
        </>
      )}
    </p>
  );
}
