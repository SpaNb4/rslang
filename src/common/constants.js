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

import professor from '../assets/images/professor.png';
import bender from '../assets/images/bender.png';
import fry from '../assets/images/fry.png';
import leela from '../assets/images/leela.png';

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
	BookPage: 'bookPage',
	VocabularyPage: 'vocabularyPage',
	QuizAttempts: 'quizAttempts',
	QuizDate: 'quizDate',
	RemovedPages: 'removed-pages',
	RemovedWordsCount: 'removed-words-count',
};

// Default Values
export const DefaultValues = {
	Group: '0',
	Page: '0',
	WordsPerPage: 20,
	delay: 1000,
	attemptsNumber: 3,
};

export const menu = {
	sections: [
		{
			linkName: 'Раздел 1',
			linkId: '1',
			listName: 'book',
			icon: <FaDiceOne />,
			color: 'ocean-green',
		},
		{
			linkName: 'Раздел 2',
			linkId: '2',
			listName: 'book',
			icon: <FaDiceTwo />,
			color: 'scarlet',
		},
		{
			linkName: 'Раздел 3',
			linkId: '3',
			listName: 'book',
			icon: <FaDiceThree />,
			color: 'secondary',
		},
		{
			linkName: 'Раздел 4',
			linkId: '4',
			listName: 'book',
			icon: <FaDiceFour />,
			color: 'cinnamon',
		},
		{
			linkName: 'Раздел 5',
			linkId: '5',
			listName: 'book',
			icon: <FaDiceFive />,
			color: 'sea-buckthorn',
		},
		{
			linkName: 'Раздел 6',
			linkId: '6',
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
			rules:
				'Повседневная практика показывает, что консультация с широким активом требуют от нас анализа соответствующий условий активизации.',
		},
		{
			linkName: 'Спринт',
			linkId: 'sprint',
			listName: 'game',
			icon: <FaFlagCheckered />,
			color: 'ocean-green',
			rules:
				'Повседневная практика показывает, что консультация с широким активом требуют от нас анализа соответствующий условий активизации.',
		},
		{
			linkName: 'Аудиовызов',
			linkId: 'audiogame',
			listName: 'game',
			icon: <FaHeadset />,
			color: 'cardinal',
			rules:
				'Повседневная практика показывает, что консультация с широким активом требуют от нас анализа соответствующий условий активизации.',
		},
		{
			linkName: 'Конструктор',
			linkId: 'kit',
			listName: 'game',
			icon: <FaIgloo />,
			color: 'secondary',
			rules:
				'Повседневная практика показывает, что консультация с широким активом требуют от нас анализа соответствующий условий активизации.',
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
		src: fry,
		quote:
			'Из-за невероятной лени сначала продумывает функционал, потом только пишет код. Создатель “Спринт” игры, макетов приложения. Обладает генетической аномалией позволяющей организовывать командную работу.',
	},
	{
		name: 'Дима',
		src: leela,
		quote:
			'Отлично пилотирует техническую составляющую приложения. Разработчик "Саванна" и "Аудиовызов" игр, словаря. Питает слабость к работе с бекендом.',
	},
	{
		name: 'Ира',
		src: professor,
		quote: 'Владелец бекенда, основатель учебника, специалист по react, повелитель redux.',
	},
	{
		name: 'Надя',
		src: bender,

		quote: 'Злобный гений дизайна, заядлый разработчик "Конструктор" игры. Злоупотребляет меню и статистикой.',
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

export const questionsData = [
	{
		question: 'правильный перевод',
		key: 'wordTranslate',
	},
	{
		question: '',
		key: 'textMeaningTranslate',
	},
	{
		question: 'правильную транскрипцию',
		key: 'transcription',
	},
];

// Token Expire Time
export const JWT_EXPIRE_TIME = 3.5 * 60 * 60 * 1000;

export const MIN_WORD_COUNT = 5;

// keyboard map
export const evtKeys = {
	enter: 'Enter',
	left: 'ArrowLeft',
	right: 'ArrowRight',
	space: ' ',
};

export const colors = {
	error: '#f00',
	correct: `#fd0`,
};
