import githubIcon from '@/assets/icons/socials/github.svg?raw'
import linkedinIcon from '@/assets/icons/socials/linkedin.svg?raw'
import emailIcon from '@/assets/icons/socials/email.svg?raw'
import telegramIcon from '@/assets/icons/socials/telegram.svg?raw'

const contacts = {
	socials: [
		{
			id: 'github',
			title: 'GitHub',
			label: 'GitHub profile',
			href: 'https://github.com/alexborovdev',
			svg: githubIcon
		},
		{
			id: 'linkedin',
			title: 'LinkedIn',
			label: 'LinkedIn profile',
			href: 'https://www.linkedin.com/in/borovytskyi',
			svg: linkedinIcon
		},
		{
			id: 'email',
			title: 'Email',
			label: 'Email contact',
			href: 'mailto:o.borovytskyi@gmail.com',
			svg: emailIcon
		},
		{
			id: 'telegram',
			title: 'Telegram',
			label: 'Telegram contact',
			href: 'https://t.me/borovytskyi',
			svg: telegramIcon
		}
	],
	copyright: '© Powered and Designed by Alex Borov, 2025'
}

export default contacts