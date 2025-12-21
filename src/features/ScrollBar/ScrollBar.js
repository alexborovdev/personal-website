import ScrollBarMarkup from './ScrollBar.html?raw'
import './ScrollBar.scss'

class ScrollBar {
	selectors = {
		root: '[data-js-scroll-bar]',
		dot: '[data-js-scroll-bar-dot]'
	}

	stateClasses = {
		isActive: 'is-active'
	}

	observers = {
		section: '[data-js-observer]'
	}

	constructor(container) {
		container.insertAdjacentHTML('afterbegin', ScrollBarMarkup)

		this.sections = container.querySelectorAll(this.observers.section)
		this.rootElement = container.querySelector(this.selectors.root)
		this.dotElements = this.rootElement.querySelectorAll(this.selectors.dot)

		this.observeSections()
		this.bindEvents()
	}

	observeSections() {
		const sections = [...this.sections]

		this.observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (!entry.isIntersecting) {
						return
					}

					const index = sections.indexOf(entry.target)

					if (index === -1) {
						return
					}

					this.setActiveDot(index)
				})
			},
			{
				threshold: 0.6
			}
		)

		sections.forEach(section => this.observer.observe(section))
	}

	setActiveDot(index) {
		this.dotElements.forEach((dotElement, i) => {
			dotElement.classList.remove(this.stateClasses.isActive)
			dotElement.removeAttribute('aria-current')

			if (i === index) {
				dotElement.classList.add(this.stateClasses.isActive)
				dotElement.setAttribute('aria-current', 'true')
			}
		})
	}

	bindEvents() {
		this.dotElements.forEach((dot, index) => {
			dot.addEventListener('click', () => {
				this.sections[index].scrollIntoView({
					behavior: 'smooth'
				})
			})
		})
	}
}

export default ScrollBar