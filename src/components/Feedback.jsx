import React, { useState } from "react";
import { Rating } from "primereact/rating";
import FeedbackService from "../services/FeedbackServices";
import { useLanguage } from "../contexts/LanguageContext";

export default function Feedback() {

  const { language } = useLanguage();

  const questions = {
    q1: language === 'eng' ? "How would you rate your experience?" : "Comment évaluez-vous votre expérience ?",
    q2: language === 'eng' ? "Is the platform easy to use?" : "La plateforme est-elle facile à utiliser ?",
    q3: language === 'eng' ? "Would you recommend this service?" : "Recommanderiez-vous ce service ?",
    avisLabel: language === 'eng' ? "Your feedback" : "Avis",
    send: language === 'eng' ? "Submit" : "Envoyer"
  };

  const [form, setForm] = useState({
    question1: questions.q1,
    reponse1: 0,
    question2: questions.q2,
    reponse2: 0,
    question3: questions.q3,
    reponse3: 0,
    avis: ""
  });

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await FeedbackService.addFeedback(form);
      alert(language === 'eng' ? "Thank you for your feedback!" : "Merci pour votre feedback !");
    } catch (err) {
      console.error(err);
      alert(language === 'eng' ? "Error submitting feedback." : "Erreur lors de l’envoi.");
    }
  };

  return (
    <section className="feedback-section">
      
      <div className="question-block">
        <p className="question-text">{questions.q1}</p>
        <Rating value={form.reponse1} onChange={e => updateField("reponse1", e.value)} cancel={false} />
      </div>

      <div className="question-block">
        <p className="question-text">{questions.q2}</p>
        <Rating value={form.reponse2} onChange={e => updateField("reponse2", e.value)} cancel={false} />
      </div>

      <div className="question-block">
        <p className="question-text">{questions.q3}</p>
        <Rating value={form.reponse3} onChange={e => updateField("reponse3", e.value)} cancel={false} />
      </div>

      <div className="input-group">
        <label>{questions.avisLabel}</label>
        <input
          type="text"
          value={form.avis}
          onChange={(e) => updateField("avis", e.target.value)}
          className="feedback-input"
          placeholder={language === 'eng' ? "Write something..." : "Écrivez quelque chose..."}
        />
      </div>

      <button className="feedback-submit" onClick={handleSubmit}>
        {questions.send}
      </button>

    </section>
  );
}
