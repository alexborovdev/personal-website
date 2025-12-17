import TagWaterfall from '@/features/TagWaterfall'
import AnimateOnWindowLoad from '@/features/AnimateOnWindowLoad'
import AnimateOnScroll from '@/features/AnimateOnScroll'

import '@/styles'

import Header from '@/sections/Header'

const app = document.querySelector('#app')

setTimeout(() => {
	new AnimateOnWindowLoad()
	new TagWaterfall(app)
}, 0)

new Header(app)

new AnimateOnScroll()