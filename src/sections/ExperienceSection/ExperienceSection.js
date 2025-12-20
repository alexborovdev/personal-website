import ExperienceSectionMarkup from './ExperienceSection.html?raw'
import './ExperienceSection.scss'

import experience from '@/entities/experience'

class ExperienceSection {
	selectors = {
		root: '[data-js-experience-section]',
		list: '[data-js-experience-section-list]'
	}

	constructor(container) {
		container.insertAdjacentHTML('beforeend', ExperienceSectionMarkup)

		this.rootElement = container.querySelector(this.selectors.root)
		this.listElement = this.rootElement.querySelector(this.selectors.list)

		this.render()
	}

	render() {
		this.listElement.innerHTML = experience
			.map(item => this.renderWorkItem(item))
			.join('')
	}

	renderWorkItem(item) {
		const { id, period, company, position, description, technologies } = item

		return `
			<li class="section__content-inner tagged tagged-li block accented-pseudo" data-js-animate>
				<div
					class="section__wrapper section__wrapper--solo"
					aria-labelledby="experience-${id}-title"
					aria-describedby="experience-${id}-desc"
				>
					<div class="section__extra tile">
						<div class="section__extra-inner experience__extra-inner card">
							<time
								class="card__date"
								datetime="${period.datetime}"
								aria-label="${period.aria}"
							>
								<span class="accented">${period.label}</span>
							</time>
							<h3 class="card__title" id="experience-${id}-title">
								${company}
							</h3>
							<p class="card__position">
								<span class="accented">${position}</span>
							</p>
							<div
								class="card__description experience__extra-description"
								id="experience-${id}-desc"
							>
								<p>${description}</p>
							</div>
							<div class="card__technologies">
								<h4 class="visually-hidden">
									Technologies stack used on this work
								</h4>
								<ul class="card__technologies-list" data-js-animate>
									${technologies
										.map(
											tech => `
												<li class="card__technologies-item">
													<img
														class="card__technologies-image"
														src="${tech.icon}"
														alt="${tech.name}"
														title="${tech.name}"
														width="32"
														height="32"
														loading="lazy"
													/>
												</li>
											`
										)
										.join('')}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</li>
		`
	}
}

export default ExperienceSection