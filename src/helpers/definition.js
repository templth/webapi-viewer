export const hasSchemaRef = (schema) => {
	if (isArrayProperty(schema)) {
		return (schema && schema.items && schema.items.$ref);
	} else {
		return (schema && schema.$ref);
	}
};

export const getSchemaName = (schema) => {
	if (isArrayProperty(schema)) {
		return schema.items.$ref.replace('#/definitions/', '');
	} else {
		return schema.$ref.replace('#/definitions/', '');
	}
};

export const isCompositeProperty = (property) => {
	if (isArrayProperty(property)) {
		return hasSchemaRef(property.items) ? true : false;
	} else {
		return hasSchemaRef(property) ? true : false;
	}
};

export const isArrayProperty = (property) => {
	return (property && property.type && property.type === 'array') ? true : false;
};

export const isSimpleProperty = (property) => {
	return (property && property.type && property.type !== 'array') ? true : false;
};

export const getPropertyType = (property) => {
	if (isArrayProperty(property)) {
		return property.items.type ?
			property.items.type : getSchemaName(property.items);
	} else {
		return property.type ?
			property.type : getSchemaName(property);
	}
};