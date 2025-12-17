import BaseComponent from '@/shared/lib/BaseComponent'
import SettingsMarkup from './SettingsPanel.html?raw'
import './SettingsPanel.scss'

class SettingsPanel extends BaseComponent {
	static #STORAGE_KEY = 'site-settings'

	selectors = {
		settingInputs: '[data-js-setting]',
		metaTheme: 'meta[name="theme-color"]'
	}

	themes = {
		dark: 'dark',
		light: 'light'
	}

	themeColors = {
		dark: '#191820',
		light: '#cfcfcf'
	}

	settings = {
		theme: 'theme',
		tagWaterfall: 'tagWaterfall'
	}

	state = {
		theme: this.themes.dark,
		tagWaterfall: true
	}

	constructor(panelElement, toggleButton) {
		if (!panelElement || !toggleButton) {
			return
		}

		super(panelElement)

		this.rootElement.innerHTML = SettingsMarkup
		this.toggleButtonElement = toggleButton
		this.settingInputElements = this.rootElement.querySelectorAll(
			this.selectors.settingInputs
		)
		this.metaThemeTag = document.querySelector(this.selectors.metaTheme)

		this.state = this.getProxyState(this.getItemsFromLocalStorage())

		this.updateUI()
		this.bindEvents()
	}

	updateUI() {
		const { theme, tagWaterfall } = this.state

		document.documentElement.dataset[this.settings.theme] = theme
		document.documentElement.dataset[this.settings.tagWaterfall] = tagWaterfall
			? 'on'
			: 'off'

		this.settingInputElements.forEach(input => {
			const key = input.dataset.jsSetting

			input.checked =
				key === this.settings.theme
					? theme === this.themes.dark
					: Boolean(this.state[key])
		})

		this.metaThemeTag.setAttribute('content', this.themeColors[theme])
	}

	getItemsFromLocalStorage() {
		try {
			return {
				...this.state,
				...JSON.parse(localStorage.getItem(SettingsPanel.#STORAGE_KEY))
			}
		} catch {
			return { ...this.state }
		}
	}

	saveItemsFromLocalStorage() {
		localStorage.setItem(SettingsPanel.#STORAGE_KEY, JSON.stringify(this.state))
	}

	openSettingsPanel() {
		this.rootElement.removeAttribute('hidden')
		this.rootElement.removeAttribute('inert')
		this.toggleButtonElement.setAttribute('aria-expanded', 'true')
	}

	closeSettingsPanel() {
		this.rootElement.setAttribute('hidden', '')
		this.rootElement.setAttribute('inert', '')
		this.toggleButtonElement.setAttribute('aria-expanded', 'false')
	}

	onDocumentClick = ({ target }) => {
		if (this.rootElement.hasAttribute('hidden')) {
			return
		}

		if (
			this.rootElement.contains(target) ||
			this.toggleButtonElement.contains(target)
		) {
			return
		}

		this.closeSettingsPanel()
	}

	onEscKeyDown = event => {
		if (this.rootElement.hasAttribute('hidden')) {
			return
		}

		if (event.key === 'Escape') this.closeSettingsPanel()
	}

	onSettingsButtonClick = event => {
		event.stopPropagation()

		this.rootElement.hasAttribute('hidden')
			? this.openSettingsPanel()
			: this.closeSettingsPanel()
	}

	onInputChange = ({ target }) => {
		const key = target.dataset.jsSetting

		if (key === this.settings.theme) {
			this.state[key] = target.checked ? this.themes.dark : this.themes.light
		} else {
			this.state[key] = target.checked
		}

		this.saveItemsFromLocalStorage()
	}

	bindEvents() {
		document.addEventListener('click', this.onDocumentClick)
		document.addEventListener('keydown', this.onEscKeyDown)
		this.toggleButtonElement.addEventListener(
			'click',
			this.onSettingsButtonClick
		)
		this.settingInputElements.forEach(input =>
			input.addEventListener('change', this.onInputChange)
		)
	}
}

export default SettingsPanel