import logoSvg from '@/assets/icons/logo.svg?raw'
import settingsSvg from '@/assets/icons/gear.svg?raw'

const header = {
	logo: {
		href: '#',
		title: 'Scroll to top',
		label: 'Scroll to top',
		svg: logoSvg
	},

	navigation: [
		{
			id: 'hero',
			label: 'About',
			href: '#hero',
			title: 'Scroll to About section'
		},
		{
			id: 'skills',
			label: 'Skills',
			href: '#skills',
			title: 'Scroll to Skills section'
		},
		{
			id: 'portfolio',
			label: 'Portfolio',
			href: '#portfolio',
			title: 'Scroll to Portfolio section'
		},
		{
			id: 'experience',
			label: 'Experience',
			href: '#experience',
			title: 'Scroll to Experience section'
		},
		{
			id: 'contacts',
			label: 'Contacts',
			href: '#contacts',
			title: 'Scroll to Contacts section'
		}
	],

	settingsIcon: settingsSvg
}

export default header