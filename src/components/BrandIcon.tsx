type Props = {
  size?: number
  className?: string
  title?: string
}

// Official Stripe "S" glyph geometry (public brand asset), rendered on the brand purple tile.
const STRIPE_PATH =
  'M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z'

export function StripeMark({ size = 24, className, title = 'Stripe' }: Props) {
  return (
    <svg
      className={`brand brand--stripe ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
    >
      <rect width="32" height="32" rx="7" fill="#635BFF" />
      <g transform="translate(6.5 6.5) scale(0.79)">
        <path d={STRIPE_PATH} fill="#fff" />
      </g>
    </svg>
  )
}

// Amazon mark: lowercase "a" over the orange smile-arrow, on Squid Ink.
export function AmazonMark({ size = 24, className, title = 'Amazon' }: Props) {
  return (
    <svg
      className={`brand brand--amazon ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
    >
      <rect width="32" height="32" rx="7" fill="#232F3E" />
      <text
        x="16"
        y="19"
        textAnchor="middle"
        fontFamily="'Inter Tight', Inter, Arial, sans-serif"
        fontWeight="700"
        fontSize="18.5"
        fill="#fff"
      >
        a
      </text>
      <path
        d="M8 21.8c4.3 3.6 11.8 3.6 16 .2"
        fill="none"
        stroke="#FF9900"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22.6 19.6l1.6 2.4-2.8.6"
        fill="none"
        stroke="#FF9900"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CompanyMark({ company, size }: { company: string; size?: number }) {
  if (company === 'Stripe') return <StripeMark size={size} />
  if (company === 'Amazon') return <AmazonMark size={size} />
  return null
}
