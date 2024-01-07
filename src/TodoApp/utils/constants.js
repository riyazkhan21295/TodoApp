export const STORAGE_KEY = 'TODO_APP';

export const COLORS = {
	primary: '#008000',
	secondary: '#8fbc8f',
	primaryBg: '#d3d3d3',
};

export const FILTERS = ['all', 'pending', 'completed'];

export const CATEGORIES = [
	'Personal',
	'Work',
	'Grocery',
	'Utilities',
	'Hiking',
	'Other',
];

export const PRIORITIES = ['high', 'medium', 'low'];

export const getPriorityColor = (priority = 'low') => {
	const COLOR_MAPPING = {
		high: '#E2445C',
		medium: '#FDAB3D',
		low: '#7e8491',
	};

	return COLOR_MAPPING[priority];
};
