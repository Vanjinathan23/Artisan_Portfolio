import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage('');
    
    // Basic validation
    if (!name || !email || !interest || !message) {
      setErrorMessage('Please fill out all fields.');
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject: interest,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="sec bg-walnut relative overflow-hidden">
      <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] border border-white/[0.04] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-240px] right-[-240px] w-[800px] h-[800px] border border-white/[0.025] rounded-full pointer-events-none" />
      
      <div className="wrap relative z-10">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 sm:gap-28 items-start">
          <div>
            <div className="tag-label light">Get in Touch</div>
            <h2 className="sec-h2 light mb-[22px] mt-2">Begin a<br /><i>Conversation</i></h2>
            <p className="font-body text-[0.9rem] font-light text-white/48 leading-[1.85] mb-10 max-w-[380px]">
              Every commission starts with a conversation. Tell me what you're looking for — not just the object, but the feeling it should carry.
            </p>
            
            <div className="flex flex-col gap-4.5">
              {[
                { icon: <Mail size={16} />, label: 'Email', val: 'hello@artisana.in' },
                { icon: <Phone size={16} />, label: 'Phone', val: '+91 99999 99999' },
                { icon: <MapPin size={16} />, label: 'Studio', val: 'Artisan Quarter, Chennai' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div className="w-[38px] h-[38px] border border-white/10 flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <span className="block font-body text-[0.58rem] font-medium tracking-[0.2em] uppercase text-muted mb-[2px]">{item.label}</span>
                    <span className="font-body text-[0.84rem] font-light text-white/68">{item.val}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-[3px] mt-8">
              {['Ig', 'Pt', 'Yt', 'Be'].map(soc => (
                <a key={soc} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center font-body text-[0.6rem] font-medium tracking-[0.1em] text-white/38 hover:border-sand hover:text-sand hover:bg-sand/[0.08] transition-all uppercase">{soc}</a>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8 max-w-[380px]">
              <span className="block font-body text-[0.58rem] font-medium tracking-[0.2em] uppercase text-muted mb-2">Immediate Answer?</span>
              <p className="font-body text-[0.82rem] font-light text-white/48 leading-relaxed mb-4">
                Chat with our AI Studio Assistant for instant answers regarding pieces, commissions, care instructions, and more.
              </p>
              <button 
                type="button"
                onClick={() => window.openApprentice?.()}
                className="inline-block bg-white/[0.05] border border-white/10 hover:border-sand hover:text-sand text-white px-6 py-3 font-body text-[0.62rem] font-medium tracking-[0.18em] uppercase transition-all cursor-none outline-none"
              >
                Open Studio Assistant
              </button>
            </div>
          </div>

          <div>
            <form onSubmit={handleFormSubmit} className="c-form contact-form bg-white/[0.03] border border-white/[0.08] p-7 sm:p-12 relative">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-accent italic text-[1.15rem] text-sand text-center p-5.5 border border-sand/20"
                >
                  Thank you for contacting us. We will get back to you soon.
                </motion.div>
              ) : (
                <>
                  {errorMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 text-[#ff6b6b] text-sm text-center font-body border border-[#ff6b6b]/20 p-3 bg-[#ff6b6b]/10"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                  <div className="relative mb-[3px]">
                    <input 
                      type="text" 
                      id="fn" 
                      placeholder=" " 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="peer w-full bg-white/[0.035] border-none border-b border-white/12 text-ondark p-[20px_16px_10px] font-body text-[0.88rem] font-light outline-none focus:border-b-sand focus:bg-white/[0.06] transition-all" 
                    />
                    <label htmlFor="fn" className="absolute top-4.5 left-4 font-body text-[0.68rem] text-white/30 pointer-events-none transition-all peer-focus:top-1.5 peer-focus:text-[0.57rem] peer-focus:text-sand peer-focus:tracking-[0.15em] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.57rem] peer-[:not(:placeholder-shown)]:text-sand">Your Name</label>
                  </div>
                  <div className="relative mb-[3px]">
                    <input 
                      type="email" 
                      id="fe" 
                      placeholder=" " 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer w-full bg-white/[0.035] border-none border-b border-white/12 text-ondark p-[20px_16px_10px] font-body text-[0.88rem] font-light outline-none focus:border-b-sand focus:bg-white/[0.06] transition-all" 
                    />
                    <label htmlFor="fe" className="absolute top-4.5 left-4 font-body text-[0.68rem] text-white/30 pointer-events-none transition-all peer-focus:top-1.5 peer-focus:text-[0.57rem] peer-focus:text-sand peer-focus:tracking-[0.15em] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.57rem] peer-[:not(:placeholder-shown)]:text-sand">Email Address</label>
                  </div>
                  <div className="relative mb-[3px]">
                    <select 
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-white/[0.035] border-none border-b border-white/12 text-ondark p-[20px_16px_10px] font-body text-[0.88rem] font-light outline-none focus:border-b-sand focus:bg-white/[0.06] transition-all appearance-none cursor-none"
                    >
                      <option value="">Interested in...</option>
                      <option value="Commission a Piece">Commission a Piece</option>
                      <option value="Exhibition Enquiry">Exhibition Enquiry</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="relative mb-[3px]">
                    <textarea 
                      id="fm" 
                      placeholder=" " 
                      required 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="peer w-full h-[100px] bg-white/[0.035] border-none border-b border-white/12 text-ondark p-[20px_16px_10px] font-body text-[0.88rem] font-light outline-none focus:border-b-sand focus:bg-white/[0.06] transition-all resize-none" 
                    />
                    <label htmlFor="fm" className="absolute top-4.5 left-4 font-body text-[0.68rem] text-white/30 pointer-events-none transition-all peer-focus:top-1.5 peer-focus:text-[0.57rem] peer-focus:text-sand peer-focus:tracking-[0.15em] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.57rem] peer-[:not(:placeholder-shown)]:text-sand">Your Message</label>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSending}
                    className="w-full mt-[3px] bg-terra text-white p-[17px] font-body text-[0.68rem] font-medium tracking-[0.22em] uppercase hover:bg-[#9e4e2e] transition-colors cursor-none"
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
