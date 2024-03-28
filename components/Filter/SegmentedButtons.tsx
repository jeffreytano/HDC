export default function SegmentedButton() {
  return (
    <div>
      <input type="radio" name="flight-type" value="coach" id="coach" />
      <label for="coach">Coach</label>

      <input
        type="radio"
        name="flight-type"
        value="business"
        id="business"
        checked
      />
      <label for="business">Business</label>

      <input type="radio" name="flight-type" value="first" id="first" />
      <label for="first">First</label>
    </div>
  );
}
