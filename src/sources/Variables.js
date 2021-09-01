export const link = 'https://lc-api.littlecloudeo.com';
export const domainLink = 'https://littlecloudeo.com';
export const appName = 'Littlecloud';

Array.prototype.hasMin = function (attrib) {
	return (
		(this.length &&
			this.reduce(function (prev, curr) {
				return prev[attrib] < curr[attrib] ? prev : curr;
			})) ||
		null
	);
};
