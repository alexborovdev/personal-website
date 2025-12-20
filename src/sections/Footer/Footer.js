import FooterMarkup from './Footer.html?raw'
import './Footer.scss'

import contacts from '@/entities/contacts'

class FooterSection {
	selectors = {
		root: '[data-js-contacts-section]',
		socialsList: '[data-js-contacts-section-soc1als-list]',
		copyright: '[data-js-contacts-section-copyright]'
	}

	constructor(container) {
		container.insertAdjacentHTML('beforeend', FooterMarkup)

		this.rootElement = container.querySelector(this.selectors.root)
		this.socialsListElement = this.rootElement.querySelector(
			this.selectors.socialsList
		)
		this.copyrightElement = this.rootElement.querySelector(
			this.selectors.copyright
		)

		this.render()
	}

	render() {
		this.renderSocialsList()
		this.renderCopyright()
	}

	renderSocialsList() {
		this.socialsListElement.innerHTML = contacts.socials
			.map(social => this.renderSocialItem(social))
			.join('')
	}

	renderSocialItem(social) {
		const { href, title, label, svg } = social

		return `
			<li class="contacts__extra-soc1als-item">
				<a
					class="contacts__extra-soc1als-link"
					href="${href}"
					target="_blank"
					rel="noopener noreferrer"
					title="${title}"
					aria-label="${label}"
				>
					${svg}
				</a>
			</li>
		`
	}

	renderCopyright() {
		this.copyrightElement.textContent = contacts.copyright
	}
}

export default FooterSection