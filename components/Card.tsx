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
      } overflow-hidden rounded-xl border border-gray-200 bg-white shadow-soft transition-all duration-300 hover:scale-[1.02] hover:shadow-glow dark:border-gray-700 dark:bg-gray-800`}
    >
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
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-600 dark:text-gray-300">{description}</p>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center text-base font-semibold text-primary-600 transition-all hover:text-primary-700 hover:translate-x-1 dark:text-primary-400 dark:hover:text-primary-300"
            aria-label={`Link to ${title}`}
          >
            {linkText || 'Learn more'} &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
