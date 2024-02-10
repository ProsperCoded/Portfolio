export function CircularAnimatedProgressBar({
  radius,
  color = "blue",
  percent = 100,
  value = 60,
  width = 12,
  gradient,
}: {
  radius: number;
  color?: string;
  percent?: number;
  value?: number;
  width?: number;
  gradient?: { from: string; to: string };
}) {
  return (
    <div
      className="outshadow"
      style={{
        boxShadow: "0 0 5px 1px black",
        borderRadius: "50%",
        // width: "5rem",
        // height: "5rem",
      }}
    >
      <div
        className="inshadow"
        style={{
          boxShadow: "inset 0 0 5px 1px black",
          borderRadius: "50%",
          width: radius * 2,
          height: radius * 2,
        }}
      >
        <div className="progress">
          {/* <div className="progress-bar" style={{ width: `${value}%` }}> */}
          <span className="percent">{value}%</span>
          {/* </div> */}
        </div>
      </div>
      <svg
        style={{
          top: 0,
          left: 0,
          position: "absolute",
        }}
        width="160px"
        height="160px"
      >
        {gradient && (
          <linearGradient id="progress-gradient">
            <stop offset="0%" stopColor={gradient.from} />
            <stop offset="100%" stopColor={gradient.to} />
          </linearGradient>
        )}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke-linecap="round"
          strokeWidth={width}
          stroke={gradient ? "url(#progress-gradient)" : color}
          strokeDasharray={percent}
          strokeDashoffset={value}
        />
      </svg>
    </div>
  );
}
