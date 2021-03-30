import React from 'react';
import {
	FaMobileAlt,
	FaDiceOne,
	FaDiceTwo,
	FaDiceThree,
	FaDiceFour,
	FaDiceFive,
	FaDiceSix,
	FaHippo,
	FaHeadset,
	FaFlagCheckered,
	FaIgloo,
	FaTrash,
	FaUnlock,
	FaSkullCrossbones,
} from 'react-icons/fa';

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
	TokenExpireTime: 't-expire',
	RefreshTokenExpireTime: 'rt-expire',
	BookPage: 'bookPage',
	VocabularyPage: 'vocabularyPage',
};

// Default Values
export const DefaultValues = {
	Group: '0',
	Page: '0',
	WordsPerPage: 20,
};

export const menu = {
	sections: [
		{
			linkName: 'Раздел 0',
			linkId: '0',
			listName: 'book',
			icon: <FaDiceOne />,
			color: 'ocean-green',
		},
		{
			linkName: 'Раздел 1',
			linkId: '1',
			listName: 'book',
			icon: <FaDiceTwo />,
			color: 'scarlet',
		},
		{
			linkName: 'Раздел 2',
			linkId: '2',
			listName: 'book',
			icon: <FaDiceThree />,
			color: 'secondary',
		},
		{
			linkName: 'Раздел 3',
			linkId: '3',
			listName: 'book',
			icon: <FaDiceFour />,
			color: 'cinnamon',
		},
		{
			linkName: 'Раздел 4',
			linkId: '4',
			listName: 'book',
			icon: <FaDiceFive />,
			color: 'sea-buckthorn',
		},
		{
			linkName: 'Раздел 5',
			linkId: '5',
			listName: 'book',
			icon: <FaDiceSix />,
			color: 'cardinal',
		},
	],
	dictionary: [
		{
			linkName: 'Изучаемые слова',
			linkId: 'trained',
			listName: 'vocabulary',
			icon: <FaUnlock />,
			color: 'ocean-green',
		},
		{
			linkName: 'Сложные слова',
			linkId: 'hard',
			listName: 'vocabulary',
			icon: <FaSkullCrossbones />,
			color: 'sea-buckthorn',
		},
		{
			linkName: 'Удалённые слова',
			linkId: 'removed',
			listName: 'vocabulary',
			icon: <FaTrash />,
			color: 'scarlet',
		},
	],
	games: [
		{
			linkName: 'Саванна',
			linkId: 'savanna',
			listName: 'game',
			icon: <FaHippo />,
			color: 'cinnamon',
		},
		{
			linkName: 'Спринт',
			linkId: 'sprint',
			listName: 'game',
			icon: <FaFlagCheckered />,
			color: 'ocean-green',
		},
		{
			linkName: 'Аудиовызов',
			linkId: 'audiogame',
			listName: 'game',
			icon: <FaHeadset />,
			color: 'cardinal',
		},
		{
			linkName: 'Конструктор',
			linkId: 'kit',
			listName: 'game',
			icon: <FaIgloo />,
			color: 'secondary',
		},
	],
};

// Dictionary Sections
export const DictionarySections = {
	Hard: 'hard',
	Removed: 'removed',
	Trained: 'trained',
	NotDefined: 'not-defined',
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
	button: 'button',
	visuallyHidden: 'visually-hidden',
};

// Token Expire Time
export const JWT_EXPIRE_TIME = 3.5 * 60 * 60 * 1000;
export const JWT_REFRESH_EXPIRE_TIME = 4 * 60 * 60 * 1000;
