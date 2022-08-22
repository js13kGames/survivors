import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import base from './rollup.config';

const properties = [
	// 'getColorTransform',
	// 'getMatrix',
	// 'concat',
	// 'empty',
	// 'onUpdate',
	// 'scale',
	// 'scaleX',
	// 'scaleY',
	// 'rotation',
	// 'pallete',
	// 'children',
	// 'shape',
	// 'alpha',
	// 'color',
	// // 'value',
	// 'tint',
	// 'brightness',
	// 'render',
	// 'update',
	// 'getWidth',
	// 'getHeight',
	// 'damageRadius',
	// 'transformPoint',
	// 'speedMax',
	// 'fireTimeout',
	// 'bulletSpeed',
	// 'bulletLength',
	// 'bulletDamage',
	// 'rocketSpeed',
	// 'rocketAcceleration',
	// 'rocketDamage',
	// 'rocketReload',
	// 'guns',
	// 'currentGun',
	// 'parallax',
	// 'stars',
	// 'radius',
	// 'camera',
	// 'connector',
	// 'healthEffect',
	// 'mainFireTime',
	// 'shootRocket',
	// 'damage',
	// 'changeHealth',
	// 'health',
	// 'findTarget',
	// 'getShips',
	// 'easyColor',
	// 'acceleration',
	// 'speed',
	// 'distance',
	// 'size',
	// 'lengthSquared',
	// 'formatColor',
	// 'transformColor',
	// 'getBullets',
	// 'getGame',
	// 'calculateVolume',
	// 'getParticles',
	// 'destroy',
	// 'getScale',
	// 'onScreen',
	// 'shakingTime',
	// 'targetTime',
	// 'reactionTime',
	// 'mainFire',
];

const regex = new RegExp(`${properties.join('|')}`);

export default {
	...base,
	plugins: [
		...base.plugins,
		// terser({ mangle: { properties: { builtins: true, regex } } }),
		terser(),
		filesize(),
	],
};