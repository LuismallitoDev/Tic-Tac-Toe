function CellButton({ text, handleClick, isWinningCell }) {
  return (
    <button
      className={`inner-cell ${isWinningCell ? "highlight" : ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default CellButton;
