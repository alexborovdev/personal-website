class AnimateOnScroll {
	selectors = {
		trigger: '[data-js-observer]',
		animate: '[data-js-animate]'
	}

	stateClasses = {
		isVisible: 'is-visible'
	}

	CSSVars = {
		delay: '--js-animation-delay'
	}

	params = {
		rootMargin: '0px 0px -15% 0px',
		step: 80
	}

	constructor() {
		this.triggers = document.querySelectorAll(this.selectors.trigger)
		this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
			rootMargin: this.params.rootMargin
		})

		this.observeSections()
	}

	observeSections() {
		this.triggers.forEach(trigger => this.observer.observe(trigger))
	}

	handleIntersect(entries) {
		entries.forEach(entry => {
			if (!entry.isIntersecting) {
				return
			}

			this.animateElements(entry.target)
			entry.target.classList.add(this.stateClasses.isVisible)
			this.observer.unobserve(entry.target)
		})
	}

	animateElements(rootElement) {
		const animatedElements = rootElement.querySelectorAll(
			this.selectors.animate
		)

		animatedElements.forEach((animateElement, index) => {
			animateElement.style.setProperty(
				this.CSSVars.delay,
				`${index * this.params.step}ms`
			)
			animateElement.classList.add(this.stateClasses.isVisible)
		})
	}
}

export default AnimateOnScroll