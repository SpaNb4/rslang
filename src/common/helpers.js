import { ExternalUrls, LocalStorageKeys, DefaultValues } from './constants';
import * as _ from 'lodash';
import store from './../store/store';
import correctSound from '../assets/audio/correct.wav';
import wrongSound from '../assets/audio/wrong.wav';
import charSound from '../assets/audio/char.wav';

export function buildUrl(...args) {
	return args.join('');
}

export function handleVolume(wordData, setIsCurrentlyPlaying) {
	const { audio, audioMeaning, audioExample } = wordData;
	const urlList = [audio, audioMeaning, audioExample];
	const audioList = urlList.map((url) => new Audio(buildUrl(ExternalUrls.Root, url)));
	setIsCurrentlyPlaying(true);
	audioList[audioList.length - 1].onended = () => {
		setIsCurrentlyPlaying(false);
	};
	for (let i = 0; i < audioList.length - 1; i += 1) {
		audioList[i].onended = () => {
			audioList[i + 1].play();
		};
	}
	_.first(audioList).play();
}

export function updateAttempts() {
	localStorage.setItem(LocalStorageKeys.QuizAttempts, DefaultValues.attemptsNumber);
}

export function getStreak(array) {
	const result = [];
	let counter = 0;

	array.forEach((elem) => {
		elem !== null ? counter++ : (counter = 0);
		result.push(counter);
	});

	return _.max(result);
}

export function playSound(soundSrc) {
	const sound = new Audio(soundSrc);
	const isMuted = !store.getState().game.volume;
	sound.muted = isMuted;
	sound.play();
}

export function playWrong() {
	const sound = new Audio(wrongSound);
	const isMuted = !store.getState().game.volume;
	sound.muted = isMuted;
	sound.play();
}

export function playCorrect() {
	const sound = new Audio(correctSound);
	const isMuted = !store.getState().game.volume;
	sound.muted = isMuted;
	sound.play();
}

export function playChar() {
	const sound = new Audio(charSound);
	const isMuted = !store.getState().game.volume;
	sound.muted = isMuted;
	sound.play();
}

export function createChartData(objArr) {
	if (objArr.length && objArr.length < DefaultValues.minStatsDataLength) {
		const firstDay = new Date(objArr[0].day);

		const arr = new Array(DefaultValues.minStatsDataLength).fill(0).map((_, index) => {
			var nextDay = new Date(firstDay);
			nextDay.setDate(firstDay.getDate() + index);
			return nextDay.toISOString().slice(5, 10);
		});

		return arr.map((elem, index) =>
			objArr[index] ? { x: elem, y: objArr[index].learnedWords } : { x: elem, y: 0 }
		);
	} else {
		return objArr.map((elem) => ({ x: elem.day.slice(5, 10), y: elem.learnedWords }));
	}
}

export function updateData(prev, curr) {
	const index = _.findIndex(prev, { name: curr.name });

	if (index >= 0) {
		prev[index].correct += curr.correct;
		prev[index].wrong += curr.wrong;
		prev[index].streak = _.max([prev[index].streak, curr.streak]);
		prev[index].words = _.uniq([...prev[index].words, ...curr.words]);
	} else {
		prev.push(curr);
	}

	return prev;
}

export function getCurrentDate() {
	return new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
}
