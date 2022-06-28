import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from "react-router-dom";
import classNames from 'classnames'

interface LessonProps {
  title: string;
  slugs: string;
  availableAt: Date;
  type: 'live' | 'class'
}

export function Lesson({
  title,
  slugs,
  availableAt,
  type
}: LessonProps) {
  const { slug } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(availableAt)
  const availableDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  })

  const isActiveLesson = slug === slugs

  return (
    <Link to={`${isLessonAvailable ? `/event/lesson/${slugs}` : '#'}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>
       
      <div 
        className={classNames('rounded border border-gray-500 p-4 mt-2 relative group-hover:border-green-500', {
          'bg-green-500': isActiveLesson,
          'bg-transparent': !isLessonAvailable,
        })}
      >
        <div className={classNames('absolute left-0 top-[calc((50%-13.75px))] transform -translate-x-1/2 translate-y-1/2 rotate-45 w-[13.75px] h-[13.75px] bg-green-500 group-hover:w-4 group-hover:h-4', {
          'block': isActiveLesson,
          'hidden': !isActiveLesson || !isLessonAvailable,
        })} />

        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames('text-sm font-medium flex items-center gap-2', {
              'text-white': isActiveLesson,
              'text-blue-500': !isActiveLesson,
            })}>
              <CheckCircle size={20}/> 
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20}/> 
              Em breve
            </span>
          )}

          <span className={classNames("text-xs rounded px-2 py-[0.125rem] text-white border font-bold", {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson,
          })}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={classNames('mt-5 block', {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson,
        })}>
          {title}
        </strong>
      </div>
    </Link>
  )
}