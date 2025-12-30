import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * CodeBlock - Stylized code display for SkillTrail
 * 
 * Hand-drawn aesthetic, copyable, readable.
 * Supports multiple languages with syntax indication.
 */
export function CodeBlock({ 
  code, 
  language = 'javascript',
  title = null,
  showLineNumbers = false 
}) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  const lines = code.split('\n')
  
  return (
    <div style={{
      position: 'relative',
      margin: '1.5rem 0',
      borderRadius: '4px',
      overflow: 'hidden',
      border: '1px solid rgba(42, 42, 42, 0.15)',
      background: '#2d2d2d'
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Decorative dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27ca40' }} />
          </div>
          
          {title && (
            <span style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              {title}
            </span>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language badge */}
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'rgba(255, 255, 255, 0.4)',
            padding: '2px 6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px'
          }}>
            {language}
          </span>
          
          {/* Copy button */}
          <button
            onClick={handleCopy}
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.7rem',
              color: copied ? '#27ca40' : 'rgba(255, 255, 255, 0.5)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 8px',
              borderRadius: '3px',
              transition: 'all 0.2s'
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      
      {/* Code content */}
      <pre style={{
        margin: 0,
        padding: '1rem',
        overflowX: 'auto',
        fontFamily: 'var(--font-mono, "SF Mono", "Fira Code", monospace)',
        fontSize: '0.9rem',
        lineHeight: 1.6,
        color: '#e6e6e6'
      }}>
        <code>
          {showLineNumbers ? (
            lines.map((line, i) => (
              <div key={i} style={{ display: 'flex' }}>
                <span style={{
                  userSelect: 'none',
                  color: 'rgba(255, 255, 255, 0.25)',
                  minWidth: '2.5rem',
                  paddingRight: '1rem',
                  textAlign: 'right'
                }}>
                  {i + 1}
                </span>
                <span>{line}</span>
              </div>
            ))
          ) : (
            code
          )}
        </code>
      </pre>
    </div>
  )
}

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  title: PropTypes.string,
  showLineNumbers: PropTypes.bool
}

export default CodeBlock
