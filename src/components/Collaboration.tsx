import { FC } from 'react'
import './Collaboration.css'

const collaborationData = [
	{
		id: 1,
		title: 'Разработка сайта под ключ',
		description:
			'Это создание дизайн веб-сайтов, созданный для удобства пользователя и решения бизнес-задач. Сайты должны быть понятными и удобными, ведь чем понятнее сайт, тем быстрее пользователь совершит целевое действие',
		icon: '🎨',
	},
	{
		id: 2,
		title: 'Верстка сайтов',
		description:
			'Создание адаптивной HTML/CSS-разметки с чистым, поддерживаемым кодом. Обеспечу корректную работу на всех устройствах и браузерах.',
		icon: '💻',
	},
	{
		id: 3,
		title: 'Разработка мобильного интерфейса',
		description:
			'Это процесс адаптации полномасштабного сайта, под маленькие устройства, учитывая всю спецификацию управления и UI для комфортного и качественного взаимодействия пользователя с любого устройства.',
		icon: '📱',
	},
]

const Collaboration: FC = () => {
	return (
		<section className='collaboration' id='collaboration'>
			<div className='container collaboration__container'>
				<h2 className='collaboration__title'>Варианты сотрудничества</h2>
				<div className='collaboration__grid'>
					{collaborationData.map(item => (
						<article key={item.id} className='collaboration-card'>
							<div className='collaboration-card__icon'>{item.icon}</div>
							<h3 className='collaboration-card__title'>{item.title}</h3>
							<p className='collaboration-card__description'>
								{item.description}
							</p>
						</article>
					))}
					{/*<a href='#contacts' className='collaboration-card__button'>
						Обсудить проект
					</a>*/}
				</div>
			</div>
		</section>
	)
}

export default Collaboration
