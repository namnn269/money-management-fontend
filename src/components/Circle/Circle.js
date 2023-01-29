function Circle({ size = 14, bgColor = 'green' }) {
  return (
    <svg height={size} width={size}>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={bgColor} />
    </svg>
  );
}

export default Circle;
