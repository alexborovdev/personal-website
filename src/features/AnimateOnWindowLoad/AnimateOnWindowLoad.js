class AnimateOnWindowLoad {
	selectors = {
		trigger: '[data-js-animate-on-window-load]',
		animate: '[data-js-animate]'
	}

	stateClasses = {
		isVisible: 'is-visible'
	}

	CSSVars = {
		delay: '--js-animation-delay'
	}

	params = {
		step: 350
	}

	constructor() {
		this.triggers = document.querySelectorAll(this.selectors.trigger)
		this.triggers.forEach(element => {
			this.animateElements(element)
		})
	}

	animateElements(rootElement) {
		const animatedElements = rootElement.querySelectorAll(
			this.selectors.animate
		)

		animatedElements.forEach((animatedElement, index) => {
			animatedElement.style.setProperty(
				this.CSSVars.delay,
				`${index * this.params.step}ms`
			)
			animatedElement.classList.add(this.stateClasses.isVisible)
		})

		rootElement.classList.add(this.stateClasses.isVisible)
	}
}

export default AnimateOnWindowLoad