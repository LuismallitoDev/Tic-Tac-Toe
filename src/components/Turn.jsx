function Turn({ text, handleWins, activeClass, totalWins = 0 }) {
  return (
    <div className={`turn-button ${activeClass}`} onClick={handleWins}>
      {text} - {totalWins} wins
    </div>
  );
}

export default Turn;
