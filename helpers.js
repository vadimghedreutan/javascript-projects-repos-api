export const startLoader = (element) => {
	element.innerHTML = `<svg class="spinner-border text-gray-50 animate-spin inline-block w-5 h-5 border-4 rounded-full" viewBox="0 0 24 24"></svg>`
}

export const stopLoader = (element, value) => {
	element.textContent = value
}
