class AutoTags {
	selectors = {
		tagged: "[class*='tagged-']"
	}

	constructor() {
		this.taggedElements = document.querySelectorAll(this.selectors.tagged)

		if (!this.taggedElements.length) {
			return
		}

		this.applyTags()
	}

	applyTags() {
		this.taggedElements.forEach(taggedElement => {
			const classes = [...taggedElement.classList]

			const taggedClass = classes.find(className =>
				className.startsWith('tagged-')
			)

			if (!taggedClass) {
				return
			}

			const classedClass = classes.find(className =>
				className.startsWith('classed-')
			)
			const tagName = taggedClass.replace('tagged-', '')
			const className = classedClass
				? classedClass.replace('classed-', '')
				: null

			this.setCSSVars(taggedElement, tagName, className)
		})
	}

	setCSSVars(taggedElement, tagName, className) {
		const classAttr = className ? ` class=\\"${className}\\"` : ''
		const before = `"<${tagName}${classAttr}>"`
		const after = `"</${tagName}>"`

		taggedElement.style.setProperty('--js-tag-before', before)
		taggedElement.style.setProperty('--js-tag-after', after)
	}
}

export default AutoTags