import { FC } from 'react'
import { FaEnvelope, FaGithub, FaTelegram, FaVk } from 'react-icons/fa'
import './Footer.css'

const Footer: FC = () => {
	return (
		<footer className='footer'>
			<div className='container footer__container'>
				<div className='footer__content'>
					<div className='footer__info'>
						<h3>Портфолио фронтенд-разработчика</h3>
						<p>Все права защищены © 2025</p>
					</div>
					<div className='footer__links'>
						<a
							href='mailto:sorakield@gmail.com'
							className='footer__social-link'
						>
							<FaEnvelope />
							<span>Mail</span>
						</a>
						<a
							href='https://t.me/sorakield'
							className='footer__social-link'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaTelegram />
							<span>Telegram</span>
						</a>
						<a
							href='https://vk.com/sorakiel'
							className='footer__social-link'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaVk />
							<span>VK</span>
						</a>
						<a
							href='https://github.com/sorakiel'
							className='footer__social-link'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaGithub />
							<span>GitHub</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
