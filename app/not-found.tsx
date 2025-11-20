import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'

export default function NotFound() {
  return (
    <div className="mt-24 text-center">
      <PageTitle>
        404 - Page Not Found{' '}
        <span role="img" aria-label="confused face">
          😕
        </span>
      </PageTitle>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      >
        Go back home →
      </Link>
    </div>
  )
}

