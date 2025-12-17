class TagWaterfall {
	selectors = {
		root: '[data-js-tag-waterfall]'
	}

	classes = {
		tagWaterfall: 'tag-waterfall',
		tag: 'tag'
	}

	attributes = {
		dataTagWaterfall: 'data-tag-waterfall',
		dataJsTagWaterfall: 'data-js-tag-waterfall'
	}

	MARKUP = `
  <div
    class="${this.classes.tagWaterfall}"
    ${this.attributes.dataJsTagWaterfall}
    aria-hidden="true"
    role="presentation"
  ></div>
`

	intervalDelay = 300

	intervalId = null

	constructor(container) {
		container.insertAdjacentHTML('afterbegin', this.MARKUP)

		this.rootElement = container.querySelector(this.selectors.root)
		this.tags = this.buildTags()

		this.applyDOMState()
		this.initObserver()
	}

	buildTags() {
		const baseTags = [
			'div',
			'span',
			'p',
			'ul',
			'li',
			'img',
			'br',
			'hr',
			'nav',
			'main',
			'form',
			'meta',
			'link',
			'body',
			'html',
			'head'
		]

		const selfClosing = ['img', 'br', 'meta', 'link']

		return baseTags.reduce((acc, tag) => {
			if (selfClosing.includes(tag)) {
				acc.push(`<${tag} />`)
			} else {
				acc.push(`<${tag}>`, `</${tag}>`)
			}
			return acc
		}, [])
	}

	spawnTag() {
		const tag = document.createElement('div')

		tag.className = this.classes.tag
		tag.textContent = this.tags[Math.floor(Math.random() * this.tags.length)]
		tag.setAttribute('aria-hidden', 'true')
		tag.setAttribute('role', 'presentation')
		tag.style.left = Math.random() * window.innerWidth + 'px'

		this.rootElement.appendChild(tag)

		tag.addEventListener('animationend', () => tag.remove())
	}

	initObserver() {
		this.observer = new MutationObserver(this.applyDOMState)

		this.observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: [this.attributes.dataTagWaterfall]
		})
	}

	applyDOMState = () => {
		const isActive = document.documentElement.dataset.tagWaterfall === 'on'

		isActive ? this.startWaterfall() : this.stopWaterfall()
	}

	startWaterfall() {
		if (this.intervalId) {
			return
		}

		this.intervalId = setInterval(() => {
			this.spawnTag()
		}, this.intervalDelay)
	}

	stopWaterfall() {
		if (!this.intervalId) {
			return
		}

		clearInterval(this.intervalId)
		this.intervalId = null
		this.clearRoot()
	}

	clearRoot() {
		this.rootElement.innerHTML = ''
	}
}

export default TagWaterfall