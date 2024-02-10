function circularAnimatedProgressBar({ radius }: { radius: number }) {
  const svg = (
    <svg width="160px" height="160px">
      <circle
        cx="80"
        cy="80"
        r={radius.toString()}
        fill="none"
        stroke-linecap="round"
        strokeWidth="10"
      />
    </svg>
  );
}
