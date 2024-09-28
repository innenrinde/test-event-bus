const EventBus = require("@innenrinde/event-bus");

let emitter = new EventBus();

let emittedValue = null;

// catch value
emitter.on("eventName1", (value) => {
	emittedValue = value;
});

// catch sum of values
emitter.on("eventName2", (value1, value2) => {
	emittedValue = value1 + value2;
});

// emit one single value
emitter.emit("eventName1", 100);
console.log(emittedValue);

// emit two values to catch their sum
emitter.emit("eventName2", 100, 200);
console.log(emittedValue);