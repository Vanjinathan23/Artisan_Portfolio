import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { queue, slots } from '../data/waitingRoomData';

interface FormState {
  name: string;
  email: string;
  craftType: string;
  vision: string;
  timeline: string;
  open: boolean;
  submitted: boolean;
  sending: boolean;
}

export const WaitingRoom = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '', email: '', craftType: '', vision: '', timeline: '',
    open: false, submitted: false, sending: false,
  });
  const [activeSlotId, setActiveSlotId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll reveal for cards and timeline
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wr-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  // ESC key to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && formState.open) closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [formState.open]);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.classList.toggle('locked', formState.open);
    return () => { document.body.classList.remove('locked'); };
  }, [formState.open]);

  const openModal = (slotId: number) => {
    setActiveSlotId(slotId);
    setFormState(f => ({ ...f, open: true, submitted: false }));
  };

  const closeModal = () => {
    setFormState(f => ({
      ...f, open: false, submitted: false, sending: false,
      name: '', email: '', craftType: '', vision: '', timeline: '',
    }));
    setActiveSlotId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(f => ({ ...f, sending: true }));
    setTimeout(() => {
      setFormState(f => ({ ...f, sending: false, submitted: true }));
    }, 1400);
  };

  return (
    <>
      <section id="waiting-room" className="wr-section" ref={sectionRef}>
        {/* Ghost background text */}
        <div className="wr-ghost-text" aria-hidden="true">QUEUE</div>

        <div className="wrap relative z-10">
          {/* Header */}
          <div className="wr-header rv">
            <div>
              <div className="tag-label light">Commission Availability</div>
              <h2 className="sec-h2 light mt-2">
                The Waiting <em>Room</em>
              </h2>
              <p className="wr-subtext">
                Only {slots.total} commissions accepted per month. Each piece demands full attention.
              </p>
            </div>
            <div className="wr-live-status">
              <span className="wr-live-dot" />
              <span className="wr-live-text">
                {slots.available} slot{slots.available !== 1 ? 's' : ''} open for {slots.currentMonth}
              </span>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="wr-slots-grid">
            {queue.map((slot, i) => (
              <div
                key={slot.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`wr-card-reveal slot-card ${slot.status === 'available' ? 'slot-available' : 'slot-taken'}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
                onClick={() => slot.status === 'available' ? openModal(slot.id) : undefined}
                role={slot.status === 'available' ? 'button' : undefined}
                tabIndex={slot.status === 'available' ? 0 : undefined}
                onKeyDown={(e) => {
                  if (slot.status === 'available' && (e.key === 'Enter' || e.key === ' ')) openModal(slot.id);
                }}
              >
                {slot.status === 'in-progress' ? (
                  <>
                    <div className="slot-top">
                      <div className="slot-number">{String(slot.id).padStart(3, '0')}</div>
                      <div className="slot-badge">In Progress</div>
                    </div>
                    <div className="slot-type-pill">{slot.type}</div>
                    <div className="slot-bottom">
                      <span className="slot-city">{slot.city}</span>
                      <span className="slot-started">
                        {slot.startedWeeksAgo === 0
                          ? 'Started this week'
                          : `Started ${slot.startedWeeksAgo} week${slot.startedWeeksAgo !== 1 ? 's' : ''} ago`}
                      </span>
                    </div>
                    {/* Hover reveal overlay */}
                    <div className="slot-hover-info">
                      <span className="slot-hover-piece">{slot.piece}</span>
                      <span className="slot-hover-city">{slot.city}</span>
                    </div>
                  </>
                ) : (
                  <div className="slot-available-inner">
                    <span className="slot-plus">+</span>
                    <span className="slot-avail-label">Available</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Wait Timeline Bar */}
          <div className="wr-wait-timeline wr-card-reveal" ref={timelineRef}>
            <div className="wt-segment wt-seg1">
              <span className="wt-label">Commissioned Work In Progress</span>
              <span className="wt-value">Est. completion: 2–4 weeks</span>
            </div>
            <div className="wt-segment wt-seg2">
              <span className="wt-label">Your Piece Begins</span>
              <span className="wt-value">Week 3</span>
            </div>
            <div className="wt-segment wt-seg3">
              <span className="wt-label">Delivery</span>
              <span className="wt-value">Week 5–7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <div
        className={`wr-modal-overlay${formState.open ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        aria-modal="true"
        role="dialog"
      >
        <div className="wr-modal">
          <button className="wr-close" onClick={closeModal} aria-label="Close modal">
            <X size={18} />
          </button>

          {formState.submitted ? (
            <div className="wr-success">
              <div className="wr-success-icon">✓</div>
              <h3 className="wr-success-h3">Your slot is reserved.</h3>
              <p className="wr-success-p">
                I'll review your brief and confirm via email within 24 hours. Nothing is final until
                we've spoken — this is just the beginning.
              </p>
              <p className="wr-success-ref">
                Reference: SLOT-00{activeSlotId}
              </p>
              <button className="wr-close-btn" onClick={closeModal}>Close</button>
            </div>
          ) : (
            <>
              <div className="tag-label">Reserve Your Slot</div>
              <h2 className="wr-modal-h2">
                Begin the <em>Conversation</em>
              </h2>
              <p className="wr-modal-subtext">
                Tell me what you're imagining. I'll confirm availability within 24 hours.
              </p>

              <form className="wr-form" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="wr-field">
                  <input
                    id="wr-name"
                    type="text"
                    placeholder=" "
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(f => ({ ...f, name: e.target.value }))}
                    className="wr-input peer"
                  />
                  <label htmlFor="wr-name" className="wr-label">Your Name</label>
                </div>

                {/* Email */}
                <div className="wr-field">
                  <input
                    id="wr-email"
                    type="email"
                    placeholder=" "
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(f => ({ ...f, email: e.target.value }))}
                    className="wr-input peer"
                  />
                  <label htmlFor="wr-email" className="wr-label">Email Address</label>
                </div>

                {/* Craft Type */}
                <div className="wr-field">
                  <select
                    value={formState.craftType}
                    onChange={(e) => setFormState(f => ({ ...f, craftType: e.target.value }))}
                    className="wr-select"
                    required
                  >
                    <option value="">What calls to you...</option>
                    <option value="Pottery">Pottery — Vessels, cups, bowls</option>
                    <option value="Jewelry">Jewelry — Rings, pendants, earrings</option>
                    <option value="Painting">Painting — Original works on canvas/linen</option>
                    <option value="Textile">Textile — Woven, embroidered, dyed</option>
                    <option value="Other">Something else — Tell me more</option>
                  </select>
                </div>

                {/* Vision */}
                <div className="wr-field">
                  <textarea
                    id="wr-vision"
                    placeholder=" "
                    required
                    value={formState.vision}
                    onChange={(e) => setFormState(f => ({ ...f, vision: e.target.value }))}
                    className="wr-textarea peer"
                  />
                  <label htmlFor="wr-vision" className="wr-label">Describe your vision...</label>
                </div>

                {/* Timeline */}
                <div className="wr-field">
                  <select
                    value={formState.timeline}
                    onChange={(e) => setFormState(f => ({ ...f, timeline: e.target.value }))}
                    className="wr-select"
                  >
                    <option value="">When do you need this...</option>
                    <option value="no-rush">No rush — whenever it's ready</option>
                    <option value="2-months">Within 2 months</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="special">For a special date — I'll explain</option>
                  </select>
                </div>

                <button type="submit" className="wr-submit" disabled={formState.sending}>
                  {formState.sending ? 'Sending...' : 'Reserve This Slot'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WaitingRoom;
