export function playSound(soundSrc) {
	const sound = new Audio(soundSrc);
	sound.play();
}
