'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, ArrowLeft, CornerDownLeft } from 'lucide-react';
import { executeCommand, COMMAND_LIST } from './terminalCommands';
import styles from './AcademicTerminal.module.scss';

const ASCII_ART = `  ____  _   _ ____  ____     _    _   _ ____  _   _ 
 |  _ \\| | | |  _ \\|  _ \\   / \\  | \\ | / ___|| | | |
 | |_) | | | | | | | |_) | / _ \\ |  \\| \\___ \\| |_| |
 |  _ <| |_| | |_| |  _ < / ___ \\| |\\  |___) |  _  |
 |_| \\_\\\\___/|____/|_| \\_/_/   \\_\\_| \\_|____/|_| |_|`;

const ASCII_ART_MOBILE = `  ___ _   _ ___  ___    _   _  _ ___ _  _ 
 | _ \\ | | |   \\| _ \\  /_\\ | \\| / __| || |
 |   / |_| | |) |   / / _ \\| .\` \\__ \\ __ |
 |_|_\\\\___/|___/|_|_\\/_/ \\_\\_|\\_|___/_||_|`;

export default function AcademicTerminal({ onClose }) {
  // Terminal history entries: array of { id, command, output }
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Boot sequence animation state
  const [bootState, setBootState] = useState('typing_start'); // 'typing_start' | 'booting' | 'ready'
  const [typedStart, setTypedStart] = useState('');

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const isSkippedRef = useRef(false);

  // Auto-scroll to bottom on history change
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, bootState, typedStart]);

  // Always keep input focused when ready
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Initial boot sequence typing effect
  useEffect(() => {
    let timeoutId;
    const target = 'start';
    let charIndex = 0;

    const typeChar = () => {
      if (isSkippedRef.current) return;
      if (charIndex < target.length) {
        setTypedStart(target.slice(0, charIndex + 1));
        charIndex++;
        timeoutId = setTimeout(typeChar, 70);
      } else {
        // Finished typing "start", reveal ASCII banner & welcome message
        timeoutId = setTimeout(() => {
          if (!isSkippedRef.current) {
            setBootState('ready');
          }
        }, 200);
      }
    };

    timeoutId = setTimeout(typeChar, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  // Allow clicking or pressing Escape / Enter to skip typing animation
  const handleSkipIntro = () => {
    if (bootState !== 'ready') {
      isSkippedRef.current = true;
      setTypedStart('start');
      setBootState('ready');
    }
  };

  // Command submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const cmd = inputValue;
    const result = executeCommand(cmd);

    // Save to command history for Up/Down arrow recall
    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInputValue('');

    if (result && result.type === 'clear') {
      setHistory([]);
      return;
    }

    if (result && result.type === 'restart') {
      setHistory([]);
      setBootState('typing_start');
      setTypedStart('');
      isSkippedRef.current = false;
      return;
    }

    // Append to output
    setHistory((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        command: cmd,
        result,
      },
    ]);
  };

  // Keyboard navigation: Up/Down arrow for history, Tab for autocomplete
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (bootState !== 'ready') {
      handleSkipIntro();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputValue.toLowerCase().trim();
      if (current) {
        const match = COMMAND_LIST.find((cmd) => cmd.startsWith(current));
        if (match) {
          setInputValue(match);
        }
      }
    }
  };

  return (
    <div
      className={styles.terminalContainer}
      onClick={() => {
        handleSkipIntro();
        focusInput();
      }}
      role="region"
      aria-label="Interactive Bash Terminal - Academic Status"
    >
      {/* Background Decorative Waves matching reference image */}
      <div className={styles.decorativeSquiggles} aria-hidden="true">
        <span className={`${styles.squiggle} ${styles.sq1}`}>~</span>
        <span className={`${styles.squiggle} ${styles.sq2}`}>~</span>
        <span className={`${styles.squiggle} ${styles.sq3}`}>~</span>
        <span className={`${styles.squiggle} ${styles.sq4}`}>~</span>
        <span className={`${styles.squiggle} ${styles.sq5}`}>~</span>
        <span className={`${styles.squiggle} ${styles.sq6}`}>~</span>
      </div>

      {/* Terminal Top Bar */}
      <div className={styles.terminalHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.terminalBadge}>
            <TerminalIcon size={14} className={styles.badgeIcon} />
            <span className={styles.badgeTitle}>rudransh@portfolio: ~ (bash)</span>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={styles.closeBtn}
            title="Return to Envelope (Esc)"
            aria-label="Return to envelope"
          >
            <ArrowLeft size={14} />
            <span>Return to Envelope</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div ref={terminalBodyRef} className={styles.terminalBody}>
        {/* Line 1: Boot prompt */}
        <div className={styles.promptLine}>
          <span className={styles.promptUser}>rudransh@portfolio</span>
          <span className={styles.promptSymbol}>~ $</span>
          <span className={styles.promptCmd}>{typedStart}</span>
          {bootState === 'typing_start' && <span className={styles.blinkingCursor}>_</span>}
        </div>

        {/* Booted Welcome Message & ASCII Art */}
        {bootState === 'ready' && (
          <div className={styles.bootOutput}>
            {/* Desktop ASCII */}
            <pre className={styles.asciiDesktop} aria-hidden="true">
              {ASCII_ART}
            </pre>
            {/* Mobile ASCII */}
            <pre className={styles.asciiMobile} aria-hidden="true">
              {ASCII_ART_MOBILE}
            </pre>

            <div className={styles.welcomeBlock}>
              <p className={styles.welcomeText}>
                I&apos;m Rudransh Mishra, Welcome to my Portfolio Terminal.
                <br />
                Explore my academic journey, technical background and engineering interests using Bash-style commands.
              </p>

              <div className={styles.commandsHint}>
                <span className={styles.hintTitle}>To navigate try these commands:</span>
                <div className={styles.commandsList}>
                  <span className={styles.cmdPill}>about</span>
                  <span className={styles.cmdSep}>|</span>
                  <span className={styles.cmdPill}>education</span>
                  <span className={styles.cmdSep}>|</span>
                  <span className={styles.cmdPill}>cgpa</span>
                  <span className={styles.cmdSep}>|</span>
                  <span className={styles.cmdPill}>semester</span>
                </div>
                <div className={styles.commandsList}>
                  <span className={styles.cmdPill}>coursework</span>
                  <span className={styles.cmdSep}>|</span>
                  <span className={styles.cmdPill}>skills</span>
                  <span className={styles.cmdSep}>|</span>
                  <span className={styles.cmdPill}>projects</span>
                  <span className={styles.cmdSep}>|</span>
                  <span className={styles.cmdPill}>github</span>
                </div>
                <div className={styles.commandsList}>
                  <span className={styles.cmdPill}>contact</span>
                  <span className={styles.cmdSep}>|</span>
                  <span className={styles.cmdPill}>help</span>
                  <span className={styles.cmdSep}>|</span>
                  <span className={styles.cmdPill}>clear</span>
                  <span className={styles.cmdSep}>|</span>
                  <span className={styles.cmdPill}>restart</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Entries */}
        {history.map((entry) => (
          <div key={entry.id} className={styles.historyBlock}>
            <div className={styles.promptLine}>
              <span className={styles.promptUser}>rudransh@portfolio</span>
              <span className={styles.promptSymbol}>~ $</span>
              <span className={styles.promptCmd}>{entry.command}</span>
            </div>

            {/* Output formatting */}
            <div className={styles.commandResult}>
              {entry.result?.content?.map((line, idx) => (
                <div
                  key={idx}
                  className={`${styles.outputLine} ${
                    entry.result.type === 'error'
                      ? styles.outputError
                      : entry.result.type === 'projects_list' && line.startsWith('[')
                      ? styles.outputProjectLine
                      : line.startsWith('•') || line.startsWith('  [')
                      ? styles.outputListItem
                      : styles.outputRegular
                  }`}
                >
                  {line}
                </div>
              ))}

              {/* Single Project Detail verbose render */}
              {entry.result?.type === 'project_detail' && (
                <div className={styles.projectDetailCard}>
                  <div className={styles.detailHeader}>
                    <span className={styles.detailNum}>[PROJECT {entry.result.number}]</span>
                    <span className={styles.detailTitle}>{entry.result.project.title}</span>
                  </div>
                  <div className={styles.detailSubtitle}>{entry.result.project.subtitle}</div>
                  <div className={styles.detailCategory}>{entry.result.project.category}</div>
                  <p className={styles.detailDesc}>{entry.result.project.description}</p>
                  <div className={styles.detailStack}>
                    <span className={styles.stackLabel}>Stack:</span>
                    {entry.result.project.technologies?.map((t, i) => (
                      <span key={i} className={styles.detailTag}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className={styles.detailLinks}>
                    {entry.result.project.liveUrl && (
                      <a
                        href={entry.result.project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.detailLink}
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {entry.result.project.githubUrl && (
                      <a
                        href={entry.result.project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.detailLink}
                      >
                        GitHub Repo ↗
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Active Interactive Input Prompt */}
        {bootState === 'ready' && (
          <form onSubmit={handleSubmit} className={styles.activeInputForm}>
            <span className={styles.promptUser}>rudransh@portfolio</span>
            <span className={styles.promptSymbol}>~ $</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.terminalInput}
              autoFocus
              spellCheck={false}
              autoCapitalize="none"
              autoComplete="off"
              aria-label="Terminal command input"
            />
            <span className={styles.blinkingCursor}>█</span>
          </form>
        )}
      </div>

      {/* Terminal Footer Navigation Bar */}
      <div className={styles.terminalFooter}>
        <div className={styles.footerHint}>
          <span>Press</span>
          <kbd className={styles.keyBadge}>Tab</kbd>
          <span>to autocomplete</span>
          <span className={styles.dotSep}>•</span>
          <kbd className={styles.keyBadge}>↑</kbd>
          <kbd className={styles.keyBadge}>↓</kbd>
          <span>for command history</span>
          <span className={styles.dotSep}>•</span>
          <kbd className={styles.keyBadge}>Esc</kbd>
          <span>to return</span>
        </div>
      </div>
    </div>
  );
}

