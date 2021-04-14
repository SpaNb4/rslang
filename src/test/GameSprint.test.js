import { streakToShips, streakToHeroes } from '../components/Games/GameSprint/GameSprint';

// for streakToShips function
it('user can not see  ship if streak = 0', () => {
	const streak = 0;
	expect(streakToShips(streak)).toBe(0);
});

it('user can see only one  ship if streak = 1', () => {
	const streak = 1;
	expect(streakToShips(streak)).toEqual(1);
});

it('user can see two ships if streak = 2', () => {
	const streak = 2;
	expect(streakToShips(streak)).toEqual(2);
});

it('user can see three ships if streak = 3', () => {
	const streak = 3;
	expect(streakToShips(streak)).toEqual(3);
});

it('user can not see  ship if streak = 4', () => {
	const streak = 4;
	expect(streakToShips(streak)).toEqual(0);
});

it('user can see  one ship if streak = 5', () => {
	const streak = 5;
	expect(streakToShips(streak)).toEqual(1);
});

// for streakToHeroes function
it('user can not see hero if streak = 0', () => {
	const streak = 0;
	expect(streakToHeroes(streak)).toBe(0);
});

it('user can not see hero if streak = 3', () => {
	const streak = 3;
	expect(streakToHeroes(streak)).toEqual(0);
});

it('user can see one hero if streak = 4', () => {
	const streak = 4;
	expect(streakToHeroes(streak)).toEqual(1);
});

it('user can see two heroes if streak = 8', () => {
	const streak = 8;
	expect(streakToHeroes(streak)).toEqual(2);
});

it('user can see three heroes if streak = 12', () => {
	const streak = 12;
	expect(streakToHeroes(streak)).toEqual(3);
});

it('user can see three heroes if streak = 16', () => {
	const streak = 16;
	expect(streakToHeroes(streak)).not.toBe(4);
});

it('user can see three heroes if streak = 20', () => {
	const streak = 20;
	expect(streakToHeroes(streak)).toEqual(3);
});
