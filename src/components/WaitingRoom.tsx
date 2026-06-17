import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { queue, slots } from '../data/waitingRoomData';
import { ApprenticeHelpButton } from './ApprenticeHelpButton';

interface Reservation {
  slotId: number;
  name: string;
  email: string;
  craftType: string;
  vision: string;
  timeline: string;
  ref: string;
}

type ModalView = 'form' | 'sending' | 'success' | 'cancel-confirm' | 'cancelled';

interface FormState {
  name: string;
  email: string;
  craftType: string;
  vision: string;
  timeline: string;
}

const EMPTY_FORM: FormState = {
  name: '', email: '', craftType: '', vision: '', timeline: '',
};

export const WaitingRoom = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState<ModalView>('form');
  const [activeSlotId, setActiveSlotId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('wr-visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  // ESC key closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.classList.toggle('locked', modalOpen);
    return () => { document.body.classList.remove('locked'); };
  }, [modalOpen]);

  const getReservation = (slotId: number) =>
    reservations.find((r) => r.slotId === slotId) ?? null;

  const openReserveModal = (slotId: number) => {
    setActiveSlotId(slotId);
    setForm(EMPTY_FORM);
    setErrorMessage('');
    setModalView('form');
    setModalOpen(true);
  };

  const openCancelModal = (slotId: number) => {
    setActiveSlotId(slotId);
    setModalView('cancel-confirm');
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setModalView('form');
    setActiveSlotId(null);
    setForm(EMPTY_FORM);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setModalView('sending');

    try {
      const response = await fetch('/api/waiting-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: activeSlotId,
          ...form
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const newReservation: Reservation = {
          slotId: activeSlotId!,
          ...form,
          ref: `SLOT-00${activeSlotId}`,
        };
        setReservations((prev) => [...prev, newReservation]);
        setModalView('success');
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setModalView('form');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
      setModalView('form');
    }
  };

  const handleCancelConfirm = () => {
    setReservations((prev) => prev.filter((r) => r.slotId !== activeSlotId));
    setModalView('cancelled');
  };

  const isReserved = (slotId: number) => !!getReservation(slotId);

  const totalReserved = reservations.length;
  const availableNow = slots.available - totalReserved;

  return (
    <>
      <section id="waiting-room" className="wr-section" ref={sectionRef}>
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
                {availableNow > 0
                  ? `${availableNow} slot${availableNow !== 1 ? 's' : ''} open for ${slots.currentMonth}`
                  : `All slots filled for ${slots.currentMonth}`}
              </span>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="wr-slots-grid">
            {queue.map((slot, i) => {
              const reservation = getReservation(slot.id);
              const reserved = !!reservation;

              if (slot.status === 'in-progress') {
                return (
                  <div
                    key={slot.id}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="wr-card-reveal slot-card slot-taken"
                    data-slot={slot.id}
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
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
                    <div className="slot-hover-info">
                      <span className="slot-hover-piece">{slot.piece}</span>
                      <span className="slot-hover-city">{slot.city}</span>
                    </div>
                  </div>
                );
              }

              // Available / Reserved slot
              if (reserved) {
                return (
                  <div
                    key={slot.id}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="wr-card-reveal wr-visible slot-card slot-reserved"
                    data-slot={slot.id}
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    <div className="slot-top">
                      <div className="slot-number">{String(slot.id).padStart(3, '0')}</div>
                      <div className="slot-badge slot-badge-reserved">Reserved</div>
                    </div>
                    <div className="slot-reserved-name">{reservation!.name}</div>
                    <div className="slot-reserved-ref">{reservation!.ref}</div>
                    <button
                      className="slot-cancel-btn"
                      onClick={() => openCancelModal(slot.id)}
                      aria-label={`Cancel reservation ${reservation!.ref}`}
                    >
                      Cancel Reservation
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={slot.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="wr-card-reveal slot-card slot-available"
                  data-slot={slot.id}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                  onClick={() => openReserveModal(slot.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Reserve slot ${slot.id}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') openReserveModal(slot.id);
                  }}
                >
                  <div className="slot-available-inner">
                    <span className="slot-plus">+</span>
                    <span className="slot-avail-label">Available</span>
                  </div>
                </div>
              );
            })}
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

          {/* Apprentice Help Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <ApprenticeHelpButton
              label="Walk Me Through Reserving a Slot"
              guideKey="waiting-room-form"
              onHelpRequest={(key: string) => (window as any).openApprenticeGuide?.(key)}
            />
          </div>
        </div>
      </section>

      {/* ── Modal Overlay ── */}
      <div
        className={`wr-modal-overlay${modalOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        aria-modal="true"
        role="dialog"
      >
        <div className="wr-modal">
          {/* Close button always present */}
          <button className="wr-close" onClick={handleClose} aria-label="Close modal">
            <X size={18} />
          </button>

          {/* ── View: Form ── */}
          {modalView === 'form' && (
            <>
              <div className="tag-label">Reserve Your Slot</div>
              <h2 className="wr-modal-h2">
                Begin the <em>Conversation</em>
              </h2>
              <p className="wr-modal-subtext">
                Tell me what you're imagining. I'll confirm availability within 24 hours.
              </p>

              {errorMessage && (
                <div className="mb-4 text-[#ff6b6b] text-[0.8rem] text-center font-body border border-[#ff6b6b]/20 p-3 bg-[#ff6b6b]/10">
                  {errorMessage}
                </div>
              )}

              <form className="wr-form" onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="wr-field">
                  <input
                    id="wr-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="wr-input"
                    placeholder=" "
                    autoComplete="name"
                  />
                  <label htmlFor="wr-name">Your Name</label>
                </div>

                {/* Email */}
                <div className="wr-field">
                  <input
                    id="wr-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="wr-input"
                    placeholder=" "
                    autoComplete="email"
                  />
                  <label htmlFor="wr-email">Email Address</label>
                </div>

                {/* Craft Type */}
                <div className="wr-field">
                  <select
                    id="wr-craft-type"
                    value={form.craftType}
                    onChange={(e) => setForm((f) => ({ ...f, craftType: e.target.value }))}
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
                    required
                    value={form.vision}
                    onChange={(e) => setForm((f) => ({ ...f, vision: e.target.value }))}
                    className="wr-textarea"
                    placeholder=" "
                    rows={4}
                  />
                  <label htmlFor="wr-vision">Describe your vision...</label>
                </div>

                {/* Timeline */}
                <div className="wr-field">
                  <select
                    id="wr-timeline"
                    value={form.timeline}
                    onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))}
                    className="wr-select"
                  >
                    <option value="">When do you need this...</option>
                    <option value="no-rush">No rush — whenever it's ready</option>
                    <option value="2-months">Within 2 months</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="special">For a special date — I'll explain</option>
                  </select>
                </div>

                <button type="submit" className="wr-submit wr-submit-btn">
                  Reserve This Slot
                </button>
              </form>
            </>
          )}

          {/* ── View: Sending ── */}
          {modalView === 'sending' && (
            <div className="wr-success">
              <div className="wr-sending-anim">
                <div className="wr-sending-bar" />
              </div>
              <p className="wr-calc-word">Securing your slot...</p>
            </div>
          )}

          {/* ── View: Success ── */}
          {modalView === 'success' && (
            <div className="wr-success">
              <div className="wr-success-icon">✓</div>
              <h3 className="wr-success-h3">Your slot is reserved.</h3>
              <p className="wr-success-p">
                I'll review your brief and confirm via email within 24 hours. Nothing is final until
                we've spoken — this is just the beginning.
              </p>
              <p className="wr-success-ref">Reference: SLOT-00{activeSlotId}</p>
              <div className="wr-success-actions">
                <button className="wr-close-btn" onClick={handleClose}>
                  Close
                </button>
                <button
                  className="wr-cancel-link"
                  onClick={() => setModalView('cancel-confirm')}
                >
                  Cancel this reservation
                </button>
              </div>
            </div>
          )}

          {/* ── View: Cancel Confirm ── */}
          {modalView === 'cancel-confirm' && (
            <div className="wr-success">
              <div className="wr-cancel-icon">✕</div>
              <h3 className="wr-success-h3">Cancel your reservation?</h3>
              <p className="wr-success-p">
                This will release your slot back into the queue. You're welcome to reserve again
                any time — but the slot may be taken.
              </p>
              {activeSlotId && (
                <p className="wr-success-ref">
                  Cancelling: SLOT-00{activeSlotId}
                </p>
              )}
              <div className="wr-cancel-actions">
                <button className="wr-submit wr-submit-danger" onClick={handleCancelConfirm}>
                  Yes, cancel my reservation
                </button>
                <button className="wr-close-btn" onClick={handleClose}>
                  Keep my slot
                </button>
              </div>
            </div>
          )}

          {/* ── View: Cancelled ── */}
          {modalView === 'cancelled' && (
            <div className="wr-success">
              <div className="wr-cancel-icon">○</div>
              <h3 className="wr-success-h3">Reservation released.</h3>
              <p className="wr-success-p">
                Your slot has been returned to the queue. Whenever you're ready, it's here.
              </p>
              <button className="wr-close-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WaitingRoom;
