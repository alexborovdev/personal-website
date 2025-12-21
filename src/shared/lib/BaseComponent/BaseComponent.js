class BaseComponent {
	constructor(rootElement) {
		if (new.target === BaseComponent) {
			throw new Error('BaseComponent cannot be instantiated directly')
		}

		this.rootElement = rootElement
	}

	getProxyState(initialState) {
		return new Proxy(initialState, {
			get: (target, prop) => {
				return target[prop]
			},
			set: (target, prop, newValue) => {
				const oldValue = target[prop]

				target[prop] = newValue

				if (newValue !== oldValue) {
					this.updateUI()
				}

				return true
			}
		})
	}

	updateUI() {
		throw new Error('updateUI() must be implemented in derived component')
	}
}

export default BaseComponent