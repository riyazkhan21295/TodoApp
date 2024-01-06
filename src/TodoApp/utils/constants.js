export const STORAGE_KEY = 'TODO_APP';

export const COLORS = {
	primary: '#008000',
	secondary: '#8fbc8f',
	primaryBg: '#d3d3d3',
};

export const CATEGORIES = [
	'Personal',
	'Work',
	'Grocery',
	'Utilities',
	'Hiking',
	'Other',
];

export const PRIORITIES = ['Important', 'Medium', 'Low'];

export const getPriorityColor = (priority) => {
	switch (priority) {
		case 'Important':
			return 'red';

		case 'Medium':
			return 'orange';

		case 'Low':
		default:
			return '#000';
	}
};

export const getCategoryColor = (category) => {
	switch (category) {
		case 'Personal':
			return 'darkblue';

		case 'Work':
			return 'purple';

		case 'Utilities':
			return 'blue';

		case 'Hiking':
			return 'cyan';

		case 'Other':
		default:
			return 'grey';
	}
};
