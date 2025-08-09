import Button from "./Button";
import "../styles/popup.css";

function Popup({ winner, handleClick, status }) {
  var newWinner;
  var newClass;
  if (winner == false && status) {
    newWinner = "O";
    newClass = "active";
  } else if (winner == true && status) {
    newWinner = "X";
    newClass = "active";
  } else if (status == null) {
    newWinner = false;
    newClass = "active";
  } else {
    newClass = "";
  }

  return (
    <div className={`popup-winner ${newClass}`}>
      {(newWinner === "X" || newWinner === "O") && (
        <>
          <h2>Congratulations!</h2>
          <p>The team {newWinner} wins.</p>
        </>
      )}
      {newWinner == false && (
        <>
          <h2>Hard to beat!</h2>
          <p>It was a Draw</p>
        </>
      )}
      <div className="buttons-popup">
        <Button handleRestart={handleClick} text="Continue" />
      </div>
    </div>
  );
}

export default Popup;
