import { FC } from 'react'
import './Hero.css'

const Hero: FC = () => {
	return (
		<section className='hero' id='hero'>
			<div className='container hero__container'>
				<div className='hero__content'>
					<h1 className='hero__title'>
						Привет, я Никита - Frontend разработчик
					</h1>
					<p className='hero__description'>
						Разрабатываю различные веб-приложения, учитывая все пожелания
						клиента
					</p>
					<a href='#portfolio' className='hero__cta'>
						Перейти к портфолио
					</a>
				</div>
			</div>
		</section>
	)
}

export default Hero
