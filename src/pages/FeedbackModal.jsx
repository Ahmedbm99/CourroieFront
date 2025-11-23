import React from "react";
import Feedback from "../components/Feedback";

export default function FeedbackModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-bubble">
        <h2 className="modal-title">Votre avis compte ✨</h2>

        <Feedback />

        <button className="modal-close-btn" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}
