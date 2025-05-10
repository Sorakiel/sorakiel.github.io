import { useEffect } from 'react'
import './App.css'
import Collaboration from './components/Collaboration'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'

function App() {
	useEffect(() => {
		// Функция для плавной прокрутки
		const handleSmoothScroll = (e: MouseEvent) => {
			const target = e.target as HTMLElement

			// Проверяем, что это ссылка-якорь
			if (
				target.tagName === 'A' &&
				target.getAttribute('href')?.startsWith('#')
			) {
				e.preventDefault()

				const targetId = target.getAttribute('href')?.substring(1)
				const targetElement = document.getElementById(targetId || '')

				if (targetElement) {
					window.scrollTo({
						top: targetElement.offsetTop,
						behavior: 'smooth',
					})
				}
			}
		}

		// Добавляем обработчик событий для всего документа
		document.addEventListener('click', handleSmoothScroll)

		// Удаляем обработчик при размонтировании компонента
		return () => {
			document.removeEventListener('click', handleSmoothScroll)
		}
	}, [])

	return (
		<div className='app'>
			<Header />
			<main>
				<Hero />
				<Projects />
				<Skills />
				<Collaboration />
				{/*<Contacts />*/}
			</main>
			<Footer />
		</div>
	)
}

export default App
