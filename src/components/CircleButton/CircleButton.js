function CircleButton({ name = 'button', size = '42px', type = 'submit' }) {
  return (
    <button
      style={{
        height: size,
        width: size,
        backgroundColor: '#0a9cd1',
        color: 'white',
        borderRadius: '999px',
        border: 'none',
        fontWeight: 600,
        cursor: 'pointer',
      }}
      type={type}
    >
      {name}
    </button>
  );
}

export default CircleButton;
