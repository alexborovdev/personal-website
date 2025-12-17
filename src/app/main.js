import TagWaterfall from '@/features/TagWaterfall'
import AnimateOnWindowLoad from '@/features/AnimateOnWindowLoad'

import '@/styles'

import Header from '@/sections/Header'

const app = document.querySelector('#app')

setTimeout(() => {
	new AnimateOnWindowLoad()
	new TagWaterfall(app)
}, 0)

new Header(app)