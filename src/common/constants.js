import React from 'react';
import { FaMobileAlt } from 'react-icons/fa';

// URLs
export const ExternalUrls = {
	Video: 'https://www.youtube.com/embed/DHQngnnHE_0',
	Root: 'https://rslang-app-be.herokuapp.com/',
	Words: 'https://rslang-app-be.herokuapp.com/words',
	Users: 'https://rslang-app-be.herokuapp.com/users',
	SignIn: 'https://rslang-app-be.herokuapp.com/signin',
};

// LOCAL STORAGE KEYs
export const LocalStorageKeys = {
	User: 'user',
	Avatar: 'avatar',
};

// Default Values
export const DefaultValues = {
	Group: '0',
	Page: '0',
	WordsPerPage: '20',
};

export const menu = {
	sections: [
		{
			linkName: 'Раздел 0',
			linkId: '0',
			listName: 'book',
		},
		{
			linkName: 'Раздел 1',
			linkId: '1',
			listName: 'book',
		},
		{
			linkName: 'Раздел 2',
			linkId: '2',
			listName: 'book',
		},
		{
			linkName: 'Раздел 3',
			linkId: '3',
			listName: 'book',
		},
		{
			linkName: 'Раздел 4',
			linkId: '4',
			listName: 'book',
		},
		{
			linkName: 'Раздел 5',
			linkId: '5',
			listName: 'book',
		},
	],
	dictionary: [
		{
			linkName: 'Изучаемые слова',
			linkId: '6',
			listName: 'book',
		},
		{
			linkName: 'Сложные слова',
			linkId: '7',
			listName: 'book',
		},
		{
			linkName: 'Удалённые слова',
			linkId: '8',
			listName: 'book',
		},
	],
	games: [
		{
			linkName: 'Саванна',
			linkId: 'savanna',
			listName: 'game',
		},
		{
			linkName: 'Спринт',
			linkId: 'sprint',
			listName: 'game',
		},
		{
			linkName: 'Аудиовызов',
			linkId: 'audiogame',
			listName: 'game',
		},
		{
			linkName: 'Конструктор',
			linkId: 'kit',
			listName: 'game',
		},
	],
};

// Dictionary Sections
export const DictionarySections = {
	Hard: 'hard',
	Removed: 'removed',
	Trained: 'trained',
};

export const ourTeammates = [
	{
		name: 'Алеся',
		src: 'https://images.unsplash.com/photo-1534432586043-ead5b99229fb',
		quote:
			'Are own design entire former get should. Advantages boisterous day excellence. Out between our two waiting wishing',
	},
	{
		name: 'Дима',
		src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987',
		quote:
			'Are own design entire former get should. Advantages boisterous day excellence. Out between our two waiting wishing',
	},
	{
		name: 'Ира',
		src: 'https://images.unsplash.com/photo-1575862202417-c725ea3f899c',
		quote:
			'Are own design entire former get should. Advantages boisterous day excellence. Out between our two waiting wishing',
	},
	{
		name: 'Надя',
		src: 'https://images.unsplash.com/photo-1513245543132-31f507417b26',

		quote:
			'Are own design entire former get should. Advantages boisterous day excellence. Out between our two waiting wishing',
	},
];

export const ourFeatures = [
	{
		title: 'Lorem ipsum',
		text:
			'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
		icon: <FaMobileAlt />,
	},
	{
		title: 'Lorem ipsum',
		text:
			'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
		icon: <FaMobileAlt />,
	},
	{
		title: 'Lorem ipsum',
		text:
			'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
		icon: <FaMobileAlt />,
	},
	{
		title: 'Lorem ipsum',
		text:
			'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
		icon: <FaMobileAlt />,
	},
	{
		title: 'Lorem ipsum',
		text:
			'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
		icon: <FaMobileAlt />,
	},
	{
		title: 'Lorem ipsum',
		text:
			'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
		icon: <FaMobileAlt />,
	},
];

// Global Classes
export const globalClasses = {
	container: 'container',
	section: 'section',
	sectionTitle: 'section-title',
	visuallyHidden: 'visually-hidden',
};
