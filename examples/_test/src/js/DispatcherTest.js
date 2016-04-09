// DispatcherTest.js

class DispatcherTest extends alfrid.EventDispatcher {
	constructor() {
		super();

		// this.test();

		// window.setTimeout(()=> this.test(), 1000);
		window.setInterval(()=> this.test(), 1000);
	}


	test() {
		// console.log('test');
		// this.dispatchCustomEvent('test', {x:Math.random()});
		this.trigger('test', {x:Math.random()});
	}
}


export default DispatcherTest;