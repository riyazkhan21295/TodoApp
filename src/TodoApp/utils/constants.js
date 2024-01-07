export const STORAGE_KEY = 'TODO_APP';

export const COLORS = {
	primary: '#007a2e',
	secondary: '#8fbc92',
	gray1: '#f4f6f6',
	gray2: '#f1f3f3',
	gray3: '#c0c3c9',
	gray4: '#7e8491',
	black: '#333333',
	white: '#fefdfa',
};

export const FILTERS = ['all', 'pending', 'completed'];

export const CATEGORIES = [
	'personal',
	'work',
	'grocery',
	'utilities',
	'hiking',
	'other',
];

export const PRIORITIES = ['high', 'medium', 'low'];

const PRIORITIES_COLOR_MAPPING = {
	high: '#E2445C',
	medium: '#FDAB3D',
	low: '#7e8491',
};

export const getPriorityColor = (priority = 'low') => {
	return PRIORITIES_COLOR_MAPPING[priority];
};
