export function executeGenerator(generator, state) {
	let dispatches = [];
	if (!state) {
		state = {}
	}
	let value = doExecuteGenerator(generator, state, dispatches);
	return { dispatches, value };
}

function doExecuteGenerator(generator, state, dispatches) {
	let next = generator;
	let currentValue = null;

	while (!next.done) {
		next = generator.next(currentValue);
		if (next.value && next.value.CALL) {
			if (isGeneratorFunction(next.value.CALL.fn)) {
				let subGenerator = next.value.CALL.fn(...next.value.CALL.args);
				currentValue = doExecuteGenerator(subGenerator, state, dispatches);
			} else {
				currentValue = next.value.CALL.fn(...next.value.CALL.args);
			}
		} else if (next.value && next.value.PUT) {
			dispatches.push(next.value.PUT.action);
			currentValue = null;
		} else if (next.value && next.value.SELECT) {
			//console.log('>> select');
			//console.log('>> select - state = ', state);
			currentValue = state;
			//console.log('>> select - currentValue = ', currentValue);
		} else {
			currentValue = next.value;
		}
	}

	return currentValue;
}

function isGeneratorFunction(fn) {
    return fn.constructor.name === 'GeneratorFunction';
}