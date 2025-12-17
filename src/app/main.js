import AutoTags from '@/features/AutoTags'
import TagWaterfall from '@/features/TagWaterfall'
import AnimateOnWindowLoad from '@/features/AnimateOnWindowLoad'
import AnimateOnScroll from '@/features/AnimateOnScroll'

import '@/styles'

import Header from '@/sections/Header'
import HeroSection from '@/sections/HeroSection'

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

		new AutoTags()
		new AnimateOnScroll()
	}
})

new AutoTags()