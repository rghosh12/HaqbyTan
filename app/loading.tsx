/** At most a fraction of a second: HAQ / FRI 7:43 PM. Never a trap. */
export default function Loading() {
  return (
    <div style={{ minHeight: "60vh", display: "grid", placeContent: "center", gap: 8, textAlign: "center" }} aria-busy="true" aria-live="polite">
      <p className="display" style={{ fontSize: 48 }}>
        HAQ
      </p>
      <p className="mono muted">Fri 7:43 PM</p>
    </div>
  );
}
