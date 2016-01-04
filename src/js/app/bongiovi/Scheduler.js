if(window.requestAnimFrame === undefined) {
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
  })();
}


class Scheduler {
  constructor(){
    this.FRAMERATE = 60;
    this._delayTasks = [];
    this._nextTasks = [];
    this._deferTasks = [];
    this._highTasks = [];
    this._usurpTask = [];
    this._enterframeTasks = [];
    this._idTable = 0;

    window.requestAnimFrame( this._loop.bind(this) );
  }
  _loop(){
    window.requestAnimFrame( this._loop.bind(this) );
    this._process();
  }
  _process(){
    let i = 0, task, interval, current;
    for ( i=0; i<this._enterframeTasks.length; i++) {
      task = this._enterframeTasks[i];
      if(task !== null && task !== undefined) {
        task.func.apply(task.scope, task.params);
      }
    }
    
    while ( this._highTasks.length > 0) {
      task = this._highTasks.pop();
      task.func.apply(task.scope, task.params);
    }
    

    let startTime = new Date().getTime();

    for ( i=0; i<this._delayTasks.length; i++) {
      task = this._delayTasks[i];
      if(startTime-task.time > task.delay) {
        task.func.apply(task.scope, task.params);
        this._delayTasks.splice(i, 1);
      }
    }

    startTime = new Date().getTime();
    interval = 1000 / this.FRAMERATE;
    while(this._deferTasks.length > 0) {
      task = this._deferTasks.shift();
      current = new Date().getTime();
      if(current - startTime < interval ) {
        task.func.apply(task.scope, task.params);
      } else {
        this._deferTasks.unshift(task);
        break;
      }
    }


    startTime = new Date().getTime();
    interval = 1000 / this.FRAMERATE;
    while(this._usurpTask.length > 0) {
      task = this._usurpTask.shift();
      current = new Date().getTime();
      if(current - startTime < interval ) {
        task.func.apply(task.scope, task.params);
      } else {
        // this._usurpTask.unshift(task);
        break;
      }
    }



    this._highTasks = this._highTasks.concat(this._nextTasks);
    this._nextTasks = [];
    this._usurpTask = [];
  }
  addEF(scope, func, params){
    params = params || [];
    let id = this._idTable;
    this._enterframeTasks[id] = {scope:scope, func:func, params:params};
    this._idTable ++;
    return id;
  }
  removeEF(id){
    if(this._enterframeTasks[id] !== undefined) {
      this._enterframeTasks[id] = null;
    }
    return -1;
  }
  delay(scope, func, params, delay) {
    let time = new Date().getTime();
    let t = {scope:scope, func:func, params:params, delay:delay, time:time};
    this._delayTasks.push(t);
  }
  defer(scope, func, params) {
    let t = {scope:scope, func:func, params:params};
    this._deferTasks.push(t);
  }
  next(scope, func, params) {
    let t = {scope:scope, func:func, params:params};
    this._nextTasks.push(t);
  }
  usurp(scope, func, params) {
    let t = {scope:scope, func:func, params:params};
    this._usurpTask.push(t);
  }
}

let _scheduler = new Scheduler();
export default _scheduler;