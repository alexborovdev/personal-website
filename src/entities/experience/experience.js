import htmlIcon from '@/assets/icons/technologies/html.svg'
import cssIcon from '@/assets/icons/technologies/css.svg'
import scssIcon from '@/assets/icons/technologies/scss.svg'
import jsIcon from '@/assets/icons/technologies/javascript.svg'
import viteIcon from '@/assets/icons/technologies/vite.svg'
import figmaIcon from '@/assets/icons/technologies/figma.svg'

const experience = [
	{
		id: 'freelance',
		period: {
			datetime: '2025-10',
			label: 'October 2025 - Present',
			aria: 'Work period: October 2025 to Present'
		},
		company: 'Freelance',
		position: 'Web Developer',
		description: `
      Website development. Fixing layout bugs. Writing simple scripts.
    `,
		technologies: [
			{ name: 'HTML', icon: htmlIcon },
			{ name: 'CSS', icon: cssIcon },
			{ name: 'SCSS', icon: scssIcon },
			{ name: 'JavaScript', icon: jsIcon },
			{ name: 'Vite', icon: viteIcon },
			{ name: 'Figma', icon: figmaIcon }
		]
	}
]

export default experience