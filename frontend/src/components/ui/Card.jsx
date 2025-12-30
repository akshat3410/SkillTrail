import PropTypes from 'prop-types'

/**
 * Card container component
 */
export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div 
      className={`card ${hover ? '' : 'hover:border-[var(--color-border)]'} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool
}

/**
 * Card header component
 */
export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

/**
 * Card title component
 */
export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold ${className}`}>
      {children}
    </h3>
  )
}

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

/**
 * Card description component
 */
export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-sm text-[var(--color-text-secondary)] mt-1 ${className}`}>
      {children}
    </p>
  )
}

CardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

/**
 * Card content component
 */
export function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Card
