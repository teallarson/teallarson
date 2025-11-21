import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  linkText?: string
}

const Card = ({ title, description, imgSrc, href, linkText }: CardProps) => (
  <div className="group md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      } relative overflow-hidden rounded-xl border-2 border-gray-200 shadow-soft transition-all duration-300 hover:scale-[1.02] hover:border-primary-500 hover:shadow-glow dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-500`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/0 via-primary-400/0 to-primary-600/0 transition-opacity duration-300 group-hover:from-primary-500/20 group-hover:via-primary-400/15 group-hover:to-primary-600/20 dark:group-hover:from-primary-500/30 dark:group-hover:via-primary-400/20 dark:group-hover:to-primary-600/30"></div>
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-30 dark:group-hover:opacity-40"></div>
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <div className="overflow-hidden">
              <Image
                alt={title}
                src={imgSrc}
                className="transition-transform duration-300 group-hover:scale-110 object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
                layout="intrinsic"
                loading="lazy"
              />
            </div>
          </Link>
        ) : (
          <div className="overflow-hidden">
            <Image
              alt={title}
              src={imgSrc}
              className="transition-transform duration-300 group-hover:scale-110 object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
              loading="lazy"
            />
          </div>
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight transition-all">
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="gradient-text-viewport transition-opacity group-hover:opacity-80"
            >
              {title}
            </Link>
          ) : (
            <span className="gradient-text-viewport">{title}</span>
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-600 dark:text-gray-300">{description}</p>
        {href && (
          <Link
            href={href}
            className="shimmer-hover link-modern-hover inline-flex items-center gap-1 text-base font-semibold transition-all hover:translate-x-1"
            aria-label={`Link to ${title}`}
          >
            <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent font-bold hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 dark:from-primary-300 dark:via-primary-500 dark:to-primary-400 dark:hover:from-primary-200 dark:hover:via-primary-400 dark:hover:to-primary-300">
              {linkText || 'Learn more'}
            </span>
            <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-600 bg-clip-text text-transparent font-bold dark:from-primary-300 dark:via-primary-500 dark:to-primary-400">&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
