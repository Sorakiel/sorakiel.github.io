import { FC } from 'react'
import './Skills.css'

const skillsData = [
	{
		id: 1,
		title: 'HTML и CSS',
		description:
			'Это основа фронтенд разработки. Умение создавать и правильно структурировать HTML-документы, а также применять стили к этим документам на CSS, является обязательным навыком для каждого фронтенд разработчика.',
		icon: '🌐',
	},
	{
		id: 2,
		title: 'JavaScript',
		description:
			'Это язык программирования, который используется для создания динамического и интерактивного пользовательского интерфейса. Хороший фронтенд разработчик должен быть знаком с основами JavaScript.',
		icon: '⚡',
	},
	{
		id: 3,
		title: 'Работа с библиотеками и фреймворками',
		description:
			'Фронтенд разработчики должны быть знакомы с различными библиотеками и фреймворками, такими как React, Angular, Vue и другими.',
		icon: '📚',
	},
	{
		id: 4,
		title: 'Разработка для мобильных устройств и адаптивная верстка',
		description:
			'Фронтенд разработчики должны быть знакомы с различными библиотеками и фреймворками для создания адаптивных интерфейсов.',
		icon: '📱',
	},
]

const Skills: FC = () => {
	return (
		<section className='skills' id='skills'>
			<div className='container skills__container'>
				<h2 className='skills__title'>Мои навыки</h2>
				<div className='skills__grid'>
					{skillsData.map(skill => (
						<article key={skill.id} className='skill-card'>
							<div className='skill-card__icon'>{skill.icon}</div>
							<h3 className='skill-card__title'>{skill.title}</h3>
							<p className='skill-card__description'>{skill.description}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default Skills
