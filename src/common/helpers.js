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
		if (elem !== null) {
			counter++;
		} else {
			result.push(counter);
			counter = 0;
		}
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
