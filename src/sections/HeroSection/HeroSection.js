import HeroSectionMarkup from './HeroSection.html?raw'
import './HeroSection.scss'

import about from '@/entities/about'

class HeroSection {
	selectors = {
		root: '[data-js-hero-section]',
		button: '[data-js-hero-section-button]',
		description: '[data-js-hero-section-description]'
	}

	constructor(container, { onContinue } = {}) {
		container.insertAdjacentHTML('beforeend', HeroSectionMarkup)

		this.onContinue = onContinue
		this.rootElement = container.querySelector(this.selectors.root)
		this.buttonElement = this.rootElement.querySelector(this.selectors.button)
		this.descriptionElement = this.rootElement.querySelector(
			this.selectors.description
		)

		this.render()
		this.bindEvents()
	}

	render() {
		this.renderDescription()
	}

	renderDescription() {
		this.descriptionElement.innerHTML = about.description
			.map(
				text => `
					<p class="hero__extra-description tagged tagged-p block accented-pseudo">
						<span>${text}</span>
					</p>
				`
			)
			.join('')
	}

	onButtonClick = () => {
		if (!this.onContinue) {
			return
		}

		this.buttonElement.disabled = true
		this.onContinue()
		this.onContinue = null
	}

	bindEvents() {
		this.buttonElement.addEventListener('click', this.onButtonClick)
	}
}

export default HeroSection