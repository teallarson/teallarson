import siteMetadata from '@/data/siteMetadata'
import Card from '@/components/Card'
import talksData from '@/data/talksData'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Talks - ${siteMetadata.author}`,
  description: siteMetadata.description,
}

export default function TalksPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="gradient-text-viewport text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Talks
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Presentations and interviews about my journey in tech.
        </p>
      </div>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {talksData.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
              linkText={'Watch the Recording'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

