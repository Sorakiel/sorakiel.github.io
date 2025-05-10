import { FC } from 'react'
import './Skills.css'

const skillsData = [
	{
		id: 1,
		title: 'HTML и CSS',
		description:
			'Фундамент фронтенд-разработки — умение строить семантическую HTML-разметку и оформлять её с помощью CSS. Благодаря продуманной структуре и таблице стилей вы создаёте адаптивные, понятные и эстетически приятные веб-страницы, которые работают стабильно на любых устройствах.',
		icon: '🌐',
	},
	{
		id: 2,
		title: 'JavaScript',
		description:
			'JavaScript — это высокоуровневый язык программирования, играющий ключевую роль в веб-разработке, обеспечивая динамическое поведение и интерактивность пользовательских интерфейсов. Грамотный фронтенд-разработчик должен не только понимать его базовые принципы, но и уметь применять их для создания эффективных, отзывчивых и поддерживаемых решений.',
		icon: '⚡',
	},
	{
		id: 3,
		title:
			'Frameworks & Libraries (React приоритетно, а так же основы Vue, Angular и др.)',
		description:
			'Применяю React (Hooks, Router), для построения масштабируемых, поддерживаемых и высокопроизводительных приложений с чистой архитектурой и понятной структурой кода.',
		icon: '📚',
	},
	{
		id: 4,
		title: 'Разработка для мобильных устройств и адаптивная верстка',
		description:
			'В современной веб-разработке ключевое значение имеет адаптивность интерфейсов, особенно для мобильных устройств. Поэтому фронтенд-разработчикам важно глубоко разбираться в актуальных инструментах — фреймворках и библиотеках, которые помогают создавать гибкие и отзывчивые пользовательские интерфейсы.',
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
