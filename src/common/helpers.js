import { ExternalUrls, LocalStorageKeys, DefaultValues } from './constants';
import * as _ from 'lodash';

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
