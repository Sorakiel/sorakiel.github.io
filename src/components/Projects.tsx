import { FC } from 'react'
import './Projects.css'

const projectsData = [
	{
		id: 1,
		title: 'Сайт - портфолио',
		description: 'Сайт портфолио для контент мейкера',
		image: '/portfolio.jpg',
		link: 'http://giuliapovkh.ru',
	},
	{
		id: 2,
		title: 'Набор в студенческую структуру',
		description:
			'Сайт для студенческого образования IT-Center РЭУ им. Плеханова',
		image: '/ITC.jpg',
		link: 'https://nabor.itc-hub.ru/',
	},
	{
		id: 3,
		title: 'Масленичные пазлы',
		description: 'Игра по сборке пазлов для мероприятия',
		image: '/maslenitsa.jpg',
		link: 'https://maslenitsa.itc-hub.ru/',
	},
]

const Projects: FC = () => {
	return (
		<section className='projects' id='portfolio'>
			<div className='container projects__container'>
				<h2 className='projects__title'>Мои проекты</h2>
				<div className='projects__grid'>
					{projectsData.map(project => (
						<article key={project.id} className='project-card'>
							<div className='project-card__image'>
								<img src={project.image} alt={project.title} />
							</div>
							<div className='project-card__content'>
								<h3 className='project-card__title'>{project.title}</h3>
								<p className='project-card__description'>
									{project.description}
								</p>
								<a
									href={project.link}
									className='project-card__link'
									target='_blank'
									rel='noopener noreferrer'
								>
									Подробнее
								</a>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default Projects
