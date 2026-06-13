import { useState, useEffect, useRef } from 'react';
import { quizQuestions, craftResults, calculateResult } from '../data/craftDNAData';

type QuizPhase = 'intro' | 'question' | 'calculating' | 'result';

const CRAFT_PREVIEW_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&auto=format&fit=crop&q=80', label: 'Pottery' },
  { src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop&q=80', label: 'Jewelry' },
  { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&auto=format&fit=crop&q=80', label: 'Painting' },
  { src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&auto=format&fit=crop&q=80', label: 'Textile' },
];

const CALC_WORDS = ['Reading your answers...', 'Searching the collection...', 'Finding your piece...'];

export const CraftDNA = () => {
  const [quizPhase, setQuizPhase] = useState<QuizPhase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<(typeof craftResults)[keyof typeof craftResults] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [qVisible, setQVisible] = useState(true);
  const [calcWordIdx, setCalcWordIdx] = useState(0);
  const [calcBarWidth, setCalcBarWidth] = useState(0);
  const [resultVisible, setResultVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (quizPhase !== 'calculating') return;
    const craftKey = calculateResult(answers);
    setResult(craftResults[craftKey]);
    let idx = 0;
    const wordInterval = setInterval(() => {
      idx += 1;
      if (idx < CALC_WORDS.length) setCalcWordIdx(idx);
      else clearInterval(wordInterval);
    }, 700);
    requestAnimationFrame(() => setCalcBarWidth(100));
    const timer = setTimeout(() => setQuizPhase('result'), 2200);
    return () => { clearTimeout(timer); clearInterval(wordInterval); };
  }, [quizPhase]);

  useEffect(() => {
    if (quizPhase === 'result') {
      setTimeout(() => setResultVisible(true), 80);
      window.dispatchEvent(new CustomEvent('artisana:dna-complete'));
    } else {
      setResultVisible(false);
    }
    if (quizPhase !== 'calculating') { setCalcBarWidth(0); setCalcWordIdx(0); }
  }, [quizPhase]);

  const handleOptionClick = (value: string) => {
    if (selectedOption) return;
    setSelectedOption(value);
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQ]: value };
      setAnswers(newAnswers);
      if (currentQ < quizQuestions.length - 1) {
        setQVisible(false);
        setTimeout(() => { setCurrentQ(currentQ + 1); setSelectedOption(null); setQVisible(true); }, 300);
      } else {
        setQuizPhase('calculating');
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentQ === 0) return;
    setQVisible(false);
    setTimeout(() => {
      const newAnswers = { ...answers };
      delete newAnswers[currentQ - 1];
      setAnswers(newAnswers);
      setCurrentQ(currentQ - 1);
      setSelectedOption(null);
      setQVisible(true);
    }, 300);
  };

  const resetQuiz = () => {
    setQuizPhase('intro');
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
    setSelectedOption(null);
    setResultVisible(false);
  };

  return (
    <section
      id="craft-dna"
      className={`dna-section${quizPhase === 'question' || quizPhase === 'calculating' ? ' dna-dark' : ''}`}
      ref={sectionRef}
    >
      {quizPhase === 'intro' && (
        <div className="wrap">
          <div className="dna-intro-header rv">
            <div className="tag-label">Craft DNA Scanner</div>
            <h2 className="sec-h2 mt-2">Which Piece Was <em>Made for You?</em></h2>
          </div>
          <div className="dna-intro-grid">
            <div className="dna-intro-left rv">
              <p className="dna-intro-p">
                Five questions. No right answers. Only the ones that feel true when you sit with them.
                At the end, I'll show you the piece that was made for someone exactly like you.
              </p>
              <p className="dna-intro-note">This is not a quiz about products. It is a quiet mirror. Answer slowly.</p>
              <button className="dna-start-btn btn-fill" onClick={() => setQuizPhase('question')}>Discover Your Piece →</button>
            </div>
            <div className="dna-preview-grid rv-xr">
              {CRAFT_PREVIEW_IMAGES.map((img) => (
                <div key={img.label} className="dna-preview-item">
                  <img src={img.src} alt={img.label} className="dna-preview-img" />
                  <div className="dna-preview-overlay" />
                  <span className="dna-preview-label">{img.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {quizPhase === 'question' && (
        <div className="wrap">
          <div className="dna-q-wrap">
            <div className="dna-progress">
              <div className="dna-progress-squares">
                {quizQuestions.map((_, i) => (
                  <div key={i} className={`dna-progress-sq${i <= currentQ ? ' dna-progress-sq-filled' : ''}`} />
                ))}
              </div>
              <span className="dna-progress-text">Question {currentQ + 1} of {quizQuestions.length}</span>
            </div>
            <div className="dna-q-ghost" aria-hidden="true">0{currentQ + 1}</div>
            <div className={`dna-q-text${qVisible ? ' dna-q-enter' : ''}`}>{quizQuestions[currentQ].question}</div>
            <div className="dna-options-grid">
              {quizQuestions[currentQ].options.map((opt) => (
                <button
                  key={opt.value}
                  className={`dna-option${selectedOption === opt.value ? ' selected' : ''}`}
                  onClick={() => handleOptionClick(opt.value)}
                  disabled={!!selectedOption}
                >
                  <span className="dna-opt-icon">{opt.icon}</span>
                  <span className="dna-opt-label">{opt.label}</span>
                </button>
              ))}
            </div>
            {currentQ > 0 && <button className="dna-back-btn" onClick={handleBack}>← Previous</button>}
          </div>
        </div>
      )}

      {quizPhase === 'calculating' && (
        <div className="dna-calc-wrap">
          <div className="dna-calc-word">{CALC_WORDS[calcWordIdx]}</div>
          <div className="dna-calc-bar-track">
            <div className="dna-calc-bar-fill" style={{ width: `${calcBarWidth}%`, transition: calcBarWidth > 0 ? 'width 2s ease' : 'none' }} />
          </div>
        </div>
      )}

      {quizPhase === 'result' && result && (
        <div className="wrap">
          <div className="dna-result-grid">
            <div className={`dna-result-img-wrap rv-x${resultVisible ? ' in' : ''}`}>
              <div className="dna-result-img-inner">
                <img
                  src={result.image}
                  alt={result.piece}
                  className="dna-result-img"
                  style={{ transform: resultVisible ? 'scale(1)' : 'scale(0.95)', transition: 'transform 1.2s ease' }}
                />
                <div className="dna-result-archetype-badge">{result.archetype}</div>
              </div>
            </div>
            <div className={`dna-result-details rv-xr${resultVisible ? ' in' : ''}`}>
              <div className="tag-label">{result.craftType} · Your Match</div>
              <p className="dna-result-headline">{result.headline}</p>
              <h2 className="dna-result-piece-name">{result.piece}</h2>
              <p className="dna-result-desc">{result.description}</p>
              <div className="dna-result-archetype-section">
                <span className="dna-archetype-label">Your craft archetype:</span>
                <p className="dna-archetype-desc">{result.archetypeDesc}</p>
              </div>
              <div className="dna-result-ctas">
                <button
                  onClick={() => {
                    window.openApprentice?.(`Hello, my Craft DNA result was ${result.craftType} and I'd like to enquire about ${result.piece}.`);
                  }}
                  className="dna-cta-primary cursor-none border-none outline-none"
                >
                  Enquire About This Piece
                </button>
                <button className="dna-cta-ghost" onClick={resetQuiz}>Take the quiz again →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CraftDNA;
