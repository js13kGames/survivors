import { Component } from "../../graphics/component";
import { Command, CommandType, generateImage } from "../../utils/generate-image";
import { mathHypot } from "../../utils/math";
import { createCube } from "../../render/cube";

const texture: Command[] = [
	{ type: CommandType.FILL, color: 0xff666666 },// 5
	{ type: CommandType.SIZE, width: 512, height: 512 }, // 5
	{ type: CommandType.FILL, color: 0xff778877 }, // 5
	{ type: CommandType.RECTANGLE, x: 20, y: 20, width: 50, height: 50 }, // 5
	{ type: CommandType.REPEAT, stepX: 70, stepY: 70, count: 48, cols: 7, }, // 5 
	{ type: CommandType.FILL, color: 0xff666666 }, // 5
	{ type: CommandType.RECTANGLE, x: 140, y: 140, width: 220, height: 220 }, // 5
	{ type: CommandType.FILL, color: 0xff778877 }, // 5
	{ type: CommandType.ELLIPSE, x: 160, y: 160, width: 190, height: 190 }, // 5
	{ type: CommandType.NOISE, colorOffset: 20 }, // 2
];

export function createGround(): Component {
	const size = 512;
	const image = generateImage(texture);
	const geometry = createCube(size / 2, size / 2, 0.1);
	const item: Component = { image, geometry, x: -size / 2, y: -size / 2 };
	const radius = mathHypot(size) / 2;
	const children: Component[] = [];
	for (let x = 0; x < 10; x++) {
		for (let y = 0; y < 10; y++) {
			children.push({
				x: (x - 5) * (size - 1),
				y: (y - 5) * (size - 1),
				z: 0,
				radius,
				children: [item]
			});
		}
	}
	return { children };
}

export function generateGroundImage(): HTMLCanvasElement {
	return generateImage(texture);
}