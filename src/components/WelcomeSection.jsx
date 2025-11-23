import { useLanguage } from "../contexts/LanguageContext";

const WelcomeSection = () => {
  const { t } = useLanguage();
  return (
    <section className="welcome-section">
      <div className="welcome-container">
        <div className="welcome-header">
          <h1 className="welcome-title">{t('welcome_title')}</h1>
          <p className="welcome-subtitle">{t('welcome_subtitle')}</p>
        </div>

        <div className="welcome-card">
          <div className="welcome-content">
            <p className="welcome-paragraph">{t('paragraph1')}</p>
            <p className="welcome-paragraph">
                {t("experience")} 
                <span className="welcome-highlight"> {t('qualitySup')}</span>, 
                <span className="welcome-highlight"> {t('Durabilite')}</span>  
                <span className="welcome-highlight"> {t('prix')}</span>.
            </p>
            <p className="welcome-paragraph">{t('paragraph3')}</p>

            <div className="welcome-mission">
              <p className="welcome-mission-text">
                <span className="welcome-mission-label">{t('mission_label')}</span> {t('mission_text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
