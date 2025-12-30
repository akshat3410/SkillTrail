import PropTypes from 'prop-types'

const STATUS_OPTIONS = [
  { value: 'not_started', label: 'Not Started' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
]

/**
 * Three-state progress toggle component
 */
export function ProgressToggle({ 
  value = 'not_started', 
  onChange, 
  disabled = false,
  className = '' 
}) {
  return (
    <div className={`progress-toggle ${className}`}>
      {STATUS_OPTIONS.map(option => (
        <button
          key={option.value}
          type="button"
          className={`progress-toggle-option ${
            value === option.value ? `active ${option.value.replace('_', '-')}` : ''
          }`}
          onClick={() => onChange(option.value)}
          disabled={disabled}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

ProgressToggle.propTypes = {
  value: PropTypes.oneOf(['not_started', 'in_progress', 'completed']),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

export default ProgressToggle
