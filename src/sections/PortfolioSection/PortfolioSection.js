import PortfolioSectionMarkup from './PortfolioSection.html?raw'
import './PortfolioSection.scss'

import projects from '@/entities/projects'

class PortfolioSection {
	selectors = {
		root: '[data-js-portfolio-section]',
		list: '[data-js-portfolio-section-list]'
	}

	constructor(container) {
		container.insertAdjacentHTML('beforeend', PortfolioSectionMarkup)

		this.rootElement = container.querySelector(this.selectors.root)
		this.listElement = this.rootElement.querySelector(this.selectors.list)

		this.render()
	}

	render() {
		this.listElement.innerHTML = projects
			.map(project => this.renderItem(project))
			.join('')
	}

	renderItem(project) {
		const {
			id,
			date,
			dateLabel,
			title,
			github,
			image,
			description,
			technologies
		} = project

		return `
			<li class="section__content-inner tagged tagged-li block accented-pseudo" data-js-animate>
				<div
					class="section__wrapper"
					aria-labelledby="portfolio-${id}-title"
					aria-describedby="portfolio-${id}-desc"
				>
					<div class="section__body">
						<div class="section__body-inner portfolio__body-inner" data-js-animate>
							<a
								class="portfolio__body-link tile tile--hover"
								href="${image.src}"
								target="_blank"
								rel="noopener noreferrer"
								title="Open full size image"
								aria-label="Open full size image"
							>
								<img
									class="portfolio__body-image"
									src="${image.src}"
									alt="${image.alt}"
									width="540"
									height="320"
									loading="lazy"
								/>
							</a>
						</div>
					</div>
					<div class="section__extra tile">
						<div class="section__extra-inner card">
							<time class="card__date" datetime="${date}">
								<span class="accented">${dateLabel}</span>
							</time>
							<h3 class="card__title" id="portfolio-${id}-title">
								<a
									class="card__link"
									href="${github}"
									target="_blank"
									title="GitHub"
									rel="noopener noreferrer"
								>
									${title}
								</a>
							</h3>
							<div class="card__description" id="portfolio-${id}-desc">
								<p>${description}</p>
							</div>
							<div class="card__technologies">
								<h4 class="visually-hidden">
									Technologies used in project
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

export default PortfolioSection