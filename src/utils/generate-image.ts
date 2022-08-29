import { formatColor } from "../graphics/pattern";
import { domDocument } from "./browser";
import { math2PI, mathRandom } from "./math";

export const CONTEXT_SIZE = 0;
export const CONTEXT_FILL = 1;
export const CONTEXT_RECTANGLE = 2;
export const CONTEXT_ELLIPSE = 3;
export const CONTEXT_LINE = 4;
export const CONTEXT_REPEAT = 5;
export const CONTEXT_NOISE = 6;

export interface Command {
	type: number,
	x?: number,
	y?: number,
	width?: number;
	height?: number;
	color?: number;
	stepX?: number;
	stepY?: number;
	count?: number;
	cols?: number;
	colorOffset?: number;
}

type CommandMethod = (command: Command, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, last: Command) => void;

const methods: { [key: number]: CommandMethod } = {
	[CONTEXT_SIZE]: (command, canvas, context) => {
		const fillStyle = context.fillStyle;
		canvas.width = command.width!;
		canvas.height = command.height!;
		context.fillStyle = fillStyle;
		context.fillRect(0, 0, canvas.width, canvas.height);
	},

	[CONTEXT_FILL]: (command, canvas, context) => {
		context.fillStyle = formatColor(command.color!);
	},

	[CONTEXT_RECTANGLE]: (command, canvas, context) => {
		context.fillRect(command.x!, command.y!, command.width!, command.height!);
	},

	[CONTEXT_ELLIPSE]: (command, canvas, context) => {
		const radiusX = command.width! / 2;
		const radiusY = command.height! / 2;
		context.beginPath();
		context.ellipse(command.x! + radiusX, command.y! + radiusY, radiusX, radiusY, 0, 0, math2PI);
		context.closePath();
		context.fill();
	},

	[CONTEXT_REPEAT]: (command, canvas, context, last) => {
		const method = methods[last.type]!;
		const startX = last.x!;
		const stepX = command.stepX!;
		const stepY = command.stepY!;
		const cols = command.cols!;
		let count = command.count!;
		let c = 1;
		last.x! += stepX;
		while (count--) {
			method(last, canvas, context, last);
			last.x! += stepX;
			c++;
			if (c === cols) {
				c = 0;
				last.x! = startX;
				last.y! += stepY;
			}
		}
	},

	[CONTEXT_NOISE]: (command, canvas, context) => {
		const offset = command.colorOffset!;
		const offset2 = offset / 2;
		const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;
		let i = 0;
		while (i < data.length) {
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			data[i] = r - offset2 + offset * mathRandom();
			data[i + 1] = g - offset2 + offset * mathRandom();
			data[i + 2] = b - offset2 + offset * mathRandom();
			i += 4;
		}
		context.putImageData(imageData, 0, 0);
	},
};

export function generateImage(commands: Command[]) {
	const canvas = domDocument.createElement('canvas');
	const context = canvas.getContext('2d')!;
	let last: Command;
	commands.forEach(command => {
		const method = methods[command.type]!;
		method(command, canvas, context, last);
		last = command;
	});
	return canvas;
}