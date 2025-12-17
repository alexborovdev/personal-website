import SkillsSectionMarkup from './SkillsSection.html?raw'
import './SkillsSection.scss'

import skills from '@/entities/skills'

class SkillsSection {
	selectors = {
		root: '[data-js-skills-section]',
		hardSkillsList: '[data-js-skills-section-hard-skills]',
		softSkillsList: '[data-js-skills-section-soft-skills]'
	}

	constructor(container) {
		container.insertAdjacentHTML('beforeend', SkillsSectionMarkup)

		this.rootElement = container.querySelector(this.selectors.root)
		this.hardSkillsListElement = this.rootElement.querySelector(
			this.selectors.hardSkillsList
		)
		this.softSkillsListElement = this.rootElement.querySelector(
			this.selectors.softSkillsList
		)

		this.render()
	}

	render() {
		const { hard, soft } = skills

		this.renderList(this.hardSkillsListElement, hard)
		this.renderList(this.softSkillsListElement, soft)
	}

	renderList(listElement, skills) {
		if (!listElement || !skills?.length) {
			return
		}

		listElement.innerHTML = skills.map(skill => this.renderItem(skill)).join('')
	}

	renderItem(text) {
		return `
			<li class="skills__item tagged tagged-li accented-pseudo" data-js-animate>
				${text}
			</li>
		`
	}
}

export default SkillsSection