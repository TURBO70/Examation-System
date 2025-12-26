function ProgressCircle(percent) {
  const strokeDash = 314;
  const offset = strokeDash - (strokeDash * percent) / 100;

  return `
    <svg width="140" height="140">
      <circle cx="70" cy="70" r="50"
        stroke="#e5e7eb"
        stroke-width="10"
        fill="none" />

      <circle cx="70" cy="70" r="50"
        stroke="#0f766e"
        stroke-width="10"
        fill="none"
        stroke-dasharray="${strokeDash}"
        stroke-dashoffset="${offset}"
        stroke-linecap="round"
        transform="rotate(-90 70 70)" />

      <text x="50%" y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        class="font-bold text-xl fill-[#0f766e]">
        ${percent}%
      </text>
    </svg>
  `;
}
