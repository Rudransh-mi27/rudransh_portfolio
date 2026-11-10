'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons/SocialIcons';
import { PERSONAL_INFO } from '@/data/portfolioData';
import styles from './Contact.module.scss';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto fallback with prefilled message
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>INITIATE CONVERSATION</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Let&rsquo;s engineer something <span className={styles.serifItalic}>impactful</span> together.
          </h2>
          <p className={styles.sectionSubtitle}>
            Whether you have an internship opportunity, project collaboration, or engineering question, my inbox is always open.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {/* Left: Contact Info & Quick Actions */}
          <div className={styles.infoCol}>
            <div className={styles.directCard}>
              <span className={styles.directLabel}>DIRECT REACH</span>
              
              <div className={styles.emailRow}>
                <div className={styles.emailTextWrap}>
                  <Mail size={18} className={styles.emailIcon} />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className={styles.emailLink}>
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className={styles.copyBtn}
                  aria-label="Copy Email"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={16} className={styles.checkIcon} /> : <Copy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className={styles.metaInfoList}>
                <div className={styles.metaItem}>
                  <Phone size={15} />
                  <a href={`tel:${PERSONAL_INFO.phone}`} className={styles.phoneLink}>
                    +91 {PERSONAL_INFO.phone}
                  </a>
                </div>

                <div className={styles.metaItem}>
                  <MapPin size={15} />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Social Cards */}
            <div className={styles.socialGrid}>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
              >
                <div className={styles.socialIconWrap}>
                  <GithubIcon size={20} />
                </div>
                <div className={styles.socialMeta}>
                  <span className={styles.platformName}>GitHub</span>
                  <span className={styles.profileHandle}>@Rudransh-mi27</span>
                </div>
                <ArrowUpRight size={16} className={styles.arrowIcon} />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
              >
                <div className={styles.socialIconWrap}>
                  <LinkedinIcon size={20} />
                </div>
                <div className={styles.socialMeta}>
                  <span className={styles.platformName}>LinkedIn</span>
                  <span className={styles.profileHandle}>rudransh-mishra</span>
                </div>
                <ArrowUpRight size={16} className={styles.arrowIcon} />
              </a>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h3 className={styles.formHeading}>Send a Direct Message</h3>

              {formSubmitted ? (
                <div className={styles.successMessage}>
                  <Check size={28} className={styles.successIcon} />
                  <h4>Message Prepared</h4>
                  <p>Your default email client has been launched with your message. Thank you for reaching out!</p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className={styles.resetBtn}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Your Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Sharma"
                      className={styles.input}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Your Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      className={styles.input}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Discussing an opportunity, project, or technical conversation..."
                      className={styles.textarea}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <span>Send Message</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
