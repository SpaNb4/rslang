import React from 'react';
import {
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
import ship from '../assets/images/ship.png';
import hypnotoad from '../assets/images/hypnotoad.png';
import nibbler from '../assets/images/nibbler.png';
import zoidberg from '../assets/images/zoidberg.png';
import kif from '../assets/images/kif.png';
import zapp from '../assets/images/zapp.png';

// URLs
export const ExternalUrls = {
	Video: 'https://www.youtube.com/embed/DHQngnnHE_0',
	Root: 'https://rslang-app-be.herokuapp.com/',
	Words: 'https://rslang-app-be.herokuapp.com/words',
	Users: 'https://rslang-app-be.herokuapp.com/users',
	SignIn: 'https://rslang-app-be.herokuapp.com/signin',
	Cloudinary: 'https://api.cloudinary.com/v1_1/imisha/image/upload',
};

// LOCAL STORAGE KEYs
export const LocalStorageKeys = {
	User: 'user',
	Avatar: 'avatar',
	TokenExpireTime: 't-expire',
	BookPage: 'bookPage',
	VocabularyPage: 'vocabularyPage',
	VocabularySection: 'vocabularySection',
	QuizAttempts: 'quizAttempts',
	quiz: 'quiz',
	date: 'date',
	RemovedPages: 'removed-pages',
	RemovedWordsCount: 'removed-words-count',
	userStats: 'user-stats',
};

// Default Values
export const DefaultValues = {
	Group: '0',
	Page: '0',
	WordsPerPage: 20,
	delay: 1000,
	attemptsNumber: 3,
	minStatsDataLength: 8,
	totalNumberOfWords: 3600,
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
				'Хорошие новости! У вас есть 5 жизней и ограничено время “жизни” слова: нужно верно угадать, как переводится слово, которое вы увидите на экране. Игра начнётся, как только вы нажмёте на кнопку “OK”.',
		},
		{
			linkName: 'Спринт',
			linkId: 'sprint',
			listName: 'game',
			icon: <FaFlagCheckered />,
			color: 'ocean-green',
			rules:
				'Хорошие новости! У вас есть 60 секунд, чтобы угадать 20 слов. Игра начнётся, как только вы нажмёте на кнопку “OK”.',
		},
		{
			linkName: 'Аудиовызов',
			linkId: 'audiogame',
			listName: 'game',
			icon: <FaHeadset />,
			color: 'cardinal',
			rules:
				'Хорошие новости! Прослушав слово, вам нужно угадать его перевод. Игра начнётся, как только вы нажмёте на кнопку “OK”.',
		},
		{
			linkName: 'Конструктор',
			linkId: 'kit',
			listName: 'game',
			icon: <FaIgloo />,
			color: 'secondary',
			rules:
				'Хорошие новости! Вам нужно составить оригинальное слово по переводу. Игра начнётся, как только вы нажмёте на кнопку “OK”.',
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
		title: 'Игры',
		text:
			'"Саванна", "Спринт", "Аудиовызов" и "Конструктор" помогают запониманию слов, тренеруют память и делают изучения английского языка нескучным.',
		icon: <img src={zapp} alt="zapp" />,
	},
	{
		title: 'Учебник',
		text:
			'Вы можете найти не только перевод слова в учебнике, но и прослушать его произношение. А также ознакомится с объяснением значения изучаемого слова, что позволит вам лучше усвоить информацию.',
		icon: <img src={kif} alt="kif" />,
	},
	{
		title: 'Словарь',
		text:
			'Вы можете создать свой словарь — с удалёнными, изучаемыми и сложными словами! Это позволит вам лучше контролировать процесс изучения слов.',
		icon: <img src={zoidberg} alt="zoidberg" />,
	},
	{
		title: 'Статистика',
		text:
			'Краткосрочная статистика помогает увидеть ваш результат за каждый день, а если вы зарегистрируетесь, то получите возможность отслеживать  долгосрочную статистику за весь период изучения.',
		icon: <img src={nibbler} alt="nibbler" />,
	},
	{
		title: 'Викторина',
		text:
			'Забыли изученные слова? Не переживайте, заходите на страницу "Викторины" и освежайте свои знания. А что бы было интереснее, каждый день у вас будут новые слова!',
		icon: <img src={hypnotoad} alt="hypnotoad" />,
	},
	{
		title: 'Бонус',
		text:
			'Наше приложение  бесплатное и удобное в использовании.  Мы доступны онлайн, поддерживаем вёрстку для ПК и планшета.',
		icon: <img src={ship} alt="ship" />,
	},
];

// Global Classes
export const globalClasses = {
	container: 'container',
	section: 'section',
	sectionTitle: 'section-title',
	pageTitle: 'page-title',
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
	correct: '#fd0',
	ocean: '#3aa76d',
	cardinal: '#ce2029',
};

export const UPLOAD_PRESET = 'gfyjsw4r';

export const ONE_SECONDS_IN_MS = 1000;
