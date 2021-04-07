import { buildUrl, getStreak } from './../common/helpers';

test('url concat', () => {
	expect(buildUrl('https://', 'rs', '.', 'school', '/')).toBe('https://rs.school/');
	expect(buildUrl('https://', 'app', '.', 'rs', '.', 'school', '/')).toBe('https://app.rs.school/');
});

test('max streak', () => {
	expect(getStreak([0, 1, 2, 3, null])).toBe(4);
	expect(getStreak([null, null, 2, 3, null])).toBe(2);
	expect(getStreak([0, 1, null, 3, null])).toBe(2);
	expect(getStreak([null, 1, null, 3, null])).toBe(1);
});
