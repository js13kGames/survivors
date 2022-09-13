import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import base from './rollup.config';

const properties = [
	// engine
	'getColorTransform',
	'getMatrix',
	'onCollision',
	'onUpdate',
	'radius',
	'alpha',
	'color',
	'weight',
	'body',
	'sound',
	'impulse',
	'rotation',
	'scale',
	'scaleX',
	'scaleY',
	'enabled',
	'time',
	'children',
	'transparent',
	'onTouchDown',
	'onTouchUp',
	'onTouchMove',
	'onKeyDown',
	'onKeyUp',
	'onClick',
	'getHeight',
	'getWidth',
	'onChange',
	'touchable',
	'pallete',
	'shape',
	'visible',
	'brightness',
	'tint',
	'sizeMax',
	'geometry',
	'animationPaused',
	'playAnimation',
	'transformedMatrix',

	// game
	'animationWalk',
	'addUnit',
	'removeUnit',
	'addBullet',
	'removeBullet',
	'addObject',
	'removeObject',
	'getUnitCount',
	'distance',
	'settings',
	'weapons',
	'weapon',
	'points',
	'_reactionTime',
	'_time',
	'_state',
	'update',
	'reaction',
	'speed',
	'speedX',
	'speedY',
	'actions',
	'transitions',
	'condition',
	'fsm',
	'health',
	'damage',
	'walkSpeed',
	// 'start',
	'target',
	'getNearOpponent',
	'getAction',
	'calculateVolume',
	'camera',
	'setState',
	'frequency',
	'angle',
	'stepX',
	'stepY',
	'static',
	'addImpulse',
	'setActiveWeapon',
	'player',
	'direction',
	'moveJoystick',
	'attackJoystick',
	'attack',
	'gunButton',
	'rifleButton',
	'shotgunButton',
	'units',
	'count',
];

const regex = new RegExp(properties.join('|'));

export default {
	...base,
	plugins: [
		...base.plugins,
		// terser({ mangle: { properties: { builtins: true } } }),
		terser({ mangle: { properties: { builtins: true, regex } } }),
		// terser(),
		filesize(),
		replace({
			'const ': 'let ',
			'const{': 'let{'
		}),
	],
};
