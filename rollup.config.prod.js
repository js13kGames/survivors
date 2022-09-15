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
	'vertecies',
	'normals',

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
			'const{': 'let{',

			'a_position': 'a',
			'a_normal': 'b',
			'a_texCoord': 'c',
			'u_world': 'd',
			'u_object': 'e',
			'u_worldViewProjection': 'f',
			'u_worldInverseTranspose': 'g',
			't_position': 'h',
			't_normal': 'i',
			'surfaceWorldPosition': 'j',

			'v_surfaceToLight': 'k',
			'surfaceToLightDirection': 'l',
			'v_normal': 'm',
			'v_texCoord': 'n',
			'u_color': 'o',
			'u_image': 'p',
			'lightValue': 'r',
		}),
	],
};
