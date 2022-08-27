import { Point } from "../../geom/point";
import { getPlayerControl } from "../utils/player-control";
import { createUnit, Unit, UnitSettings, UnitType } from "./unit";
import { getWeaponControl } from "../weapons/weapon";
import { World } from "../world";
import { gun, rifle, shotgun } from "../weapons/weapons";

const enum PlayerState {
	ALIVE = 0,
	DEAD = 1,
}

export function createPlayer(world: World): Unit {
	const radius = 30;

	const settings: UnitSettings = {
		type: UnitType.PLAYER,
		radius,
		weight: 90,
		health: 100,
		color: 0xff009999,
		walkSpeed: 200,
		reaction: 0.2,
		weapons: [
			gun(radius),
			rifle(radius),
			shotgun(radius),
		]
	}

	const unit = createUnit(settings);
	const control = getPlayerControl(unit, world);

	const { fsm } = unit;
	const { actions, transitions } = fsm;
	const { walkSpeed } = settings;

	const weaponControl = getWeaponControl(unit, world);

	actions.set(PlayerState.ALIVE, {
		update(time) {
			const currentWalkSpeed = walkSpeed * time;
			unit.x += control.direction.x * currentWalkSpeed;
			unit.y += control.direction.y * currentWalkSpeed;

			unit.rotation = control.rotation;
			unit.weapon = control.weapon;

			weaponControl(time, control.attack);
		},
		start() {
		}
	});

	actions.set(PlayerState.DEAD, {
		update() {
		},
		start() {
			unit.alpha = 0.5;
			unit.body.enabled = false;
		}
	});

	transitions.push({
		from: [],
		to: PlayerState.DEAD,
		condition() {
			return unit.health <= 0;
		}
	});

	fsm.setState(PlayerState.ALIVE);

	return unit;
}