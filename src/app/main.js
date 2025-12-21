import AutoTags from '@/features/AutoTags'
import TagWaterfall from '@/features/TagWaterfall'
import ScrollBar from '@/features/ScrollBar'
import AnimateOnWindowLoad from '@/features/AnimateOnWindowLoad'
import AnimateOnScroll from '@/features/AnimateOnScroll'

import '@/styles'

import Header from '@/sections/Header'
import HeroSection from '@/sections/HeroSection'
import SkillsSection from '@/sections/SkillsSection'
import PortfolioSection from '@/sections/PortfolioSection'
import ExperienceSection from '@/sections/ExperienceSection'
import Footer from '@/sections/Footer'

const app = document.querySelector('#app')
app.dataset.jsAppIsStarted = 'false'
const main = document.createElement('main')
app.appendChild(main)

let isAppStarted = false

setTimeout(() => {
	new AnimateOnWindowLoad()
	new TagWaterfall(app)
}, 0)

new Header(app)

new HeroSection(main, {
	onContinue: () => {
		if (isAppStarted) {
			return
		}

		isAppStarted = true
		app.dataset.jsAppIsStarted = 'true'

		setTimeout(() => {
			new ScrollBar(app)
		}, 0)

		new SkillsSection(main)
		new PortfolioSection(main)
		new ExperienceSection(main)
		new Footer(app)

		new AutoTags()
		new AnimateOnScroll()

		document.querySelector('[data-js-skills-section]')?.scrollIntoView({
			behavior: 'smooth'
		})

		setTimeout(() => {
			document.documentElement.style.setProperty(
				'--js-section-scroll-offset',
				'100px'
			)
		}, 0)
	}
})

new AutoTags()