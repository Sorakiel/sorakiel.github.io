import { FC, useEffect, useState } from 'react'
import './Header.css'

const Header: FC = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	// Блокировка/разблокировка прокрутки страницы при открытии/закрытии меню
	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add('menu-open')
		} else {
			document.body.classList.remove('menu-open')
		}

		// Очистка при размонтировании компонента
		return () => {
			document.body.classList.remove('menu-open')
		}
	}, [menuOpen])

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	// Функция для закрытия меню
	const closeMenu = () => {
		setMenuOpen(false)
	}

	return (
		<>
			<header className='header'>
				<div className='container header__container'>
					<a href='/' className='header__logo'>
						Sora
					</a>

					<nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
						<ul className='header__nav-list'>
							<li>
								<a href='#portfolio' onClick={closeMenu}>
									Портфолио
								</a>
							</li>
							<li>
								<a href='#skills' onClick={closeMenu}>
									Навыки
								</a>
							</li>
							<li>
								<a href='#collaboration' onClick={closeMenu}>
									Сотрудничество
								</a>
							</li>
							<li>
								<a href='#contacts' onClick={closeMenu}>
									Контакты
								</a>
							</li>
						</ul>
					</nav>

					{/* Кнопка мобильного меню */}
					<button
						className='header__mobile-toggle'
						onClick={toggleMenu}
						aria-label='Открыть меню'
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
			</header>

			{/* Затемнение фона при открытом меню */}
			<div
				className={`menu-overlay ${menuOpen ? 'menu-overlay--visible' : ''}`}
				onClick={closeMenu}
			></div>
		</>
	)
}

export default Header
