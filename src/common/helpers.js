import { ExternalUrls } from './constants';

export function buildUrl(...args) {
	return args.join('');
}

export function handleVolumeUp(wordData) {
	const { audio, audioMeaning, audioExample } = wordData;
	const urlsList = [audio, audioMeaning, audioExample];
	const audioList = urlsList.map((url) => new Audio(buildUrl(ExternalUrls.Root, url)));

	audioList[0].play();
	audioList[0].onended = () => {
		audioList[1].play();
		audioList[1].onended = () => {
			audioList[2].play();
		};
	};
}
