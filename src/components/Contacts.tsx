import { FC } from 'react'
import './Contacts.css'

const Contacts: FC = () => {
	return (
		<section className='contacts' id='contacts'>
			<div className='container contacts__container'>
				<h2 className='contacts__title'>Контакты</h2>
				<div className='contacts__content'>
					<div className='contacts__info'>
						<h3>Давайте обсудим ваш проект</h3>
						<p>Заполните форму или свяжитесь со мной через социальные сети</p>
					</div>
					<form className='contacts__form'>
						<div className='form-group'>
							<input type='text' placeholder='Ваше имя' required />
						</div>
						<div className='form-group'>
							<input type='email' placeholder='Ваш email' required />
						</div>
						<div className='form-group'>
							<textarea placeholder='Ваше сообщение' required></textarea>
						</div>
						<button type='submit' className='contacts__submit'>
							Отправить сообщение
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Contacts
