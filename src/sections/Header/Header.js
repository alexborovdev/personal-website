import HeaderMarkup from './Header.html?raw'
import './Header.scss'

import headerData from '@/entities/header'
import SettingsPanel from '@/features/SettingsPanel'

class Header {
	selectors = {
		root: '[data-js-header]',
		logo: '[data-js-header-logo]',
		navigationList: '[data-js-header-navigation]',
		settingsButton: '[data-js-header-settings-button]',
		settingsPanel: '[data-js-header-settings-panel]'
	}

	constructor(container) {
		container.insertAdjacentHTML('afterbegin', HeaderMarkup)

		this.rootElement = container.querySelector(this.selectors.root)
		this.logoElement = this.rootElement.querySelector(this.selectors.logo)
		this.navigationListElement = this.rootElement.querySelector(
			this.selectors.navigationList
		)
		this.settingsButtonElement = this.rootElement.querySelector(
			this.selectors.settingsButton
		)
		this.settingsPanelElement = this.rootElement.querySelector(
			this.selectors.settingsPanel
		)

		new SettingsPanel(this.settingsPanelElement, this.settingsButtonElement)

		this.render()
	}

	render() {
		this.renderLogo()
		this.renderNavigationList()
		this.renderSettingsIcon()
	}

	renderLogo() {
		const {
			logo: { svg, href, title, label }
		} = headerData

		this.logoElement.innerHTML = svg
		this.logoElement.href = href
		this.logoElement.title = title
		this.logoElement.setAttribute('aria-label', label)
	}

	renderNavigationList() {
		const { navigation } = headerData

		this.navigationListElement.innerHTML = navigation
			.map(item => this.renderNavigationItem(item))
			.join('')
	}

	renderNavigationItem({ href, title, label }) {
		return `
			<li class="header__navigation-item">
				<a
					class="header__navigation-link"
					href="${href}"
					title="${title}"
					aria-label="${title}"
				>
					${label}
				</a>
			</li>
		`
	}

	renderSettingsIcon() {
		this.settingsButtonElement.innerHTML = headerData.settingsIcon
	}
}

export default Header