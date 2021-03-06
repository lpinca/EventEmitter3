'use strict';

/**
 * Benchmark related modules.
 */
var benchmark = require('benchmark')
  , microtime = require('microtime');

/**
 * Logger.
 */
var logger = new(require('devnull'))({ timestamp: false, namespacing: 0 });

/**
 * Preparation code.
 */
var EventEmitter2 = require('eventemitter2').EventEmitter2
  , EventEmitter3 = require('eventemitter3').EventEmitter
  , EventEmitter1 = require('events').EventEmitter
  , Master = require('../../').EventEmitter
  , Drip = require('drip').EventEmitter;

(
  new benchmark.Suite()
).add('EventEmitter 1', function test1() {
  var ee = new EventEmitter1();
}).add('EventEmitter 2', function test2() {
  var ee = new EventEmitter2();
}).add('EventEmitter 3', function test3() {
  var ee = new EventEmitter3();
}).add('EventEmitter 3 (master)', function test3() {
  var ee = new Master();
}).add('Drip', function test3() {
  var drip = new Drip();
}).on('cycle', function cycle(e) {
  var details = e.target;

  logger.log('Finished benchmarking: "%s"', details.name);
  logger.metric('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)'
    , details.count
    , details.cycles
    , details.times.elapsed
    , details.hz
  );
}).on('complete', function completed() {
  logger.info('Benchmark: "%s" is was the fastest.'
    , this.filter('fastest').pluck('name')
  );
}).run();
