import { it, expect, describe } from "vitest";
const EventBus = require("@innenrinde/event-bus");

let emitter = new EventBus();

describe("events emitter", () => {
	it(`emit one event`, () => {

		let emittedValue = null;

		emitter.on("eventName", (value) => {
			emittedValue = value;
		});
		emitter.emit("eventName", 100);

		expect(emittedValue).toBe(100);
	});

	it(`emit one event with multiple arguments`, () => {

		let emittedValue = null;

		emitter.on("eventName", (value1, value2) => {
			emittedValue = value1 + value2;
		});
		emitter.emit("eventName", 100, 200);

		expect(emittedValue).toBe(300);
	});

	it(`same event, more callbacks`, () => {

		let emittedValue = 0;

		emitter.on("eventName", (value1, value2) => {
			emittedValue = value1 + value2;
		});

		emitter.on("eventName", (value) => {
			emittedValue += value;
		});

		emitter.on("eventName", (value) => {
			emittedValue += value;
		});

		emitter.emit("eventName", 100, 200);

		expect(emittedValue).toBe(500);
	});

	it(`more events, more callbacks for same event`, () => {

		let emittedValue = 0;

		emitter.on("eventName1", (value1, value2) => {
			emittedValue = value1 + value2;
		});

		emitter.on("eventName1", (value) => {
			emittedValue += value;
		});

		emitter.on("eventName2", (value1, value2, value3) => {
			emittedValue += value1 + value2 + value3;
		});

		emitter.emit("eventName1", 100, 200);
		emitter.emit("eventName2", 100, 200, 300);

		expect(emittedValue).toBe(1000);
	});

	it(`same callbacks for more event`, () => {

		let emittedValue = 0;

		emitter.on("eventName1", (value1, value2) => {
			emittedValue += value1 + value2;
		});

		emitter.on("eventName2", (value1, value2, value3) => {
			emittedValue += value1 + value2 + value3;
		});

		emitter.emit(["eventName1", "eventName2"], 100, 200, 300);

		expect(emittedValue).toBe(900);
	});

	it(`stop emitting an event`, () => {

		let emittedValue = 0;

		emitter.on("eventName1", (value1, value2) => {
			emittedValue += value1 + value2;
		});

		emitter.on("eventName2", (value1, value2, value3) => {
			emittedValue += value1 + value2 + value3;
		});

		emitter.off("eventName1");

		emitter.emit(["eventName1", "eventName2"], 100, 200, 300);

		expect(emittedValue).toBe(600);
	});

});