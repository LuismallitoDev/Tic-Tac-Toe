function Button({ text="Button", handleRestart }) {
  return (
    <button className="restart-button" onClick={handleRestart}>
      {text}
    </button>
  );
}

export default Button;
